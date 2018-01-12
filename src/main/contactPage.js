import React, {Component} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {connect} from 'react-redux';
import {THEME_BODY_BG} from '../assets/css/color';


class ContactPage extends Component {
    static navigationOptions = {
        tabBarLabel: '通讯录',
        tabBarIcon: ({tintColor}) => (
            <Image
                source={require('../assets/images/notify.png')}
                style={[styles.icon, {tintColor: tintColor}]}
            />
        ),
        headerTitle: '通讯录'
    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={{fontSize: 20}}>欢迎来到ContactPage！</Text>
                <Image
                    source={require('../assets/images/notify.png')}
                    style={[{position: 'absolute', zIndex: 999, bottom: -20, left: 100, width: 46, height: 46}]}
                />
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
        backgroundColor: THEME_BODY_BG
    }
});

export default connect(
    (state) => ({
        status: state.loginIn.status,
        isSuccess: state.loginIn.isSuccess,
        user: state.loginIn.user
    }),
    (dispatch) => ({})
)(ContactPage)