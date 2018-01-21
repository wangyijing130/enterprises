import React, {Component} from 'react';
import {StyleSheet, Image, ScrollView, Text} from 'react-native';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';
import {THEME_BODY_BG} from '../../assets/css/color';
import {tabStyles} from '../../assets/css/layout';
import PersonHeader from '../person/personHeader';
import {PersonMenu} from '../person/personMenu';

// 清空导航记录，跳转到登录页
const resetAction = NavigationActions.reset({
    index: 0,
    actions: [
        NavigationActions.navigate({routeName: 'Login'})
    ]
});

class PersonPage extends Component {
    static navigationOptions = {
        tabBarLabel: '我的',
        tabBarIcon: ({tintColor}) => (
            <Image
                source={require('../../assets/images/person.png')}
                style={[tabStyles.icon, {tintColor: tintColor}]}
            />
        ),
        headerTitle: '我的'
    };

    constructor(props) {
        super(props);
    }


    render() {
        return (
            <ScrollView style={styles.container}>
                <PersonHeader/>
                <PersonMenu user={this.props.user} navigation={this.props.navigation}/>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    icon: {
        width: 26,
        height: 26,
    },
    container: {
        padding: 0,
        backgroundColor: THEME_BODY_BG
    }
});

export default connect(
    (state) => {
        return {
            status: state.loginIn.status,
            isSuccess: state.loginIn.isSuccess,
            user: state.loginIn.user,
            error: state.loginIn.error,
            // NickName: state.loginIn.user && state.loginIn.user.NickName
        }
    },
    (dispatch) => ({
        login: (m, p) => dispatch(loginAction.login(m, p)),
        reLogin: (u) => dispatch(loginAction.reLogin(u)),
    })
)(PersonPage)