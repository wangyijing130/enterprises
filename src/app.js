import React from 'react';
import {StackNavigator} from 'react-navigation'; // 路由导航
import {View} from 'react-native';
import {FindAccountPage} from './login/findAccountPage';
import {RegPage} from './login/regPage';
import LoginPage from './login/loginPage';
import {MainNavigator} from './main/main'; // 主页面路由导航
import storage from './common/storage'; // 本地存储全局对象
import {THEME} from './assets/css/color';
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';

// 页面切换动画配置,统一默认水平切换，如果单个页面需要垂直切换，页面内调用 this.props.navigate('xxx', { transition: 'forVertical' });
const TransitionConfiguration = () => ({
    screenInterpolator: (sceneProps) => {
        const {scene} = sceneProps;
        const {route} = scene;
        const params = route.params || {};
        const transition = params.transition || 'forHorizontal';
        return CardStackStyleInterpolator[transition](sceneProps);
    },
});
const App = StackNavigator({
    Login: {screen: LoginPage}, // 登录页
    Reg: {screen: RegPage}, // 注册页
    FindAccount: {screen: FindAccountPage}, // 找回密码页
    Main: { // 主页面
        screen: MainNavigator, // tab导航配置
        navigationOptions: ({navigation}) => ({
            // header: null // 去头部,
            headerLeft: <View></View>,
            headerRight: <View></View>
        })
    }
}, {
    initialRouteName: 'Login', // 默认登录页
    headerMode: 'screen',
    navigationOptions: {
        gesturesEnabled: true,
        headerTintColor: 'white',
        headerStyle: {
            backgroundColor: THEME,
            height: 44,
        },
        headerTitleStyle: {
            fontSize: 16,
            alignSelf: 'center'
        },
        headerRight: <View></View>
    },
    transitionConfig: TransitionConfiguration
});
export default App;