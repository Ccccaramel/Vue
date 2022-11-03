export function getToday(){ // 获取当前今天日期
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
    return year+'-'+month+'-'+strDate;
}

// import JSEncrypt from "jsencrypt"

// // 加密
// export function encrypt(data,publicKey) {
//     var encryptor = new JSEncrypt();
//     encryptor.setPublicKey(publicKey);
//     return encryptor.encrypt(data);
// }

// // 解密
// export function decrypt(data) {
//     var encryptor = new JSEncrypt();
//     encryptor.setPrivateKey(privateKey);
//     return encryptor.decrypt(data);
// }

import Encryptlong from "encryptlong"

// 加密
export function encrypt(data,publicKey) {
    var encryptlong = new Encryptlong();
    encryptlong.setPublicKey(publicKey);
    return encryptlong.encryptLong(data);
}

// 解密
export function decrypt(data) {
    var encryptlong = new Encryptlong();
    encryptlong.setPrivateKey(privateKey);
    return encryptlong.decryptLong(data);
}

import request from '../utils/request'

export function getPublicKey(){
    return request({
        method: 'get',
        url:'/common/getPublicKey',
    })
}