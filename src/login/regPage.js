import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import {THEME, THEME_BACKGROUND, THEME_TEXT} from '../assets/css/color';
import CButton from '../common/button';

export class RegPage extends Component {
    static navigationOptions = {
        title: '注册',
    };
    mobile = '';
    password = '';
    password2 = '';

    constructor(props) {
        super(props);
        this.state = {message: ''};
    }

    updateState(key, val) {
        let state = this.state;
        state[key] = val;
        this.setState(state);
    }

    doReg() {
        const {reg} = this.props;
        if (!this.mobile) {
            this.updateState('message', '请输入手机号码');
            return;
        }
        if (!this.password) {
            this.updateState('message', '请输入登录密码');
            return;
        }
        if (!this.password2) {
            this.updateState('message', '请输入确认密码');
            return;
        }
        if (this.password !== this.password2) {
            this.updateState('message', '前后两次密码不一致');
            return;
        }
        reg(this.mobile, this.password);
    }

    render() {
        let message = this.state && this.state.message ? this.state.message : '';
        return (
            <View style={styles.regPage}>
                <TextInput style={styles.regInput} placeholder='手机号码' keyboardType={'numeric'}
                           autoCapitalize={'none'} maxLength={20}
                           onChangeText={(text) => this.mobile = text}/>
                <TextInput style={styles.regInput} placeholder='密码' secureTextEntry={true}
                           autoCapitalize={'none'} maxLength={20}
                           onChangeText={(text) => this.password = text}/>
                <TextInput style={styles.regInput} placeholder='确认密码' secureTextEntry={true}
                           autoCapitalize={'none'} maxLength={20}
                           onChangeText={(text) => this.password2 = text}/>
                <CButton style={styles.regInput} title={'提交'} onPress={() => this.doReg()}/>
                <Text style={styles.message}>{message}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    regPage: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: THEME_BACKGROUND
    },
    regInput: {
        marginBottom: 8
    },
    message: {
        marginTop: 16,
        color: THEME_TEXT,
        fontSize: 14
    }
});