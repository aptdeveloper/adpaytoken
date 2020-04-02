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
    ScrollView,
    Modal
} from 'react-native';

import { Actions } from 'react-native-router-flux'
import { MarqueeHorizontal, MarqueeVertical } from 'react-native-marquee-ab';
import { unitWidth, unitHeight } from '../../AdapterUtil.js';
import ClickUtil from '../Utils/ClickUtil.js';
import local from '../Utils/StorageUtils.js';
import NetUtils from '../Utils/NetUtils.js'
import { toastShort } from '../Utils/ToastUtils.js';
import LinearGradient from 'react-native-linear-gradient';
import Language from '../Language/Language.js';
export default class Vip extends Component {
    constructor(props) {
        super(props)
        this.state = {
            usdt: '',
            isvip: 0,
            isloading: false,
            canShow: false,
            islogin: false
        }
    }
   

    render() {
        return <ScrollView style={styles.container}>

            <View style={{ backgroundColor: 'rgb(48,45,44)', height: 350 * unitHeight }}>
                <TouchableOpacity onPress={this.onBack} >
                    <View style={{ flexDirection: 'row', marginTop: 80 * unitHeight, justifyContent: 'space-between' }}>
                        <Image source={require('../../img/push_back.png')} style={styles.Image} />
                        <Text style={styles.txt1}>VIP会员</Text>
                        <Text style={{ marginRight: 30 * unitWidth }}>   </Text>
                    </View>
                </TouchableOpacity>
            </View>
            <LinearGradient style={styles.vip} colors={['rgb(246,228,208)', 'rgb(222,188,154)']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
                <View style={{ marginTop: 46 * unitHeight, marginLeft: 46 * unitWidth, flex: 1 }}>
                    <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image style={{ width: 68 * unitWidth, height: 68 * unitWidth }} source={require('../../img/vip_icon.png')} />
                            <Text style={{ fontSize: 40 * unitWidth, color: "#b77e44", marginLeft: 14 * unitWidth }}>VIP会员</Text>
                        </View>
                        {this.state.isvip != 0 ?
                            <View style={styles.vip_bg3}>
                                <Text style={{ fontSize: 30 * unitWidth, color: '#dcc1a7', textAlign: 'center' }}>VIP等级{this.state.isvip}</Text>
                            </View> :
                            <TouchableOpacity style={styles.vip_bg3} onPress={this.onisBuy.bind(this)}>
                                <View >
                                    <Text style={{ fontSize: 30 * unitWidth, color: '#dcc1a7', textAlign: 'center' }}>成为会员</Text>
                                </View>
                            </TouchableOpacity>
                        }
                    </View>
                    <Text style={{ fontSize: 30 * unitWidth, width: 588 * unitWidth, lineHeight: 35 * unitHeight, color: "#282626", marginTop: 30 * unitHeight }}>用户充值{this.state.usdt} USDT即可成为永久VIP会员，享受多
项专属权益，解锁更多价值收益</Text>
                </View>


            </LinearGradient>
           
            {/* 3大特权内容 */}
            <View style={styles.vip_bg4}>
                <LinearGradient style={styles.vip_bg5} colors={['rgb(246,228,208)', 'rgb(222,188,154)']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
                    <Text style={{ color: '#242729', fontSize: 24 * unitWidth, fontWeight: "bold" }}>VIP会员六大特权</Text>
                </LinearGradient>
                {/* <Text style={{ fontSize: 32 * unitWidth, color: "#363636", marginTop: 57 * unitHeight, marginLeft: 33 * unitWidth, fontWeight: 'bold' }}>VIP会员六大特权</Text> */}
                <LinearGradient style={[styles.vip_bg6, { marginTop: 40 * unitHeight }]} colors={['rgb(254,254,255)', 'rgb(253,247,240)']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
                    <View style={{ flexDirection: 'row' }} >
                        <Image source={require('../../img/gou.png')} style={styles.vip_img2} />
                        <Text style={styles.vip_text2}>VIP用户享有“专属流量任务”完成权限，任务完成后将获得更高额度的奖励</Text>
                    </View>
                </LinearGradient>

                <LinearGradient style={[styles.vip_bg6]} colors={['rgb(254,254,255)', 'rgb(253,247,240)']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Image source={require('../../img/gou.png')} style={[styles.vip_img2]} />
                        <Text style={styles.vip_text2}>VIP除获取常规流量任务奖励外，还可额外获得VIP算力加成</Text>
                    </View>
                </LinearGradient>

                <LinearGradient style={[styles.vip_bg6]} colors={['rgb(254,254,255)', 'rgb(253,247,240)']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Image source={require('../../img/gou.png')} style={[styles.vip_img2]} />
                        <Text style={styles.vip_text2}>VIP好友邀请提成范围为2级。每邀请一名
                        VIP徒弟，VIP师父可获VIP充值金20%的等
                        值APT。VIP徒弟招收到VIP徒孙后，VIP师
父将再获VIP充值金10%的等值APT</Text>
                    </View>
                </LinearGradient>

                <LinearGradient style={[styles.vip_bg6]} colors={['rgb(254,254,255)', 'rgb(253,247,240)']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Image source={require('../../img/gou.png')} style={[styles.vip_img2]} />
                        <Text style={styles.vip_text2}>在VIP师徒、孙关系中，师父可获取徒弟、徒孙完成VIP专属流量任务的奖励提成</Text>
                    </View>
                </LinearGradient>

                <LinearGradient style={[styles.vip_bg6]} colors={['rgb(254,254,255)', 'rgb(253,247,240)']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Image source={require('../../img/gou.png')} style={[styles.vip_img2]} />
                        <Text style={styles.vip_text2}>在APT提币方面，VIP用户提币2  APT起，普通用户100  APT起提</Text>
                    </View>
                </LinearGradient>

                <LinearGradient style={[styles.vip_bg6, { marginBottom: 57 * unitHeight }]} colors={['rgb(254,254,255)', 'rgb(253,247,240)']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Image source={require('../../img/gou.png')} style={[styles.vip_img2]} />
                        <Text style={styles.vip_text2}>VIP用户每邀请一位VIP徒弟，可获得价值4 USDT的大转盘体验券</Text>
                    </View>
                </LinearGradient>
            </View>
            {/* 重要说明 */}
            <View style={[styles.vip_bg4, { marginTop: 45 * unitHeight, }]}>
                <Text style={{ fontSize: 32 * unitWidth, color: "#363636", marginTop: 35 * unitHeight, marginLeft: 33 * unitWidth, fontWeight: 'bold' }}>重要说明</Text>
                <LinearGradient style={[styles.rule_styles, { marginBottom: 57 * unitHeight }]} colors={['rgb(254,254,255)', 'rgb(253,247,240)']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}  >
                    <Text style={[styles.txt6, { marginTop: 44 * unitHeight }]}>1、普通用户无法参与VIP专属流量任务。</Text>
                    <Text style={[styles.txt6]}>2、VIP好友邀请提成的具体数量以VIP徒弟或VIP徒孙充值当时的相关行情（A网数据）为准。此外，如受邀用户没有成为VIP，则无法获取该奖励。</Text>
                    <Text style={[styles.txt6]}>3、VIP师徒、孙关系是指三者皆为VIP用户，普通用户无法享受VIP相关权益。此外，专属流量任务的奖励提成比例与现行任务分成情况一致。</Text>
                    <Text style={[styles.txt6]}>4、APT提币手续费率维持现状。</Text>
                    <Text style={[styles.txt6, { marginBottom: 31 * unitHeight }]}>5、大转盘体验券将根据VIP徒弟充值当时APT/USDT的行情进行折算，并以四舍五入法按整数单位发放。</Text>
                </LinearGradient>
            </View>
            {this.state.isvip != 0 ? null :
                <View style={{ flexDirection: 'row', alignSelf: 'center', marginBottom: 35 * unitHeight }}>
                    <View style={styles.vip_bg7}>
                        <Text style={{ fontSize: 32 * unitWidth, color: '#e2c9b8', fontWeight: 'bold' }}>VIP尊享会员</Text>
                        <Text style={{ fontSize: 26 * unitWidth, color: "#d6bfaf", marginLeft: 20 * unitWidth }}>{this.state.usdt} USDT</Text>
                    </View>
                    <TouchableOpacity onPress={this.onisBuy.bind(this)}>
                        <LinearGradient style={styles.vip_bg8} colors={['rgb(246,228,208)', 'rgb(222,188,154)']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
                            <Text style={{ fontSize: 32 * unitWidth, color: '#363636', fontWeight: 'bold' }}>成为会员</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                </View>}
            <Modal visible={this.state.canShow}
                animationType={"slide"}
                transparent={true}
                onRequestClose={this.onRequestClose.bind(this)}
            // ref={this.mainViewRef}
            >
                <View style={styles.modalLayer}>
                    <View style={styles.vip_modal}>
                        <Text style={{
                            textAlign: 'center',
                            marginTop: 70 * unitHeight,
                            marginLeft: 30 * unitWidth,
                            marginRight: 30 * unitWidth,
                            fontSize: 30 * unitWidth, color: "#282626",
                        }}>是否花费<Text style={{ fontSize: 32 * unitWidth, color: 'red' }}> {this.state.usdt} </Text>USDT成为VIP？</Text>
                        <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 90 * unitHeight }}>
                            <TouchableOpacity onPress={() => this.onRequestClose()}>
                                <View style={styles.eixt}>
                                    <Text style={{ fontSize: 30 * unitWidth, color: "#282626", textAlign: 'center' }}>取 消</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.onBuy.bind(this)}>
                                <View style={[styles.eixt, { backgroundColor: '#282626', marginLeft: 20 * unitWidth }]}>
                                    {this.state.isloading ? <ActivityIndicator size="large" color="gray" animating={this.state.isloading} /> :
                                        <Text style={{ fontSize: 30 * unitWidth, color: "#dcc1a7", textAlign: 'center' }}>立即开通</Text>
                                    }
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </ScrollView >
    }
  
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(255,255,255)'
    },
    txt6: {
        fontSize: 28 * unitWidth,
        lineHeight: 42 * unitHeight,
        color: "#e0a765",
        width: 549 * unitWidth,
    },
    rule_styles: {
        width: 626 * unitWidth,
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 37 * unitHeight,
        marginBottom: 45 * unitHeight,
        borderRadius: 20 * unitWidth
    },
    eixt: {
        width: 218 * unitWidth,
        height: 68 * unitHeight,
        borderRadius: 24 * unitWidth,
        backgroundColor: "#626970",
        shadowColor: "rgba(30, 62, 176, 0.27)",
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowRadius: 9,
        shadowOpacity: 1,
        justifyContent: 'center'
    },
    vip_modal: {
        width: 600 * unitWidth,
        height: 352 * unitHeight,
        borderRadius: 20 * unitWidth,
        backgroundColor: "rgb(222,188,154)",
        shadowColor: "rgba(30, 64, 129, 0.2)",
        shadowOffset: {
            width: 0,
            height: 0
        },
        shadowRadius: 23,
        shadowOpacity: 1,
        alignSelf: 'center'
    },
    modalLayer: {
        backgroundColor: 'rgba(0, 0, 0, 0.45)',
        flex: 1,
        justifyContent: 'center',
    },
    vip_bg8: {
        width: 256 * unitWidth,
        height: 100 * unitHeight,
        backgroundColor: "rgb(218,186,158)",
        borderBottomRightRadius: 60 * unitHeight,
        borderTopRightRadius: 60 * unitHeight,
        justifyContent: 'center',
        alignItems: 'center'
    },
    vip_bg7: {
        flexDirection: 'row',
        width: 424 * unitWidth,
        height: 100 * unitHeight,
        backgroundColor: "#2b2726",
        borderBottomLeftRadius: 60 * unitWidth,
        borderTopLeftRadius: 60 * unitWidth,
        justifyContent: 'center',
        alignItems: 'center'
    },
    vip_text2: {
        color: "#363636",
        fontSize: 28 * unitWidth,
        marginLeft: 14 * unitWidth,
        width: 492 * unitWidth,
        marginTop: 39 * unitHeight,
        marginBottom: 39 * unitHeight,
        lineHeight: 30 * unitHeight
    },
    vip_text3: {
        color: "#363636",
        fontSize: 28 * unitWidth,
        marginLeft: 14 * unitWidth,
        width: 492 * unitWidth,
        lineHeight: 42 * unitHeight
    },
    vip_img2: {
        width: 30 * unitWidth,
        height: 30 * unitWidth,
        marginLeft: 42 * unitWidth,
        marginTop: 45 * unitHeight
    },
    vip_bg6: {
        width: 626 * unitWidth,
        flex: 1,
        flexDirection: 'row',
        alignSelf: 'center',
        marginTop: 21 * unitHeight,
    },
    vip_bg5: {
        backgroundColor: 'rgb(237,194,162)',
        borderRadius: 5 * unitWidth,
        height: 40 * unitHeight,
        padding: 10 * unitWidth,
        flex: 1,
        position: 'absolute',
        top: -20 * unitWidth,
        marginLeft: 31 * unitWidth,
        justifyContent: 'center',
        alignItems: 'center',
    },
    vip_bg4: {
        width: 680 * unitWidth,
        flex: 1,
        borderRadius: 10 * unitWidth,
        backgroundColor: "#ffff",
        shadowColor: "rgba(184, 173, 165, 0.22)",
        shadowOffset: {
            width: 0,
            height: 0
        },
        shadowRadius: 16,
        shadowOpacity: 1,
        elevation: 4,
        alignSelf: 'center',
        marginTop: 120 * unitHeight,
        marginBottom: 27 * unitHeight
    },
    vip_txt: {
        color: "#a06240",
        fontSize: 26 * unitWidth
    },
    vip_img: {
        width: 118 * unitWidth,
        height: 118 * unitWidth
    },
    vip_bg3: {
        width: 185 * unitWidth,
        height: 58 * unitHeight,
        borderRadius: 34 * unitWidth,
        backgroundColor: "#282626",
        shadowColor: "rgba(213, 161, 108, 0.92)",
        shadowOffset: {
            width: 0,
            height: 0
        },
        shadowRadius: 8,
        shadowOpacity: 1,
        alignSelf: 'center',
        marginLeft: 30 * unitWidth,
        marginRight: 30 * unitWidth,
        justifyContent: 'center',
    },
    vip: {
        flexDirection: 'row',
        width: 690 * unitWidth,
        height: 230 * unitHeight,
        borderRadius: 30 * unitWidth,
        shadowColor: "rgba(225, 194, 161, 0.46)",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: 6.5,
        shadowOpacity: 1,
        alignSelf: 'center',
        backgroundColor: 'rgb(222,188,154)',
        position: 'absolute',
        top: 194 * unitHeight
    },
    txt11: {
        textAlign: 'center',
        fontSize: 36 * unitWidth,
        color: '#fff'
    },
    chongzhi: {
        width: 550 * unitWidth,
        height: 72 * unitHeight,
        borderRadius: 25 * unitWidth,
        shadowColor: "rgba(86, 116, 255, 0.52)",
        shadowOffset: {
            width: 0,
            height: 2.5
        },
        shadowRadius: 6.5,
        shadowOpacity: 1,
        alignSelf: 'center',
        backgroundColor: 'rgb(55,113,255)',
        marginTop: 90 * unitHeight,
        justifyContent: 'center',
        marginBottom: 80 * unitHeight
    },
    vip_text: {
        fontSize: 30 * unitWidth,
        color: '#000',
        marginRight: 20 * unitWidth,
        marginLeft: 20 * unitWidth
    },
    vip_bg2: {
        width: 345 * 2 * unitWidth,
        height: 80 * 2 * unitHeight,
        borderRadius: 12 * unitWidth,
        backgroundColor: "#f0f0f0",
        alignSelf: 'center',
        marginTop: 20 * unitHeight,
        justifyContent: 'center',
        // alignItems: 'center',

    },
    vip_bg: {
        width: 345 * 2 * unitWidth,
        height: 80 * 2 * unitHeight,
        borderRadius: 12 * unitWidth,
        backgroundColor: "#f0f0f0",
        alignSelf: 'center',
        marginTop: 40 * unitHeight,
        justifyContent: 'center',
        alignItems: 'center'
    },
    viewstyles1: {
        marginTop: 35 * unitHeight,
        backgroundColor: 'rgb(241,240,246)',
        flex: 1

    },
    viewstyles2: {
        flex: 1,
        marginTop: 25 * unitHeight,
        width: 690 * unitWidth,
        // height: 300 * unitWidth,
        backgroundColor: '#fff',
        borderRadius: 20 * unitWidth,
        alignSelf: 'center',
        flexDirection: 'row',
        marginBottom: 5 * unitHeight,
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
        // fontFamily: "PingFangTC-Semibold",
        color: "#fff",
        fontWeight: 'bold',
        alignSelf: 'center',
        textAlign: 'center',
    },
    Text2: {
        fontSize: 30 * unitWidth,
        // fontFamily: "PingFangTC-Semibold",
        color: "#21262c",
        fontWeight: 'bold'
    },
    Text3: {
        fontSize: 24 * unitWidth,
        // fontFamily: "PingFangTC",
        color: "#8e8f94",
        marginLeft: 100 * unitWidth
    },
    Text4: {
        width: 550 * unitWidth,
        marginTop: 28 * unitHeight,
        fontSize: 26 * unitWidth,
        // fontFamily: "PingFangTC",
        color: "#8e8f94"
    },
    Text5: {

        fontSize: 26 * unitWidth,
        // fontFamily: "PingFangTC",
        color: "#8e8f94",
        marginBottom: 30 * unitHeight
    }
});
