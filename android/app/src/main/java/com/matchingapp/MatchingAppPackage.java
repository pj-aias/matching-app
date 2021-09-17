package com.matchingapp; // replace your-app-name with your app’s name
import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.facebook.react.bridge.ReactMethod;


import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.lang.RuntimeException;
import android.util.Log;


public class MatchingAppPackage implements ReactPackage {
   @Override
   public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
       return Collections.emptyList();
   }

   @Override
   public List<NativeModule> createNativeModules(
           ReactApplicationContext reactContext) {
       List<NativeModule> modules = new ArrayList<>();

       modules.add(new DistributedBbsModule(reactContext));

       return modules;
   }

}