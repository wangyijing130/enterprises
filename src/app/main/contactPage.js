import React, {Component} from 'react';
import {StyleSheet, Image} from 'react-native';
import {connect} from 'react-redux';
import {ContactList} from "../contact/contactList";


class ContactPage extends Component {
    static navigationOptions = {
        tabBarLabel: '通讯录',
        tabBarIcon: ({tintColor}) => (
            <Image
                source={require('../../assets/images/notify.png')}
                style={[styles.icon, {tintColor: tintColor}]}
            />
        ),
        headerTitle: '通讯录'
    };

    render() {
        return (
            <ContactList user={this.props.user}/>
        )
    }
}

const styles = StyleSheet.create({
    icon: {
        width: 26,
        height: 26,
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