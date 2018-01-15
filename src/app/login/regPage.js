import React, {Component} from 'react';
import {View, StyleSheet, TextInput} from 'react-native';
import CButton from '../common/button';
import Toast from 'react-native-easy-toast';
import {layoutStyles} from '../../assets/css/layout';
import {loginStyles as styles} from './loginStyle';
import {appService, httpClient} from '../../core/httpInterface';
import {validUtils} from '../../core/validate';
import {THEME_TEXT} from '../../assets/css/color';

export class RegPage extends Component {
    static navigationOptions = {
        title: '注册',
    };
    name = '';
    mobile = '';
    code = '';
    password = '';
    password2 = '';


    validCode = '';

    constructor(props) {
        super(props);
        this.state = {message: '', sendFlag: false, second: 30};
    }

    componentWillUnmount() {
        this.timer && clearInterval(this.timer);
    }

    getCode() {
        if (!this.mobile) {
            this.refs.toast.show('请输入手机号码');
            return;
        }
        if (!validUtils.isMobile(this.mobile)) {
            this.refs.toast.show('请输入正确的手机号码');
            return;
        }
        if (this.state.sendFlag) {
            this.refs.toast.show('操作过于频繁');
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

    doReg() {
        this.refs.textInputName.blur();
        this.refs.textInputMobile.blur();
        this.refs.textInputCode.blur();
        this.refs.textInputPwd.blur();
        this.refs.textInputPwd2.blur();
        if (!this.name) {
            this.refs.toast.show('请输入用户名');
            return;
        }
        if (!validUtils.isEnOrNum(this.name)) {
            this.refs.toast.show('用户名只能包含英文字母、数字');
            return;
        }
        if (!this.mobile) {
            this.refs.toast.show('请输入手机号码');
            return;
        }
        if (!validUtils.isMobile(this.mobile)) {
            this.refs.toast.show('请输入正确的手机号码');
            return;
        }
        if (!this.code) {
            this.refs.toast.show('请输入手机验证码');
            return;
        }
        if (this.validCode && this.code !== this.validCode) {
            this.refs.toast.show('手机验证码不正确');
            return;
        }
        if (!validUtils.isEnOrNum(this.password)) {
            this.refs.toast.show('密码只能包含英文字母、数字');
            return;
        }
        if (!this.password2) {
            this.refs.toast.show('请输入确认密码');
            return;
        }
        if (this.password !== this.password2) {
            this.refs.toast.show('前后两次密码不一致');
            return;
        }
        let dataString = 'tel=' + this.mobile + '&pwd=' + this.password + '&name=' + this.name + '&invitationCode=';
        httpClient.post(appService.Register, dataString).then(res => {
            if (res && res.IsSuc) {
                this.refs.toast.show('注册成功');
                this.props.navigation.goBack();
            } else {
                this.refs.toast.show(res.ErrMsg);
            }
        });
    }

    render() {
        let codeBtnText = this.state && this.state.sendFlag && this.state.second ? '已发送' + this.state.second + 's' : '获取验证码';
        let codeBtnStyle = this.state && this.state.sendFlag ? regStyles.codeBtnDisabled : regStyles.codeBtn;
        return (
            <View style={styles.body}>
                <View style={[styles.container, regStyles.regSection]}>
                    <TextInput style={styles.textInput} placeholder='用户名'
                               ref='textInputName' autoCapitalize={'none'} maxLength={20}
                               onChangeText={(text) => this.name = text}/>
                    <TextInput style={styles.textInput} placeholder='手机号码' keyboardType={'numeric'}
                               ref='textInputMobile' autoCapitalize={'none'} maxLength={11}
                               onChangeText={(text) => this.mobile = text}/>
                    <View style={[regStyles.codeRow]}>
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
                    <CButton style={styles.submitButton} title={'提交'} onPress={() => this.doReg()}/>
                </View>
                <Toast ref='toast' style={layoutStyles.toast} position={'top'}/>
            </View>
        )
    }
}

const regStyles = StyleSheet.create({
    regSection: {
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