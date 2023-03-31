package com.gzhelper.net;

import android.os.Build;

import androidx.annotation.NonNull;
import androidx.annotation.RequiresApi;

import com.gzhelper.module.UserInfo;
import com.gzhelper.util.CallBack;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import okhttp3.Call;
import okhttp3.Cookie;
import okhttp3.CookieJar;
import okhttp3.FormBody;
import okhttp3.HttpUrl;
import okhttp3.Interceptor;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

public class Http {
    private static Http http;

    private static OkHttpClient okHttpClient;

    private final List<Cookie> cookies = new ArrayList<>();

    public static Http getInstance() {
        if (http == null) {
            http = new Http();
        }
        return http;
    }

    private Http() {
        okHttpClient = new OkHttpClient.Builder().cookieJar(new CookieJar() {
            @Override
            public void saveFromResponse(@NonNull HttpUrl httpUrl, @NonNull List<Cookie> list) {
                cookies.addAll(list);
            }

            @NonNull
            @Override
            public List<Cookie> loadForRequest(@NonNull HttpUrl httpUrl) {

                return cookies;
            }
        }).addInterceptor(new Interceptor() {
            @NonNull
            @Override
            public Response intercept(@NonNull Chain chain) throws IOException {
                Request request = chain.request().newBuilder().build();
                return chain.proceed(request);
            }
        }).build();
    }

    private void postScore(String url, FormBody formBody, CallBack callBack) {
        new Thread() {
            @Override
            public void run() {
                Request request = new Request.Builder()
                        .addHeader("Sec-Fetch-Dest", "iframe")
                        .addHeader("sec-ch-ua-platform", "Windows")
                        .addHeader("Referer", UserInfo.ScoreUrl)
                        .addHeader("Host", "jw.gzu.edu.cn").url(url).post(formBody).build();
                Response response = null;
                Call call = okHttpClient.newCall(request);
                try {
                    response = call.execute();
                } catch (IOException ignored) {
                } finally {
                    callBack.execute(response);
                }
            }
        }.start();
    }

    private void getIframe(String url, CallBack callBack) {
        new Thread() {
            @Override
            public void run() {
                Request request = new Request.Builder().addHeader("Sec-Fetch-Dest", "iframe").addHeader("sec-ch-ua-platform", "Windows").addHeader("Referer", "https://jw.gzu.edu.cn/xs_main.aspx?xh=" + UserInfo.userID).addHeader("Host", "jw.gzu.edu.cn").url(url).get().build();
                Response response = null;
                Call call = okHttpClient.newCall(request);
                try {
                    response = call.execute();
                } catch (IOException ignored) {
                } finally {
                    callBack.execute(response);
                }
            }
        }.start();
    }

    private void get(@NonNull String url, CallBack callBack) {
        new Thread() {
            @Override
            public void run() {
                Request request = new Request.Builder().url(url).get().build();
                Response response = null;
                Call call = okHttpClient.newCall(request);
                try {
                    response = call.execute();
                } catch (IOException ignored) {
                } finally {
                    callBack.execute(response);
                }
            }
        }.start();
    }


    private void getImg(@NonNull String url, CallBack callBack) {
        new Thread() {
            @Override
            public void run() {
                Request request = new Request.Builder().addHeader("Accept", "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8").addHeader("Sec-Fetch-Dest", "image").addHeader("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36").url(url).get().build();
                Call call = okHttpClient.newCall(request);
                try {
                    Response response = call.execute();
                    callBack.execute(response);
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            }
        }.start();
    }


    private void post(String url, FormBody formBody, CallBack callBack) {
        new Thread() {
            @Override
            public void run() {
                Request request = new Request.Builder().url(url).post(formBody).build();
                Call call = okHttpClient.newCall(request);
                Response response = null;
                try {
                    response = call.execute();
                    callBack.execute(response);
                } catch (IOException e) {
                    callBack.execute(null);
                }
            }
        }.start();
    }

    public void getLoginPage(CallBack callBack) {
        get("https://jw.gzu.edu.cn/default2.aspx", callBack);
    }

    public void getCheckCode(CallBack callBack) {
        getImg("https://jw.gzu.edu.cn/CheckCode.aspx", new CallBack() {
            @RequiresApi(api = Build.VERSION_CODES.O)
            @Override
            public void execute(Response response) {
                callBack.execute(response);
            }
        });
    }

    public void login(CallBack callBack) {
        FormBody formBody = new FormBody.Builder().add("__VIEWSTATE", UserInfo.__VIEWSTATE).add("txtUserName", UserInfo.userID).add("Textbox1", "").add("TextBox2", UserInfo.passwd).add("txtSecretCode", UserInfo.checkCode).add("RadioButtonList1", "%D1%A7%C9%FA").add("Button1", "").add("lbLanguage", "").add("hidPdrs", "").add("hidsc", "").build();
        post("https://jw.gzu.edu.cn/default2.aspx", formBody, callBack);
    }

    public void getScorePage(CallBack callBack) {
        String url = UserInfo.ScorePageUrl;
        getIframe(url, callBack);
    }

    public void getSchedule(CallBack callBack) {
        String url = UserInfo.ScheduleUrl;
        getIframe(url, callBack);
    }

    public void getScoreData(CallBack callBack) {
        FormBody formBody = new FormBody.Builder()
                .add("__VIEWSTATE", UserInfo.__VIEWSTATE2)
                .add("ddlXN", "")
                .add("ddlXQ", "")
                .add("Button1", "%B0%B4%D1%A7%C6%DA%B2%E9%D1%AF")
                .build();

        postScore(UserInfo.ScoreUrl, formBody, callBack);
    }

}
