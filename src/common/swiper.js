import React, {Component} from 'react';
import {View, StyleSheet, Image} from 'react-native';
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

    render() {
        if (this.state.swiperShow) {
            return (
                <View style={style.wrapper}>
                    <Swiper style={style.swiper} autoplay={true} autoplayTimeout={10} activeDotColor='#fff'
                            paginationStyle={{bottom: 1}}>
                        <View style={style.swiperItem}>
                            <Image style={style.img} resizeMode='contain'
                                   source={{uri: 'https://b-ssl.duitang.com/uploads/item/201310/07/20131007112359_VYSfX.thumb.700_0.jpeg'}}
                            />
                        </View>
                        <View style={style.swiperItem}>
                            <Image style={style.img} resizeMode='contain'
                                   source={{uri: 'https://b-ssl.duitang.com/uploads/item/201310/07/20131007112359_VYSfX.thumb.700_0.jpeg'}}
                            />
                        </View>
                        <View style={style.swiperItem}>
                            <Image style={style.img} resizeMode='contain'
                                   source={{uri: 'https://b-ssl.duitang.com/uploads/item/201310/07/20131007112359_VYSfX.thumb.700_0.jpeg'}}
                            />
                        </View>
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