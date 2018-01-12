import React from 'react';
import {StackNavigator} from 'react-navigation'; // 路由导航
import {View} from 'react-native';
import {FindAccountPage} from './login/findAccountPage';
import {RegPage} from './login/regPage';
import {FeedBackPage} from './person/feedBackPage';
import LoginPage from './login/loginPage';
import {CWebView} from './common/webview';
import {MainNavigator} from './main/main'; // 主页面路由导航
import storage from './common/storage'; // 本地存储全局对象
import {TransitionConfiguration} from './common/transitionConfiguration';
import {StackNavOptions} from './common/navigatorOpts';
import {UserInfoPage} from './person/userInfoPage';
import {UpdatePwdPage} from './person/updatePwdPage';


const App = StackNavigator({
    Login: {screen: LoginPage}, // 登录页
    Reg: {screen: RegPage}, // 注册页
    MyView: {screen: CWebView}, // webview
    FindAccount: {screen: FindAccountPage}, // 找回密码页
    FeedBack: {screen: FeedBackPage},
    UserInfo: {screen: UserInfoPage},
    UpdatePwd: {screen: UpdatePwdPage},
    Main: { // 主页面
        screen: MainNavigator, // tab导航配置
        navigationOptions: ({navigation}) => ({
            // header: null // 去头部,
            headerLeft: <View></View>,
            headerRight: <View></View>
        })
    },
}, {
    initialRouteName: 'Login', // 默认登录页
    headerMode: 'screen',
    navigationOptions: StackNavOptions,
    transitionConfig: TransitionConfiguration
});
export default App;