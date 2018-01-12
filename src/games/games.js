import React, {Component} from 'react';
import {
    View, StyleSheet, Image, Text,
    Platform, Touchable,
    TouchableOpacity,
    TouchableNativeFeedback,
} from 'react-native';
import {layoutStyles} from '../assets/css/layout';
import {BORDER_COLOR, THEME, THEME_BG, THEME_TEXT} from '../assets/css/color';
export class Games extends Component {

    constructor(props) {
        super(props);
        this.state = {
            swiperShow: false,
        };
    }

    componentDidMount() {

    }

    openLink(item) {
        if (item.link) {
            this.props.navigation.navigate('MyView', {url: item.link, title: item.title ? item.title : '链接'});
            return;
        }

    }

    renderList(data) {
        return data.map(item => this.renderItem(item));
    }

    renderItem(item) {
        const Touchable = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;
        return (
            <Touchable key={item.id} onPress={() => this.openLink(item)}>
                <View style={styles.appItem}>
                    <Image resizeMode='contain' style={styles.appIcon} source={{uri: item.icon}}/>
                    <Text style={styles.appLabel}>{item.title}</Text>
                </View>
            </Touchable>
        );
    }


    render() {
        const data = this.props.data || [];
        return (
            <View style={styles.wrapper}>
                <View><Text style={styles.groupName}>{this.props.groupName}</Text></View>
                <View style={styles.app}>
                    {this.renderList(data)}
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: 'white',
        borderColor: BORDER_COLOR,
        borderBottomWidth: 1,
        padding: 16,
        marginTop: 8,
        marginBottom: 8,
    },
    groupName: {
        color: THEME,
        fontSize: 14,
        fontWeight: '500',
        marginTop: 8,
        marginBottom: 8,
    },
    app: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        alignItems: 'center',
        alignContent: 'center'
    },
    appItem: {
        width: 62,
        margin: 8,
    },
    appIcon: {
        width: 60,
        height: 60,
        borderWidth: 1,
        borderColor: THEME_BG,
    },
    appLabel: {
        color: THEME_TEXT,
        fontSize: 14,
        textAlign: 'center',
    }
});