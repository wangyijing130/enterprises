import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as loginAction from '../login/loginAction';// 导入action方法
import {
    View, StyleSheet, Platform, TextInput, ScrollView, Image, Text, Touchable,
    TouchableOpacity,
    TouchableNativeFeedback,
} from 'react-native';
import CButton from '../common/button';

import {pageStyles} from '../../assets/css/layout';
import {BORDER_COLOR, THEME_BG, THEME_TEXT} from '../../assets/css/color';
import {appService, httpClient, uploadRoot} from '../../core/httpInterface';
import {toastShort} from '../../core/toastUtil';
const ImagePicker = require('react-native-image-picker');
const options = {
    title: '选择图片',
    cancelButtonTitle: '取消',
    takePhotoButtonTitle: '拍照',
    chooseFromLibraryButtonTitle: '图片库',
    cameraType: 'back',
    mediaType: 'photo',
    maxWidth: 300,
    maxHeight: 300,
    quality: 0.75,
    // videoQuality: 'high',durationLimit: 10,aspectX: 2,aspectY: 1,angle: 0,
    allowsEditing: true,
    noData: false,
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
};

class UserInfoPage extends Component {
    static navigationOptions = {
        title: '个人资料',
    };
    customerName = '';
    nickName = '';
    sex = '';
    idCard = '';
    address = '';
    introduce = '';
    idCardShow = '';

    constructor(props) {
        super(props);
        let user = this.props.user;
        let photoSource = require('../../assets/images/person.png');
        photoSource = user.Photo ? {uri: uploadRoot + user.Photo} : photoSource;
        this.state = {photo: photoSource, user: user};
        this.loadUserInfo(this.state.user);
    }

    componentDidUpdate() {
        let user = this.props.user;
        if (user) {
            this.loadUserInfo(user);
        }
    }

    loadUserInfo(user) {
        if (user) {
            this.customerName = user.CustomerName ? user.CustomerName : '';
            this.nickName = user.NickName ? user.NickName : '';
            this.sex = user.Sex ? user.Sex : '男';
            this.address = user.Address ? user.Address : '';
            this.introduce = user.Introduce ? user.Introduce : '';
            this.idCard = user.IdCard ? user.IdCard : '';
            if (this.idCard && this.idCard.length > 10) {
                this.idCardShow = this.idCard.substr(0, 3) + '*******' + this.idCard.substr(this.idCard.length - 4, 4);
            }
        }
    }

