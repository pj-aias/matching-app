#[macro_use]
extern crate arrayref;

use std::ffi::{CStr, CString};
use std::os::raw::c_char;

use distributed_bss::sign;
use distributed_bss::verify;
use distributed_bss::CombinedGPK;
use distributed_bss::CombinedUSK;
use distributed_bss::Signature;
use rand::rngs::StdRng;
use rand::SeedableRng;
use serde::de::DeserializeOwned;
use serde::Serialize;

pub fn encode<T>(point: &T) -> String
where
    T: Serialize,
{
    let point = rmp_serde::to_vec(&point).expect("rmp encode error");
    base64::encode(&point)
}

fn decode<'a, T: DeserializeOwned>(point: &str) -> T {
    let point = base64::decode(point).expect("base64 decode error");
    rmp_serde::from_read(&*point).expect("rmp decode error")
}

#[no_mangle]
pub extern "C" fn mobile_sign(
    msg: *const c_char,
    cred: *const c_char,
    gpk: *const c_char,
    seed: *const c_char,
) -> *mut c_char {
    let msg = unsafe { CStr::from_ptr(msg) }.to_str().unwrap();
    let cred = unsafe { CStr::from_ptr(cred) }.to_str().unwrap();
    let gpk = unsafe { CStr::from_ptr(gpk) }.to_str().unwrap();
    let seed = unsafe { CStr::from_ptr(seed) }.to_str().unwrap();
    let seed = base64::decode(seed).expect("base64 decode error");
    let seed = array_ref!(seed, 0, 32);

    let mut rng = StdRng::from_seed(*seed);

    let cred: CombinedUSK = decode(&cred.to_string());
    let gpk: CombinedGPK = decode(&gpk.to_string());

    let signature = sign(msg.as_bytes(), &cred, &gpk, &mut rng);

    CString::new(encode(&signature)).unwrap().into_raw()
}

#[no_mangle]
pub extern "C" fn mobile_verify(
    msg: *const c_char,
    signature: *const c_char,
    gpk: *const c_char,
) -> bool {
    let signature = unsafe { CStr::from_ptr(signature).to_str().unwrap() };
    let signature: Signature = decode(signature);
    let gpk = unsafe { CStr::from_ptr(gpk) }.to_str().unwrap();
    let gpk: CombinedGPK = decode(gpk);

    let msg = unsafe { CStr::from_ptr(msg) }.to_bytes();

    verify(msg, &signature, &gpk).is_ok()
}

#[no_mangle]
pub extern "C" fn rust_number() -> i32 {
    57
}

#[no_mangle]
pub extern "C" fn rust_cstr_free(s: *mut c_char) {
    unsafe {
        if s.is_null() {
            return;
        }
        CString::from_raw(s)
    };
}

#[test]
fn test() {
    use rand::thread_rng;

    use distributed_bss::gm::{GMId, GM};

    use distributed_bss::{CombinedGPK, CombinedUSK};

    let mut rng = thread_rng();

    let gm1 = GM::random(GMId::One, &mut rng);
    let gm2 = GM::random(GMId::Two, &mut rng);
    let gm3 = GM::random(GMId::Three, &mut rng);

    let u = gm1.gen_combined_pubkey(&gm2.gpk.h);
    let v = gm2.gen_combined_pubkey(&gm3.gpk.h);
    let w = gm3.gen_combined_pubkey(&gm1.gpk.h);

    let h = gm3.gen_combined_pubkey(&u);

    let partials = vec![
        gm1.issue_member(&mut rng),
        gm2.issue_member(&mut rng),
        gm3.issue_member(&mut rng),
    ];

    let partical_gpks = vec![gm1.gpk, gm2.gpk, gm3.gpk];

    let gpk = CombinedGPK {
        h,
        partical_gpks,
        u,
        v,
        w,
    };

    let msg = CString::new("hoge").unwrap();
    let msg2 = CString::new("piyo").unwrap();

    let usk = CombinedUSK::new(&partials);
    let gpk = CString::new(encode(&gpk)).unwrap();
    let usk = CString::new(encode(&usk)).unwrap();

    let seed = CString::new(base64::encode("hogehogehogehogehogehogehogehoge")).unwrap();
    let sig = mobile_sign(
        msg.clone().into_raw(),
        usk.into_raw(),
        gpk.clone().into_raw(),
        seed.into_raw(),
    );

    assert!(mobile_verify(
        msg.clone().into_raw(),
        sig,
        gpk.clone().into_raw()
    ));
    assert!(!mobile_verify(msg2.into_raw(), sig, gpk.into_raw()));
}

#[test]
fn test_encode_and_decode() {
    use serde::Deserialize;

    #[derive(Clone, Serialize, Deserialize)]
    struct Hoge {
        pub piyo: String,
    }
}
