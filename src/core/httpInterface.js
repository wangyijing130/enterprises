const root = 'http://www.tianjian8.com:8002/webservice/AppService.asmx/';

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
};