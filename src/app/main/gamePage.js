import React, {Component} from 'react';
import {View, ScrollView, Text, StyleSheet, Dimensions, Image} from 'react-native';
import {connect} from 'react-redux';
import {tabStyles, pageStyles} from '../../assets/css/layout';
import {SwiperBox} from '../common/swiper';
import {Games} from '../games/games';
import {THEME_DARK} from "../../assets/css/color";
class GamePage extends Component {
    static navigationOptions = {
        tabBarLabel: '游戏',
        tabBarIcon: ({tintColor}) => (
            <Image
                source={require('../../assets/images/game.png')}
                style={[tabStyles.icon, {tintColor: tintColor}]}
            />
        ),
        headerTitle: '游戏'
    };

    constructor(props) {
        super(props);
    }

    getSwiperData() {
        let banner = ['http://119.29.216.214/attach/b001.jpg', 'http://119.29.216.214/attach/b002.jpg', 'http://119.29.216.214/attach/b003.jpg', 'http://119.29.216.214/attach/b004.jpg'];
        let swiperData = [
            {id: 1, img: banner[0], link: banner[0]},
            {id: 2, img: banner[1], link: banner[1]},
            {id: 3, img: banner[2], link: banner[2]},
            {id: 4, img: banner[3], link: banner[3]}
        ];
        return swiperData;
    }

    getMyAppList() {
        let img = require('../../assets/images/group.png');
        let appList = [
            {id: 1, icon: img, title: '企业圈', link: '', route: 'CorpGroup', color: THEME_DARK},
        ];
        return appList;
    }

    getAppList() {
        let img = 'https://b-ssl.duitang.com/uploads/item/201310/07/20131007112359_VYSfX.thumb.700_0.jpeg';
        let img2 = 'http://image.zhuangku.com/upfile2016/xuexi/20170118/20170118162032_0187.jpg';
        let img3 = 'http://www.jvnan.com/uploads/allimg/170205/142HMZ1-1.jpg';
        let img4 = 'http://news.cnhubei.com/xw/yl/201510/W020151022539153479356.jpg';
        let img5 = 'http://www.hxw163.com/uploadfile/2016/0829/20160829022325111.jpg';
        let appList = [
            {id: 1, icon: {uri: img}, title: '图标1', link: img},
            {id: 2, icon: {uri: img2}, title: '图标2', link: img2},
            {id: 3, icon: {uri: img3}, title: '图标3', link: img3},
            {id: 4, icon: {uri: img4}, title: '图标4', link: img4},
            {id: 5, icon: {uri: img5}, title: '图标5', link: img5},
        ];
        return appList;
    }

    render() {
        let swiperData = this.getSwiperData();
        let myAppList = this.getMyAppList();
        let appList = this.getAppList();
        return (
            <ScrollView style={[pageStyles.body, {padding: 0}]}>
                <SwiperBox data={swiperData} navigation={this.props.navigation}/>
                <Games data={myAppList} navigation={this.props.navigation}/>
                <Games groupName={'第三方服务'} data={appList} navigation={this.props.navigation}/>
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