package com.matchingapp;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import java.util.Map;
import java.util.HashMap;

public class DistributedBbsModule extends ReactContextBaseJavaModule {
   DistributedBbsModule(ReactApplicationContext context) {
       super(context);
   }

   @Override
   public String getName() {
       return "DistributedBbs";
   }
}