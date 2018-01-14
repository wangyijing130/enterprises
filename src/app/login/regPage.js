import React, {Component} from 'react';
import {View, StyleSheet, TextInput} from 'react-native';
import CButton from '../common/button';
import Toast from 'react-native-easy-toast';
import {layoutStyles} from '../../assets/css/layout';
import {loginStyles as styles} from './loginStyle';
import {appService} from "../../core/httpInterface";
import {validUtils} from "../../core/validate";

export class RegPage extends Component {
    static navigationOptions = {
        title: '注册',
    };
    name = '';
    mobile = '';
    password = '';
    password2 = '';

    doReg() {
        this.refs.textInputName.blur();
        this.refs.textInputMobile.blur();
        this.refs.textInputPwd.blur();
        this.refs.textInputPwd2.blur();
        if (!this.name) {
            this.refs.toast.show('请输入用户名');
            return;
        }
        if (!validUtils.isEnOrNum(this.name)) {
            this.refs.toast.show('用户名只能包含英文字母、数组');
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
        if (!this.password) {
            this.refs.toast.show('请输入登录密码');
            return;
        }
        if (!validUtils.isEnOrNum(this.password)) {
            this.refs.toast.show('密码只能包含英文字母、数组');
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
        fetch(appService.Register, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'tel=' + this.mobile + '&pwd=' + this.password + '&name=' + this.name + '&invitationCode=',
        }).then((res) => {
            console.warn(res);
            if (res && res.IsSuc) {
                this.refs.toast.show('注册成功');
                this.props.navigation.goBack();
            } else {
                this.refs.toast.show(res.ErrMsg);
            }
        }).catch((e) => {
            console.warn(e);
            this.refs.toast.show(e.message);
        })
    }

    render() {
        return (
            <View style={styles.body}>
                <View style={[styles.container, regStyles.regSection]}>
                    <TextInput style={styles.textInput} placeholder='用户名'
                               ref='textInputName' autoCapitalize={'none'} maxLength={20}
                               onChangeText={(text) => this.name = text}/>
                    <TextInput style={styles.textInput} placeholder='手机号码' keyboardType={'numeric'}
                               ref='textInputMobile' autoCapitalize={'none'} maxLength={11}
                               onChangeText={(text) => this.mobile = text}/>
                    <TextInput style={styles.textInput} placeholder='密码' secureTextEntry={true}
                               ref='textInputPwd' autoCapitalize={'none'} maxLength={20}
                               onChangeText={(text) => this.password = text}/>
                    <TextInput style={styles.textInput} placeholder='确认密码' secureTextEntry={true}
                               ref='textInputPwd2' autoCapitalize={'none'} maxLength={20}
                               onChangeText={(text) => this.password2 = text}/>
                    <CButton style={styles.submitButton} title={'提交'} onPress={() => this.doReg()}/>
                </View>
                <Toast ref='toast' style={layoutStyles.toast} position={'bottom'}/>
            </View>
        )
    }
}

const regStyles = StyleSheet.create({
    regSection: {
        marginTop: 32
    },
});