    openImgPicker() {
        const {reLogin} = this.props;
        let user = this.state.user;
        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                if (!response.data || !user) {
                    return;
                }
                let imgbase64 = 'data:image/jpeg;base64,' + response.data;
                // this.setState({photo: {uri:imgbase64}});
                let dataString = 'customerId=' + user.Id + '&imgbase64=' + encodeURIComponent(imgbase64);
                httpClient.post(appService.UploadImgBase64, dataString).then(res => {
                    if (res && res.IsSuc) {
                        user.Photo = res.Data;
                        toastShort('头像修改成功');
                        if (global.storage) {
                            global.storage.save({
                                key: 'user',
                                data: user
                            })
                        }
                        let photoSource = require('../../assets/images/person.png');
                        if (user) {
                            photoSource = user.Photo ? {uri: uploadRoot + user.Photo} : photoSource;
                        }
                        this.setState({photo: photoSource, user: user});
                        this.loadUserInfo(this.state.user);
                        reLogin(this.state.user);
                    } else {
                        toastShort(res.ErrMsg || '头像修改失败');
                    }
                });
            }
        });

    }

    doSubmit() {
        if (!this.customerName) {
            toastShort('用户名不能为空');
            return;
        }
        let user = this.state.user;
        const {reLogin} = this.props;
        let dataString = 'customerId=' + user.Id + '&customerName=' + encodeURIComponent(this.customerName);
        dataString += '&nickName=' + (this.nickName ? encodeURIComponent(this.nickName) : '');
        dataString += '&sex=' + (this.sex ? encodeURIComponent(this.sex) : '');
        dataString += '&idCard=' + (this.idCard ? encodeURIComponent(this.idCard) : '');
        dataString += '&address=' + (this.address ? encodeURIComponent(this.address) : '');
        dataString += '&introduce=' + (this.introduce ? encodeURIComponent(this.introduce) : '');
        httpClient.post(appService.UpdateCustomerInfo, dataString).then(res => {
            if (res && res.IsSuc) {
                toastShort('修改成功！');
                user.CustomerName = this.customerName;
                user.NickName = this.nickName;
                user.Sex = this.sex;
                user.IdCard = this.idCard;
                user.Address = this.address;
                user.Introduce = this.introduce;
                this.setState({user: user});
                this.loadUserInfo(this.state.user);
                reLogin(this.state.user);
                setTimeout(() => {
                    this.props.navigation.goBack();
                }, 1500);
            } else {
                toastShort(res.ErrMsg);
            }
        });
    }

    render() {
        const Touchable = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;
        let user = this.state.user;
        return (
            <ScrollView style={pageStyles.container}>
                <View style={styles.header}>
                    <Touchable onPress={() => this.openImgPicker()}>
                        <View style={styles.headerImg}>
                            <Image style={{flex: 1}} source={this.state.photo}/>
                        </View>
                    </Touchable>
                </View>
                <View style={styles.listGroup}>
                    <View style={styles.listGroupItem}>
                        <View style={styles.label}>
                            <Text style={styles.labelText}>昵称</Text>
                        </View>
                        <View style={styles.Input}>
                            <TextInput style={styles.InputText} placeholder='昵称' autoCapitalize={'none'} maxLength={20}
                                       defaultValue={this.nickName} onChangeText={(text) => this.nickName = text}
                                       underlineColorAndroid={'transparent'}/>
                        </View>
                    </View>
                    <View style={styles.listGroupItem}>
                        <View style={styles.label}>
                            <Text style={styles.labelText}>性别</Text>
                        </View>
                        <View style={styles.Input}>
                            <TextInput style={styles.InputText} placeholder='性别' autoCapitalize={'none'} maxLength={2}
                                       defaultValue={this.sex} onChangeText={(text) => this.sex = text}
                                       underlineColorAndroid={'transparent'}/>
                        </View>
                    </View>
                    <View style={styles.listGroupItem}>
                        <View style={styles.label}>
                            <Text style={styles.labelText}>身份证号码</Text>
                        </View>
                        <View style={styles.Input}>
                            <TextInput style={styles.InputText}
                                       placeholder={this.idCardShow ? this.idCardShow : '身份证号码'}
                                       autoCapitalize={'none'}
                                       maxLength={18} keyboardType={'numeric'}
                                       onChangeText={(text) => this.idCard = text}
                                       underlineColorAndroid={'transparent'}/>
                        </View>
                    </View>
                    <View style={styles.listGroupItem}>
                        <View style={styles.label}>
                            <Text style={styles.labelText}>地址</Text>
                        </View>
                        <View style={styles.Input}>
                            <TextInput style={styles.InputText} placeholder='地址'
                                       autoCapitalize={'none'} maxLength={50}
                                       defaultValue={this.address} onChangeText={(text) => this.address = text}
                                       underlineColorAndroid={'transparent'}/>
                        </View>
                    </View>
                    <View style={styles.listGroupItem}>
                        <View style={styles.label}>
                            <Text style={styles.labelText}>简介</Text>
                        </View>
                        <View style={styles.Input}>
                            <TextInput style={styles.InputText} placeholder='简介'
                                       autoCapitalize={'none'} maxLength={100}
                                       defaultValue={this.introduce} onChangeText={(text) => this.introduce = text}
                                       underlineColorAndroid={'transparent'}/>
                        </View>
                    </View>
                </View>
                <CButton style={{margin: 16}} title='修改' onPress={() => this.doSubmit()}/>
            </ScrollView>
        )
    }
}


export default connect(
    (state) => {
        return {
            status: state.loginIn.status,
            isSuccess: state.loginIn.isSuccess,
            user: state.loginIn.user,
            error: state.loginIn.error,
        }
    },
    (dispatch) => ({
        reLogin: (u) => dispatch(loginAction.reLogin(u)),
    })
)(UserInfoPage)

const styles = StyleSheet.create({
    container: {
        marginTop: 16,
        padding: 16,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        // height: 96,
        backgroundColor: THEME_BG,
        elevation: 4,
        marginBottom: 16,
        padding: 16,
    },
    headerImg: {
        flexBasis: 96,
        width: 96,
        height: 96,
        borderRadius: 48,
        overflow: 'hidden',
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
        // color: 'white',
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