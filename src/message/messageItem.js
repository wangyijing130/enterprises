import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, FlatList, Platform, RefreshControl} from 'react-native';
import {THEME_BACKGROUND, THEME_LIGHT} from '../assets/css/color';

export class MessageItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {style, data} = this.props;
        return (
            <View style={[styles.container, style]}>
                <View style={[styles.row, styles.header]}>
                    <Text style={styles.label}>货号</Text>
                    <Text style={[styles.text, {flex: 5}]}>{data.HH}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>形状</Text>
                    <Text style={styles.text}>{data.Shape}</Text>
                    <Text style={styles.label}>颜色</Text>
                    <Text style={styles.text}>{data.Color}</Text>
                    <Text style={styles.label}>净度</Text>
                    <Text style={styles.text}>{data.Clarity}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>切工</Text>
                    <Text style={styles.text}>{data.Cut}</Text>
                    <Text style={styles.label}>抛光</Text>
                    <Text style={styles.text}>{data.Polish}</Text>
                    <Text style={styles.label}>对称</Text>
                    <Text style={styles.text}>{data.Sym}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>重量</Text>
                    <Text style={styles.text}>{data.Size}</Text>
                    <Text style={styles.label}>荧光</Text>
                    <Text style={styles.text}>{data.Flour}</Text>
                    <Text style={styles.label}>证书</Text>
                    <Text style={styles.text}>{data.Cert}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>证书号码</Text>
                    <Text style={[styles.text, {flex: 4}]}>{data.ReportNo}</Text>
                </View>
            </View>
        )
    }

}


const styles = StyleSheet.create({
        container: {
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            // padding: 4,
            backgroundColor: 'white'
        },
        row: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            padding: 4
        },
        header: {
            backgroundColor: THEME_LIGHT,
        },
        label: {
            flex: 1,
            fontWeight: '500'
        },
        text: {
            flex: 2
        }
    })
;