import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList, Platform,} from 'react-native';
import {THEME, THEME_BACKGROUND} from '../assets/css/color';
import {layoutStyles, pageStyles} from '../assets/css/layout';
import Toast from 'react-native-easy-toast';
import {MessageItem} from '../message/messageItem';


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
        let page_no = 1;
        let url = 'http://120.24.68.187:8080/api.php?act=showdiamonds&openid=D09AC4E940143EF6D26A627FDF9F07C5&pagejsnum=' + this.pageSize + '&actype=json&useropt=0|210|0|210||210||210';
        url += '&s=0' + (page_no * this.pageSize);
        fetch(url, {
            method: 'GET'
        }).then((response) => {
            let pageData = this.formatResponse(response);
            //更新状态机
            this.setState({
                list: pageData
            });
        }).catch((error) => {
            if (error) {
                console.log('error', error);
            }
        });
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }

    formatResponse(response) {
        let str = '' + JSON.stringify(response);
        let s = str.indexOf('var jsondata = ') + 15;
        let e = str.indexOf('];') + 1;
        let jsonText = str.substring(s, e).replace(/\\/g, '');
        let json = JSON.parse(jsonText);
        let pageInfo = json.splice(0, 1);
        this.pageCount = pageInfo.show_page;
        return json;
    }

    _onRefresh = () => {
        this.setState({
            refreshing: true,
        });
        //设置刷新状态为正在刷新
        this.setState({
            refreshing: true,
        });
        this.timer = setTimeout(() => {
            let page_no = 1;
            let url = 'http://120.24.68.187:8080/api.php?act=showdiamonds&openid=D09AC4E940143EF6D26A627FDF9F07C5&pagejsnum=' + this.pageSize + '&actype=json&useropt=0|210|0|210||210||210';
            url += '&s=0' + (page_no * this.pageSize);
            fetch(url, {
                method: 'GET'
            }).then((response) => {
                let pageData = this.formatResponse(response);
                this.setState({
                    refreshing: false,
                    list: pageData
                });
            }).catch((error) => {
                if (error) {
                    console.log('error', error);
                }
            });
        }, 1000);
    };

    _onEndReached() {
        if (this.state.loading) {
            return;
        }
        this.setState({loading: true});
        this.timer = setTimeout(() => {
            let page_no = this.pageNo + 1;
            let url = 'http://120.24.68.187:8080/api.php?act=showdiamonds&openid=D09AC4E940143EF6D26A627FDF9F07C5&pagejsnum=' + this.pageSize + '&actype=json&useropt=0|210|0|210||210||210';
            url += '&s=0' + (page_no * this.pageSize);
            fetch(url, {
                method: 'GET'
            }).then((response) => {
                let pageData = this.formatResponse(response);
                pageData.forEach(item => {
                    this.state.list.push(item);
                });
                this.pageNo = page_no;
                this.setState({loading: false});
            }).catch((error) => {
                if (error) {
                    console.log('error', error);
                }
            });
        }, 1000);
    }

    _keyExtractor = (item, index) => index;

    render() {
        let threshold = 0.1;
        if (Platform.OS === 'ios') {
            threshold = 0;
        }
        const endReachedThreshold = threshold;
        return (
            <View style={[pageStyles.body, {paddingLeft: 0, paddingRight: 0}]}>
                <Toast ref='toast' style={layoutStyles.toast} position={'bottom'}/>
                <FlatList data={this.state.list}
                          keyExtractor={this._keyExtractor}
                          onEndReached={() => this._onEndReached()} onEndReachedThreshold={endReachedThreshold}
                          onRefresh={() => this._onRefresh()} progressViewOffset={64}
                          refreshing={this.state.refreshing}
                          renderItem={({item}) => <MessageItem style={msgListStyles.listItem}
                                                               data={item}/>}
                />
            </View>
        )
    }
}

const msgListStyles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: THEME_BACKGROUND
    },
    listItem: {
        marginBottom: 16
    }
});
