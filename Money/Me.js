import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    StatusBar,
    ImageBackground,
    TouchableOpacity,
    ScrollView,
    Modal,
    TouchableWithoutFeedback,
    DeviceEventEmitter,
    NativeModules
} from 'react-native';
import { Actions } from 'react-native-router-flux'
import { unitWidth, unitHeight } from '../../AdapterUtil.js';
import ClickUtil from '../Utils/ClickUtil.js';
import local from '../Utils/StorageUtils.js';
import NetUtils from '../Utils/NetUtils.js'
import { toastShort, toastLong } from '../Utils/ToastUtils.js';

import { captureScreen, captureRef } from 'react-native-view-shot';
import RNFS from 'react-native-fs';
import RNFetchBlob from 'rn-fetch-blob';
import CameraRoll from "@react-native-community/cameraroll";

export default class Me extends Component {
    constructor(props) {
        super(props)
        this.mainViewRef = React.createRef();
        this.onQQ = this.onQQ.bind(this);
        this.onWx = this.onWx.bind(this);
        this.close = this.close.bind(this);
        this.onRequestClose = this.onRequestClose.bind(this);
        this.state = {
            canShow: false,
            modalTitle: "",
            modalimg_url: '',
            modalDes: '',
            calculationPower: "",
            login_flag: false,
            money: '0.00',
            ethmoney: '0.00',
            changeTab_flag: true,
            loginReward: 0,
        }

    }
    componentWillReceiveProps(nextProps) {
        this.onLogins()
    }
    componentDidMount() {
        this.em = DeviceEventEmitter.addListener('me', (x) => {
            if (x == true) {
                this.onLogins()
            }
        })
        this.onLogins()
    }
    componentWillUnmount() {
        this.em.remove()
    }
    onLogins() {
        local.get("islogin").then(res => {
            if (res) {
                this.setState({
                    login_flag: true
                })
                this.moneyApi();
            } else {
                this.setState({
                    login_flag: false
                })
            }
        }).catch(err => {
            this.setState({
                login_flag: false
            })
        })
    }
    render() {
        return <ScrollView showsVerticalScrollIndicator={false} ref={this.mainViewRef}>
            <View style={styles.container} >
                <StatusBar
                    backgroundColor="transparent"
                    translucent={true}
                    hidden={false}
                    animated={true} />
                <ImageBackground style={styles.me_v1}
                    source={require('../../img/me_bg.png')}
                >
                    {this.state.changeTab_flag ? (<View style={styles.me_v2}>

                        <View style={styles.aptstyles}>
                            <Text style={styles.moneytextstyles}>APT钱包</Text>
                        </View>
                        <View style={styles.aptstyles1}>
                            <Text style={styles.moneytextstyles1} onPress={this.onChangeTab.bind(this)}>ETH钱包</Text>
                        </View>
                    </View>) : (<View style={styles.me_v2}>

                        <View style={styles.aptstyles1}>
                            <Text style={styles.moneytextstyles1} onPress={this.onChangeTab.bind(this)}>APT钱包</Text>
                        </View>
                        <View style={styles.aptstyles}>
                            <Text style={styles.moneytextstyles} >ETH钱包</Text>
                        </View>
                    </View>)}


                    {this.state.login_flag ? (<View style={styles.me_v3}>
                        {this.state.changeTab_flag ? (<Text style={styles.moneystyles}>{this.state.money}</Text>) :
                            (<Text style={styles.moneystyles}>{this.state.ethmoney}</Text>)}

                        {/* <Text style={{ fontSize: 28 * unitWidth, fontFamily: "PingFangTC", color: "#ffffff", marginTop: 20 * unitWidth }}>≈123456789.666 CNY</Text> */}
                    </View>) : (<View style={styles.me_v3}>
                        <Text style={[styles.moneystyles, { marginBottom: 40 * unitHeight }]} onPress={this.onLogin}>登录</Text>
                    </View>)}


                    <View style={styles.me_v4}>
                        <TouchableOpacity onPress={this.onPushMoney.bind(this)} underlayColor='rgb(55,140,255)'>
                            <ImageBackground style={styles.image_money_styles} source={require("../../img/money_bg.png")}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Image source={require('../../img/push_money.png')} style={{ width: 44 * unitWidth, height: 34 * unitWidth }} />
                                    <Text style={styles.push_moneystyles}>充币</Text>
                                </View>
                            </ImageBackground>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={this.onPullMoney.bind(this)} underlayColor='rgb(55,140,255)'>
                            <ImageBackground style={styles.image_money_styles} source={require("../../img/money_bg.png")}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Image source={require('../../img/pull_money.png')} style={{ width: 44 * unitWidth, height: 34 * unitWidth, alignItems: 'center' }} />
                                    <Text style={styles.push_moneystyles}>提币</Text>
                                </View>
                            </ImageBackground>
                        </TouchableOpacity>
                        {/* 我的算力 */}
                        <TouchableOpacity style={styles.me_v5} onPress={this.onGoInviteFriends.bind(this)} underlayColor='#fff'>
                            <View >
                                <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                                    <Image style={styles.invite_imagestyles} source={require('../../img/invite_img.png')} />
                                    <View style={styles.invite_textstyles}>
                                        <Text style={{
                                            fontSize: 32 * unitWidth
                                            , lineHeight: 50 * unitWidth
                                            , fontFamily: "FZY4K--GBK1-0"
                                            , color: "#2a2c31",
                                            fontWeight: 'bold'
                                        }}>我的算力 {this.state.calculationPower ? this.state.calculationPower : 0}</Text>
                                        <Text style={{
                                            fontSize: 24 * unitWidth
                                            , fontFamily: "PingFangTC"
                                            , color: "#626970"
                                            , width: 322 * unitWidth,
                                            marginTop: 20 * unitHeight

                                        }}>每日ATP收益=持有算力*10%</Text>
                                    </View>
                                    {/* <TouchableOpacity onPress={this.onGoInviteFriends.bind(this)} underlayColor='#fff'>
                                        <View pointerEvents='none'>
                                            <ImageBackground style={{
                                                width: 160 * unitWidth,
                                                height: 62 * unitWidth,
                                                alignItems: 'center',
                                                marginLeft: 20 * unitWidth,
                                                justifyContent: 'center',
                                                marginRight: 30 * unitWidth
                                            }}
                                                source={require('../../img/invite_btn.png')}
                                            >
                                                <Text style={{
                                                    fontSize: 26 * unitWidth,
                                                    lineHeight: 50 * unitWidth,
                                                    fontFamily: "PingFangTC",
                                                    color: "#ffffff",
                                                    textAlign: 'center',
                                                }} onPress={this.onGoInviteFriends.bind(this)}> 邀请好友</Text>
                                            </ImageBackground>
                                        </View>
                                    </TouchableOpacity> */}
                                </View>

                            </View>
                        </TouchableOpacity>
                    </View>

                </ImageBackground>
                <View style={{ marginTop: 120 * unitHeight }} />
                <TouchableOpacity onPress={this.onloginReward.bind(this)} underlayColor="#fff">
                    <View style={styles.me_v6}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image style={styles.wx_image} source={require('../../img/wx.png')} />
                            <View style={{ marginLeft: 27 * unitWidth }}>
                                <Text style={styles.wxandqqtextstyles}>每日登录得奖励</Text>
                                <Text style={styles.wxandqqtextstyles2}>每日首次登录+100算力</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            {this.state.loginReward == 0 ?
                                <Image style={{ width: 13 * unitHeight, height: 13 * unitHeight }} source={require('../../img/dot_red.png')} /> : null}

                            <Text style={styles.wxandqqtextstyles2}>{this.state.logintext}</Text>

                        </View>

                    </View>
                </TouchableOpacity>
                <View style={{ marginTop: 40 * unitWidth, height: 2 * unitWidth, width: 680 * unitWidth, backgroundColor: "#efefef", marginLeft: 35 * unitWidth }}></View>

                <TouchableOpacity onPress={() => { this.state.login_flag ? Actions.fillcode() : Actions.login() }} underlayColor='transparent'>
                    <View style={styles.me_v66}>

                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image style={styles.wx_image} source={require('../../img/invitation_code.png')} />
                            <View style={{ marginLeft: 27 * unitWidth }}>
                                <Text style={styles.wxandqqtextstyles}>填写邀请码</Text>
                                <Text style={styles.wxandqqtextstyles2}>填写邀请码即可获得1APT的奖励</Text>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            {/* <Image source={require('../../img/erweima.png')} style={{ width: 42 * unitWidth, height: 42 * unitWidth }} /> */}
                            <Image source={require('../../img/go.png')} style={{ width: 12 * unitWidth, height: 22 * unitWidth, marginLeft: 20 * unitWidth }} />
                        </View>
                    </View>
                </TouchableOpacity>
                <View style={{ marginTop: 40 * unitWidth, height: 2 * unitWidth, width: 680 * unitWidth, backgroundColor: "#efefef", marginLeft: 35 * unitWidth }}></View>

                <TouchableOpacity onPress={this.onWx} underlayColor="#fff">
                    <View style={styles.me_v6}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image style={styles.wx_image} source={require('../../img/wx.png')} />
                            <View style={{ marginLeft: 27 * unitWidth }}>
                                <Text style={styles.wxandqqtextstyles}>加入微信群</Text>
                                <Text style={styles.wxandqqtextstyles2}>首次加入微信群可得1APT</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={require('../../img/erweima.png')} style={{ width: 42 * unitWidth, height: 42 * unitWidth }} />
                            <Image source={require('../../img/go.png')} style={{ width: 12 * unitWidth, height: 22 * unitWidth, marginLeft: 20 * unitWidth }} />
                        </View>
                    </View>
                </TouchableOpacity>
                <View style={{ marginTop: 40 * unitWidth, height: 2 * unitWidth, width: 680 * unitWidth, backgroundColor: "#efefef", marginLeft: 35 * unitWidth }}></View>

                <TouchableOpacity onPress={this.onQQ} underlayColor="#fff">
                    <View style={styles.me_v7} >
                        <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                            <Image style={styles.wx_image} source={require('../../img/qq.png')} />
                            <View style={{ marginLeft: 27 * unitWidth }}>
                                <Text style={styles.wxandqqtextstyles} >客服</Text>
                                <Text style={styles.wxandqqtextstyles2}>qq:*********</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={require('../../img/erweima.png')} style={{ width: 42 * unitWidth, height: 42 * unitWidth }} />
                            <Image source={require('../../img/go.png')} style={{ width: 12 * unitWidth, height: 22 * unitWidth, marginLeft: 20 * unitWidth }} />
                        </View>
                    </View>
                </TouchableOpacity>
                <View style={{ marginTop: 40 * unitWidth, height: 2 * unitWidth, width: 680 * unitWidth, backgroundColor: "#efefef", marginLeft: 35 * unitWidth }}></View>

                {/* stting */}
                <TouchableOpacity onPress={this.outLogin.bind(this)} underlayColor='#fff'>
                    <View style={styles.me_v8}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image style={styles.wx_image} source={require('../../img/setting.png')} />
                            <View style={{ marginLeft: 27 * unitWidth }}>
                                <Text style={styles.wxandqqtextstyles}>设置</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            {/* <Image source={require('../../img/erweima.png')} style={{ width: 42 * unitWidth, height: 42 * unitWidth }} /> */}
                            <Image source={require('../../img/go.png')} style={{ width: 12 * unitWidth, height: 22 * unitWidth, marginLeft: 20 * unitWidth }} />
                        </View>
                    </View>
                </TouchableOpacity>
                {/* modal */}
                <Modal visible={this.state.canShow}
                    animationType={"slide"}
                    transparent={true}
                    onRequestClose={this.onRequestClose}
                >
                    <View style={styles.modalstyles}>
                        <Text style={{
                            fontSize: 32 * unitHeight,
                            lineHeight: 50 * unitHeight,
                            fontFamily: "FZY4K--GBK1-0",
                            color: "#2a2c31",
                            fontWeight: 'bold',
                            marginTop: 60 * unitWidth,
                            marginBottom: 71 * unitWidth,
                        }}>{this.state.modalTitle}</Text>
                        <Image source={this.state.modalimg_url} style={{ width: 294 * unitWidth, height: 294 * unitWidth }} />

                        <Text style={{
                            fontSize: 26 * unitHeight,
                            lineHeight: 50 * unitHeight,
                            fontFamily: "PingFangTC",
                            color: "#626970",
                            marginTop: 30 * unitHeight
                        }}>{this.state.modalDes}</Text>
                        <TouchableOpacity onPress={this.onSaveImg.bind(this)} underlayColor='#fff'>
                            <View style={styles.modalstyles1}>
                                <Text style={{
                                    fontSize: 26 * unitHeight,
                                    lineHeight: 50 * unitHeight,
                                    fontFamily: "PingFangTC",
                                    color: "#ffffff",
                                    textAlign: 'center'
                                }}>保存图片</Text>
                            </View>
                        </TouchableOpacity>


                    </View>
                    <TouchableWithoutFeedback onPress={this.close} underlayColor='#fff'>
                        <View style={{ alignItems: 'center', marginTop: 125 * unitWidth }}>
                            <Image source={require('../../img/back_x.png')} style={{ width: 60 * unitWidth, height: 60 * unitWidth, alignItems: 'center' }} />
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
            </View>
        </ScrollView>
    }
   
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    me_v1: {
        width: 750 * unitWidth,
        height: 608 * unitWidth
    },
    aptstyles: {
        width: 174 * unitWidth,
        height: 64 * unitWidth,
        elevation: 1,  
        shadowColor: "rgba(86, 116, 255, 0.5)",  
        shadowOffset: { width: 0, height: 0 },  
        shadowOpacity: 0,  
        shadowRadius: 39 * unitWidth,  
        borderRadius: 39 * unitWidth,
        backgroundColor: 'rgb(82,112,253)',
        alignItems: 'center',
        justifyContent: 'center'

    },
    aptstyles1: {
        width: 174 * unitWidth,
        height: 64 * unitWidth,
        elevation: 0,  
        shadowColor: "rgba(86, 116, 255, 0.5)",  
        shadowOffset: { width: 0, height: 0 },  
        shadowOpacity: 0,  
        shadowRadius: 39 * unitWidth,  
        borderRadius: 39 * unitWidth,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'

    },
    me_v2: {
        alignItems: 'center',
        marginTop: 111 * unitWidth,
        width: 360 * unitWidth,
        height: 78 * unitWidth,
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'center',
        alignSelf: 'center',
        elevation: 1,  
        shadowColor: 'rgba(228, 227, 236, 0.86)',  
        shadowOffset: { width: 0, height: 0 },  
        shadowOpacity: 0,  
        shadowRadius: 39 * unitWidth,  
        borderRadius: 39 * unitWidth,
    },
    me_v3: {
        marginTop: 60 * unitWidth,
        alignItems: "center"
    },
    me_v4: {
        marginTop: 40 * unitWidth,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'

    },
    me_v5: {
        width: 700 * unitWidth,
        height: 200 * unitWidth,
        position: 'absolute',
        elevation: 3,  
        shadowColor: "rgba(79, 118, 253, 0.53)",  
        shadowOffset: { width: 0, height: 0 },  
        shadowOpacity: 1,  
        shadowRadius: 20 * unitWidth,  
        borderRadius: 20 * unitWidth,
        alignItems: 'center',
        backgroundColor: '#fff',
        bottom: -260 * unitWidth,
        flexDirection: 'row',

    },
    modalstyles: {
        width: 570 * unitWidth,
        height: 765 * unitWidth,
        elevation: 6,  
        shadowColor: 'rgba(228, 227, 236, 0.86)',  
        shadowOffset: { width: 0, height: 0 },  
        shadowOpacity: 0,  
        shadowRadius: 20 * unitWidth,  
        borderRadius: 20 * unitWidth,
        alignItems: 'center',
        backgroundColor: '#fff',
        marginTop: 300 * unitWidth,
        marginLeft: 90 * unitWidth,
        marginRight: 90 * unitWidth
    },
    modalstyles1: {
        width: 270 * unitHeight,
        height: 64 * unitHeight,
        elevation: 1,  
        shadowColor: 'rgba(228, 227, 236, 0.86)',  
        shadowOffset: { width: 0, height: 0 },  
        shadowRadius: 20 * unitWidth,  
        borderRadius: 20 * unitWidth,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgb(55,113,255)',
        marginTop: 47 * unitWidth
    },
    me_v66: {
        marginTop: 40 * unitWidth,
        flexDirection: "row",
        marginLeft: 35 * unitWidth,
        marginRight: 35 * unitWidth,
        alignItems: 'center',
        justifyContent: 'space-between'


    },
    me_v6: {
        marginTop: 40 * unitWidth,
        flexDirection: "row",
        marginLeft: 35 * unitWidth,
        marginRight: 35 * unitWidth,
        alignItems: 'center',
        justifyContent: 'space-between'


    },
    me_v7: {
        marginTop: 40 * unitWidth * unitWidth,
        flexDirection: "row",
        marginLeft: 35 * unitWidth,
        marginRight: 35 * unitWidth,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    me_v8: {
        marginTop: 50 * unitWidth * unitWidth,
        flexDirection: "row",
        marginLeft: 35 * unitWidth,
        marginRight: 35 * unitWidth,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 211 * unitWidth
    },
    moneytextstyles: {
        fontSize: 28 * unitWidth,
        lineHeight: 50 * unitWidth,
        fontFamily: "PingFangTC-Semibold",
        color: "#ffffff"
    },
    moneytextstyles1: {
        fontSize: 28 * unitWidth,
        lineHeight: 50 * unitWidth,
        fontFamily: "PingFangTC-Semibold",
        color: "#6d93e1"
    },
    moneystyles: {
        fontSize: 50 * unitWidth,
        fontFamily: "Montserrat-Regular",
        color: "#ffffff",
        lineHeight: 60 * unitWidth
    },
    image_money_styles: {
        width: 218 * unitWidth,
        height: 68 * unitWidth,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 43 * unitWidth
    },
    push_moneystyles: {
        fontSize: 26 * unitWidth,
        lineHeight: 32 * unitWidth,
        fontFamily: "PingFangTC-Semibold",
        color: "#3e5bc5",
        marginLeft: 18 * unitWidth,
        textAlign: 'center'
    },
    invite_imagestyles: {
        width: 105 * unitWidth,
        height: 131 * unitWidth,
        marginTop: 34 * unitWidth,
        marginLeft: 37 * unitWidth,
        marginBottom: 35 * unitWidth
    },
    invite_textstyles: {
        marginLeft: 20 * unitWidth,
        marginTop: 62 * unitWidth,
        marginBottom: 63 * unitWidth

    },
    wx_image: {
        width: 50 * unitWidth,
        height: 50 * unitWidth,
        alignItems: 'center'
    },
    wxandqqtextstyles: {
        fontSize: 30 * unitWidth,
        lineHeight: 50 * unitWidth,
        fontFamily: "PingFang-SC-Bold",
        color: "#444444",
        fontWeight: 'bold'
    },
    wxandqqtextstyles2: {
        fontSize: 26 * unitWidth,
        lineHeight: 50 * unitWidth,
        fontFamily: "PingFangTC",
        color: "#626970"
    },
});

