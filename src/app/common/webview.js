import React, {Component} from 'react';
import {WebView, StyleSheet, View} from 'react-native';
import {THEME, THEME_BODY_BG} from '../../assets/css/color';
export class CWebView extends Component {

    static navigationOptions = ({navigation}) => ({
        title: `${navigation.state.params.title}`,
    });

    constructor(props) {
        super(props);
    }

    goBack = () => {
        this.refs['webview'].goBack();
    };

    goForward = () => {
        this.refs['webview'].goForward();
    };

    reload = () => {
        this.refs['webview'].reload();
    };

    render() {
        const url = this.props.navigation.state.params.url;
        return (
            <View style={styles.container}>
                <WebView ref={'webview'} style={styles.webView}
                         source={{uri: url}}
                         javaScriptEnabled={true}
                         domStorageEnabled={true}
                />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: THEME_BODY_BG,
    },
    webView: {
        backgroundColor: THEME_BODY_BG,
        marginTop: 1,
        borderColor: THEME,
        borderWidth: 1
    },
});