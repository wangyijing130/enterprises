import React, {Component} from 'react';
import {View, ScrollView, Text, StyleSheet, Dimensions, Image} from 'react-native';
import {connect} from 'react-redux';
import {tabStyles, pageStyles} from '../assets/css/layout';
import {SwiperBox} from '../common/swiper';
class GamePage extends Component {
    static navigationOptions = {
        tabBarLabel: '游戏',
        tabBarIcon: ({tintColor}) => (
            <Image
                source={require('../assets/images/game.png')}
                style={[tabStyles.icon, {tintColor: tintColor}]}
            />
        ),
        headerTitle: '游戏'
    };

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <ScrollView style={[pageStyles.body, {padding: 0}]}>
                <SwiperBox/>
                <View><Text>123213</Text></View>
            </ScrollView>
        );
    }
}


const style = StyleSheet.create({});

export default connect(
    (state) => ({
        status: state.loginIn.status,
        isSuccess: state.loginIn.isSuccess,
        user: state.loginIn.user
    }),
    (dispatch) => ({})
)(GamePage)