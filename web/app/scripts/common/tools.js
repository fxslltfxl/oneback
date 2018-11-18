app.factory("tools", ["$rootScope", "$location", "$timeout", "versionTools", "$q", tools]);
// 常用工具
function tools($rootScope, $location, $timeout, versionTools, $q) {
    // 错误信息提示
    function showErrorAlert(errors) {
        if (typeof errors == "string") {
            toastr.error(errors);
            return;
        }
        var moreError = "";
        var errorIndex = 0;
        angular.forEach(errors.Errors, function (e) {
            errorIndex++;
            if (errorIndex > 1 && !!e) {
                moreError += "<br/>";
            }
            moreError += e;
        });
        toastr.error(moreError);
    }
    function getFileNameFromResponse(response) {
        var filename = "";
        var disposition = response.headers('Content-Disposition');
        if (disposition) {
            var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
            var matches = filenameRegex.exec(disposition);
            if (matches != null && matches[1]) {
                filename = matches[1].replace(/['"]/g, '');
            }
        }
        return filename;
    }

    // 是否为undefined
    function isEmpty(value) {
        return typeof value === "undefined";
    }

    return {
        showSuccessAlert: function (msg) {
            var message = isEmpty(msg) ? "保存成功！" : msg;
            toastr.success(message);
        },
        showInfo: function (info) {
            if (!info) return;
            toastr.info(info);
        },
        error: function (error) {
            if (error === "escape key press" || error == undefined) return;

            if (typeof error === "string") {
                showErrorAlert(error);
            } else {
                if (error.Code === 401 || (error.Code === 500 && error.Errors[0] === "Token无效或者已过期！")) {
                    $location.path("/login");
                    return;
                } else if (error.Code === 403) {
                    $location.path("/403");
                    return;
                } else if (error.code === 404) {
                    $location.path("/404");
                } else if (error.Code === -1) {
                    showErrorAlert("网络连接中断或服务器连接异常");
                    return;
                }else {
                    showErrorAlert(error);
                    return;
                }
            }
        },
        supportWeixinPay: function () {
            var wechatInfo = navigator.userAgent.match(/MicroMessenger\/([\d\.]+)/i);
            if (!wechatInfo) {
                toastr.error("请在微信中打开本界面");
                return false;
            } else if (wechatInfo[1] < "5.0") {
                toastr.error("请在微信5.0以上版本打开本界面");
                return false;
            } else {
                return true;
            }
        },
        isWeiXin: function () {
            var ua = navigator.userAgent.toLowerCase();
            var isWeixin = ua.indexOf('micromessenger') !== -1;
            if (isWeixin) {
                return true;
            } else {
                return false;
            }
        },
        hasNetWork: function () {
            // 判断网络连接
            var eventUtil = {
                addHandler: function (element, type, handler) {
                    if (element.addEventListener) {
                        element.addEventListener(type, handler, false);
                    } else if (element.attachEvent) {
                        element.attachEvent("on" + type, handler);
                    } else {
                        element["on" + type] = handler;
                    }
                }
            };
            // 网络正常
            eventUtil.addHandler(window, "online", function () {
            });
            // 断网
            eventUtil.addHandler(window, "offline", function () {
                toastr.error("无网络连接、请检查您的网络连接");
            });
        },
        formatTime: function (parameter) {
            parameter = String(parameter);
            var returnValue = "";
            if (parameter.split(".").length > 1) {
                var tempParameter = Number("0." + parameter.split(".")[1]) * 60;
                if (tempParameter <= 9) {
                    returnValue = parameter.split(".")[0] + ":0" + (tempParameter + "").split(".")[0];
                } else {
                    returnValue = parameter.split(".")[0] + ":" + (tempParameter + "").split(".")[0];
                }
            } else {
                returnValue = parameter + ":00";
            }
            return returnValue;
        },
        isIE9: function () {
            return navigator.appName === "Microsoft Internet Explorer" &&
                navigator.appVersion.match(/9./i) === "9.";
        },
        isGuidEmpty: function (guid) {
            return guid.replace(new RegExp("-", "g"), "") === "00000000000000000000000000000000";
        },
        checkEmail: function (email) {
            var checkEmail = /^[\w\-\.]+@[\w\-\.]+(\.\w+)+$/;
            return checkEmail.test(email);
        },
        convertDateStringToUtcDate: function (str) {
            if (str === "") {
                return null;
            }
            if (str.indexOf("Z") < 0) {
                str = str + "Z";
            }
            var date = new Date(str);
            return date.toUTCString();
        },
        convertUtcDateToLocalDate: function (str) {
            if (str === "") {
                return null;
            }
            if (str.indexOf("Z") < 0) {
                str = str + "Z";
            }
            var date = new Date(str);
            return date;
        },
        convertUtcDateToLocal: function (str) {
            if (str === "") {
                return null;
            }
            if (str.indexOf("Z") < 0) {
                str = str + "Z";
            }
            var date = new Date(str);

            return date.Format("yyyy-MM-dd hh:mm:ss");
        },
        floor: function (digit, length) {
            length = length ? parseInt(length) : 0;
            if (length <= 0) return Math.floor(digit);
            digit = Math.floor(digit * Math.pow(10, length)) / Math.pow(10, length);
            return digit;
        },
        ceil: function (digit, length) {
            length = length ? parseInt(length) : 0;
            if (length <= 0) return Math.ceil(digit);
            digit = Math.ceil(digit * Math.pow(10, length)) / Math.pow(10, length);
            return digit;
        },
        cookieName: function () {
            return "VENDING_MACHINE_WEB_GLOBAL";
        },
        userInfo: function () {
            return "VENDING_MACHINE_WEB_USER";
        },
        getArgs: function (strParame) {
            var args = new Object();
            // 获取查询串   
            var query = location.search.substring(1);
            // 在&号处断开
            var pairs = query.split("&");
            for (var i = 0; i < pairs.length; i++) {
                // 查找"name=value "  
                var pos = pairs[i].indexOf("=");
                // 如果没有找到就跳过
                if (pos === -1) continue;
                // 提取name
                var argname = pairs[i].substring(0, pos);
                // 提取value
                var value = pairs[i].substring(pos + 1);
                // 如果需要的话，进行解码
                value = decodeURIComponent(value);
                // 存储为属性
                args[argname] = value;
            }
            // 返回对象
            return args[strParame];
        }
    };
}