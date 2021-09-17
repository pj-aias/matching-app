use crate::{mobile_sign, mobile_verify, rust_number};
use jni::objects::{JClass, JString};
use jni::sys::jstring;
use jni::JNIEnv;

#[no_mangle]
pub unsafe extern "C" fn Java_com_matchingapp_DistributedBbsModule_rust_1sign(
    env: JNIEnv,
    _: JClass,
    msg: JString,
    cred: JString,
    gpk: JString,
    seed: JString,
) -> jstring {
    let msg: String = env
        .get_string(msg)
        .expect("Couldn't get java string!")
        .into();

    let cred: String = env
        .get_string(cred)
        .expect("Couldn't get java string!")
        .into();

    let gpk: String = env
        .get_string(gpk)
        .expect("Couldn't get java string!")
        .into();

    let seed: String = env
        .get_string(seed)
        .expect("Couldn't get java string!")
        .into();

    let signature = mobile_sign(&msg, &cred, &gpk, &seed);

    let signature = env
        .new_string(signature)
        .expect("Couldn't generate java string!");

    signature.into_inner()
}

#[no_mangle]
pub unsafe extern "C" fn Java_com_matchingapp_DistributedBbsModule_rust_1verify(
    env: JNIEnv,
    _: JClass,
    msg: JString,
    signature: JString,
    gpk: JString,
) -> bool {
    let msg: String = env
        .get_string(msg)
        .expect("Couldn't get java string!")
        .into();

    let signature: String = env
        .get_string(signature)
        .expect("Couldn't get java string!")
        .into();

    let gpk: String = env
        .get_string(gpk)
        .expect("Couldn't get java string!")
        .into();

    mobile_verify(&msg, &signature, &gpk)
}

#[no_mangle]
pub unsafe extern "C" fn Java_com_matchingapp_DistributedBbsModule_rust_1number(
    _: JNIEnv,
    _: JClass,
) -> i32 {
    rust_number()
}
