import React, {Component} from 'react';
import {View, StyleSheet, TextInput} from 'react-native';
import {THEME_TEXT} from '../assets/css/color';
import CButton from '../common/button';
import Toast from 'react-native-easy-toast';
import {layoutStyles} from '../assets/css/layout';
import {loginStyles as styles} from './loginStyle';


export class FindAccountPage extends Component {
    static navigationOptions = {
        title: '找回密码'
    };
    mobile = '';
    code = '';
    password = '';
    password2 = '';
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
            this.refs.toast.show('请输入手机号码');
            return;
        }
        if (this.state.sendFlag) {
            this.refs.toast.show('操作过于频繁');
            return;
        }
        // 倒计时30s
        this.updateState('sendFlag', true);
        this.timer = setInterval(
            () => {
                if (this.state.second <= 0) {
                    this.updateState('second', 0);
                    this.updateState('sendFlag', false);
                    this.timer && clearInterval(this.timer);
                } else {
                    this.updateState('second', this.state.second - 1);
                }
            },
            1000
        );

    }

    updateState(key, val) {
        let state = this.state;
        state[key] = val;
        this.setState(state);
    }

    doSubmit() {
        this.refs.textInputMobile.blur();
        this.refs.textInputCode.blur();
        this.refs.textInputPwd.blur();
        this.refs.textInputPwd2.blur();
        if (!this.mobile) {
            this.refs.toast.show('请输入手机号码');
            return;
        }
        if (!this.code) {
            this.refs.toast.show('请输入手机验证码');
            return;
        }
        if (!this.password) {
            this.refs.toast.show('请输入登录密码');
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
        this.props.navigation.goBack();
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
                <Toast ref='toast' style={layoutStyles.toast} position={'bottom'}/>
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
