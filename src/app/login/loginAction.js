'use strict';

import * as types from '../constants/loginTypes';
import {appService, httpClient} from '../../core/httpInterface';

// 模拟用户信息
let user = {
    Id: 0,
    NickName: '',
    CustomerName: '羿璟',
    IDCard: '',
    Address: '',
    Photo: '',
    Sex: '',
    RegCity: '',
    RegDistrict: '',
    pwd: '123456',
    Tel: '13510005217',
    CompanyId: 0,
    CompanyName: '',
    InvitationCode: '',
    AddDate: ''
};

// 访问登录接口 根据返回结果来划分action属于哪个type,然后返回对象,给reducer处理
export function login(mobile, password) {
    console.log('登录方法');
    return dispatch => {
        dispatch(isLogining());

        let dataString = 'tel=' + mobile + '&pwd=' + password + '&code=&type=1';
        httpClient.post(appService.Login, dataString).then(res => {
            if (res && res.IsSuc) {
                let u = res.Data;
                if (typeof res.Data == 'string') {
                    u = JSON.parse(res.Data);
                }
                let user = {
                    Id: u.Id,
                    Tel: u.Tel,
                    CustomerName: u.CustomerName,
                    NickName: u.NickName,
                    Sex: u.Sex,
                    Photo: u.Photo,
                    RegCity: u.RegCity,
                    RegDistrict: u.RegDistrict,
                    IDCard: u.IDCard,
                    Address: u.Address,
                    CompanyId: u.CompanyId,
                    CompanyName: u.CompanyName,
                    InvitationCode: u.InvitationCode,
                };
                dispatch(loginSuccess(true, user));
            } else {
                dispatch(loginError(false, res.ErrMsg));
            }
        }).catch((e) => {
            dispatch(loginError(false, e.message));
        });
    }
}
export function reLogin(user) {
    return dispatch => {
        dispatch(loginSuccess(true, user));
    }
}

function isLogining() {
    return {
        type: types.LOGIN_IN_DOING
    }
}

function loginSuccess(isSuccess, user) {
    if (global.storage) {
        global.storage.save({
            key: 'user',
            data: user
        }).then(() => {
            return {
                type: types.LOGIN_IN_DONE,
                user: user,
            }
        });
    }
    return {
        type: types.LOGIN_IN_DONE,
        user: user,
    }
}

function loginError(isSuccess, msg) {
    return {
        type: types.LOGIN_IN_ERROR,
        error: msg
    }
}