import React, {Component} from 'react';
import {View, StyleSheet, TextInput, ScrollView} from 'react-native';
import CButton from '../common/button';
import Toast from 'react-native-easy-toast';
import {layoutStyles, pageStyles} from '../assets/css/layout';

export class FeedBackPage extends Component {
    static navigationOptions = {
        title: '意见反馈',
    };
    opinion = '';

    doSubmit() {
        if (!this.opinion) {
            this.refs.toast.show('反馈内容不能为空');
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
        return (
            <ScrollView style={pageStyles.body}>
                <View style={styles.container}>
                    <TextInput style={styles.textInput} placeholder='反馈内容'
                               autoCapitalize={'none'} maxLength={500}
                               multiline={true}
                               onChangeText={(text) => this.opinion = text}/>

                    <CButton style={styles.submitButton} title={'提交'} onPress={() => this.doSubmit()}/>
                    <Toast ref='toast' style={layoutStyles.toast} position={'bottom'}/>
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