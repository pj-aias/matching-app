package com.matchingapp;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;
import java.util.Map;
import java.util.HashMap;

public class DistributedBbsModule extends ReactContextBaseJavaModule {
    static {
        System.loadLibrary("distributed_bbs_mobile");
    }

   DistributedBbsModule(ReactApplicationContext context) {
       super(context);
   }

   @Override
   public String getName() {
       return "DistributedBbsModule";
   }

    @ReactMethod
    public void getRustNumber(Promise promise) {
        promise.resolve(rust_number());
        //promise.resolve(47);
    }

    @ReactMethod
    public void sign(String msg, String cred, String gpk, String seed, Promise promise) {
        promise.resolve(rust_sign(msg, cred, gpk, seed));
    }

    @ReactMethod
    public void verify(String msg, String signature, String gpk, Promise promise) {
        promise.resolve(rust_verify(msg, signature, gpk));
    }

    private static native int rust_number();
    private static native String rust_sign(String msg, String cred, String gpk, String seed);
    private static native boolean rust_verify(String msg, String signature, String gpk);
}