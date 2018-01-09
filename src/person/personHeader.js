import React, {Component} from 'react';
import {View, Text, StyleSheet, Image,} from 'react-native';
import {THEME, THEME_BACKGROUND, THEME_DARK, THEME_LIGHT} from '../assets/css/color';

export class PersonHeader extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.headerBox}>
                    <View style={styles.headerImg}>
                        <Image style={{flex: 1}}
                               source={{uri: 'https://b-ssl.duitang.com/uploads/item/201310/07/20131007112359_VYSfX.thumb.700_0.jpeg'}}
                        />
                    </View>
                    <View style={styles.headerInfo}>
                        <View style={styles.viewCenter}>
                            <Text style={styles.textLeft}>aaa</Text>
                        </View>
                        <View style={styles.viewCenter}>
                            <Text style={styles.textLeft}>bbb</Text>
                        </View>
                        <View style={styles.viewCenter}>
                            <Text style={styles.textLeft}>ccc</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.userInfo}>
                    <View style={styles.viewCenter}>
                        <Text style={styles.textCenter}>积分:1</Text>
                    </View>
                    <View style={styles.viewCenter}>
                        <Text style={styles.textCenter}>虚拟币:1</Text>
                    </View>
                    <View style={styles.viewCenter}>
                        <Text style={styles.textCenter}>VIP:1</Text>
                    </View>
                </View>
            </View>
        )
    }

}


const styles = StyleSheet.create({
        container: {
            backgroundColor: THEME_DARK,
            elevation: 4,
            paddingTop: 8,
            paddingBottom: 8,
            paddingLeft: 8,
            paddingRight: 8,
            height: 140,
        },
        headerBox: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
        },
        headerImg: {
            flexBasis: 96,
            width: 96,
            height: 96,
            borderRadius: 48,
            borderWidth: 1,
            borderColor: 'white',
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
            paddingTop: 8,
            paddingBottom: 8,
            paddingLeft: 16,
            paddingRight: 16,
        }
    })
;