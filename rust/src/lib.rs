#[cfg(feature = "android")]
#[allow(non_snake_case)]
pub mod android;

#[macro_use]
extern crate arrayref;

use distributed_bss::CombinedGPK;
use distributed_bss::CombinedUSK;
use distributed_bss::Signature;
use rand::rngs::StdRng;
use rand::SeedableRng;
use std::borrow::Borrow;

use serde::de::DeserializeOwned;
use serde::Serialize;

// FIXME: create our own Result Type
type MobileResult<T, E> = Result<T, E>;

pub fn to_string<T: Borrow<str>, E: std::fmt::Display>(r: MobileResult<T, E>) -> String {
        match r {
            Ok(v) => v.borrow().to_owned(),
            Err(e) => format!("ERROR: {}", e),
        }
}

pub fn encode<T>(point: &T) -> String
where
    T: Serialize,
{
    let point = rmp_serde::to_vec(&point).expect("rmp encode error");
    base64::encode(&point)
}

fn decode<'a, T: DeserializeOwned>(point: &str) -> Result<T, String> {
    let point = base64::decode(point).or(Err("base64 decode error"))?;
    let result = rmp_serde::from_read(&*point).or(Err("base64 decode error"))?;
    Ok(result)
}

pub fn mobile_sign(msg: &str, cred: &str, gpk: &str, seed: &str) -> MobileResult<String, String> {
    let seed = base64::decode(seed)
        .map_err(|e| e.to_string())?;

    let seed = array_ref!(seed, 0, 32);

    let mut rng = StdRng::from_seed(*seed);

    let cred: CombinedUSK = decode(&cred.to_string())
        .map_err(|e| e.to_string())?;
    let gpk: CombinedGPK = decode(&gpk.to_string())
        .map_err(|e| e.to_string())?;

    let signature = distributed_bss::sign(msg.as_bytes(), &cred, &gpk, &mut rng);

    Ok(encode(&signature))
}

pub fn mobile_verify(msg: &str, signature: &str, gpk: &str) -> Result<String, String> {
    let signature: Signature = decode(signature)?;
    let gpk: CombinedGPK = decode(gpk)?;

    let result = distributed_bss::verify(msg.as_bytes(), &signature, &gpk).is_ok();
    return Ok(result.to_string());
}

#[no_mangle]
pub extern "C" fn rust_number() -> i32 {
    57
}

#[cfg(feature = "ios")]
pub mod ios {

    use std::ffi::{CStr, CString};
    use std::os::raw::c_char;

    use super::*;

    #[no_mangle]
    pub extern "C" fn sign(
        msg: *const c_char,
        cred: *const c_char,
        gpk: *const c_char,
        seed: *const c_char,
    ) -> *mut c_char {
        let msg = unsafe { CStr::from_ptr(msg) }.to_str().unwrap();
        let cred = unsafe { CStr::from_ptr(cred) }.to_str().unwrap();
        let gpk = unsafe { CStr::from_ptr(gpk) }.to_str().unwrap();
        let seed = unsafe { CStr::from_ptr(seed) }.to_str().unwrap();

        let signature = mobile_sign(msg, cred, gpk, seed);

        CString::new(encode(&signature)).unwrap().into_raw()
    }

    #[no_mangle]
    pub extern "C" fn verify(
        msg: *const c_char,
        signature: *const c_char,
        gpk: *const c_char,
    ) -> bool {
        let signature = unsafe { CStr::from_ptr(signature) }.to_str().unwrap();
        let gpk = unsafe { CStr::from_ptr(gpk) }.to_str().unwrap();
        let msg = unsafe { CStr::from_ptr(msg) }.to_str().unwrap();

        mobile_verify(&msg, &signature, &gpk)
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
}

#[cfg(test)]
mod test {

    use super::*;

    #[test]
    fn test() {
        use distributed_bss::gm::{GMId, GM};
        use distributed_bss::{CombinedGPK, CombinedUSK};
        use rand::thread_rng;

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

        let msg = String::from("hoge");
        let msg2 = String::from("piyo");

        let usk = CombinedUSK::new(&partials);
        let gpk = String::from(encode(&gpk));
        let usk = String::from(encode(&usk));

        let seed = String::from(base64::encode("hogehogehogehogehogehogehogehoge"));

        println!(
            r#"sign params: "{}", "{}", "{}", "{}""#,
            msg, usk, gpk, seed
        );
        let sig = mobile_sign(&msg, &usk, &gpk, &seed).unwrap();

        assert_eq!(mobile_verify(&msg, &sig, &gpk).unwrap(), "true".to_string());
        assert_eq!(
            mobile_verify(&msg2, &sig, &gpk).unwrap(),
            "false".to_string()
        );
    }

    #[test]
    fn test_encode_and_decode() {
        use serde::Deserialize;

        #[derive(Clone, Serialize, Deserialize)]
        struct Hoge {
            pub piyo: String,
        }
    }
}
