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
export default class Apprentice extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            flag: true,
            isloading: false
        }
    }
    componentDidMount() {
        this.onMyTaskApi()
    }
    _renderItem = ({ item }) => (
        <View style={styles.viewstyles2}>
            <View style={styles.viewstyles4}>
                <Text style={styles.Text2}>18848562323</Text>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.Text5}>+10  <Text style={[styles.Text5, { color: "#33363b" }]}>算力</Text></Text>
                    <Text style={[styles.Text5, { marginLeft: 31 * unitWidth }]}>+10  <Text style={[styles.Text5, { color: "#33363b" }]}>APT</Text></Text>
                </View>
            </View>
        </View>
    )
    render() {
        return <View style={styles.container}>
            <TouchableHighlight onPress={() => Actions.pop()} underlayColor='#fff'>
                <View style={{ flexDirection: 'row', marginTop: 80 * unitHeight, justifyContent: 'space-between' }}>
                    <Image source={require('../../img/back.png')} style={styles.Image} />
                    <Text style={styles.txt1}>我的徒弟</Text>
                    <Text style={{ marginRight: 30 * unitWidth }}>   </Text>
                </View>
            </TouchableHighlight>

            <View style={styles.viewstyles1}>
                <Text style={styles.Text7}>总徒弟数 <Text style={styles.Text8}>5</Text></Text>
                {this.state.isloading ? <ActivityIndicator size="large" color="gray" animating={this.state.isloading} /> : <View />}
                <FlatList
                    data={[1, 2, 3, 4]}
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
    Text7: {
        fontSize: 30 * unitWidth,
        marginTop: 30 * unitHeight,
        marginLeft: 34 * unitWidth,
        fontFamily: "PingFangHeiTC-W8-Proportionl",
        color: "#626970"
    },
    Text8: {
        fontSize: 30 * unitWidth,
        fontFamily: "PingFangHeiTC-W8-Proportionl",
        color: "rgb(53,126,220)"
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
        fontFamily: "PingFangTC-Semibold",
        color: "#21262c",
        fontWeight: 'bold',
        alignSelf: 'center',
        textAlign: 'center',
    },
    Text2: {
        fontSize: 32 * unitWidth,
        fontFamily: "FZY4K--GBK1-0",
        color: "#2a2c31",
        fontWeight: 'bold'
    },
    Text3: {
        fontSize: 30 * unitWidth,
        fontFamily: "PingFangTC-Semibold",
        color: "#ff121d",
        marginLeft: 7 * unitWidth
    },
    Text4: {
        fontSize: 24 * unitWidth,
        fontFamily: "PingFangTC",
        color: "#33363b",
        textAlign: 'center',
        alignSelf: 'center'
    },
    Text5: {
        marginTop: 24 * unitHeight,
        fontSize: 30 * unitWidth,
        fontFamily: "PingFangHeiTC-W8-Proportionl",
        color: "#ff121d",
        fontWeight: 'bold'
    },
    Text6: {
        textAlign: 'center',
        alignSelf: 'center',
        position: 'absolute',
        right: 0,
        marginRight: 32 * unitWidth,
        fontSize: 26 * unitWidth,
        fontFamily: "PingFangHeiTC-W8-Proportionl",
        color: "#70df3a",
        fontWeight: 'bold'
    }
});