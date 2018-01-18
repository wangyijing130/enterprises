import React, {Component} from 'react';
import {View, Text, StyleSheet, Image,} from 'react-native';
import {THEME, THEME_BODY_BG, THEME_BG, THEME_LIGHT} from '../../assets/css/color';
import {uploadRoot} from '../../core/httpInterface';

export class PersonHeader extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let user = this.props.user;
        // let photoSource = 'https://b-ssl.duitang.com/uploads/item/201310/07/20131007112359_VYSfX.thumb.700_0.jpeg';
        let photoSource = require('../../assets/images/person.png');
        let showName = user.CustomerName;
        if (user) {
            photoSource = user.Photo ? {uri: uploadRoot + user.Photo} : photoSource;
            showName = user.NickName ? user.NickName : user.CustomerName;
        }
        return (
            <View style={phStyles.container}>
                <View style={phStyles.headerBox}>
                    <View style={phStyles.headerImg}>
                        <Image style={{flex: 1}}
                               source={photoSource}
                        />
                    </View>
                    <View style={phStyles.headerInfo}>
                        <View style={phStyles.viewCenter}>
                            <Text style={phStyles.textLeft}>{showName}</Text>
                        </View>
                        <View style={phStyles.viewCenter}>
                            <Text style={phStyles.textLeft}>{this.props.user && this.props.user.Tel }</Text>
                        </View>
                        <View style={phStyles.viewCenter}>
                            <Text style={phStyles.textLeft}>{this.props.user && this.props.user.CompanyName }</Text>
                        </View>
                    </View>
                </View>
                <View style={phStyles.userInfo}>
                    <View style={phStyles.viewCenter}>
                        <Text style={phStyles.textCenter}>积分:1</Text>
                    </View>
                    <View style={phStyles.viewCenter}>
                        <Text style={phStyles.textCenter}>虚拟币:1</Text>
                    </View>
                    <View style={phStyles.viewCenter}>
                        <Text style={phStyles.textCenter}>VIP:1</Text>
                    </View>
                </View>
            </View>
        )
    }

}


const phStyles = StyleSheet.create({
        container: {
            backgroundColor: THEME_BG,
            elevation: 4,
            paddingTop: 8,
            paddingBottom: 8,
            paddingLeft: 8,
            paddingRight: 8,
            // height: 136,
        },
        headerBox: {
            flexDirection: 'row',
            justifyContent: 'center',
            height: 96,
        },
        headerImg: {
            flexBasis: 96,
            width: 96,
            height: 96,
            borderRadius: 48,
            overflow: 'hidden',
        },
        headerInfo: {
            flex: 1,
            height: 96,
            flexDirection: 'column',
            justifyContent: 'center',
            paddingLeft: 16,
        },
        userInfo: {
            paddingLeft: 8,
            paddingRight: 8,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        textLeft: {
            color: 'white',
            fontSize: 14,
            textAlign: 'left',
        },
        textCenter: {
            color: 'white',
            fontSize: 14,
            textAlign: 'center',
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