import React from 'react';
import {TabNavigator} from 'react-navigation';
import {THEME, THEME_LIGHT} from '../assets/css/color';
import MessagePage from './messagePage';
import ContactPage from './contactPage';
import GamePage from './gamePage';
import PersonPage from './personPage';

export const MainNavigator = TabNavigator({
        Message: {screen: MessagePage}, // 留言
        Contact: {screen: ContactPage}, // 通讯录
        Game: {screen: GamePage}, // 游戏
        Person: {screen: PersonPage} // 个人中心
    }, {
        tabBarPosition: 'bottom', // 标签显示在底部
        swipeEnabled: false,
        tabBarOptions: {
            activeTintColor: 'white',
            style: {
                backgroundColor: THEME,
                // borderTopWidth: 0.5,
                // borderTopColor: '#ccc',
                zIndex: 1
            },
            indicatorStyle: {height: 0}, // 去掉安卓下划线
            tabStyle: {
                paddingTop: 4,
                paddingBottom: 4,
            },
            labelStyle: {
                margin: 0
            },
            // lazy: true, // 延迟加载
            showIcon: true  // 显示图标
        }
    }
);