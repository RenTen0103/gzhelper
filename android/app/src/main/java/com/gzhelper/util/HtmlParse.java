package com.gzhelper.util;

import android.util.Log;

import com.gzhelper.module.UserInfo;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.nodes.Node;
import org.jsoup.select.Elements;

import java.util.ArrayList;

public class HtmlParse {
    public static String getViewState(String htmlStr) {
        Document doc = Jsoup.parse(htmlStr);
        Element input = doc.select("#form1 > input[type=hidden]").get(0);
        return input.attr("value");
    }

    public static boolean checkLogin(String htmlStr) {
        Document document = Jsoup.parse(htmlStr);
        Elements iframe = document.select("#iframeautoheight");
        if (iframe.isEmpty()) {
            return false;
        } else {
            return true;
        }
    }

    public static String getUserName(String htmlStr) {
        Document document = Jsoup.parse(htmlStr);
        Elements es = document.select("#xhxm");
        if (es.isEmpty()) {
            return null;
        } else {
            return es.get(0).text().split("同学")[0];
        }
    }


    public static String getExamUrl(String htmlStr) {
        Document document = Jsoup.parse(htmlStr);
        Elements es = document.select("#headDiv > ul > li:nth-child(4) > ul > li:nth-child(4) > a");
        if (es.isEmpty()) {
            es = document.select("#headDiv > ul > li:nth-child(5) > ul > li:nth-child(4) > a");
            if (es.isEmpty()) {
                return "";
            } else {
                return es.get(0).attr("href");
            }
        } else {
            return es.get(0).attr("href");
        }
    }

    private static int getMessageLocation(String htmlStr) {
        int l = 0;

        Document document = Jsoup.parse(htmlStr);
        Elements nav = document.select("#headDiv > ul");
        if (!nav.isEmpty()) {
            for (l = 1; l < nav.get(0).children().size() + 1; l++) {
                Elements es = document.select("#headDiv > ul > li:nth-child(" + l + ") > a > span");
                if (!es.isEmpty()) {
                    if (es.get(0).text().contains("信息查询")) {
                        break;
                    }
                }
            }
        }

        return l;
    }


    public static void setUrl(String htmlStr) {
        Document document = Jsoup.parse(htmlStr);
        int msgL = getMessageLocation(htmlStr);
        Elements msgss = document.select("#headDiv > ul > li:nth-child(" + msgL + ") > ul");
        if (!msgss.isEmpty()) {
            Element msgs = msgss.get(0);
            for (int i = 0; i < msgs.children().size(); i++) {
                Elements es = document.select("#headDiv > ul > li:nth-child(" + msgL + ") > ul > li:nth-child(" + (i + 1) + ") > a");
                if (!es.isEmpty()) {
                    Element e = es.get(0);
                    if (e.text().contains("学生个人课表")) {
                        UserInfo.ScheduleUrl = "https://jw.gzu.edu.cn/" + e.attr("href");
                    } else if (e.text().contains("学生考试查询")) {
                        UserInfo.ExamUrl = "https://jw.gzu.edu.cn/" + e.attr("href");
                    } else if (e.text().contains("成绩查询")) {
                        UserInfo.ScorePageUrl = "https://jw.gzu.edu.cn/" + e.attr("href");
                    }
                }
            }
        }
    }

    public static String getScoreUrl(String htmlStr) {
        Document document = Jsoup.parse(htmlStr);
        Elements es = document.select("#headDiv > ul > li:nth-child(" + getMessageLocation(htmlStr) + ") > ul > li:nth-child(4) > a");
        if (es.isEmpty()) {
            return "";
        } else {
            return es.get(0).attr("href");
        }
    }

    public static String getScheduleUrl(String htmlStr) {
        Document document = Jsoup.parse(htmlStr);
        Elements es = document.select("#headDiv > ul > li:nth-child(4) > ul > li:nth-child(2) > a");
        if (es.isEmpty()) {
            return "";
        } else {
            return es.get(0).attr("href");
        }
    }


    public static String getScoreAction(String htmlStr) {
        Document document = Jsoup.parse(htmlStr);
        Elements es = document.select("#Form1");
        if (es.isEmpty()) {
            return "";
        } else {
            return es.get(0).attr("action");
        }
    }

    public static String getViewSate2(String htmlStr) {
        Document document = Jsoup.parse(htmlStr);
        Elements es = document.select("#Form1 > input[type=hidden]");
        if (es.isEmpty()) {
            return "";
        } else {
            return es.get(0).attr("value");
        }
    }

    public static String getScoreRawData(String htmlStr) {
        Document document = Jsoup.parse(htmlStr);
        Elements es = document.select("#Form1 > input[type=hidden]");
        if (es.isEmpty()) {
            return "";
        } else {
            return es.get(0).attr("value");
        }
    }

    public static ArrayList<String> getScoreList(String htmlStr) {
        ArrayList scoreList = new ArrayList<String>();
        int i = 2;
        Document document = Jsoup.parse(htmlStr);
        while (true) {
            Elements es = document.select("#Datagrid1 > tbody > tr:nth-child(" + i + ") > td:nth-child(3)");
            if (es.isEmpty()) {
                break;
            } else {
                scoreList.add(es.get(0).text());
            }
            i++;
        }

        return scoreList;
    }

    private static ArrayList ansLine(Element m) {
        ArrayList values = new ArrayList<>();
        for (int index = m.children().size() - 7; index < m.children().size(); index++) {
            boolean preBr = false;
            Element element = m.child(index);
            ArrayList v = new ArrayList<>();
            ArrayList b = new ArrayList<String>();
            for (Node e : element.childNodes()) {
                if (e.nodeName().equals("#text")) {
                    preBr = false;
                    b.add(e.toString());
                }

                if (e.nodeName().equals("br")) {
                    if (preBr) {
                        v.add(b);
                        b = new ArrayList<>();
                    }
                    preBr = true;
                }
            }

            v.add(b);
            values.add(v);
        }

        return values;
    }

    public static ArrayList ansSchedule(String htmlStr) {
        ArrayList result = new ArrayList<>();
        Document document = Jsoup.parse(htmlStr);
        try {
            Element m1 = document.select("#Table1 > tbody > tr:nth-child(3)").get(0);
            Element m2 = document.select("#Table1 > tbody > tr:nth-child(5)").get(0);
            Element m3 = document.select("#Table1 > tbody > tr:nth-child(7)").get(0);
            Element m4 = document.select("#Table1 > tbody > tr:nth-child(9)").get(0);
            Element m5 = document.select("#Table1 > tbody > tr:nth-child(11)").get(0);
            result.add(ansLine(m1));
            result.add(ansLine(m2));
            result.add(ansLine(m3));
            result.add(ansLine(m4));
            result.add(ansLine(m5));
        } catch (Exception e) {

        }

        return result;
    }

}
