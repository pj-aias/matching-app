package com.matchingapp.anonymous_auth

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class MobileAppBridge(reactContext: ReactApplicationContext?) :
    ReactContextBaseJavaModule(reactContext) {
    companion object {
        private external fun sign(msg: String, usk: String, gpk: String, seed: String): String?
        private external fun verify(msg: String, signature: String, gpk: String, seed: String): String?

        init {
            System.loadLibrary("distributed_bbs_mobile")
        }
    }

    override fun getName(): String {
        return "MobileAppBridge"
    }

    @ReactMethod
    fun sign(msg: String, usk: String, gpk: String, seed: String, promise: Promise) {
        promise.resolve(sign(msg, usk, gpk, seed))
    }

    @ReactMethod
    fun verify(msg: String, signature: String, gpk: String, seed: String, promise: Promise) {
        promise.resolve(verify(msg, signature, gpk, seed))
    }
}
