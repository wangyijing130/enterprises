import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, Text, StyleSheet, Image,} from 'react-native';
import {THEME_BG} from '../../assets/css/color';
import {uploadRoot} from '../../core/httpInterface';

class PersonHeader extends Component {
    photoSource;
    showName;

    constructor(props) {
        super(props);
    }

    render() {
        let photoSource = require('../../assets/images/person.png');
        return (
            <View style={phStyles.container}>
                <View style={phStyles.headerBox}>
                    <View style={phStyles.headerImg}>
                        <Image style={{flex: 1}}
                               source={this.props.user.Photo ? {uri: uploadRoot + this.props.user.Photo} : photoSource}/>
                    </View>
                    <View style={phStyles.headerInfo}>
                        <View style={phStyles.viewCenter}>
                            <Text
                                style={phStyles.textLeft}>{this.props.user && (this.props.user.NickName ? this.props.user.NickName : this.props.user.CustomerName)}</Text>
                        </View>
                        <View style={phStyles.viewCenter}>
                            <Text style={phStyles.textLeft}>{this.props.user && this.props.user.Tel }</Text>
                        </View>
                        <View style={phStyles.viewCenter}>
                            <Text style={phStyles.textLeft}>{this.props.user && this.props.user.CompanyName }</Text>
                        </View>
                    </View>
                </View>
                <View style={phStyles.userInfo}>
                    <View style={phStyles.viewCenter}>
                        <Text style={phStyles.textCenter}>积分:1</Text>
                    </View>
                    <View style={phStyles.viewCenter}>
                        <Text style={phStyles.textCenter}>虚拟币:1</Text>
                    </View>
                    <View style={phStyles.viewCenter}>
                        <Text style={phStyles.textCenter}>VIP:1</Text>
                    </View>
                </View>
            </View>
        )
    }

}

export default connect(
    (state) => ({
        status: state.loginIn.status,
        isSuccess: state.loginIn.isSuccess,
        user: state.loginIn.user,
        error: state.loginIn.error,
    }),
    (dispatch) => ({})
)(PersonHeader)

const phStyles = StyleSheet.create({
        container: {
            backgroundColor: THEME_BG,
            elevation: 4,
            paddingTop: 8,
            paddingBottom: 8,
            paddingLeft: 8,
            paddingRight: 8,
            // height: 136,
        },
        headerBox: {
            flexDirection: 'row',
            justifyContent: 'center',
            height: 96,
        },
        headerImg: {
            flexBasis: 96,
            width: 96,
            height: 96,
            borderRadius: 48,
            overflow: 'hidden',
        },
        headerInfo: {
            flex: 1,
            height: 96,
            flexDirection: 'column',
            justifyContent: 'center',
            paddingLeft: 16,
        },
        userInfo: {
            paddingLeft: 8,
            paddingRight: 8,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        textLeft: {
            color: 'white',
            fontSize: 14,
            textAlign: 'left',
        },
        textCenter: {
            color: 'white',
            fontSize: 14,
            textAlign: 'center',
        },
        viewCenter: {
            paddingLeft: 16,
            paddingRight: 16,
            height: 32,
            flexDirection: 'column',
            justifyContent: 'center',
        }
    })
;