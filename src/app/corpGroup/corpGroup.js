import React from 'react';
import {TabNavigator} from 'react-navigation';
import {THEME, THEME_BODY_BG, THEME_LIGHT} from '../../assets/css/color';
import {CorpGroupPage} from './corpGroupPage';

export const CorpGroupNavigator = TabNavigator({
        CorpGroupPage1: {screen: CorpGroupPage, navigationOptions: {title: '企业圈', tabBarLabel: '天之道岳麓店'}},
        CorpGroupPage2: {screen: CorpGroupPage, navigationOptions: {title: '企业圈', tabBarLabel: '银源科技'}},
    }, {
        tabBarPosition: 'top', // 标签显示在顶部
        swipeEnabled: false,
        tabBarOptions: {
            activeTintColor: 'white',
            style: {
                backgroundColor: 'white',
                // borderTopWidth: 0.5,
                // borderTopColor: '#ccc',
                zIndex: 1
            },
            // indicatorStyle: {height: 0}, // 去掉安卓下划线
            tabStyle: {
                paddingTop: 12,
                paddingBottom: 12,
            },
            labelStyle: {
                margin: 0,
                color: THEME,
            },
            // lazy: true, // 延迟加载
            showIcon: false  // 显示图标
        }
    }
);