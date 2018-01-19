import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList, Platform, TextInput,} from 'react-native';
import {BORDER_COLOR, THEME_BODY_BG, THEME_DARK} from '../../assets/css/color';
import {pageStyles} from '../../assets/css/layout';
import {appService, httpClient} from '../../core/httpInterface';
import {ContactListItem} from './contactListItem';
import CButton from '../common/button';


export class ContactList extends Component {
    pageSize = 5;
    pageNo = 1;
    pageCount = 0;
    timer;
    _listRef;

    constructor(props) {
        super(props);
        this.state = {clear: false, refreshing: false, list: [], loading: false, loaded: true};
    }

    componentDidMount() {
        this.setState({clear: true});
        this.timer = setTimeout(() => {
            this.search();
        }, 2000);

    }

    preSearch() {
        this.setState({
            refreshing: true,
            clear: true,
            list: []
        });
        this.timer = setTimeout(() => {
            this.search();
        }, 500);
    }

    search() {
        if (this.state.loading) {
            return;
        }
        this.setState({loading: true});
        this.pageNo = 1;
        let user = this.props.user;
        let dataString = 'pageSize=' + this.pageSize + '&pageIndex=' + this.pageNo + '&customerId=' + user.Id + '&companyId=' + user.CompanyId;
        dataString += '&customerName=' + (this.keyword ? encodeURIComponent(this.keyword) : '');
        httpClient.post(appService.GetCustomerListByPage, dataString).then(res => {
            if (res.IsSuc && res.Data !== '') {
                let data = JSON.parse(res.Data);
                this.pageCount = data.TotalCount;
                this.setState({
                    refreshing: false, clear: false,
                    loading: false,
                    list: [...this.state.list, ...data.Customer]
                });
            } else {
                this.pageCount = 0;
                this.setState({
                    refreshing: false,
                    loading: false,
                    list: []
                });
            }
        });

    }

    getPageList() {
        if (this.state.list.length >= this.pageCount) {
            return;
        }
        let user = this.props.user;
        let nextPageNo = this.pageNo;
        let dataString = 'pageSize=' + this.pageSize + '&pageIndex=' + nextPageNo + '&customerId=' + user.Id + '&companyId=' + user.CompanyId;
        dataString += '&customerName=' + (this.keyword ? encodeURIComponent(this.keyword) : '');
        httpClient.post(appService.GetCustomerListByPage, dataString).then(res => {
            if (res.IsSuc) {
                let data = JSON.parse(res.Data);
                this.pageCount = data.TotalCount;
                this.pageNo = nextPageNo;
                if (data.Customer && data.Customer.length) {
                    data.Customer.forEach(item => {
                        this.state.list.push(item);
                    });
                }
                this.setState({loading: false});
            } else {
                this.setState({loading: false});
            }
        });
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }

    _onRefresh = () => {
        //设置刷新状态为正在刷新
        this.setState({
            refreshing: true,
            clear: true,
            list: []
        });
        this.timer = setTimeout(() => {
            this.search();
        }, 1000);
    };

    _onEndReached() {
        if (this.state.loading) {
            return;
        }
        if (this.state.list.length >= this.pageCount) {
            return;
        }
        this.setState({loading: true});
        this.timer = setTimeout(() => {
            this.getPageList()
        }, 1000);
    }

    _keyExtractor = (item, index) => item.Id;

    header() {
        return (
            <View style={contactListStyles.listHeader}>
                <TextInput style={contactListStyles.searchInput} autoCapitalize={'none'}
                           underlineColorAndroid={'transparent'}
                           placeholder='联系人姓名' defaultValue={this.keyword}
                           onChangeText={(text) => this.keyword = text}/>
                <CButton style={contactListStyles.searcBtn} title='搜索' onPress={() => this.preSearch()}/>
            </View>
        );
    }

    footer() {
        let footerText = '努力加载中.....';
        if (this.state.list.length >= this.pageCount) {
            footerText = '数据已加载完毕';
        }
        return (
            <View style={contactListStyles.listFooter}><Text>{footerText}</Text></View>
        );
    }

    _renderItem = ({item}) => (
        <ContactListItem style={contactListStyles.listItem}
                         data={item}/>
    );


    render() {
        let threshold = 40;
        if (Platform.OS === 'ios') {
            threshold = 0;
        }
        const endReachedThreshold = threshold;
        if (this.state.clear) {
            let header = this.header();
            let footer = this.footer();
            return (
                <View>
                    {header}
                    {footer}
                </View>
            )
        } else {
            return (
                <FlatList
                    ref={(flatList) => this._listRef = flatList}
                    data={this.state.list}
                    extraData={this.state}
                    keyExtractor={this._keyExtractor}
                    enableEmptySections={true}
                    onEndReached={() => this._onEndReached()} onEndReachedThreshold={endReachedThreshold}
                    onRefresh={() => this._onRefresh()} progressViewOffset={8}
                    refreshing={this.state.refreshing}
                    ListHeaderComponent={this.header()}
                    ListFooterComponent={this.footer()}
                    renderItem={this._renderItem}
                />
            )
        }

    }
}

const contactListStyles = StyleSheet.create({
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
        marginTop: 16,
        padding: 16,
    },
    listHeader: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: THEME_DARK,
        padding: 0,
        height: 32,
        backgroundColor: THEME_BODY_BG
    },
    searchInput: {
        flex: 1,
        paddingTop: 0,
        paddingBottom: 0,
        paddingLeft: 8,
        paddingRight: 8,
        fontSize: 12,
        height: 32,
    },
    searcBtn: {
        flexBasis: 60,
        height: 32,
        margin: 0
    }
});
