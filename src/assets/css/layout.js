import React from 'react';
import {StyleSheet} from 'react-native';
import {THEME, THEME_BODY_BG} from './color';
export const layoutStyles = StyleSheet.create({
    mb1: {
        marginBottom: 4
    },
    mb2: {
        marginBottom: 8
    },
    mb3: {
        marginBottom: 16
    },
    mt1: {
        marginTop: 4
    },
    mt2: {
        marginTop: 8
    },
    mt3: {
        marginTop: 16
    },
    my1: {
        marginTop: 4,
        marginBottom: 4
    },
    my2: {
        marginTop: 8,
        marginBottom: 8
    },
    my3: {
        marginTop: 16,
        marginBottom: 16
    },
    toast: {
        borderRadius: 2,
        padding: 8
    }
});
export const tabStyles = StyleSheet.create({
    icon: {
        width: 26,
        height: 26,
    }
});
export const pageStyles = StyleSheet.create({
    body: {
        /*flex: 1,
         flexDirection: 'column',
         justifyContent: 'flex-start',*/
        padding: 16,
        backgroundColor: THEME_BODY_BG
    }
});
