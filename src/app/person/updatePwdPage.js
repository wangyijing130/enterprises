import React, {Component} from 'react';
import {View, StyleSheet, TextInput, Text, ScrollView} from 'react-native';
import CButton from '../common/button';
import {layoutStyles, pageStyles} from '../../assets/css/layout';
import {BORDER_COLOR, THEME_LIGHT, THEME_TEXT} from '../../assets/css/color';
import {appService, httpClient} from '../../core/httpInterface';
import {validUtils} from '../../core/validate';
import {toastShort} from '../../core/toastUtil';

export class UpdatePwdPage extends Component {
    static navigationOptions = {
        title: '修改密码',
    };
    password = '';
    newPwd = '';
    newPwd2 = '';

    constructor(props) {
        super(props);
    }

    doSubmit() {
        if (!this.password) {
            toastShort('原密码不能为空');
            return;
        }
        if (!this.newPwd) {
            toastShort('新密码不能为空');
            return;
        }
        if (!validUtils.isEnOrNum(this.newPwd)) {
            toastShort('新密码只能包含英文字母、数字');
            return;
        }
        if (!this.newPwd2) {
            toastShort('确认密码不能为空');
            return;
        }
        if (this.newPwd !== this.newPwd2) {
            toastShort('前后两次密码不一致');
            return;
        }
        if (!this.props.navigation.state || !this.props.navigation.state.params || !this.props.navigation.state.params.user) {
            toastShort('无法获取当前用户信息！');
            return;
        }
        let dataString = 'tel=' + this.props.navigation.state.params.user.Tel + '&oldpwd=' + this.password + '&newpwd=' + this.newPwd;
        httpClient.post(appService.UpdatePassword, dataString).then(res => {
            if (res && res.IsSuc) {
                toastShort('登录密码修改成功！');
                setTimeout(() => {
                    this.props.navigation.goBack();
                }, 1500);
            } else {
                toastShort(res.ErrMsg);
            }
        });
    }

    render() {
        return (
            <ScrollView style={pageStyles.container}>
                <View style={styles.listGroup}>
                    <View style={styles.listGroupItem}>
                        <View style={styles.label}>
                            <Text style={styles.labelText}>原密码</Text>
                        </View>
                        <View style={styles.Input}>
                            <TextInput style={styles.InputText} placeholder='原密码' autoCapitalize={'none'} maxLength={20}
                                       onChangeText={(text) => this.password = text} secureTextEntry={true}
                                       underlineColorAndroid={'transparent'}/>
                        </View>
                    </View>
                    <View style={styles.listGroupItem}>
                        <View style={styles.label}>
                            <Text style={styles.labelText}>新密码</Text>
                        </View>
                        <View style={styles.Input}>
                            <TextInput style={styles.InputText} placeholder='新密码' autoCapitalize={'none'} maxLength={20}
                                       onChangeText={(text) => this.newPwd = text} secureTextEntry={true}
                                       underlineColorAndroid={'transparent'}/>
                        </View>
                    </View>
                    <View style={styles.listGroupItem}>
                        <View style={styles.label}>
                            <Text style={styles.labelText}>确认密码</Text>
                        </View>
                        <View style={styles.Input}>
                            <TextInput style={styles.InputText} placeholder='确认密码' autoCapitalize={'none'}
                                       maxLength={20}
                                       onChangeText={(text) => this.newPwd2 = text} secureTextEntry={true}
                                       underlineColorAndroid={'transparent'}/>
                        </View>
                    </View>
                </View>
                <CButton style={{margin: 16}} title='修改' onPress={() => this.doSubmit()}/>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 16,
        padding: 16,
    },
    listGroup: {
        marginTop: 8,
        marginBottom: 8,
        backgroundColor: 'white',
        borderColor: BORDER_COLOR,
        borderTopWidth: 1,
        borderBottomWidth: 1,
    },
    listGroupItem: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 48,
        borderColor: BORDER_COLOR,
        borderBottomWidth: 1,
    },
    label: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        paddingLeft: 16,
        paddingRight: 16,
        // backgroundColor: THEME_LIGHT,
        height: 48,
    },
    labelText: {
        fontSize: 14,
        fontWeight: '500',
    },
    Input: {
        flex: 3,
        flexDirection: 'column',
        justifyContent: 'center',
        paddingLeft: 16,
        paddingRight: 16,
        height: 48,
    },
    InputText: {
        fontSize: 14,
        padding: 0,
        textAlign: 'right',
        color: THEME_TEXT,
    }

});