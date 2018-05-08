import React from 'react';
import {StackNavigator} from 'react-navigation'; // 路由导航
import {View} from 'react-native';
import {FindAccountPage} from './app/login/findAccountPage';
import {RegPage} from './app/login/regPage';
import {FeedBackPage} from './app/person/feedBackPage';
import LoginPage from './app/login/loginPage';
import SplashPage from './app/main/splashPage';
import {CWebView} from './app/common/webview';
import {MainNavigator} from './app/main/main'; // 主页面路由导航
import {TransitionConfiguration} from './core/transitionConfiguration';
import {StackNavOptions} from './app/common/navigatorOpts';
import UserInfoPage from './app/person/userInfoPage';
import {UpdatePwdPage} from './app/person/updatePwdPage';
import {AsyncStorage} from 'react-native';
import Storage from 'react-native-storage';
import {CorpGroupNavigator} from './app/corpGroup/corpGroup';
import {ImgOcrPage} from './app/person/imgOcrPage';

let getStorage = () => {
    let storage = new Storage({
        size: 10000, // 最大容量，默认值1000条数据循环存储
        storageBackend: AsyncStorage, // 存储引擎：对于RN使用AsyncStorage，对于web使用window.localStorage,如果不指定则数据只会保存在内存中，重启后即丢失
        defaultExpires: 1000 * 3600 * 24 * 30, // 数据过期时间，默认30天（1000 * 3600 * 24 * 30 毫秒），设为null则永不过期
        // 读写时在内存中缓存数据。默认启用。
        enableCache: true,
        sync: {}
    });
    return storage;
};

// 全局变量
if (!global.storage) {
    global.storage = getStorage();
}
global.appVersion = '1.0.0';

const App = StackNavigator({
    Splash: {screen: SplashPage},// 启动页
    Login: {screen: LoginPage}, // 登录页
    Reg: {screen: RegPage}, // 注册页
    MyView: {screen: CWebView}, // webview
    FindAccount: {screen: FindAccountPage}, // 找回密码页
    FeedBack: {screen: FeedBackPage},
    UserInfo: {screen: UserInfoPage},
    UpdatePwd: {screen: UpdatePwdPage},
    ImgOcr: {screen: ImgOcrPage},
    Main: { // 主页面
        screen: MainNavigator, // tab导航配置
        navigationOptions: ({navigation}) => ({
            // header: null // 去头部,
            headerLeft: <View></View>,
            headerRight: <View></View>
        })
    },
    CorpGroup: {screen: CorpGroupNavigator},
}, {
    initialRouteName: 'Splash', // 默认登录页
    headerMode: 'screen',
    navigationOptions: StackNavOptions,
    transitionConfig: TransitionConfiguration
});
export default App;

