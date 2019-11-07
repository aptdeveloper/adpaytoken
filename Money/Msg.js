import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    FlatList,
    TouchableHighlight,
    Dimensions,
    TextInput,
    StatusBar,
    ScrollView
} from 'react-native';

import Swiper from 'react-native-swiper';
import { Actions } from 'react-native-router-flux'
import { MarqueeHorizontal, MarqueeVertical } from 'react-native-marquee-ab';
import { unitWidth, unitHeight } from '../../AdapterUtil.js';
import ClickUtil from '../Utils/ClickUtil.js';
import local from '../Utils/StorageUtils.js';
import NetUtils from '../Utils/NetUtils.js'
import { toastShort } from '../Utils/ToastUtils.js';
export default class Msg extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            flag: true
        }
    }
    componentDidMount() {
        this.onEmailApi()
    }
    _renderItem = ({ item }) => (
        <View style={styles.viewstyles2}>
            <Image source={require('../../img/wx.png')}
                style={{ width: 62 * unitWidth, height: 62 * unitHeight, marginTop: 35 * unitHeight, marginLeft: 30 * unitWidth }} />
            <View style={styles.viewstyles3}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={styles.Text2}>{item.emailTitle}</Text>
                    {this.state.flag ? (<Image source={require('../../img/dot_red.png')} style={{ width: 15 * unitWidth, height: 13 * unitHeight, marginLeft: 5 * unitWidth }} />) :
                        (<View />)}

                    <Text style={styles.Text3}>{item.careateTime}</Text>
                </View>
                <Text style={styles.Text4}>{item.details}</Text>
                <Text style={styles.Text5}>{item.publisher}</Text>
            </View>
        </View>
    )
    render() {
        return <View style={styles.container}>
            <View style={{ flexDirection: 'row', marginTop: 80 * unitHeight, justifyContent: 'space-between' }}>
                <TouchableHighlight onPress={() => Actions.pop()} underlayColor='#fff'>
                    <Image source={require('../../img/back.png')} style={styles.Image} />
                </TouchableHighlight>
                <Text style={styles.txt1}>系统消息</Text>
                <Text style={{ marginRight: 30 * unitWidth }}>   </Text>
            </View>

            <View style={styles.viewstyles1}>
                <FlatList
                    data={this.state.data}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={this._renderItem}
                />
            </View>
        </View>
    }
   
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    viewstyles1: {
        marginTop: 35 * unitHeight,
        backgroundColor: 'rgb(241,240,246)',
        flex: 1

    },
    viewstyles2: {
        marginTop: 25 * unitHeight,
        width: 690 * unitWidth,
        height: 300 * unitWidth,
        backgroundColor: '#fff',
        borderRadius: 20 * unitWidth,
        alignSelf: 'center',
        flexDirection: 'row',
        marginBottom: 5 * unitHeight
    },
    viewstyles3: {
        marginLeft: 20 * unitWidth,
        marginRight: 20 * unitWidth,
        marginTop: 35 * unitHeight

    },
    Image: {
        width: 24 * unitWidth,
        height: 41 * unitHeight,
        alignSelf: 'flex-end',
        marginLeft: 30 * unitWidth
    },
    txt1: {
        fontSize: 34 * unitWidth,
        fontFamily: "PingFangTC-Semibold",
        color: "#21262c",
        fontWeight: 'bold',
        alignSelf: 'center',
        textAlign: 'center',
    },
    Text2: {
        fontSize: 30 * unitWidth,
        fontFamily: "PingFangTC-Semibold",
        color: "#21262c",
        fontWeight: 'bold'
    },
    Text3: {
        fontSize: 24 * unitWidth,
        fontFamily: "PingFangTC",
        color: "#8e8f94",
        marginLeft: 150 * unitWidth
    },
    Text4: {
        width: 550 * unitWidth,
        marginTop: 28 * unitHeight,
        fontSize: 26 * unitWidth,
        fontFamily: "PingFangTC",
        color: "#8e8f94"
    },
    Text5: {
        marginTop: 29 * unitHeight,
        fontSize: 26 * unitWidth,
        fontFamily: "PingFangTC",
        color: "#8e8f94"
    }
});
