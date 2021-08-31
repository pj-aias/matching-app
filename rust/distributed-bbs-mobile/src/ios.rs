use std::borrow::Borrow;
use libc::size_t;

use super::{mobile_sign, mobile_verify};

#[repr(C)]
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

#[allow(unused)]
extern "C" fn rust_bbs_sign(msg: StringPtr, cred: StringPtr, gpk: StringPtr, seed: StringPtr) -> StringPtr {
    let signature: &str = &mobile_sign(msg.borrow(), cred.borrow(), gpk.borrow(), seed.borrow());
    signature.into()
}

#[allow(unused)]
extern "C" fn rust_bbs_verify(msg: StringPtr, signature: StringPtr, gpk: StringPtr) -> i32 {
    let result = mobile_verify(msg.borrow(), signature.borrow(), gpk.borrow());
    result as i32
}