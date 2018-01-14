import React from 'react';
import {View} from 'react-native';
import {THEME} from '../../assets/css/color';

export const StackNavOptions = {
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
};
export const StackNavOptionsHasRight = {
    gesturesEnabled: true,
    headerTintColor: 'white',
    headerStyle: {
        backgroundColor: THEME,
        height: 44,
    },
    headerTitleStyle: {
        fontSize: 16,
        alignSelf: 'center'
    }
};