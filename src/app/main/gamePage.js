import React, {Component} from 'react';
import {View, ScrollView, Text, StyleSheet, Dimensions, Image} from 'react-native';
import {connect} from 'react-redux';
import {tabStyles, pageStyles} from '../../assets/css/layout';
import {SwiperBox} from '../common/swiper';
import {Games} from '../games/games';
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

    render() {
        let img = 'https://b-ssl.duitang.com/uploads/item/201310/07/20131007112359_VYSfX.thumb.700_0.jpeg';
        let swiperData = [
            {id: 1, img: img, link: img},
            {id: 2, img: img, link: img},
            {id: 3, img: img, link: img},
            {id: 4, img: img, link: img},
            {id: 5, img: img, link: img}
        ];
        let img2 = 'http://image.zhuangku.com/upfile2016/xuexi/20170118/20170118162032_0187.jpg';
        let img3 = 'http://www.jvnan.com/uploads/allimg/170205/142HMZ1-1.jpg';
        let img4 = 'http://news.cnhubei.com/xw/yl/201510/W020151022539153479356.jpg';
        let img5 = 'http://www.hxw163.com/uploadfile/2016/0829/20160829022325111.jpg';
        let img6 = 'http://news.lznews.cn/hpyule/201711/W020171116521048711933.jpg';
        let appList = [
            {id: 1, icon: img, title: '图标1', link: img},
            {id: 2, icon: img2, title: '图标2', link: img2},
            {id: 3, icon: img3, title: '图标3', link: img3},
            {id: 4, icon: img4, title: '图标4', link: img4},
            {id: 5, icon: img5, title: '图标5', link: img5},
            {id: 6, icon: img6, title: '图标6', link: img6},
            {id: 7, icon: img, title: '图标7', link: img},
            {id: 8, icon: img2, title: '图标8', link: img2},
            {id: 9, icon: img3, title: '图标9', link: img3},
            {id: 10, icon: img4, title: '图标10', link: img4},
        ];
        return (
            <ScrollView style={[pageStyles.body, {padding: 0}]}>
                <SwiperBox data={swiperData} navigation={this.props.navigation}/>
                <Games data={appList} navigation={this.props.navigation}/>
                <Games groupName={'第三方服务'}  data={appList} navigation={this.props.navigation}/>
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