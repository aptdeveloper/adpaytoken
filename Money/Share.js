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
    DeviceEventEmitter,
    ScrollView,
    ImageBackground,
    TouchableOpacity,
    Linking,
} from 'react-native';
import CameraRoll from "@react-native-community/cameraroll";
import { Actions } from 'react-native-router-flux'
import { unitWidth, unitHeight } from '../../AdapterUtil.js';
import ClickUtil from '../Utils/ClickUtil.js';
import local from '../Utils/StorageUtils.js';
import NetUtils from '../Utils/NetUtils.js'
import { toastShort } from '../Utils/ToastUtils.js';
import LinearGradient from 'react-native-linear-gradient';
import QRCode from 'react-native-qrcode-svg';
import { captureScreen, captureRef } from 'react-native-view-shot';
import RNFS from 'react-native-fs';
import RNFetchBlob from 'rn-fetch-blob';
export default class Share extends Component {
    constructor(props) {
        super(props)
        this.mainViewRef = React.createRef();
        this.state = {
            urlcode: NetUtils.Url() + 'InviteUser/getinviteHTML?code=' + this.props.code
        }
    }
    componentDidMount() {

    }
    componentWillUnmount() {
        RNScreenshotcatchUtil.stopListener()
    }
    render() {
        return <LinearGradient style={styles.container} colors={['rgb(55,163,255)', 'rgb(82,112,253)']}>
            <ScrollView showsVerticalScrollIndicator={false} ref={this.mainViewRef}>
                {/* heard */}
                <TouchableHighlight onPress={() => Actions.pop()} underlayColor="rgb(55,163,255)">
                    <View style={styles.styles_v1}>

                        <View style={{ width: 100 * unitWidth }}>
                            <Image source={require('../../img/push_back.png')} style={styles.backstyles} />
                        </View>

                        <Text style={styles.textstyles}>分享海报</Text>
                        <Text style={styles.textstyles}>                </Text>
                    </View>
                </TouchableHighlight>
                <ImageBackground style={styles.styles_v2} source={require('../../img/share_bg.png')} >
                    <View style={{ marginTop: 820. * unitWidth, alignItems: 'center' }}>
                        <QRCode
                            value={this.state.urlcode}
                            size={112 * unitWidth}
                        />
                    </View>
                </ImageBackground>
                <TouchableOpacity style={styles.styles_v3} onPress={this.onSaveImg.bind(this)} underlayColor='rgb(241,240,246)'>
                    <View >
                        <Text style={styles.txt}>保存图片</Text>
                    </View>
                </TouchableOpacity>
                <Text style={styles.txt1}>保存图片并分享至好友</Text>
                <View style={styles.styles_v4}>
                    <TouchableOpacity onPress={this.sharewx.bind(this)}>
                        <View>
                            <Image style={styles.Imagestyles} source={require('../../img/wx_f.png')} />
                            <Text style={styles.txt2}>微信好友</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.sharewx.bind(this)}>
                        <View>
                            <Image style={styles.Imagestyles} source={require('../../img/wx_p.png')} />
                            <Text style={styles.txt2}>朋友圈</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.shareqq.bind(this)}>
                        <View>
                            <Image style={styles.Imagestyles} source={require('../../img/qq_f.png')} />
                            <Text style={styles.txt2}>QQ</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </LinearGradient>
    }
  
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    styles_v1: {
        marginLeft: 30 * unitWidth,
        marginTop: 60 * unitWidth,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    styles_v2: {
        width: 615 * unitWidth,
        height: 1020 * unitHeight,
        alignSelf: 'center',
        marginTop: 57 * unitHeight,

    },
    styles_v3: {
        marginTop: 51 * unitHeight,
        backgroundColor: '#fff',
        alignSelf: 'center',
        width: 360 * unitWidth,
        height: 70 * unitHeight,
        borderRadius: 35 * unitWidth,
        shadowColor: "rgba(86, 116, 255, 0.52)",
        shadowOffset: {
            width: 0,
            height: 2.5
        },
        shadowRadius: 35 * unitWidth,
        shadowOpacity: 1,
        elevation: 1,
        justifyContent: 'center'
    },
    styles_v4: {
        width: 400 * unitWidth,
        flexDirection: 'row',
        alignSelf: 'center',
        marginBottom: 65 * unitHeight,
        marginTop: 40 * unitHeight,
        justifyContent: 'space-between'

    },
    textstyles: {
        fontSize: 34 * unitWidth,
        lineHeight: 50 * unitWidth,
        fontFamily: "PingFangTC-Semibold",
        color: "#ffffff"
    },
    backstyles: {
        width: 24 * unitWidth,
        height: 41 * unitWidth,
    },
    txt: {
        fontSize: 28 * unitWidth,
        fontFamily: "PingFangTC-Semibold",
        color: "#357edc",
        textAlign: 'center',
        fontWeight: 'bold'
    },
    txt1: {
        fontFamily: "PingFangTC",
        fontSize: 26 * unitWidth,
        color: "#ffffff",
        marginTop: 45 * unitHeight,
        textAlign: 'center'
    },
    Imagestyles: {
        width: 80 * unitWidth,
        height: 80 * unitWidth,
    },
    txt2: {
        fontSize: 17 * unitWidth,
        fontFamily: "MicrosoftYaHei",
        color: "#ffffff",
        marginTop: 20 * unitHeight,
        textAlign: 'center'
    }
});