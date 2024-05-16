export function getToday() { // 获取当前今天日期
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    };
    return year + '-' + month + '-' + strDate;
}

export function exToLv(ex) { // 经验转换成等级,和当前等级溢出经验
    var lv = 1;
    var val = 0;
    return exToLvTools(lv, val, ex);
}

function exToLvTools(lv, val, ex) { // 经验转换成等级,和当前等级溢出经验
    var tVal = val;
    val = val + lv * 10;
    var map = {
        grade: 1,
        exEx: 0,
        currentLvMaxEx: 0
    }
    if (val > ex) {
        map.grade = lv;
        map.exEx = ex - tVal;
        map.currentLvMaxEx = lv * 10;
        return map;
    } else {
        map = exToLvTools(lv + 1, val, ex);
    }
    return map;
}

// 格式判断
export function userIDCheck(i) {
    var patt = /^[1-9]\d*$/;
    if (patt.test(i)) { // 正整数
        return true;
    }
    return false;
}

// 格式判断
export function amountFormatCheck(i) {
    if (i === 0) { // 是否为 0
        return true;
    }
    var patt = /^[1-9]\d*$/;
    if (patt.test(i)) { // 正整数
        return true;
    }
    var patt = /^0\.\d*[1-9]$/;
    if (patt.test(i)) { // 小于0且带小数
        return true;
    }
    var patt = /^[1-9]\d*\.\d*[1-9]$/;
    if (patt.test(i)) { // 大于0且带小数
        return true;
    }
    return false;
}


import JSEncrypt from "jsencrypt"

// // 加密
// export function encrypt(data, publicKey) {
//     console.log("jsencrypt 加密");
//     var encryptor = new JSEncrypt();
//     encryptor.setPublicKey(publicKey);
//     return encryptor.encrypt(data);
// }

// 解密
// export function decrypt(data,privateKey) {
//     var encryptor = new JSEncrypt();
//     encryptor.setPrivateKey(privateKey);
//     return encryptor.decrypt(data);
// }

import Encryptlong from "encryptlong"

// 加密
export function encrypt(data, publicKey) {
    var encryptlong = new Encryptlong();
    encryptlong.setPublicKey(publicKey);
    return encryptlong.encryptLong(data);
}

// 解密
export function decrypt(data, privateKey) {
    var encryptlong = new Encryptlong();
    encryptlong.setPrivateKey(privateKey);
    return encryptlong.decryptLong(data);
}

import CryptoJS from "crypto-js";
// 十六位十六进制数作为密钥
const SECRET_KEY = CryptoJS.enc.Utf8.parse("475765701abc"); // 必须12位
// 十六位十六进制数作为密钥偏移量
const SECRET_IV = CryptoJS.enc.Utf8.parse("475765701abc"); // 必须12位

/**
 * 加密方法
 * @param data
 * @returns {string}
 */
export function encryptWeb(data) {
    if (typeof data === "object") {
        try {
            // eslint-disable-next-line no-param-reassign
            data = JSON.stringify(data);
        } catch (error) {
            console.log("encrypt error:", error);
        }
    }
    const dataHex = CryptoJS.enc.Utf8.parse(data);
    const encrypted = CryptoJS.AES.encrypt(dataHex, SECRET_KEY, {
        iv: SECRET_IV,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.ciphertext.toString();
}

/**
 * 解密方法
 * @param data
 * @returns {string}
 */
export function decryptWeb(data) {
    const encryptedHexStr = CryptoJS.enc.Hex.parse(data);
    const str = CryptoJS.enc.Base64.stringify(encryptedHexStr);
    const decrypt = CryptoJS.AES.decrypt(str, SECRET_KEY, {
        iv: SECRET_IV,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
    return decryptedStr.toString();
}

// AES 加密解密

import request from '../utils/request'

export function getPublicKey() {
    return request({
        method: 'get',
        url: '/common/getPublicKey',
    })
}

export function getWeather() {
    return request({
        method: 'get',
        url: '/common/getWeather',
    })
}

//获得浏览器名称
// 获取浏览器类型
export function getBrowserType() {
    // 获取浏览器 userAgent
    var ua = navigator.userAgent

    // 是否为 Opera
    var isOpera = ua.indexOf('Opera') > -1
    // 返回结果
    if (isOpera) { return 'Opera' }

    // 是否为 IE
    var isIE = (ua.indexOf('compatible') > -1) && (ua.indexOf('MSIE') > -1) && !isOpera
    var isIE11 = (ua.indexOf('Trident') > -1) && (ua.indexOf("rv:11.0") > -1)
    // 返回结果
    if (isIE11) { return 'IE11'
    } else if (isIE) {
        // 检测是否匹配
        var re = new RegExp('MSIE (\\d+\\.\\d+);')
        re.test(ua)
        // 获取版本
        var ver = parseFloat(RegExp["$1"])
        // 返回结果
        if (ver == 7) { return 'IE7'
        } else if (ver == 8) { return 'IE8'
        } else if (ver == 9) { return 'IE9'
        } else if (ver == 10) { return 'IE10'
        } else { return "IE" }
    }

    // 是否为 Edge
    var isEdge = ua.indexOf("Edge") > -1
    // 返回结果
    if (isEdge) { return 'Edge' }

    // 是否为 Firefox
    var isFirefox = ua.indexOf("Firefox") > -1
    // 返回结果
    if (isFirefox) { return 'Firefox' }

    // 是否为 Safari
    var isSafari = (ua.indexOf("Safari") > -1) && (ua.indexOf("Chrome") == -1)
    // 返回结果
    if (isSafari) { return "Safari" }

    // 是否为 Chrome
    var isChrome = (ua.indexOf("Chrome") > -1) && (ua.indexOf("Safari") > -1) && (ua.indexOf("Edge") == -1)
    // 返回结果
    if (isChrome) { return 'Chrome' }

    // 是否为 UC
    var isUC= ua.indexOf("UBrowser") > -1
    // 返回结果
    if (isUC) { return 'UC' }

    // 是否为 QQ
    var isQQ= ua.indexOf("QQBrowser") > -1
    // 返回结果
    if (isUC) { return 'QQ' }

    // 都不是
    return ''
}