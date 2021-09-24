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
        resultToPromise(rust_number(), promise);
    }

    @ReactMethod
    public void sign(String msg, String cred, String gpk, Promise promise) {
        String signature = rust_sign(msg, cred, gpk);

        resultToPromise(signature, promise);
    }

    @ReactMethod
    public void verify(String msg, String signature, String gpk, Promise promise) {
        String result = rust_verify(msg, signature, gpk);

        resultToPromise(result, promise);
    }

    void resultToPromise(String result, Promise promise) {
        if (result.startsWith("ERROR: ")) {
            promise.reject(result);
        } else {
            promise.resolve(result);
        }
    }

    private static native String rust_number();
    private static native String rust_sign(String msg, String cred, String gpk);
    private static native String rust_verify(String msg, String signature, String gpk);
}