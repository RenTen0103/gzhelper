package com.gzhelper.util;

import java.io.IOException;

import okhttp3.Response;

public interface CallBack {
    public void execute(Response response);
}
