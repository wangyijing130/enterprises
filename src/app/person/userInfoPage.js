import React, {Component} from 'react';
import {View, StyleSheet, TextInput, ScrollView, Image, Text} from 'react-native';
import CButton from '../common/button';
import Toast from 'react-native-easy-toast';
import {layoutStyles, pageStyles} from '../../assets/css/layout';
import {BORDER_COLOR, THEME_BG, THEME_DARK, THEME_LIGHT, THEME_TEXT} from '../../assets/css/color';

export class UserInfoPage extends Component {
    static navigationOptions = {
        title: '个人资料',
    };
    corpName = '';
    mobile = '';
    nickName = '';

    constructor(props) {
        super(props);
        const user = this.props.navigation.state.params.user;
    }

    doSubmit() {
        if (!this.mobile) {
            this.refs.toast.show('内容不能为空');
            return;
        }
        this.props.navigation.goBack();
        /* fetch('https://localhost:8088/feedback')
         .then((res) => {
         this.refs.toast.show('提交成功！');
         this.props.navigation.goBack();
         }).catch((e) => {
         this.refs.toast.show(e.message);
         });*/
    }

    render() {
        const user = this.props.navigation.state.params.user;
        return (
            <ScrollView style={pageStyles.container}>
                <View style={styles.header}>
                    <View style={styles.headerImg}>
                        <Image style={{flex: 1}}
                               source={{uri: 'https://b-ssl.duitang.com/uploads/item/201310/07/20131007112359_VYSfX.thumb.700_0.jpeg'}}
                        />
                    </View>
                </View>
                <View style={styles.listGroup}>
                    <View style={styles.listGroupItem}>
                        <View style={styles.label}>
                            <Text style={styles.labelText}>昵称</Text>
                        </View>
                        <View style={styles.Input}>
                            <TextInput style={styles.InputText} placeholder='昵称' autoCapitalize={'none'} maxLength={20}
                                       defaultValue={user.CustomerName} onChangeText={(text) => this.nickName = text}
                                       underlineColorAndroid={'transparent'}/>
                        </View>
                    </View>
                    <View style={styles.listGroupItem}>
                        <View style={styles.label}>
                            <Text style={styles.labelText}>店名</Text>
                        </View>
                        <View style={styles.Input}>
                            <TextInput style={styles.InputText} placeholder='店名' autoCapitalize={'none'} maxLength={20}
                                       defaultValue={user.CompanyName} onChangeText={(text) => this.corpName = text}
                                       underlineColorAndroid={'transparent'}/>
                        </View>
                    </View>
                    <View style={styles.listGroupItem}>
                        <View style={styles.label}>
                            <Text style={styles.labelText}>手机号码</Text>
                        </View>
                        <View style={styles.Input}>
                            <TextInput style={styles.InputText} placeholder='手机号码' autoCapitalize={'none'}
                                       maxLength={20} keyboardType={'numeric'}
                                       defaultValue={user.Tel} onChangeText={(text) => this.mobile = text}
                                       underlineColorAndroid={'transparent'}/>
                        </View>
                    </View>
                </View>
                <CButton style={{margin: 16}} title='修改' onPress={() => this.doSubmit()}/>
                <Toast ref='toast' style={layoutStyles.toast} position={'bottom'}/>
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