/**
 * 下载网页图片
 * @param uri  图片地址
 * @returns {*}
 */
export const DownloadImage = (uri) => {

    if (!uri) return null;
    return new Promise((resolve, reject) => {
        let timestamp = (new Date()).getTime();//获取当前时间错
        let random = String(((Math.random() * 1000000) | 0))//六位随机数
        let dirs = Platform.OS === 'ios' ? RNFS.LibraryDirectoryPath : RNFS.ExternalDirectoryPath; //外部文件，共享目录的绝对路径（仅限android）
        const downloadDest = `${dirs}/${timestamp + random}.jpg`;
        const formUrl = uri;
        const options = {
            fromUrl: formUrl,
            toFile: downloadDest,
            background: true,
            begin: (res) => {
                // console.log('begin', res);
                // console.log('contentLength:', res.contentLength / 1024 / 1024, 'M');
            },
        };
        try {
            const ret = RNFS.downloadFile(options);
            ret.promise.then(res => {

                // console.log('success', res);
                // console.log('file://' + downloadDest)
                var promise = CameraRoll.saveToCameraRoll(downloadDest);
                promise.then(function (result) {
                    toastLong('保存成功！', 'bottom');
                }).catch(function (error) {
                    console.log('error', error);
                    toastLong('保存失败！', 'bottom');
                });
                resolve(res);
            }).catch(err => {
                reject(new Error(err))
            });
        } catch (e) {
            reject(new Error(e))
        }

    })

};
/**
 * 保存图片到相册
 * @param ImageUrl  图片地址
 * @returns {*}
 */
export const DownloadLocalImage = (ImageUrl) => {
    if (!ImageUrl) return null;
    return new Promise((resolve, reject) => {
        try {
            var promise = CameraRoll.saveToCameraRoll(ImageUrl);
            promise.then(function (result) {
                resolve({ statusCode: 200 });
                alert('保存成功！地址如下：\n' + result);
            }).catch(function (error) {
                console.log('error', error);
                alert('保存失败！\n' + error);
            });
        } catch (e) {
            reject(new Error(e))
        }

    })

}