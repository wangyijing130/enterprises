import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput, Modal} from 'react-native';
import {connect} from 'react-redux'; // 引入connect函数
import * as loginAction from './loginAction';// 导入action方法
import {NavigationActions} from 'react-navigation';
import {THEME_BACKGROUND, THEME_LABEL, THEME_LIGHT, THEME_TEXT} from '../assets/css/color';
import CButton from '../common/button';
import Toast, {DURATION} from 'react-native-easy-toast';
import {layoutStyles} from '../assets/css/layout';
import {loginStyles as styles} from './loginStyle';

// 清空导航记录，跳转到首页
const resetAction = NavigationActions.reset({
    index: 0,
    actions: [
        NavigationActions.navigate({routeName: 'Main'})
    ]
});

class LoginPage extends Component {
    static navigationOptions = {
        header: null
    };


    mobile = '13510005217';
    password = '123456';

    constructor(props) {
        super(props);
        this.checkHasLogin();
    }

    componentDidUpdate() {
        if (this.props.status === '登录出错') {
            this.refs.toast.show('登录出错');
        }
    }

    checkHasLogin() {
        global.storage.load({
            key: 'user',
            autoSync: false,
        }).then(ret => {
            if (ret && ret.name) {
                // console.warn('用户已经登录：' + ret.name);
                this.props.navigation.dispatch(resetAction);
            }
        }).catch(err => {
            // console.warn(err.message);
        });
    }

    // 状态更新，判断是否登录并作出处理
    shouldComponentUpdate(nextProps, nextState) {
        // 登录完成,切成功登录
        if (nextProps.status === '登录成功' && nextProps.isSuccess) {
            // this.props.navigation.dispatch(resetAction);
            this.checkHasLogin();
            return false;
        }
        return true;
    }

    doLogin() {
        const {login} = this.props;
        this.refs.textInputMobile.blur();
        this.refs.textInputPwd.blur();
        if (!this.mobile) {
            this.refs.toast.show('请输入手机号码');
            return;
        }
        if (!this.password) {
            this.refs.toast.show('请输入密码');
            return;
        }
        login(this.mobile, this.password);
    }

    doReg() {
        this.props.navigation.navigate('Reg');
    }

    findAccount() {
        this.props.navigation.navigate('FindAccount');
    }

    render() {
        return (
            <View style={styles.body}>
                <View style={styles.container}>
                    <Text style={loginStyles.loginTitle}>雅云 1.0</Text>
                    <TextInput style={styles.textInput} placeholder='手机号码' keyboardType={'numeric'}
                               underlineColorAndroid={'transparent'}
                               ref='textInputMobile' defaultValue={this.mobile} autoCapitalize={'none'} maxLength={11}
                               onChangeText={(text) => this.mobile = text}/>
                    <TextInput style={styles.textInput} placeholder='登录密码' secureTextEntry={true}
                               ref='textInputPwd' defaultValue={this.password} autoCapitalize={'none'} maxLength={20}
                               onChangeText={(text) => this.password = text}/>
                    <CButton style={styles.submitButton} title={'登录'} onPress={() => this.doLogin()}/>
                    <View style={loginStyles.subButton}>
                        <Text style={loginStyles.subButtonText} onPress={() => this.doReg()}>免费注册</Text>
                        <Text style={loginStyles.subButtonText} onPress={() => this.findAccount()}>找回密码</Text>
                    </View>
                </View>
                <Toast ref='toast' style={layoutStyles.toast} position={'bottom'}/>
            </View>
        )
    }
}
export const loginStyles = StyleSheet.create({
    loginTitle: {
        fontSize: 28,
        fontWeight: '500',
        color: THEME_LABEL,
        textAlign: 'center',
        marginTop: 32,
        marginBottom: 32
    },
    subButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 32
    },
    subButtonText: {
        color: THEME_TEXT,
        fontSize: 14
    },
});

export default connect(
    (state) => ({
        status: state.loginIn.status,
        isSuccess: state.loginIn.isSuccess,
        user: state.loginIn.user,
    }),
    (dispatch) => ({
        login: (m, p) => dispatch(loginAction.login(m, p)),
    })
)(LoginPage)