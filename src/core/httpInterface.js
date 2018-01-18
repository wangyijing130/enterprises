const root = 'http://www.tianjian8.com:8002/webservice/AppService.asmx/';

export const uploadRoot = 'http://www.tianjian8.com:8002';
export const appService = {
    Login: root + 'Login',
    Register: root + 'Register',
    IsExist: root + 'IsExist',
    VerifyCode: root + 'VerifyCode',
    GetCustomerInfo: root + 'GetCustomerInfo',
    UpdateCustomerInfo: root + 'UpdateCustomerInfo',
    UpdatePassword: root + 'UpdatePassword',
    ResetPassword: root + 'ResetPassword',
    UploadImgBase64: root + 'UploadImgBase64',
    AddSuggestion: root + 'AddSuggestion',
    GetCompanyInfo: root + 'GetCompanyInfo',
    SendSmsCode: root + 'SendSmsCode',
    GetCustomerListByPage: root + 'GetCustomerListByPage',
};

export const httpClient = {
    post: (url, dataString, headers) => {
        let defaultHeaders = {
            'Content-Type': 'application/x-www-form-urlencoded',
        };
        return new Promise(function (resolve, reject) {
            fetch(url, {
                method: 'POST',
                headers: {
                    ...defaultHeaders,
                    headers
                },
                body: dataString
            }).then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    reject({status: response.status})
                }
            }).then(response => {
                resolve(response);
            }).catch(err => {
                reject({status: -1});
            })
        });
    }
};