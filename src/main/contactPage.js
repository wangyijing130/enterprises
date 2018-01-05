import React, {Component} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {connect} from 'react-redux';
import {THEME_BACKGROUND} from '../assets/css/color';


class ContactPage extends Component {
    static navigationOptions = {
        tabBarLabel: '通讯录',
        tabBarIcon: ({tintColor}) => (
            <Image
                source={require('../assets/images/notify.png')}
                style={[styles.icon, {tintColor: tintColor}]}
            />
        ),
    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={{fontSize: 20}}>欢迎来到ContactPage！</Text>
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
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: THEME_BACKGROUND
    }
});

export default connect(
    (state) => ({
        user: state.user
    }),
    (dispatch) => ({})
)(ContactPage)