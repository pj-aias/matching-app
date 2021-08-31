use std::borrow::Borrow;
use libc::size_t;

// Helper struct that we'll use to give strings to C.
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

impl StringPtr {
    pub fn as_str(&self) -> &str {
        use std::{slice, str};

        unsafe {
            let slice = slice::from_raw_parts(self.ptr, self.len);
            str::from_utf8(slice).unwrap()
        }
    }
}

extern "C" fn rust_bbs_sign(msg: StringPtr, cred: StringPtr, gpk: StringPtr, seed: StringPtr) -> StringPtr {
}

extern "C" fn rust_bbs_verify(msg: StringPtr, signature: StringPtr, gpk: StringPtr) -> StringPtr {
}