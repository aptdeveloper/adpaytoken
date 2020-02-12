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
export default class MyTask extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            flag: true,
            isloading: true
        }
    }
    componentDidMount() {
        this.onMyTaskApi()
    }

    _renderItem = ({ item }) => (
        <View style={styles.viewstyles2}>
            <View style={styles.viewstyles4}>
                <Text style={styles.Text2}>{item.taskName} {item.rewardType == 1 ? <Text style={styles.Text3}>+{NetUtils.NumUtils(item.reward)} <Text style={styles.Text4}>APT</Text></Text> : <Text style={styles.Text3}>+{item.reward} <Text style={styles.Text4}>算力</Text></Text>}</Text>
                <Text style={styles.Text5}>{item.taskSynopsis}~</Text>
            </View>
            {this._type(item)}
        </View>
    )
  
    _type(item) {
        if (item.completionStatus == 0) {
            return (<Text style={[styles.Text6, { color: "#fa6d5e" }]}>未完成</Text>)
        } else if (item.completionStatus == 1) {
            return (<Text style={[styles.Text6, { color: "#5284ff" }]}>已完成</Text>)
        } else if (item.completionStatus == 2) {
            return (<Text style={[styles.Text6, { color: "#70df3a" }]}>审核中</Text>)
        } else if (item.completionStatus == 3) {
            return (<Text style={[styles.Text6, { color: "#fa6d5e" }]}>已超时</Text>)
        } else if (item.completionStatus == 4) {
            return (<Text style={[styles.Text6, { color: "#fa6d5e" }]}>审核未通过</Text>)
        } else if (item.completionStatus == 5) {
            return (<Text style={[styles.Text6, { color: "#fa6d5e" }]}>已放弃任务</Text>)
        }
    }
    render() {
        return <View style={styles.container}>
            <TouchableHighlight onPress={() => Actions.pop()} underlayColor='#fff'>
                <View style={{ flexDirection: 'row', marginTop: 80 * unitHeight, justifyContent: 'space-between' }}>
                    <Image source={require('../../img/back.png')} style={styles.Image} />
                    <Text style={styles.txt1}>我的任务</Text>
                    <Text style={{ marginRight: 30 * unitWidth }}>   </Text>
                </View>
            </TouchableHighlight>

            <View style={styles.viewstyles1}>
                {this.state.isloading ? <ActivityIndicator size="large" color="gray" animating={this.state.isloading} /> : <View />}
                <FlatList
                    data={this.state.data}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={this._renderItem}
                />

            </View>
        </View >
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
        height: 190 * unitWidth,
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
    viewstyles4: {
        marginLeft: 36 * unitWidth,
        marginTop: 30 * unitHeight,
    },
    Image: {
        width: 24 * unitWidth,
        height: 41 * unitHeight,
        alignSelf: 'flex-end',
        marginLeft: 30 * unitWidth
    },
    txt1: {
        fontSize: 34 * unitWidth,
        // fontFamily: "PingFangTC-Semibold",
        color: "#21262c",
        fontWeight: 'bold',
        alignSelf: 'center',
        textAlign: 'center',
    },
    Text2: {
        fontSize: 32 * unitWidth,
        // fontFamily: "FZY4K--GBK1-0",
        color: "#2a2c31",
        fontWeight: 'bold'
    },
    Text3: {
        fontSize: 30 * unitWidth,
        // fontFamily: "PingFangTC-Semibold",
        color: "#ff121d",
        marginLeft: 7 * unitWidth
    },
    Text4: {
        fontSize: 24 * unitWidth,
        // fontFamily: "PingFangTC",
        color: "#33363b",
        textAlign: 'center',
        alignSelf: 'center'
    },
    Text5: {
        marginTop: 24 * unitHeight,
        fontSize: 26 * unitWidth,
        // fontFamily: "PingFang-SC-Regular",
        color: "#626970"
    },
    Text6: {
        textAlign: 'center',
        alignSelf: 'center',
        position: 'absolute',
        right: 0,
        marginRight: 32 * unitWidth,
        fontSize: 26 * unitWidth,
        // fontFamily: "PingFangHeiTC-W8-Proportionl",
        color: "#70df3a",
        fontWeight: 'bold'
    }
});