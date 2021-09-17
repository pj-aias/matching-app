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

    private static native int rust_number();
}