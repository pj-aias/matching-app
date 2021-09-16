package com.matchingapp; // replace your-app-name with your app’s name
import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactMethod;


import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.lang.RuntimeException;
import android.util.Log;


public class MatchingAppPackage implements ReactPackage {
    static {
        //System.loadLibrary("distributed_bbs_mobile");
       Log.d("MatchingAppPackage", "package init called");
    }

   @Override
   public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
       return Collections.emptyList();
   }

   @Override
   public List<NativeModule> createNativeModules(
           ReactApplicationContext reactContext) {
       Log.d("createNativeModules", "register called");
       List<NativeModule> modules = new ArrayList<>();

       modules.add(new DistributedBbsModule(reactContext));

       if (modules.size() < 1) {
        throw new RuntimeException();
       } else if (modules.size() == 1) {
           Log.d("createNativeModule",  "length: " + modules.size());
           Log.e("createNativeModule",  "length: " + modules.size());
        throw new RuntimeException();
       }


       return modules;
   }

   @ReactMethod
   public void getRustNumber(Promise promise) {
       Log.d("number", "rust number bridge called");
       //promise.resolve(rust_number());
       promise.resolve(47);
   }

   //private static native String rust_number();
}