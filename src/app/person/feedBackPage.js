import React, {Component} from 'react';
import {View, StyleSheet, TextInput, ScrollView} from 'react-native';
import CButton from '../common/button';
import {layoutStyles, pageStyles} from '../../assets/css/layout';
import {appService, httpClient} from '../../core/httpInterface';
import {toastShort} from '../../core/toastUtil';

export class FeedBackPage extends Component {
    static navigationOptions = {
        title: '意见反馈',
    };
    contents = '';

    doSubmit() {
        if (!this.contents) {
            toastShort('反馈内容不能为空');
            return;
        }
        let user = this.props.navigation.state.params.user;
        let dataString = 'customerTel=' + user.Tel + '&contents=' + encodeURIComponent(this.contents);
        httpClient.post(appService.AddSuggestion, dataString).then(res => {
            if (res && res.IsSuc) {
                toastShort('意见反馈成功！');
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
            <ScrollView style={pageStyles.body}>
                <View style={styles.container}>
                    <TextInput style={styles.textInput} placeholder='反馈内容'
                               autoCapitalize={'none'} maxLength={500}
                               multiline={true} underlineColorAndroid={'transparent'}
                               onChangeText={(text) => this.contents = text}/>
                    <CButton style={styles.submitButton} title={'提交'} onPress={() => this.doSubmit()}/>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 32,
        padding: 16,
    },
    textInput: {
        height: 300,
        backgroundColor: 'white',
        borderRadius: 8
    }
});