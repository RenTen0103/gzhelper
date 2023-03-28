import android.graphics.Bitmap;
import android.graphics.BitmapFactory;

import androidx.annotation.NonNull;

import com.gzhelper.net.Http;
import com.gzhelper.util.CallBack;
import com.gzhelper.util.HtmlParse;
import com.gzhelper.util.ImgUtils;

import org.junit.Test;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.concurrent.CountDownLatch;

import okhttp3.Response;

public class OKHTTPTest {

    @Test
    public void GetTest() throws InterruptedException {
        final CountDownLatch latch = new CountDownLatch(1);
        Http.getInstance().getLoginPage(new CallBack() {
            @Override
            public void execute(Response response) {

                System.out.println(response.request().url());
                
                latch.countDown();

            }
        });
        latch.await();
    }
}
