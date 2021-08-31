// #[macro_use]
// extern crate arrayref;

// #[cfg(feature = "jni")]
// extern crate jni;

// #[cfg(feature = "jni")]
// #[allow(non_snake_case)]
// pub mod android;

// use distributed_bss::sign;
// use distributed_bss::verify;
// use distributed_bss::CombinedGPK;
// use distributed_bss::CombinedUSK;
// use distributed_bss::Signature;
// use rand::rngs::StdRng;
// use rand::SeedableRng;
// use serde::de::DeserializeOwned;
// use serde::{Deserialize, Serialize};

// pub fn encode<T>(point: &T) -> String
// where
//     T: Serialize,
// {
//     let point = rmp_serde::to_vec(&point).expect("rmp encode error");
//     base64::encode(&point)
// }

// fn decode<'a, T: DeserializeOwned>(point: &String) -> T {
//     let point = base64::decode(point).expect("base64 decode error");
//     rmp_serde::from_read(&*point).expect("rmp decode error")
// }

// pub fn mobile_sign(
//     msg: &String,
//     cred: &String,
//     gpk: &String,
//     seed: &String,
// ) -> std::string::String {
//     let seed = base64::decode(seed).expect("base64 decode error");
//     let seed = array_ref!(seed, 0, 32);

//     let mut rng = StdRng::from_seed(*seed);

//     let cred: CombinedUSK = decode(cred);
//     let gpk: CombinedGPK = decode(gpk);

//     let signature = sign(msg.as_bytes(), &cred, &gpk, &mut rng);

//     encode(&signature)
// }

// pub fn mobile_verify(msg: &String, signature: &String, gpk: &String) -> bool {
//     let signature: Signature = decode(signature);
//     let gpk: CombinedGPK = decode(gpk);

//     verify(msg.as_bytes(), &signature, &gpk).is_ok()
// }

// #[test]
// fn test() {
//     use rand::thread_rng;

//     use distributed_bss::gm::{GMId, GM};

//     use distributed_bss::{CombinedGPK, CombinedUSK};

//     let mut rng = thread_rng();

//     let gm1 = GM::random(GMId::One, &mut rng);
//     let gm2 = GM::random(GMId::Two, &mut rng);
//     let gm3 = GM::random(GMId::Three, &mut rng);

//     let u = gm1.gen_combined_pubkey(&gm2.gpk.h);
//     let v = gm2.gen_combined_pubkey(&gm3.gpk.h);
//     let w = gm3.gen_combined_pubkey(&gm1.gpk.h);

//     let h = gm3.gen_combined_pubkey(&u);

//     let partials = vec![
//         gm1.issue_member(&mut rng),
//         gm2.issue_member(&mut rng),
//         gm3.issue_member(&mut rng),
//     ];

//     let partical_gpks = vec![gm1.gpk, gm2.gpk, gm3.gpk];

//     let gpk = CombinedGPK {
//         h,
//         partical_gpks,
//         u,
//         v,
//         w,
//     };

//     let msg = "hoge".to_string();
//     let msg2 = "piyo".to_string();

//     let usk = CombinedUSK::new(&partials);
//     let gpk = encode(&gpk);
//     let usk = encode(&usk);

//     let seed = base64::encode("hogehogehogehogehogehogehogehoge");
//     let sig = mobile_sign(&msg, &usk, &gpk, &seed);

//     assert!(mobile_verify(&msg, &sig, &gpk));
//     assert!(!mobile_verify(&msg2, &sig, &gpk));
// }

// #[test]
// fn test_encode_and_decode() {
//     #[derive(Clone, Serialize, Deserialize)]
//     struct Hoge {
//         pub piyo: String,
//     }

//     let fuga = Hoge {
//         piyo: "hogera".to_string(),
//     };

//     let encoded = encode(&fuga);
//     let decoded: Hoge = decode(&encoded);

//     assert_eq!(fuga.piyo, decoded.piyo);
// }
