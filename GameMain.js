import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
    DeviceEventEmitter,
    ScrollView
} from 'react-native';

import { Actions } from 'react-native-router-flux'
import { MarqueeHorizontal, MarqueeVertical } from 'react-native-marquee-ab';
import { unitWidth, unitHeight } from '../../AdapterUtil.js';
import ClickUtil from '../Utils/ClickUtil.js';
import local from '../Utils/StorageUtils.js';
import NetUtils from '../Utils/NetUtils.js'
import { toastShort } from '../Utils/ToastUtils.js';
import WebView from 'react-native-webview'
export default class GameMain extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    componentDidMount() {
    }

    render() {
        return <View style={styles.container}>
            <View style={{ marginTop: 80 * unitHeight, justifyContent: 'center', marginBottom: 10 * unitHeight }}>
                <Text style={styles.txt1}>赏金</Text>
            </View>
            <ScrollView>
                <View>
                    <TouchableOpacity onPress={() => Actions.game()}>
                        <Image source={require('../../img/game_banner.png')} style={{ width: 696 * unitWidth, height: 291 * unitWidth, alignSelf: 'center', marginTop: 35 * unitHeight }} />
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    txt1: {
        fontSize: 34 * unitWidth,
        color: "#21262c",
        fontWeight: 'bold',
        alignSelf: 'center',
        textAlign: 'center',
    },
    Image: {
        width: 24 * unitWidth,
        height: 41 * unitHeight,
        alignSelf: 'flex-end',
        marginLeft: 30 * unitWidth
    },
    gamestyles: {
        backgroundColor: 'rgb(55,140,255)',
        marginLeft: 30 * unitWidth,
        marginRight: 30 * unitWidth,
        borderRadius: 10,
        height: 200 * unitHeight,
        justifyContent: 'center',
        marginTop: 30 * unitHeight
    },
    gametext: {
        fontSize: 60 * unitWidth,
        marginLeft: 15 * unitWidth,
        color: '#fff',
    }
});
