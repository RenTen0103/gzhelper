package com.gzhelper.util;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
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

    public static String getScoreUrl(String htmlStr) {
        Document document = Jsoup.parse(htmlStr);
        Elements es = document.select("#headDiv > ul > li:nth-child(4) > ul > li:nth-child(4) > a");
        if (es.isEmpty()) {
            return null;
        } else {
            return es.get(0).attr("href");
        }
    }


    public static String getScoreAction(String htmlStr) {
        Document document = Jsoup.parse(htmlStr);
        Elements es = document.select("#Form1");
        if (es.isEmpty()) {
            return null;
        } else {
            return es.get(0).attr("action");
        }
    }

    public static String getViewSate2(String htmlStr) {
        Document document = Jsoup.parse(htmlStr);
        Elements es = document.select("#Form1 > input[type=hidden]");
        if (es.isEmpty()) {
            return null;
        } else {
            return es.get(0).attr("value");
        }
    }

    public static String getScoreRawData(String htmlStr) {
        Document document = Jsoup.parse(htmlStr);
        Elements es = document.select("#Form1 > input[type=hidden]");
        if (es.isEmpty()) {
            return null;
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
}
