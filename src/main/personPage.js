import React, {Component} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';
import {THEME, THEME_BACKGROUND} from '../assets/css/color';
import CButton from '../common/button';
import {layoutStyles, tabStyles} from '../assets/css/layout';
import {PersonHeader} from '../person/personHeader';
import {PersonMenu} from '../person/personMenu';

// 清空导航记录，跳转到登录页
const resetAction = NavigationActions.reset({
    index: 0,
    actions: [
        NavigationActions.navigate({routeName: 'Login'})
    ]
});

class PersonPage extends Component {
    static navigationOptions = {
        tabBarLabel: '我的',
        tabBarIcon: ({tintColor}) => (
            <Image
                source={require('../assets/images/person.png')}
                style={[tabStyles.icon, {tintColor: tintColor}]}
            />
        ),
        headerTitle: '我的'
    };

    componentWillMount() {
        this.checkLogin();
    }

    // 状态更新，判断是否登录并作出处理
    shouldComponentUpdate(nextProps, nextState) {
        // 登录完成,切成功登录
        if (nextProps.status === '登陆成功' && nextProps.isSuccess) {
            // this.props.navigation.dispatch(resetAction);
            this.checkLogin();
            return false;
        }
        return true;
    }

    checkLogin() {
        global.storage.load({
            key: 'user',
            autoSync: false,
        }).then(ret => {
            if (!ret || !ret.name) {
                this.props.navigation.dispatch(resetAction);
            }
        }).catch(err => {
            // console.warn(err.message);
        });
    }

    logout() {
        global.storage.remove({key: 'user'});
        this.props.navigation.dispatch(resetAction)
    }

    openView() {
        let url = 'http://mp.weixin.qq.com/s?__biz=MzI0MTAxOTAxOA==&mid=503121680&idx=1&sn=777c9f605fe2fba6e055718f2db7efaf&chksm=711856f5466fdfe38c339e3557b6df34ce433ce701661af45026bf50586559228b67782eb967&scene=18';
        this.props.navigation.navigate('MyView', {url: url, title: '哈哈哈'});
    }

    render() {
        return (
            <View style={styles.container}>
                <PersonHeader user={this.props.user} />
                <PersonMenu navigation={this.props.navigation}/>
                <Text style={{fontSize: 20}}>您好,{this.props.user && this.props.user.nikeName }!</Text>
                <View><Text>欢迎使用本产品！</Text></View>
                    <View><Text>状态: {this.props.status}</Text></View>
                <CButton title={'注销'} onPress={() => this.logout()}/>
                <CButton style={layoutStyles.mt3} title={'webview'} onPress={() => this.openView()}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    icon: {
        width: 26,
        height: 26,
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        padding: 0,
        backgroundColor: THEME_BACKGROUND
    }
});

export default connect(
    (state) => ({
        status: state.loginIn.status,
        isSuccess: state.loginIn.isSuccess,
        user: state.loginIn.user
    }),
    (dispatch) => ({})
)(PersonPage)