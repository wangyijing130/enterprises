import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, FlatList, Platform} from 'react-native';
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

    constructor(props) {
        super(props);
        this.props.pageSize = 30;
        this.state = {pageNo: 1, refreshing: false, list: []};
    }

    componentDidMount() {
        /*let page_no = 1;
        let url = 'http://120.24.68.187:8080/api.php?act=showdiamonds&openid=D09AC4E940143EF6D26A627FDF9F07C5&pagejsnum=' + this.props.pageSize + '&actype=json&useropt=0|210|0|210||210||210';
        url += '&s=0' + (page_no * this.props.pageSize);
        fetch(url, {
            method: 'GET'
        }).then((response) => {
            let str = '' + JSON.stringify(response);
            let s = str.indexOf('var jsondata = ') + 15;
            let e = str.indexOf('];') + 1;
            let jsonText = str.substring(s, e).replace(/\\/g, '');
            let json = JSON.parse(jsonText);
            json.splice(0, 1);
            //更新状态机
            this.setState({
                list: json
            });
        }).catch((error) => {
            if (error) {
                console.log('error', error);
            }
        });*/
    }

    onRefresh() {
       /* console.warn('onRefresh');
        this.setState({
            refreshing: true,
        });
        const timer = setTimeout(() => {
            clearTimeout(timer);
            let page_no = 1;
            let url = 'http://120.24.68.187:8080/api.php?act=showdiamonds&openid=D09AC4E940143EF6D26A627FDF9F07C5&pagejsnum=' + this.props.pageSize + '&actype=json&useropt=0|210|0|210||210||210';
            url += '&s=0' + (page_no * this.props.pageSize);
            fetch(url, {
                method: 'GET'
            }).then((response) => {
                let str = '' + JSON.stringify(response);
                let s = str.indexOf('var jsondata = ') + 15;
                let e = str.indexOf('];') + 1;
                let jsonText = str.substring(s, e).replace(/\\/g, '');
                let json = JSON.parse(jsonText);
                json.splice(0, 1);
                this.setState({
                    pageNo: 1,
                    refreshing: false,
                    list: json
                });
            }).catch((error) => {
                if (error) {
                    console.log('error', error);
                }
            });
        }, 1500);*/
    }

    onEndReached() {
        /*console.warn('getNext');
        const timer = setTimeout(() => {
            clearTimeout(timer);
            let page_no = this.state.pageNo + 1;
            let url = 'http://120.24.68.187:8080/api.php?act=showdiamonds&openid=D09AC4E940143EF6D26A627FDF9F07C5&pagejsnum=' + this.props.pageSize + '&actype=json&useropt=0|210|0|210||210||210';
            url += '&s=0' + (page_no * this.props.pageSize);
            fetch(url, {
                method: 'GET'
            }).then((response) => {
                let str = '' + JSON.stringify(response);
                let s = str.indexOf('var jsondata = ') + 15;
                let e = str.indexOf('];') + 1;
                let jsonText = str.substring(s, e).replace(/\\/g, '');
                let json = JSON.parse(jsonText);
                json.splice(0, 1);
                json.forEach(item => {
                    this.state.list.push(item);
                });
                this.setState({
                    pageNo: page_no
                });
            }).catch((error) => {
                if (error) {
                    console.log('error', error);
                }
            });
        }, 1500);*/
    }


    _keyExtractor = (item, index) => index;
    header = () => {
        return (
            <Text style={{
                backgroundColor: '#4398ff',
                color: 'white',
                fontSize: 18,
                textAlign: 'center',
                textAlignVertical: 'center',
                height: 150,
            }}>我是头布局</Text>
        )
    };

    footer = () => {
        return (
            <Text style={{
                backgroundColor: '#4398ff',
                color: 'white',
                fontSize: 18,
                textAlign: 'center',
                textAlignVertical: 'center',
                height: 150,
            }}>我是footer</Text>
        )
    };

    render() {
        let threshold = 0.1;
        if (Platform.OS === 'ios') {
            threshold = 0;
        }
        const endReachedThreshold = threshold;
        return (
            <View style={styles.container}>
                <Text style={{fontSize: 20}}>欢迎来到MessagePage！</Text>
                <FlatList data={this.state.list} keyExtractor={this._keyExtractor}
                         // onEndReached={this.onEndReached()} onEndReachedThreshold={endReachedThreshold}
                         // onRefresh={this.onRefresh()} refreshing={this.state.refreshing}
                          ListHeaderComponent={this.header} ListFooterComponent={this.footer}
                          renderItem={({item}) => <Text style={styles.item}>{item.HH + '_' + item.ReportNo}</Text>}
                />
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