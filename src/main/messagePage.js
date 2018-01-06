import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, SectionList, FlatList} from 'react-native';
import {connect} from 'react-redux';
import {THEME, THEME_BACKGROUND} from '../assets/css/color';


class MessagePage extends Component {
    static navigationOptions = {
        tabBarLabel: '留言',
        tabBarIcon: ({tintColor}) => (
            <Image
                source={require('../assets/images/message.png')}
                style={[styles.icon, {tintColor: tintColor}]}
            />
        ),
        headerTitle: '留言'
    };


    render() {
        return (
            <View style={styles.container}>
                <Text style={{fontSize: 20}}>欢迎来到MessagePage！</Text>

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
        padding: 20,
        backgroundColor: THEME_BACKGROUND
    },
    sectionHeader: {
        paddingTop: 2,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 2,
        fontSize: 14,
        fontWeight: 'bold',
        backgroundColor: 'rgba(247,247,247,1.0)',
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    }
});

export default connect(
    (state) => ({
        status: state.loginIn.status,
        isSuccess: state.loginIn.isSuccess,
        user: state.loginIn.user
    }),
    (dispatch) => ({})
)(MessagePage)