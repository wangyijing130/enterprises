import React, {Component} from 'react';
import {View, Image} from 'react-native';
import {connect} from 'react-redux';
import {tabStyles} from '../assets/css/layout';
import {MessageList} from '../message/messageList';


class MessagePage extends Component {
    static navigationOptions = {
        tabBarLabel: '留言',
        tabBarIcon: ({tintColor}) => (
            <Image
                source={require('../assets/images/message.png')}
                style={[tabStyles.icon, {tintColor: tintColor}]}
            />
        ),
        headerTitle: '留言'
    };


    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.user && this.props.user.nikeName) {

        }
        return (
            <MessageList/>
        )
    }
}


export default connect(
    (state) => ({
        status: state.loginIn.status,
        isSuccess: state.loginIn.isSuccess,
        user: state.loginIn.user
    }),
    (dispatch) => ({})
)(MessagePage)