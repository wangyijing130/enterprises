import React, {Component} from 'react';
import {View, Image, Text} from 'react-native';
import {connect} from 'react-redux';
import {tabStyles} from '../../assets/css/layout';


export class CorpGroupPage extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View><Text>{this.props.navigation.state.key}</Text></View>
        )
    }
}

