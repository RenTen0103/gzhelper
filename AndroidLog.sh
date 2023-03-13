packageName="com.gzhelper"
echo ${packageName}
pid=`adb shell ps | grep $packageName | awk '{print $2}'`
echo $pid
adb logcat | grep $pid