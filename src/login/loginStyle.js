import React from 'react';
import {StyleSheet,} from 'react-native';
import {THEME, THEME_LABEL, THEME_BACKGROUND, THEME_LIGHT, THEME_TEXT} from '../assets/css/color';

export const loginStyles = StyleSheet.create({
    body: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        padding: 20,
        backgroundColor: THEME_BACKGROUND
    },
    container: {
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 20
    },

    textInput: {
        borderBottomWidth: 1,
        borderColor: THEME_LIGHT,
        paddingTop: 2,
        paddingBottom: 2,
        marginTop: 4,
        marginBottom: 4
    },
    submitButton: {
        marginTop: 32
    }
});