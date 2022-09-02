package com.alamiassessmenttest;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.uimanager.IllegalViewOperationException;
import com.facebook.react.bridge.Callback;
import android.app.PendingIntent;
import android.content.Intent;
import android.provider.Settings.Secure;
import android.content.Context;
import com.facebook.react.bridge.Callback;
import android.os.AsyncTask;
 
public class DeviceInfoModule extends ReactContextBaseJavaModule {
 
    public DeviceInfoModule(ReactApplicationContext reactContext) {
        super(reactContext); //required by React Native
    }
 
    @Override
    public String getName() { 
        return "DeviceInfoModule";
    }

    @ReactMethod
    public void getDeviceID(final Callback callback) {
        getDeviceIDHandler(callback);
    }

    private void getDeviceIDHandler(final Callback callback) {
        AsyncTask<Void,Void,Void> myAsyncTask = new AsyncTask<Void,Void,Void>() {
            @Override
            protected Void doInBackground(final Void ... params) {
                Context context = getReactApplicationContext();
                String android_id = Secure.getString(context.getContentResolver(), Secure.ANDROID_ID);

                callback.invoke(android_id);
                return null;
            }
        };
        myAsyncTask.executeOnExecutor(AsyncTask.THREAD_POOL_EXECUTOR);
    }
}
