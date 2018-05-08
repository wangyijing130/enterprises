import React, {Component} from 'react';
import {
    View, StyleSheet, Platform, TextInput, ScrollView, Image, Text, Touchable,
    TouchableOpacity,
    TouchableNativeFeedback,
} from 'react-native';
import CButton from '../common/button';

import {pageStyles} from '../../assets/css/layout';
import {BORDER_COLOR, THEME_BG, THEME_TEXT} from '../../assets/css/color';
import {httpClient} from '../../core/httpInterface';
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

export class ImgOcrPage extends Component {
    static navigationOptions = {
        title: '图片文字识别',
    };

    constructor(props) {
        super(props);
        this.state = {selectImg: '', introduce: '', access_token: ''}
    }

    openImgPicker() {
        const {reLogin} = this.props;
        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                if (!response.data) {
                    return;
                }
                let imgbase64 = response.data; // 'data:image/jpeg;base64,' +  response.data
                this.setState({image: imgbase64});
                this.getBaiduToken();
            }
        });

    }

    getBaiduToken() {
        let url = 'https://aip.baidubce.com/oauth/2.0/token';
        let dataString = 'grant_type=client_credentials';
        dataString += '&client_id=yW1u0ei8Sr5yub4s4kN1GQYK';
        dataString += '&client_secret=acm7XZSBgsYFy9LlBEg5xgZjg9ya134V';
        httpClient.post(url, dataString).then(res => {
            if (res && res.access_token) {
                this.setState({access_token: res.access_token});
                this.imcOcr();
            } else {
                toastShort(res.error_description);
            }
            return res;
        });
    }

    imcOcr() {
        let url = 'https://aip.baidubce.com/rest/2.0/ocr/v1/accurate_basic?access_token=' + this.state.access_token;
        let data = 'image=' + encodeURIComponent(this.state.image);
        httpClient.post(url, data).then(res => {
            if (res && res.words_result_num) {
                let str = '';
                res.words_result.forEach(r => {
                    str += r.words;
                });
                this.setState({introduce: str});
            }
        });

    }

    doSubmit() {
        if (!this.state.image) {
            toastShort('图片不能为空');
            return;
        }
        this.getBaiduToken();
    }

    render() {
        const Touchable = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;
        let photoSource = require('../../assets/images/person.png');
        return (
            <ScrollView style={pageStyles.container}>
                <View style={styles.header}>
                    <Touchable onPress={() => this.openImgPicker()}>
                        <View style={styles.headerImg}>
                            <Image style={{flex: 1}}
                                   source={this.state.image ? {uri: 'data:image/jpeg;base64,' + this.state.image} : photoSource}/>
                        </View>
                    </Touchable>
                </View>
                <View style={styles.listGroup}>
                    <View style={styles.listGroupItem}>
                        <View style={styles.label}>
                            <Text style={styles.labelText}>提取文字</Text>
                        </View>
                        <View style={styles.Input}>
                            <TextInput style={styles.InputText} placeholder='提取文字'
                                       autoCapitalize={'none'} maxLength={500}
                                       defaultValue={this.state.introduce}
                                       underlineColorAndroid={'transparent'}/>
                        </View>
                    </View>
                </View>
                <CButton style={{margin: 16}} title='识别' onPress={() => this.doSubmit()}/>
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