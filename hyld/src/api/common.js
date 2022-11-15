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


// import JSEncrypt from "jsencrypt"

// // 加密
// export function encrypt(data,publicKey) {
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
// export function decrypt(data,privateKey) {
//     var encryptlong = new Encryptlong();
//     encryptlong.setPrivateKey(privateKey);
//     return encryptlong.decryptLong(data);
// }

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

import request from '../utils/request'

export function getPublicKey() {
    return request({
        method: 'get',
        url: '/common/getPublicKey',
    })
}