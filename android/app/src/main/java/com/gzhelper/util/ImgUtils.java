package com.gzhelper.util;

import android.os.Build;

import androidx.annotation.RequiresApi;

import java.io.*;
import java.util.Base64;

/**
 * @author Mayz
 * @description
 * @date 2021/7/22 13:42
 */
public class ImgUtils {


    public static String bytesToBase64(byte[] bytes) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            return Base64.getEncoder().encodeToString(bytes);// 返回Base64编码过的字节数组字符串
        } else return "";
    }

    /**
     * 将图片文件转化为字节数组字符串，并对其进行Base64编码处理
     *
     * @param path 图片路径
     * @return base64字符串
     */
    public static String imageToBase64(String path) throws IOException {// 将图片文件转化为字节数组字符串，并对其进行Base64编码处理
        byte[] data = null;
        // 读取图片字节数组
        InputStream in = null;
        try {
            in = new FileInputStream(path);
            data = new byte[in.available()];
            in.read(data);
        } finally {
            if (in != null) {
                try {
                    in.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            return Base64.getEncoder().encodeToString(data);// 返回Base64编码过的字节数组字符串
        } else return "";
    }

    /**
     * 处理Base64解码并写图片到指定位置
     *
     * @param base64 图片Base64数据
     * @param path   图片保存路径
     * @return
     */
    @RequiresApi(api = Build.VERSION_CODES.O)
    public static boolean base64ToImageFile(String base64, String path) throws IOException {// 对字节数组字符串进行Base64解码并生成图片
        // 生成jpeg图片
        File file = new File(path);
        try {
            if (file.exists()) {
                file.delete();
                file.createNewFile();
            } else {
                file.createNewFile();
            }
            OutputStream out = new FileOutputStream(path);
            return base64ToImageOutput(base64, out);
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }
        return false;
    }

    /**
     * 处理Base64解码并输出流
     *
     * @param base64
     * @param out
     * @return
     */
    @RequiresApi(api = Build.VERSION_CODES.O)
    public static boolean base64ToImageOutput(String base64, OutputStream out) throws IOException {
        if (base64 == null) { // 图像数据为空
            return false;
        }
        try {
            // Base64解码
            byte[] bytes = Base64.getDecoder().decode(base64);
            for (int i = 0; i < bytes.length; ++i) {
                if (bytes[i] < 0) {// 调整异常数据
                    bytes[i] += 256;
                }
            }
            // 生成jpeg图片
            out.write(bytes);
            out.flush();
            return true;
        } finally {
            try {
                out.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}
