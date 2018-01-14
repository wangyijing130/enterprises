export const validUtils = {
    isChinese: (obj) => {
        let ret = true;
        let reg = /^[\u0391-\uFFE5]+$/;
        if (obj !== '' && !reg.test(obj)) {
            ret = false;
        }
        return ret;
    },
    isEn: (obj) => {
        let ret = true;
        let reg = /^[a-zA-Z]*$/;
        if (obj !== '' && !reg.test(obj)) {
            ret = false;
        }
        return ret;
    },
    isNumber: (obj) => {
        let ret = true;
        let reg = /^[0-9]+$/;
        if (obj !== '' && !reg.test(obj)) {
            ret = false;
        }
        return ret;
    },
    isEnOrNum: (obj) => {
        let ret = true;
        let reg = /^[0-9a-zA-Z]*$/;
        if (obj !== '' && !reg.test(obj)) {
            ret = false;
        }
        return ret;
    },
    isEmail: (obj) => {
        let reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        return reg.test(obj);
    },
    isMobile: (obj) => {
        let ret = true;
        let reg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
        if (obj === '') {
            ret = false;
        } else if (obj.length !== 11) {
            ret = false;
        } else if (!reg.test(obj)) {
            ret = false;
        }
        return ret;
    }
};