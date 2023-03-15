package com.gzhelper.checkcode;

import android.content.Intent;
import android.os.Environment;
import android.util.Log;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.Callback;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;

import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.IOException;
import java.util.Base64;
import java.util.Map;
import java.util.HashMap;

public class AutoCheckCode extends ReactContextBaseJavaModule {
    private static ReactApplicationContext reactContext;

    private static final String DURATION_SHORT_KEY = "SHORT";
    private static final String DURATION_LONG_KEY = "LONG";


    @NonNull
    @Override
    public String getName() {
        return "AutoCheckCode";
    }

    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put(DURATION_SHORT_KEY, Toast.LENGTH_SHORT);
        constants.put(DURATION_LONG_KEY, Toast.LENGTH_LONG);
        return constants;
    }

    public static void base64ToFile(String base64, String fileName) {
        File file = null;
        //创建文件目录

        String filePath = reactContext.getExternalFilesDirs(Environment.DIRECTORY_DOWNLOADS)[0].getPath();
        File dir = new File(filePath);
        if (!dir.exists() && !dir.isDirectory()) {
            dir.mkdirs();
        }
        BufferedOutputStream bos = null;
        java.io.FileOutputStream fos = null;
        try {
            byte[] bytes = new byte[0];
            if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.O) {
                bytes = Base64.getDecoder().decode(base64);
            }
            file = new File(filePath + File.separatorChar + fileName);
            if (file.exists()) {
                file.delete();
            }
            fos = new java.io.FileOutputStream(file);
            bos = new BufferedOutputStream(fos);
            bos.write(bytes);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (bos != null) {
                try {
                    bos.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
            if (fos != null) {
                try {
                    fos.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }


    @ReactMethod
    public void getCheckCode(String base, Promise promise) {
        String fileName = "checkCode.png";
        Log.d("aassa", "getCheckCode:" + base.substring(22));
        base64ToFile(base.substring(22), fileName);
        File testFile2 = new File(reactContext.getExternalFilesDirs(Environment.DIRECTORY_DOWNLOADS)[0].getPath() + File.separatorChar + fileName);
        String result2 = GraphicC2Translator.getInstance().translate(testFile2, reactContext);
        Log.d("result", "getCheckCode: " + result2);
        promise.resolve(result2);
    }

    public static void sendEvent(ReactContext reactContext, String eventName, @Nullable WritableMap params) {
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit(eventName, params);
    }

    public static void sendEvent(String eventName, @Nullable WritableMap params) {
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit(eventName, params);
    }

    @ReactMethod
    public void addListener(String eventName) {
        // Set up any upstream listeners or background tasks as necessary
    }

    @ReactMethod
    public void removeListeners(Integer count) {
        // Remove upstream listeners, stop unnecessary background tasks
    }

    public AutoCheckCode(ReactApplicationContext context) {

        super(context);
        reactContext = context;


    }
}