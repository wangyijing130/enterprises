import React, {Component} from 'react';
import {View, StyleSheet, TextInput} from 'react-native';
import {THEME_TEXT} from '../../assets/css/color';
import CButton from '../common/button';
import {layoutStyles} from '../../assets/css/layout';
import {loginStyles as styles} from './loginStyle';
import {validUtils} from '../../core/validate';
import {appService, httpClient} from '../../core/httpInterface';
import {toastShort} from '../../core/toastUtil';


export class FindAccountPage extends Component {
    static navigationOptions = {
        title: '找回密码'
    };
    mobile = '';
    code = '';
    password = '';
    password2 = '';
    validCode = '';
    timer;

    constructor(props) {
        super(props);
        this.state = {message: '', sendFlag: false, second: 30};
    }

    componentWillUnmount() {
        this.timer && clearInterval(this.timer);
    }

    getCode() {
        if (!this.mobile) {
            toastShort('请输入手机号码');
            return;
        }
        if (!validUtils.isMobile(this.mobile)) {
            toastShort('请输入正确的手机号码');
            return;
        }
        if (this.state.sendFlag) {
            toastShort('操作过于频繁');
            return;
        }
        // 倒计时30s
        this.setState({'sendFlag': true});
        let dataString = 'tel=' + this.mobile;
        httpClient.post(appService.SendSmsCode, dataString).then(res => {
            if (res && res.IsSuc) {
                if (res.Data) {
                    this.validCode = res.Data;
                }
            }
        });
        this.timer = setInterval(
            () => {
                if (this.state.second <= 0) {
                    this.setState({'second': 0});
                    this.setState({'sendFlag': false});
                    this.timer && clearInterval(this.timer);
                } else {
                    this.setState({'second': this.state.second - 1});
                }
            },
            1000
        );

    }


    doSubmit() {
        this.refs.textInputMobile.blur();
        this.refs.textInputCode.blur();
        this.refs.textInputPwd.blur();
        this.refs.textInputPwd2.blur();
        if (!this.mobile) {
            toastShort('请输入手机号码');
            return;
        }
        if (!validUtils.isMobile(this.mobile)) {
            toastShort('请输入正确的手机号码');
            return;
        }
        if (!this.code) {
            toastShort('请输入手机验证码');
            return;
        }
        if (!this.password) {
            toastShort('请输入登录密码');
            return;
        }
        if (!validUtils.isEnOrNum(this.password)) {
            toastShort('密码只能包含英文字母、数字');
            return;
        }
        if (!this.password2) {
            toastShort('请输入确认密码');
            return;
        }
        if (this.password !== this.password2) {
            toastShort('前后两次密码不一致');
            return;
        }
        let dataString = 'tel=' + this.mobile + '&newpwd=' + this.password;
        httpClient.post(appService.ResetPassword, dataString).then(res => {
            if (res && res.IsSuc) {
                toastShort('重置密码成功');
                setTimeout(() => {
                    this.props.navigation.goBack();
                }, 2000);
            } else {
                toastShort(res.ErrMsg);
            }
        });
    }

    render() {
        let codeBtnText = this.state && this.state.sendFlag && this.state.second ? '已发送' + this.state.second + 's' : '获取验证码';
        let codeBtnStyle = this.state && this.state.sendFlag ? findStyles.codeBtnDisabled : findStyles.codeBtn;
        return (

            <View style={styles.body}>
                <View style={[styles.container, findStyles.container]}>
                    <TextInput style={styles.textInput} placeholder='手机号码' keyboardType={'numeric'}
                               ref='textInputMobile' autoCapitalize={'none'} maxLength={11}
                               onChangeText={(text) => this.mobile = text}/>
                    <View style={[findStyles.codeRow]}>
                        <TextInput style={[styles.textInput, {flex: 1}]} placeholder='手机验证码' keyboardType={'numeric'}
                                   ref='textInputCode' autoCapitalize={'none'} maxLength={6}
                                   onChangeText={(text) => this.code = text}/>
                        <CButton disabled={this.state.sendFlag}
                                 style={codeBtnStyle} title={codeBtnText}
                                 onPress={() => this.getCode()}/>
                    </View>
                    <TextInput style={styles.textInput} placeholder='密码' secureTextEntry={true}
                               ref='textInputPwd' autoCapitalize={'none'} maxLength={20}
                               onChangeText={(text) => this.password = text}/>
                    <TextInput style={styles.textInput} placeholder='确认密码' secureTextEntry={true}
                               ref='textInputPwd2' autoCapitalize={'none'} maxLength={20}
                               onChangeText={(text) => this.password2 = text}/>
                    <CButton style={styles.submitButton} title={'完成'} onPress={() => this.doSubmit()}/>
                </View>
            </View>
        )
    }
}

const findStyles = StyleSheet.create({
    container: {
        marginTop: 32
    },
    codeRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    codeBtn: {
        flexBasis: 120,
        padding: 0,
        margin: 0,
    },
    codeBtnDisabled: {
        flexBasis: 120,
        padding: 0,
        margin: 0,
        backgroundColor: THEME_TEXT
    }
});
