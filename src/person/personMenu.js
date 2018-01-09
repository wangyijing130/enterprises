import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Touchable,
    TouchableOpacity,
    TouchableNativeFeedback,
    Platform
} from 'react-native';
import {THEME_TEXT} from '../assets/css/color';
import {NavigationActions} from 'react-navigation';
const resetAction = NavigationActions.reset({
    index: 0,
    actions: [
        NavigationActions.navigate({routeName: 'Login'})
    ]
});
export class PersonMenu extends Component {
    constructor(props) {
        super(props);
    }

    doLogout() {
        global.storage.remove({key: 'user'});
        this.props.navigation.dispatch(resetAction)
    }

    render() {
        const Touchable = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;
        return (
            <View style={styles.container}>
                <View style={styles.group}>
                    <View style={styles.groupItem}>
                        <View style={styles.viewCenter}>
                            <Text style={styles.textLeft}>积分:1</Text>
                        </View>
                    </View>
                    <View style={styles.groupItem}>
                        <View style={styles.viewCenter}>
                            <Text style={styles.textLeft}>虚拟币:1</Text>
                        </View>
                    </View>
                    <View style={styles.groupItem}>
                        <View style={styles.viewCenter}>
                            <Text style={styles.textLeft}>VIP:1</Text>
                        </View>
                    </View>
                    <Touchable style={styles.groupItem} onPress={() => this.doLogout()}>
                        <View style={styles.viewCenter}>
                            <Text style={styles.textLeft}>注销</Text>
                        </View>
                    </Touchable>
                </View>
            </View>
        )
    }

}


const styles = StyleSheet.create({
        container: {
            height: 128,
            marginTop: 8,
            marginBottom: 8,
        },
        group: {
            backgroundColor: 'white',
            borderColor: '#ccc',
            borderTopWidth: 1,
            borderBottomWidth: 1,
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            padding: 0,
        },
        groupItem: {
            flex: 1,
            // height: 32,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            borderColor: '#f1f1f3',
            borderBottomWidth: 1,
        },
        viewCenter: {
            padding: 8
        },
        textLeft: {
            color: THEME_TEXT,
            fontSize: 14,
            textAlign: 'left',
        },
        textCenter: {
            color: THEME_TEXT,
            fontSize: 14,
            textAlign: 'center',
        },
    })
;