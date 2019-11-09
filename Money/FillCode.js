import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableHighlight,
    TextInput
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Actions } from 'react-native-router-flux'
import { unitWidth, unitHeight } from '../../AdapterUtil.js';
import local from '../Utils/StorageUtils.js';
import ClickUtil from '../Utils/ClickUtil.js';
import CommUtils from '../Utils/CommUtils.js';
import { toastShort } from '../Utils/ToastUtils.js';
import NetUtils from '../Utils/NetUtils.js'
export default class FillCode extends Component {
    constructor(props) {
        super(props)
        this.state = {
            code: ''
        }
    }

    render() {
        return <View style={styles.container}>
            {/* heard */}
            <TouchableHighlight onPress={() => Actions.pop()} underlayColor="#fff">
                <View style={styles.styles_v1}>
                    <View style={{ width: 100 * unitWidth }}>
                        <Image source={require('../../img/back.png')} style={styles.backstyles} />
                    </View>
                    <Text style={styles.textstyles}>填写邀请码</Text>
                    <Text style={styles.textstyles}>                </Text>
                </View>
            </TouchableHighlight>
            <View style={{ height: 2 * unitHeight, width: null, marginTop: 35 * unitHeight, backgroundColor: "#efefef" }} />
            <Text style={styles.txt1}>请填写师傅邀请码</Text>

            <TextInput style={styles.Inputstyles}
                placeholder="请输入邀请码"
                clearButtonMode="while-editing"
                keyboardType={'numeric'}
                onChangeText={(x) => {
                    this.setState({
                        code: x,
                    })
                }} />

            <View style={styles.styles_v2}>
                <Text style={styles.txt2}>确定</Text>
            </View>
        </View>
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    styles_v1: {
        marginLeft: 30 * unitWidth,
        marginTop: 53 * unitWidth,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    styles_v2: {
        marginTop: 56 * unitHeight,
        width: 631 * unitWidth,
        height: 81 * unitHeight,
        backgroundColor: "#3771ff",
        borderRadius: 40 * unitWidth,
        backgroundColor: "#3771ff",
        shadowColor: "rgba(86, 116, 255, 0.52)",
        shadowOffset: {
            width: 0,
            height: 2.5
        },
        shadowRadius: 6.5,
        shadowOpacity: 1,
        elevation: 1,
        alignSelf: 'center',
        justifyContent: 'center'

    },
    backstyles: {
        width: 24 * unitWidth,
        height: 41 * unitWidth,
    },
    textstyles: {
        fontSize: 34 * unitWidth,
        lineHeight: 50 * unitWidth,
        fontFamily: "PingFangTC-Semibold",
        color: "#21262c",
        fontWeight: 'bold'
    },
    txt1: {
        fontSize: 30 * unitWidth,
        fontFamily: "PingFangTC",
        color: "#626970",
        marginTop: 60 * unitHeight,
        marginLeft: 61 * unitWidth
    },
    txt2: {
        fontSize: 32 * unitWidth,
        fontFamily: "PingFangTC-Semibold",
        color: "#ffffff",
        textAlign: 'center'
    },
    Inputstyles: {
        marginTop: 40 * unitHeight,
        marginLeft: 61 * unitWidth,
        width: 630 * unitWidth,
        borderBottomWidth: 2 * unitWidth,
        borderColor: '#efefef',
        fontWeight: 'bold',
        // fontSize:44*unitWidth


    }
});