import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    FlatList,
    TouchableHighlight,
    ActivityIndicator,
    DeviceEventEmitter
} from 'react-native';

import { Actions } from 'react-native-router-flux'
import { MarqueeHorizontal, MarqueeVertical } from 'react-native-marquee-ab';
import { unitWidth, unitHeight } from '../../AdapterUtil.js';
import ClickUtil from '../Utils/ClickUtil.js';
import local from '../Utils/StorageUtils.js';
import NetUtils from '../Utils/NetUtils.js'
import { toastShort } from '../Utils/ToastUtils.js';
import WebView from 'react-native-webview'
export default class RealName extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            url: '',
            cookies: ''
        }
    }
    componentDidMount() {
        local.get("cookies").then(c => {
            this.setState({ cookies: c })
        }).catch(e => { })
    }

    render() {
        return <View style={styles.container}>
            <TouchableHighlight onPress={() => Actions.pop()} underlayColor={'#fff'}>
                <View style={{ flexDirection: 'row', marginTop: 80 * unitHeight, justifyContent: 'space-between' }}>
                    <Image source={require('../../img/back.png')} style={styles.Image} />
                    <Text style={styles.txt1}>实名认证</Text>
                    <Text style={{ marginRight: 30 * unitWidth }}>   </Text>
                </View>
            </TouchableHighlight>
            <WebView
                style={{ marginTop: 20 * unitHeight }}
                source={{ uri: `${this.props.item.gameUrl}?token=${this.state.cookies}` }}  // 地址

                onMessage={this.onMessage}
                ref={webView => this.webView = webView}
                startInLoadingState={true} 
            />
        </View>
    }
    onMessage = (event) => {
        if (event.nativeEvent.data == 'ok') {
            Actions.pop()
        }
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
});
