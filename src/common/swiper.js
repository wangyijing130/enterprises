import React, {Component} from 'react';
import {
    View, StyleSheet, Image,
    Platform, Touchable,
    TouchableOpacity,
    TouchableNativeFeedback,
} from 'react-native';
import Swiper from 'react-native-swiper';
import {THEME_LIGHT} from '../assets/css/color';
export class SwiperBox extends Component {

    constructor(props) {
        super(props);
        this.state = {
            swiperShow: false,
        };
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({swiperShow: true});
        }, 0)
    }

    openLink(item) {
        if (item.link) {
            this.props.navigation.navigate('MyView', {url: item.link, title: item.title ? item.title : '链接'});
            return;
        }
    }

    renderList(data) {
        return data.map(item => this.renderItem(item));
    }

    renderItem(item) {
        const Touchable = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;
        return (
            <Touchable key={item.id} onPress={() => this.openLink(item)}>
                <View style={style.swiperItem}>
                    <Image style={style.img} resizeMode='contain'
                           source={{uri: item.img}}
                    />
                </View>
            </Touchable>
        );
    }


    render() {
        let data = this.props.data || [];
        if (this.state.swiperShow && data.length) {
            return (
                <View style={style.wrapper}>
                    <Swiper style={style.swiper} autoplay={true} autoplayTimeout={10} activeDotColor='#fff'
                            paginationStyle={{bottom: 1}}>
                        {this.renderList(data)}
                    </Swiper>
                </View>
            );
        } else {
            return (
                <View style={style.wrapper}>
                    <View style={style.swiper}>
                        <Image style={style.img} resizeMode='contain'
                               source={{uri: 'https://b-ssl.duitang.com/uploads/item/201310/07/20131007112359_VYSfX.thumb.700_0.jpeg'}}
                        />
                    </View>
                </View>
            );
        }
    }
}


const style = StyleSheet.create({
    wrapper: {
        height: 128,
        backgroundColor: THEME_LIGHT, elevation: 4
    },
    swiper: {
        // height: 128,
    },
    swiperItem: {
        // height: 125,
    },
    img: {
        height: 128,
    },

});