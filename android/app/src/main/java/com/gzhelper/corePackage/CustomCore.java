package com.gzhelper.corePackage;

import androidx.annotation.NonNull;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.gzhelper.checkcode.AutoCheckCode;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class CustomCore implements ReactPackage {


    @NonNull
    @Override
    public List<ViewManager> createViewManagers(@NonNull ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }

    @NonNull
    @Override
    public List<NativeModule> createNativeModules(@NonNull ReactApplicationContext reactContext) {

        List<NativeModule> modules = new ArrayList<>();

        modules.add(new Core(reactContext));

        return modules;
    }

}

