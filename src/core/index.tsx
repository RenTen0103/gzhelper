import WebView from 'react-native-webview';
import React, {useRef} from 'react';
import {EventQ} from '../utils/eventQ';
import {jsBridge} from '../utils/jsBridge';
import {View} from 'react-native';
import {setLoginState} from '../utils/states';

export type RootStackParamList = {
  Login: undefined;
  Cover: undefined;
  Score: undefined;
  Home: undefined;
};

export function Index() {
  const webviewRef = useRef<null | WebView>(null);

  const poseMessage = (message: any) => {
    webviewRef.current!.postMessage(JSON.stringify(message));
  };

  const getSchedule = async () => {
    return new Promise(resolve => {
      poseMessage({
        type: 'getSchedule',
      });
      EventQ.privide('getSchedule', resolve);
    });
  };

  const resite = async () => {
    return new Promise(resolve => {
      poseMessage({
        type: 'resite',
      });
      EventQ.privide('resite', resolve);
    });
  };

  const getCheckCode = async () => {
    return new Promise(resolve => {
      poseMessage({
        type: 'getCheckCode',
      });
      EventQ.privide('getCheckCode', resolve);
    });
  };

  const quryScore = async () => {
    return new Promise(resolve => {
      poseMessage({
        type: 'quryScore',
      });
      EventQ.privide('quryScore', resolve);
    });
  };

  const Login = async (account: any, passwd: any, checkCode: any) => {
    return new Promise<string>(resolve => {
      poseMessage({
        type: 'login',
        data: {
          account: account,
          passwd: passwd,
          checkCode: checkCode,
        },
      });
      EventQ.privide('login', resolve);
    });
  };

  const webviewLoaded = () => {
    setTimeout(() => {
      EventQ.reject('ready');
      EventQ.reject('resite');
    }, 200);
  };

  const err = () => {
    EventQ.reject('loaderr');
    EventQ.reject('resite');
  };

  const messageListener = (e: any) => {
    const {data} = e.nativeEvent;

    const raw = JSON.parse(data);
    EventQ.reject(raw.key, raw.data);
  };

  jsBridge.getCheckCode = getCheckCode;
  jsBridge.Login = Login;
  jsBridge.quryScore = quryScore;
  jsBridge.getSchedule = getSchedule;
  jsBridge.resite = resite;
  const s = `    function getBase64Image(img) {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, img.width, img.height);
        var dataURL = canvas.toDataURL("image/png");
        return dataURL

    }

    const pMessage = (message) => {
        window.ReactNativeWebView.postMessage(JSON.stringify(message))
    }



    const asyncGetElement = async (Selector) => {
        return new Promise((resolve, reject) => {
            let count = 0;
            let timer = setInterval(() => {
                count++;
                if (count > 20) {
                    clearInterval(timer)
                    reject("Time out!cannot find element!")
                }

                if (document.querySelector("#iframeautoheight").contentDocument.querySelector(Selector)) {
                    clearInterval(timer)
                    resolve(document.querySelector("#iframeautoheight").contentDocument.querySelector(Selector))
                }
                if (document.querySelector(Selector)) {
                    clearInterval(timer)
                    resolve(document.querySelector(Selector))
                }
            }, 300);
        })
    }


    const ansSchedule = (m) => {
        let values = []
        for (let index = m.children.length - 7; index < m.children.length; index++) {
            let preBr = false
            const element = m.children[index];
            let v = []
            let b = []
            element.childNodes.forEach(e => {
                if (e.nodeName == '#text') {
                    preBr = false
                    b.push(e.nodeValue)
                }

                if (e.nodeName == 'BR') {
                    if (preBr == true) {
                        console.log(b);
                        v.push(b.concat())
                        b.length = 0
                        b = []

                    }
                    preBr = true
                }


            },

            );

            v.push(b)
            values.push(v)
        }

        return values
    }

    const getSchedule = async () => {
        document.querySelector('#headDiv > ul > li:nth-child(5) > ul > li:nth-child(2) > a').click()
        let m1 = await asyncGetElement('#Table1 > tbody > tr:nth-child(3)')
        let m2 = await asyncGetElement('#Table1 > tbody > tr:nth-child(5)')
        let m3 = await asyncGetElement('#Table1 > tbody > tr:nth-child(7)')
        let m4 = await asyncGetElement('#Table1 > tbody > tr:nth-child(9)')
        let m5 = await asyncGetElement('#Table1 > tbody > tr:nth-child(11)')
        let values = []
        values.push(ansSchedule(m1))
        values.push(ansSchedule(m2))
        values.push(ansSchedule(m3))
        values.push(ansSchedule(m4))
        values.push(ansSchedule(m5))

        pMessage({
            key: "getSchedule",
            data: JSON.stringify(values),
        })

    }


    const resite = ()=>{
        window.location.href = "https://jw.gzu.edu.cn/default2.aspx"
    }

    const login = (acc, psd, cc) => {
        if (document.readyState != "complete") {

            document.onreadystatechange = () => {
                if (document.readyState == "complete") {
                    login(acc, psd, cc)
                }
            }
        } else {
            let w = setInterval(() => {
                pMessage({
                    key: 'message',
                    data: "wait!"
                })
                if (document.getElementById('TextBox2')) {
                    clearInterval(w)
                    document.getElementById("txtUserName").value = acc
                    document.getElementById("txtSecretCode").value = cc
                    document.getElementById('TextBox2').value = psd
                    document.getElementById("Button1").click()
                }
            }, 300);

        }



    }

    function stringToUint8Array(str) {
        var arr = [];
        for (var i = 0, j = str.length; i < j; ++i) {
            arr.push(str.charCodeAt(i));
        }

        var tmpUint8Array = new Uint8Array(arr);
        return tmpUint8Array
    }
    const quryscore = () => {
        document.querySelector("#headDiv > ul > li:nth-child(5) > ul > li:nth-child(4) > a").click()
        let w = setInterval(() => {

            if (document.querySelector("#iframeautoheight").contentDocument.querySelector("#Button1")) {

                clearInterval(w)
                document.querySelector("#iframeautoheight").contentDocument.querySelector("#Button1").click()
                let org = document.querySelector("#iframeautoheight").contentDocument.querySelector("#Form1 > input[type=hidden]").getAttribute("value")
                let q = setInterval(() => {

                    if (document.querySelector("#iframeautoheight").contentDocument.querySelector("#Form1 > input[type=hidden]").getAttribute("value") != org) {
                        let code = []
                        let i = 2;
                        while (true) {
                            let l = document.querySelector("#iframeautoheight").contentDocument.querySelector("#Datagrid1 > tbody > tr:nth-child(" + i + ") > td:nth-child(3)")
                            if (!l) {
                                break
                            } else {
                                code.push(l.innerText)
                            }
                            i++
                        }

                        clearInterval(q)
                        pMessage({
                            key: "quryScore",
                            data: {
                                org: new TextDecoder('utf-8').decode(stringToUint8Array(window.atob(document.querySelector("#iframeautoheight").contentDocument.querySelector("#Form1 > input[type=hidden]").getAttribute("value")))),
                                code: code
                            }
                        })
                    }
                }, 500)
            }
        }, 500)

    }

    window.alert = (e) => {
        pMessage({
            key: "login",
            data: e,
        })
    }



    document.addEventListener("message", (e) => {

        data = JSON.parse(e.data)
        pMessage(data.type)
        switch (data.type) {
            case "login":
                login(data.data.account, data.data.passwd, data.data.checkCode)
                break;
            case "getCheckCode":
                pMessage({
                    key: 'getCheckCode',
                    data: getBase64Image(document.getElementById('icode'))
                })

                break;
            case "quryScore":
                quryscore()
                break;
            case "getSchedule":
                getSchedule()
                break
            case "resite":
                resite()
                break
            default:
                break;
        }
    });

    window.onload = () => {
        if (window.location.href.startsWith('https://jw.gzu.edu.cn/xs_main.aspx')) {
            pMessage({
                key: "login",
                data: "sucess"
            })
        }

    }`;

  fetch('https://jw.gzu.edu.cn/default2.aspx')
    .then(response => {
      if (response.status === 200) {
        setLoginState(true);
      } else {
        setLoginState(false);
      }
    })
    .catch(_ => {
      setLoginState(false);
    });

  return (
    <>
      <View
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          display: 'none',
          width: '100%',
          height: '20%',
        }}>
        <WebView
          ref={webviewRef}
          injectedJavaScriptBeforeContentLoaded={s}
          source={{
            uri: 'https://jw.gzu.edu.cn/default2.aspx',
          }}
          onLoad={webviewLoaded}
          onError={err}
          onMessage={messageListener}
        />
      </View>
    </>
  );
}
