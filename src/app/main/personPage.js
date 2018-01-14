import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';
import {THEME, THEME_BODY_BG} from '../../assets/css/color';
import CButton from '../common/button';
import {layoutStyles, tabStyles} from '../../assets/css/layout';
import {PersonHeader} from '../person/personHeader';
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

    logout() {
        global.storage.remove({key: 'user'});
        this.props.navigation.dispatch(resetAction)
    }

    openView() {
        let url = 'http://mp.weixin.qq.com/s?__biz=MzI0MTAxOTAxOA==&mid=503121680&idx=1&sn=777c9f605fe2fba6e055718f2db7efaf&chksm=711856f5466fdfe38c339e3557b6df34ce433ce701661af45026bf50586559228b67782eb967&scene=18';
        this.props.navigation.navigate('MyView', {url: url, title: '哈哈哈'});
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <PersonHeader user={this.props.user} />
                <PersonMenu user={this.props.user} navigation={this.props.navigation}/>
                <CButton style={layoutStyles.my3} title={'打开百度'} onPress={() => this.openView()}/>
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
    (state) => ({
        status: state.loginIn.status,
        isSuccess: state.loginIn.isSuccess,
        user: state.loginIn.user
    }),
    (dispatch) => ({})
)(PersonPage)