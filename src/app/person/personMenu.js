import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Touchable,
    TouchableOpacity,
    TouchableNativeFeedback,
    Platform
} from 'react-native';
import {BORDER_COLOR, THEME_TEXT} from '../../assets/css/color';
import {NavigationActions} from 'react-navigation';
const resetAction = NavigationActions.reset({
    index: 0,
    actions: [
        NavigationActions.navigate({routeName: 'Login'})
    ]
});
export class PersonMenu extends Component {
    constructor(props) {
        super(props);
    }

    userInfo() {
        this.props.navigation.navigate('UserInfo', {user: this.props.user});
    }


    changePwd() {
        this.props.navigation.navigate('UpdatePwd', {user: this.props.user});
    }

    feedBack() {
        this.props.navigation.navigate('FeedBack', {user: this.props.user});
    }

    clearCache() {
    }

    doLogout() {
        global.storage.remove({key: 'user'});
        this.props.navigation.dispatch(resetAction)
    }

    render() {
        const Touchable = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;
        return (
            <View style={styles.container}>
                <View style={styles.group}>
                    <Touchable onPress={() => this.userInfo()}>
                        <View style={styles.groupItem}>
                            <Text style={styles.textLeft}>个人资料</Text>
                        </View>
                    </Touchable>
                    <Touchable onPress={() => this.changePwd()}>
                        <View style={styles.groupItem}>
                            <Text style={styles.textLeft}>修改密码</Text>
                        </View>
                    </Touchable>
                    <Touchable onPress={() => this.feedBack()}>
                        <View style={styles.groupItem}>
                            <Text style={styles.textLeft}>意见反馈</Text>
                        </View>
                    </Touchable>
                </View>
                <View style={styles.group}>
                    <View style={styles.groupItem}>
                        <View style={styles.row}>
                            <Text style={styles.rowLabel}>版本号</Text>
                            <Text style={styles.rowText}>{global.appVersion}</Text>
                        </View>
                    </View>
                    <Touchable onPress={() => this.clearCache()}>
                        <View style={styles.groupItem}>
                            <Text style={styles.textLeft}>清除缓存</Text>
                        </View>
                    </Touchable>
                    <Touchable onPress={() => this.doLogout()}>
                        <View style={styles.groupItem}>
                            <Text style={styles.textLeft}>退出账号</Text>
                        </View>
                    </Touchable>
                </View>
            </View>
        )
    }

}


const styles = StyleSheet.create({
        container: {
            // height: 132,
            marginTop: 8,
            marginBottom: 8,
        },
        group: {
            marginTop: 8,
            marginBottom: 8,
            backgroundColor: 'white',
            borderColor: BORDER_COLOR,
            borderTopWidth: 1,
            borderBottomWidth: 1,
        },
        groupItem: {
            // flex: 1,
            paddingLeft: 16,
            paddingRight: 16,
            height: 48,
            flexDirection: 'column',
            justifyContent: 'center',
            // alignItems: 'center',
            borderColor: BORDER_COLOR,
            borderBottomWidth: 1,
        },
        textLeft: {
            color: THEME_TEXT,
            fontSize: 14,
            textAlign: 'left',
            fontWeight: '500',
        },
        row: {
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        rowLabel: {
            flex: 1,
            fontSize: 14,
            textAlign: 'left',
            fontWeight: '500',
        },
        rowText: {
            flex: 1,
            fontSize: 14,
            textAlign: 'right',
        }
    })
;