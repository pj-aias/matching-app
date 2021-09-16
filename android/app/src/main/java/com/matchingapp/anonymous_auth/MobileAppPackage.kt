package com.matchingapp.anonymous_auth;

import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ViewManager
import com.matchingapp.anonymous_auth.MobileAppBridge
import java.util.*
import kotlin.collections.ArrayList

class MobileAppPackage : ReactPackage {
    override fun createViewManagers(reactContext: ReactApplicationContext): List<ViewManager<*, *>> {
        return Collections.emptyList()
    }

    override fun createNativeModules(reactContext: ReactApplicationContext): List<NativeModule> {
        val modules: MutableList<NativeModule> = ArrayList()
        modules.add(MobileAppBridge(reactContext))
        return modules
    }
}


