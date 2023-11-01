package com.gzhelper.checkcode;

/**
 * Copyright 2016 By_syk
 * <p>
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * <p>
 * http://www.apache.org/licenses/LICENSE-2.0
 * <p>
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


import android.content.Context;
import android.content.res.AssetManager;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Color;


import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;


/**
 * 第2类图形验证码识别
 * <br />针对截至 2016-11-22 为止成都医学院、四川理工学院教务管理系统登录用的验证码
 * <br />图形尺寸为 72*27
 *
 * @author By_syk
 */
public class GraphicC2Translator {
    private static GraphicC2Translator translator = null;

    private Bitmap trainImg = null;

    /**
     * 元字符宽度
     */
    private static final int UNIT_W = 13;

    /**
     * 元字符高度
     */
    private static final int UNIT_H = 22;

    /**
     * 训练元字符数
     */
    private static final int TRAIN_NUM = 32;

    /**
     * 所有元字符
     */
    private static final char[] TRAIN_CHARS = {'0', '1', '2', '3', '4', '5', '6', '7', '8',/* '9',*/
            'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n',
            /*'o', */'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y'/*, 'z'*/};

    /**
     * 有效像素颜色值
     */
    private static final int TARGET_COLOR = Color.BLACK;

    /**
     * 无效像素颜色值
     */
    private static final int USELESS_COLOR = Color.WHITE;

    private GraphicC2Translator() {
    }

    public static GraphicC2Translator getInstance() {
        if (translator == null) {
            translator = new GraphicC2Translator();
        }

        return translator;
    }

    /**
     * 去噪
     *
     * @param picFile 图形验证码文件
     * @return img
     * @throws Exception
     */
    private Bitmap denoise(File picFile) throws Exception {
        FileInputStream fis = new FileInputStream(picFile);
        Bitmap img = BitmapFactory.decodeStream(fis).copy(Bitmap.Config.ARGB_8888, true);
        int width = img.getWidth();
        int height = img.getHeight();
        final int TARGET = 0xff000099;
        for (int x = 0; x < width; ++x) {
            for (int y = 0; y < height; ++y) {
                if (img.getPixel(x, y) == TARGET) {
                    img.setPixel(x, y, TARGET_COLOR);
                } else {
                    img.setPixel(x, y, USELESS_COLOR);
                }
            }
        }
        return img;
    }

    /**
     * 分割元字符
     *
     * @param img
     * @return
     * @throws Exception
     */
    private List<Bitmap> split(Bitmap img) throws Exception {
        List<Bitmap> subImgs = new ArrayList<Bitmap>();
        subImgs.add(Bitmap.createBitmap(img, 4, 0, UNIT_W, UNIT_H));
        subImgs.add(Bitmap.createBitmap(img, 16, 0, UNIT_W, UNIT_H));
        subImgs.add(Bitmap.createBitmap(img, 28, 0, UNIT_W, UNIT_H));
        subImgs.add(Bitmap.createBitmap(img, 40, 0, UNIT_W, UNIT_H));
        return subImgs;
    }

    public static Bitmap getImageFromAssetsFile(Context context, String fileName) {
        Bitmap bitmap = null;
        AssetManager assetManager = context.getAssets();
        try {
            InputStream is = assetManager.open(fileName);
            bitmap = BitmapFactory.decodeStream(is);
            is.close();
        } catch (IOException e) {
            e.printStackTrace();
        }

        return bitmap;
    }


    /**
     * 取出训练数据
     *
     * @return
     * @throws Exception
     */
    private Bitmap loadTrainData(Context context) throws Exception {
        if (trainImg == null) {

            trainImg = getImageFromAssetsFile(context, "train.png");
        }

        return trainImg;
    }

    /**
     * 将训练元字符装在一起
     *
     * @param trainImg
     * @param smallImg
     * @param ch
     * @return
     */
    private boolean addTrainImg(Bitmap trainImg, Bitmap smallImg, char ch) {
        int which = Arrays.binarySearch(TRAIN_CHARS, ch);
        int x = -1;
        int y = -1;
        for (int i = 0; i < TRAIN_NUM; ++i) {
            if (trainImg.getPixel(i * UNIT_W, which * (UNIT_H + 1) + UNIT_H) != TARGET_COLOR) {
                x = i * UNIT_W;
                y = which * (UNIT_H + 1);
                break;
            }
        }

        if (x == -1 || y == -1) {
            return false;
        }

        for (int i = 0; i < UNIT_W; ++i) {
            for (int j = 0; j < UNIT_H; ++j) {
                trainImg.setPixel(x + i, y + j, smallImg.getPixel(i, j));
            }
        }
        trainImg.setPixel(x, y + UNIT_H, TARGET_COLOR);
        return true;
    }

//    /**
//     * 训练
//     *
//     * @param rawDir
//     * @param targetTrainFile
//     * @return
//     */
//    public boolean train(File rawDir, File targetTrainFile) {
//        try {
//            BufferedImage trainImg = new BufferedImage(UNIT_W * TRAIN_NUM, (UNIT_H + 1) * TRAIN_CHARS.length, BufferedImage.TYPE_INT_ARGB);
//            for (File file : rawDir.listFiles()) {
//                BufferedImage img = denoise(file);
//                List<BufferedImage> listImg = split(img);
//                String[] parts = file.getName().split("\\.");
//                char[] chars = parts[0].toCharArray();
//                char[] addFlags;
//                if (parts.length > 2) {
//                    addFlags = parts[1].toCharArray();
//                } else {
//                    addFlags = new char[]{'1', '1', '1', '1'};
//                }
//                for (int i = 0, len = listImg.size(); i < len; ++i) {
//                    if (addFlags[i] == '1') {
//                        addTrainImg(trainImg, listImg.get(i), chars[i]);
//                    }
//                }
//            }
//            return ImageIO.write(trainImg, "PNG", targetTrainFile);
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//
//        return false;
//    }

    /**
     * 单元识别
     *
     * @param img
     * @param trainImg
     * @return
     */
    private char recognize(Bitmap img, Bitmap trainImg) {
        char result = ' ';
        int width = img.getWidth();
        int height = img.getHeight();
        int min = width * height; // 最小差异像素数
        for (int i = 0; i < TRAIN_NUM; ++i) {
            for (int j = 0; j < TRAIN_CHARS.length; ++j) {
                int startX = UNIT_W * i;
                int startY = (UNIT_H + 1) * j;
                if (trainImg.getPixel(startX, startY + UNIT_H) != TARGET_COLOR) {
                    continue;
                }
                int count = 0; // 差异像素数
                for (int x = 0; x < UNIT_W; ++x) {
                    for (int y = 0; y < UNIT_H; ++y) {
                        count += (img.getPixel(x, y) != trainImg.getPixel(startX + x, startY + y) ? 1 : 0);
                        if (count >= min) {
                            break;
                        }
                    }
                }
                if (count < min) {
                    min = count;
                    result = TRAIN_CHARS[j];
                }
            }
        }

        return result;
    }

    /**
     * 识别
     *
     * @param picFile 图形验证码文件
     * @return
     */
    public String translate(File picFile, Context context) {
        String result = "";
        try {
            Bitmap img = denoise(picFile);
            List<Bitmap> listImg = split(img);
            Bitmap trainImg = loadTrainData(context);
            for (Bitmap bi : listImg) {
                result += recognize(bi, trainImg);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }
}