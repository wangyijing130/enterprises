import React, {Component} from 'react';
import {
    View, StyleSheet, Image, Text,
    Platform, Touchable,
    TouchableOpacity,
    TouchableNativeFeedback,
} from 'react-native';
import {layoutStyles} from '../../assets/css/layout';
import {BORDER_COLOR, THEME, THEME_BG, THEME_TEXT} from '../../assets/css/color';
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
        if (item.route) {
            this.props.navigation.navigate(item.route);
            return;
        }
    }

    renderList(data) {
        return data.map(item => this.renderItem(item));
    }

    renderItem(item) {
        const Touchable = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;
        let iconStyle = [styles.appIcon];
        if (item.bgColor) {
            let bg = {
                backgroundColor: item.bgColor,
            };
            iconStyle.push(bg);
        }
        if (item.color) {
            let bg = {
                tintColor: item.color
            };
            iconStyle.push(bg);
        }
        return (
            <Touchable key={item.id} onPress={() => this.openLink(item)}>
                <View style={styles.appItem}>
                    <Image resizeMode='contain' style={iconStyle} source={item.icon}/>
                    <Text style={styles.appLabel}>{item.title}</Text>
                </View>
            </Touchable>
        );
    }


    render() {
        const data = this.props.data || [];
        let GroupName = <View style={{display: 'none'}}></View>;
        if (this.props.groupName) {
            GroupName = <View><Text style={styles.groupName}>{this.props.groupName}</Text></View>;
        }
        return (
            <View style={styles.wrapper}>
                {GroupName}
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
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 16,
        paddingRight: 16,
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
        margin: 12,
    },
    appIcon: {
        width: 60,
        height: 60,
        borderWidth: 1,
        borderColor: 'transparent',
        backgroundColor: 'transparent',
    },
    appLabel: {
        color: THEME_TEXT,
        fontSize: 14,
        textAlign: 'center',
    }
});