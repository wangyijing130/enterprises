import React, {Component} from 'react';
import {View, StyleSheet, TextInput, ScrollView, Image, Text, Switch} from 'react-native';
import CButton from '../common/button';
import Toast from 'react-native-easy-toast';
import {layoutStyles, pageStyles} from '../../assets/css/layout';
import {BORDER_COLOR, THEME_BG, THEME_DARK, THEME_LIGHT, THEME_TEXT} from '../../assets/css/color';
import {appService, httpClient} from "../../core/httpInterface";

export class UserInfoPage extends Component {
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
        const user = this.props.navigation.state.params.user;
        if (user) {
            this.customerName = user.CustomerName;
            this.nickName = user.NickName;
            this.sex = user.Sex ? user.Sex : '男';
            this.idCard = user.IdCard;
            this.address = user.Address;
            this.introduce = user.Introduce;
            if (this.idCard && this.idCard.length > 10) {
                this.idCardShow = this.idCard.substr(0, 3) + '*******' + this.idCard.substr(this.idCard.length - 4, 4);
            }
        }
    }

    doSubmit() {
        if (!this.customerName) {
            this.refs.toast.show('用户名不能为空');
            return;
        }
        const user = this.props.navigation.state.params.user;
        let dataString = 'customerId=' + user.Id + '&customerName=' + encodeURIComponent(this.customerName);
        dataString += '&nickName=' + this.nickName ? encodeURIComponent(this.nickName) : '';
        dataString += '&sex=' + this.sex ? encodeURIComponent(this.sex) : '';
        dataString += '&idCard=' + this.idCard ? encodeURIComponent(this.idCard) : '';
        dataString += '&address=' + this.address ? encodeURIComponent(this.address) : '';
        dataString += '&introduce=' + this.introduce ? encodeURIComponent(this.introduce) : '';
        httpClient.post(appService.UpdateCustomerInfo, dataString).then(res => {
            if (res && res.IsSuc) {
                this.refs.toast.show('修改成功！');
                user.CustomerName = this.customerName;
                user.NickName = this.nickName;
                user.Sex = this.sex;
                user.IdCard = this.idCard;
                user.Address = this.address;
                user.Introduce = this.introduce;
                if (global.storage) {
                    global.storage.save({
                        key: 'user',
                        data: user
                    })
                }
                setTimeout(() => {
                    this.props.navigation.goBack();
                }, 1500);
            } else {
                this.refs.toast.show(res.ErrMsg);
            }
        });
    }

    render() {
        const user = this.props.navigation.state.params.user;
        let photo = user.Photo ? user.Photo : 'https://b-ssl.duitang.com/uploads/item/201310/07/20131007112359_VYSfX.thumb.700_0.jpeg';
        return (
            <ScrollView style={pageStyles.container}>
                <View style={styles.header}>
                    <View style={styles.headerImg}>
                        <Image style={{flex: 1}} source={{uri: photo}}/>
                    </View>
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
                <Toast ref='toast' style={layoutStyles.toast} position={'top'}/>
            </ScrollView>
        )
    }
}

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