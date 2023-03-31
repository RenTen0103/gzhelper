package com.gzhelper.corePackage;

import static com.gzhelper.checkcode.AutoCheckCode.base64ToFile;
import static com.gzhelper.util.HtmlParse.ansSchedule;
import static com.gzhelper.util.HtmlParse.checkLogin;
import static com.gzhelper.util.HtmlParse.getScheduleUrl;
import static com.gzhelper.util.HtmlParse.getScoreAction;
import static com.gzhelper.util.HtmlParse.getScoreList;
import static com.gzhelper.util.HtmlParse.getScoreRawData;
import static com.gzhelper.util.HtmlParse.getScoreUrl;
import static com.gzhelper.util.HtmlParse.getUserName;
import static com.gzhelper.util.HtmlParse.getViewSate2;
import static com.gzhelper.util.HtmlParse.getViewState;

import android.os.Build;
import android.os.Environment;

import androidx.annotation.NonNull;
import androidx.annotation.RequiresApi;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.google.gson.Gson;
import com.gzhelper.checkcode.GraphicC2Translator;
import com.gzhelper.module.ScoreData;
import com.gzhelper.module.UserInfo;
import com.gzhelper.net.Http;
import com.gzhelper.util.CallBack;
import com.gzhelper.util.HtmlParse;

import org.json.JSONObject;

import java.io.File;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Base64;

import okhttp3.Response;

public class Core extends ReactContextBaseJavaModule {
    private static ReactApplicationContext reactContext;
    private Http http = Http.getInstance();

    private static int COUNTS = 0;

    @NonNull
    @Override
    public String getName() {
        return "zfCore";
    }

    @RequiresApi(api = Build.VERSION_CODES.O)
    private String getCheckCode(Response response) throws IOException {
        String fileName = "checkCode.png";
        String base = Base64.getEncoder().encodeToString(response.body().bytes());
        File testFile2 = new File(reactContext.getExternalFilesDirs(Environment.DIRECTORY_DOWNLOADS)[0].getPath() + File.separatorChar + fileName);
        base64ToFile(base, fileName);
        return GraphicC2Translator.getInstance().translate(testFile2, reactContext);
    }

    @ReactMethod
    public void Login(String username, String passwd, Promise promise) {
        http.getLoginPage(new CallBack() {
            @Override
            public void execute(Response response) {
                if (response != null) {
                    try {
                        UserInfo.__VIEWSTATE = HtmlParse.getViewState(response.body().string());
                    } catch (IOException e) {
                        promise.resolve("NULL");
                    }
                    http.getCheckCode(new CallBack() {
                        @RequiresApi(api = Build.VERSION_CODES.O)
                        @Override
                        public void execute(Response response2) {
                            try {
                                UserInfo.checkCode = getCheckCode(response2);
                                UserInfo.userID = username;
                                UserInfo.passwd = passwd;
                                http.login(new CallBack() {
                                    @Override
                                    public void execute(Response response3) {
                                        if (response3 != null) {
                                            try {
                                                String str = response3.body().string();
                                                if (checkLogin(str)) {
                                                    COUNTS = 0;
                                                    UserInfo.name = getUserName(str);
                                                    UserInfo.ScorePageUrl = "https://jw.gzu.edu.cn/" + getScoreUrl(str);
                                                    UserInfo.ScheduleUrl = "https://jw.gzu.edu.cn/" + getScheduleUrl(str);
                                                    promise.resolve("LOGIN SUCCESS");
                                                } else {
                                                    COUNTS++;
                                                    if (COUNTS < 5) {
                                                        Login(username, passwd, promise);
                                                    } else {
                                                        COUNTS = 0;
                                                        promise.resolve("NULL");
                                                    }
                                                }

                                            } catch (IOException e) {
                                                throw new RuntimeException(e);
                                            }
                                        } else {
                                            promise.resolve("NULL");
                                        }
                                    }
                                });
                            } catch (IOException e) {
                                promise.resolve("NULL");
                            }
                        }
                    });
                } else {
                    promise.resolve("NET ERROR");
                }


            }
        });
    }


    @ReactMethod
    public void getCodeList(Promise promise) {
        promise.resolve(ScoreData.rawData);
    }

    @ReactMethod
    public void getScoreData(Promise promise) throws UnsupportedEncodingException {
        http.getScorePage(new CallBack() {
            @Override
            public void execute(Response response) {
                try {
                    String str = new String(response.body().bytes(), "gbk");
                    UserInfo.ScoreUrl = "https://jw.gzu.edu.cn/" + getScoreAction(str);
                    UserInfo.__VIEWSTATE2 = getViewSate2(str);
                    http.getScoreData(new CallBack() {
                        @RequiresApi(api = Build.VERSION_CODES.O)
                        @Override
                        public void execute(Response response) {
                            try {

                                String responseStr = response.body().string();
                                String bs = new String(Base64.getDecoder().decode(getScoreRawData(responseStr)));
                                ArrayList<String> scoreList = getScoreList(responseStr);
                                ScoreData.codeList = scoreList;
                                ScoreData.rawData = bs;
                                Gson gson = new Gson();
                                promise.resolve(gson.toJson(scoreList));
                            } catch (IOException e) {
                                promise.resolve(e.getMessage());
                            }
                        }
                    });
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            }
        });
    }


    @ReactMethod
    public void getScheduleData(Promise promise) {
        http.getSchedule(new CallBack() {
            @Override
            public void execute(Response response) {
                try {
                    String str = response.body().string();
                    Gson gson = new Gson();
                    String res = gson.toJson(ansSchedule(str));
                    promise.resolve(res);
                } catch (IOException e) {
                    promise.resolve("NULL");
                }
            }
        });
    }

    public Core(ReactApplicationContext context) {
        super(context);
        reactContext = context;
    }

}
