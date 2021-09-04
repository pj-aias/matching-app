use libc::size_t;
use std::borrow::Borrow;

use super::{mobile_sign, mobile_verify};

#[repr(C)]
#[derive(Copy, Clone)]
pub struct StringPtr {
    pub ptr: *const u8,
    pub len: size_t,
}

impl<'a> From<&'a str> for StringPtr {
    fn from(s: &'a str) -> Self {
        StringPtr {
            ptr: s.as_ptr(),
            len: s.len() as size_t,
        }
    }
}

impl Borrow<str> for StringPtr {
    fn borrow(&self) -> &str {
        use std::{slice, str};
        unsafe {
            let str_slice = slice::from_raw_parts(self.ptr, self.len);
            str::from_utf8(str_slice).unwrap()
        }
    }
}

#[no_mangle]
pub unsafe extern "C" fn rust_string_ptr(s: *mut String) -> *mut StringPtr {
    Box::into_raw(Box::new(StringPtr::from(&**s)))
}

#[no_mangle]
pub unsafe extern "C" fn rust_string_destroy(s: *mut String) {
    let _ = Box::from_raw(s);
}

#[no_mangle]
pub unsafe extern "C" fn rust_string_ptr_destroy(s: *mut StringPtr) {
    let _ = Box::from_raw(s);
}

#[allow(unused)]
#[no_mangle]
extern "C" fn rust_bbs_sign(
    msg: StringPtr,
    cred: StringPtr,
    gpk: StringPtr,
    seed: StringPtr,
) -> StringPtr {
    let signature: &str = &mobile_sign(msg.borrow(), cred.borrow(), gpk.borrow(), seed.borrow());
    signature.into()
}

#[allow(unused)]
#[no_mangle]
extern "C" fn rust_bbs_verify(msg: StringPtr, signature: StringPtr, gpk: StringPtr) -> i32 {
    let result = mobile_verify(msg.borrow(), signature.borrow(), gpk.borrow());
    result as i32
}

#[cfg(test)]
mod test {
    use super::super::*;
    use super::*;

    #[test]
    fn trait_impl_works() {
        let raw = "hoge";
        let casted: StringPtr = raw.into();
        let borrowed: &str = casted.borrow();

        assert_eq!(raw, borrowed);
    }

    #[test]
    fn rust_bbs_sign_works() {
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

        let msg = "hoge";

        let usk = CombinedUSK::new(&partials);
        let gpk: &str = &encode(&gpk);
        let usk: &str = &encode(&usk);

        let seed: &str = &base64::encode("hogehogehogehogehogehogehogehoge");
        let expect = mobile_sign(&msg, &usk, &gpk, &seed);
        let actual = rust_bbs_sign(msg.into(), usk.into(), gpk.into(), seed.into());
        let actual_str: &str = actual.borrow();

        assert_eq!(&expect, actual_str);
    }

    #[test]
    fn rust_bbs_verify_works() {
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

        let msg = "hoge";
        let msg2 = "piyo";

        let usk = CombinedUSK::new(&partials);
        let gpk: &str = &encode(&gpk);
        let usk: &str = &encode(&usk);

        let seed: &str = &base64::encode("hogehogehogehogehogehogehogehoge");
        let sig: &str = &mobile_sign(&msg, &usk, &gpk, &seed);

        let result = rust_bbs_verify(msg.into(), sig.into(), gpk.into());
        assert!(result != 0);

        let result = rust_bbs_verify(msg2.into(), sig.into(), gpk.into());
        assert!(result == 0);
    }
}
