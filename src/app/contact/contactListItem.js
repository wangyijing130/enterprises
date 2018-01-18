import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Touchable,
    TouchableOpacity,
    TouchableNativeFeedback,
    Image,
    Linking,
    Platform
} from 'react-native';
import {uploadRoot} from '../../core/httpInterface';
import {THEME_DARK, THEME_TEXT} from "../../assets/css/color";

export class ContactListItem extends Component {
    constructor(props) {
        super(props);
    }

    callPhone() {
        const {data} = this.props;
        if (!data.Tel) {
            return;
        }
        return Linking.openURL('tel:' + data.Tel);
    }

    render() {
        const {style, data} = this.props;
        const Touchable = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;
        let photoSource = require('../../assets/images/person.png');
        photoSource = data.Photo ? {uri: uploadRoot + data.Photo} : photoSource;

        return (
            <View style={[styles.container, style]}>
                <View style={styles.headerBox}>
                    <View style={styles.headerImg}>
                        <Image style={styles.headerImgC}
                               source={photoSource}
                        />
                    </View>
                    <View style={styles.headerInfo}>
                        <View style={styles.viewCenter}>
                            <Text style={styles.textLeft}>{data.CustomerName}</Text>
                        </View>
                        <Touchable onPress={() => this.callPhone()}>
                            <View style={styles.viewCenter}>
                                <Text style={styles.textLeft}>{data.Tel}</Text>
                            </View>
                        </Touchable>
                        <View style={styles.viewCenter}>
                            <Text style={styles.textLeft}>{data.CompanyName }</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }

}


const styles = StyleSheet.create({
        container: {
            backgroundColor: 'white'
        },
        headerBox: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            height: 96,
            // paddingTop: 16,
            paddingLeft: 16,
        },
        headerImg: {
            flexBasis: 64,
            width: 64,
            height: 64,
        },
        headerImgC: {
            width: 64,
            height: 64,
            borderRadius: 32,
            overflow: 'hidden',
        },
        headerInfo: {
            flex: 1,
            height: 96,
            flexDirection: 'column',
            justifyContent: 'center',
            paddingLeft: 16,
        },
        textLeft: {
            color: THEME_TEXT,
            fontSize: 14,
            textAlign: 'left',
        },
        viewCenter: {
            paddingLeft: 16,
            paddingRight: 16,
            height: 32,
            flexDirection: 'column',
            justifyContent: 'center',
        }
    })
;