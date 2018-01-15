import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {connect} from 'react-redux'; // 引入connect函数
import * as loginAction from '../login/loginAction';// 导入action方法
import {NavigationActions} from 'react-navigation';
import {THEME, THEME_BG, THEME_LIGHT} from '../../assets/css/color';


const deviceWidth = Dimensions.get('window').width;      //设备的宽度
const deviceHeight = Dimensions.get('window').height;
// 清空导航记录，跳转到登录页
const resetLoginAction = NavigationActions.reset({
    index: 0,
    actions: [
        NavigationActions.navigate({routeName: 'Login'})
    ]
});
const resetMainAction = NavigationActions.reset({
    index: 0,
    actions: [
        NavigationActions.navigate({routeName: 'Main'})
    ]
});

class SplashPage extends Component {
    static navigationOptions = {
        header: null
    };
    timer;

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.timer = setTimeout(() => {
            clearTimeout(this.timer);
            this.checkHasLogin();
        }, 3000);
    }
    // 状态更新，判断是否登录并作出处理
    shouldComponentUpdate(nextProps, nextState) {
        // 登录完成,切成功登录
        if (nextProps.status === '登录成功' && nextProps.isSuccess) {
            this.props.navigation.dispatch(resetMainAction);
            return false;
        }
        this.props.navigation.dispatch(resetLoginAction);
        return true;
    }

    checkHasLogin() {
        const {reLogin} = this.props;
        // this.props.navigation.dispatch(resetLoginAction);
        if (global.storage) {
            global.storage.load({
                key: 'user',
                autoSync: false,
            }).then(ret => {
                if (ret && ret.Tel) {
                    reLogin(ret);
                } else {
                    this.props.navigation.dispatch(resetLoginAction);
                }
            }).catch(err => {
                this.props.navigation.dispatch(resetLoginAction);
            });
        } else {

        }
    }

    render() {
        return (
            <LinearGradient colors={[THEME, THEME_LIGHT, THEME_BG] } style={splashStyles.linearGradient}>
                <View style={splashStyles.contain}>
                    <Text style={splashStyles.text}>Loading...</Text>
                </View>
            </LinearGradient >
        )
    }
}
export const splashStyles = StyleSheet.create({
    linearGradient: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 0,
        padding: 16,
        width: deviceWidth,
        height: deviceHeight,
    },
    contain: {
        backgroundColor: 'rgba(0,0,0,0.75)',
    },
    text: {
        color: 'white',
        fontWeight: '500',
        fontSize: 20,
        textAlign: 'center',
        paddingTop: 4,
        paddingBottom: 4,
        paddingLeft: 16,
        paddingRight: 16,
    }
});

export default connect(
    (state) => ({
        status: state.loginIn.status,
        isSuccess: state.loginIn.isSuccess,
        user: state.loginIn.user,
    }),
    (dispatch) => ({
        login: (m, p) => dispatch(loginAction.login(m, p)),
        reLogin: (u) => dispatch(loginAction.reLogin(u)),
    })
)(SplashPage)