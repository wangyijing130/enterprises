import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList, Platform,} from 'react-native';
import {BORDER_COLOR, THEME, THEME_BODY_BG, THEME_DARK} from '../../assets/css/color';
import {MessageListItem} from './messageItem';


export class MessageList extends Component {
    pageSize = 30;
    pageNo = 1;
    pageCount = 0;
    timer;

    constructor(props) {
        super(props);
        this.state = {refreshing: false, list: [], loading: false, loaded: true};
    }

    componentDidMount() {
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }

    _onRefresh = () => {
        this.setState({
            refreshing: true,
        });
        //设置刷新状态为正在刷新
        this.setState({
            refreshing: true,
        });
    };

    _onEndReached() {
        if (this.state.loading) {
            return;
        }
        this.setState({loading: true});
    }

    _keyExtractor = (item, index) => index;


    render() {
        let threshold = 40;
        if (Platform.OS === 'ios') {
            threshold = 0;
        }
        const endReachedThreshold = threshold;
        let footerText = '我也是有底线的';
        if (this.state.list.length >= this.pageCount) {
            footerText = '数据已加载完毕';
        }
        let Footer = <View
            style={msgListStyles.listFooter}><Text>{footerText}</Text></View>;
        return (
            <FlatList data={this.state.list}
                      keyExtractor={this._keyExtractor}
                      enableEmptySections={true}
                      onEndReached={() => this._onEndReached()} onEndReachedThreshold={endReachedThreshold}
                      onRefresh={() => this._onRefresh()} progressViewOffset={8}
                      refreshing={this.state.refreshing}
                      ListFooterComponent={Footer}
                      renderItem={({item}) => <MessageListItem style={msgListStyles.listItem}
                                                               data={item}/>}
            />
        )
    }
}

const msgListStyles = StyleSheet.create({
    listItem: {
        marginTop: 8,
        marginBottom: 8
    },
    listFooter: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopWidth: 1,
        borderColor: BORDER_COLOR,
    }
});
