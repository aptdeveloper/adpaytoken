import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    StatusBar,
    ImageBackground,
    ScrollView,
    TouchableOpacity,
    Clipboard
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Actions } from 'react-native-router-flux'
import { unitWidth, unitHeight } from '../../AdapterUtil.js';
import ClickUtil from '../Utils/ClickUtil.js';
import local from '../Utils/StorageUtils.js';
import { toastShort } from '../Utils/ToastUtils.js';
import NetUtils from '../Utils/NetUtils.js'
export default class InviteFriends extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            code: '',
            inviteUsersMaster: [],
            inviteUsersMasterZU: []

        }
    }
   
    render() {

        return <LinearGradient style={styles.container} colors={['rgb(55,163,255)', 'rgb(82,112,253)']}>
            <ScrollView showsVerticalScrollIndicator={false} >
                {/* heard */}
                <TouchableOpacity onPress={this.onBack} underlayColor="rgb(55,163,255)">
                    <View style={styles.styles_v1}>
                        <View>
                            <Image source={require('../../img/push_back.png')} style={styles.backstyles} />
                        </View>
                        <Text style={styles.textstyles}>邀请好友</Text>
                        <Text >         </Text>
                    </View>
                </TouchableOpacity>
                <View style={{ alignItems: 'center' }}>
                    <Image source={require('../../img/friends.png')} style={styles.img1} />
                </View>

                <View style={{ alignItems: 'center', marginTop: 34 * unitWidth }}>
                    <Text style={styles.tex1}>每邀请一位新用户，可获得10算力奖励，每日可邀请5位</Text>
                </View>

                {/* 参加步骤 */}
                <View style={styles.styles_v2}>
                    <View style={styles.notes_styles}>
                        <Image source={require('../../img/push_style.png')} style={styles.push_styles} />
                        <Text style={styles.noets_text_styles}>参与步骤</Text>
                        <Image source={require('../../img/push_style.png')} style={styles.push_styles} />
                    </View>

                    <View style={styles.styles_v3}>
                        <Image source={require('../../img/top1.png')} style={styles.img3} />
                        <View style={styles.linestyles} />
                        <Image source={require('../../img/top2.png')} style={styles.img3} />
                        <View style={styles.linestyles} />
                        <Image source={require('../../img/top3.png')} style={styles.img3} />
                    </View>
                    <View style={styles.styles_v4}>
                        <Text style={styles.tex2}>邀请好友</Text>
                        <Text style={styles.tex3}>好友下载APP,填写你的邀请码</Text>
                        <Text style={styles.tex4}>奖励到账</Text>
                    </View>
                    <Text style={styles.tex5}>我的邀请码</Text>

                    {/* 邀请码 */}
                    <Text style={styles.tex6}>{this.state.code}</Text>

                    {/* 邀请好友按钮 */}
                    <View style={{ flexDirection: 'row' }}>
                        <LinearGradient
                            style={styles.img4}
                            colors={['rgb(255,188,43)', 'rgb(255,160,38)']}
                        >
                            <Text style={styles.tex7} onPress={this.copy.bind(this, this.state.code)}>复制邀请链接</Text>
                        </LinearGradient>
                        <LinearGradient
                            style={[styles.img4, { marginLeft: 30 * unitWidth }]}
                            colors={['rgb(255,188,43)', 'rgb(255,160,38)']}
                        >
                            <Text style={styles.tex7} onPress={() => Actions.share({'code':this.state.code})}>生成邀请卡</Text>
                        </LinearGradient>
                    </View>



                </View>

                {/* 邀请记录*/}
                <View style={[styles.styles_v5, { height: 444 * unitHeight }]}>
                    <View style={styles.notes_styles}>
                        <Image source={require('../../img/push_style.png')} style={styles.push_styles} />
                        <Text style={styles.noets_text_styles} >我的邀请记录</Text>
                        <Image source={require('../../img/push_style.png')} style={styles.push_styles} />
                    </View>
                    <Text style={styles.tex12}>累计共<Text style={[styles.tex12, { color: "rgb(53,126,220)" }]}> {this.state.data.numMaster + this.state.data.numMasterZU} </Text>算力</Text>
                    <Text style={styles.tex12}>累计共<Text style={[styles.tex12, { color: "rgb(53,126,220)" }]}> {NetUtils.NumUtils(this.state.data.totalIncomeMaster + this.state.data.totalIncomeMasterZU)} </Text>APT</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <View >
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={styles.tex12} onPress={this.gototalIncomeMaster.bind(this, this.state.inviteUsersMaster)}>徒弟数 <Text style={[styles.tex12, { color: "rgb(53,126,220)" }]}>{this.state.inviteUsersMaster.length}</Text></Text>
                                <Image source={require('../../img/right.png')} style={{ marginLeft: 10 * unitWidth, width: 18 * unitWidth, height: 18 * unitWidth, alignItems: 'center', marginTop: 13 * unitHeight }} />
                            </View>
                            <View style={styles.viewstyles}>
                                <Text style={styles.tex13}>累计获得</Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                                    <View style={{ justifyContent: 'center', alignSelf: 'center', marginTop: 20 * unitHeight }}>
                                        <Text style={styles.tex15}>APT</Text>
                                        <Text style={styles.tex14}>{NetUtils.NumUtils(this.state.data.totalIncomeMaster)}</Text>
                                    </View>
                                    <View style={{ justifyContent: 'center', alignSelf: 'center', marginTop: 20 * unitHeight }}>
                                        <Text style={styles.tex15}>算力</Text>
                                        <Text style={styles.tex14}>{this.state.data.numMaster}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>

                        {/* ************************* */}
                        <View style={{ marginLeft: 52 * unitWidth }} >
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={styles.tex12} onPress={this.gototalIncomeMasterZU.bind(this, this.state.inviteUsersMasterZU)}>徒孙数 <Text style={[styles.tex12, { color: "rgb(53,126,220)" }]}>{this.state.inviteUsersMasterZU.length}</Text></Text>
                                <Image source={require('../../img/right.png')} style={{ marginLeft: 10 * unitWidth, width: 18 * unitWidth, height: 18 * unitWidth, alignItems: 'center', marginTop: 13 * unitHeight }} />
                            </View>
                            <View style={styles.viewstyles}>
                                <Text style={styles.tex13}>累计获得</Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                                    <View style={{ justifyContent: 'center', alignSelf: 'center', marginTop: 20 * unitHeight }}>
                                        <Text style={styles.tex15}>APT</Text>
                                        <Text style={styles.tex14}>{NetUtils.NumUtils(this.state.data.totalIncomeMasterZU)}</Text>
                                    </View>
                                    <View style={{ justifyContent: 'center', alignSelf: 'center', marginTop: 20 * unitHeight }}>
                                        <Text style={styles.tex15}>算力</Text>
                                        <Text style={styles.tex14}>{this.state.data.numMasterZU}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                    {/* 绳子 */}
                    <View style={styles.rope_styles}>
                        <Image source={require('../../img/rope.png')} style={{ width: 22 * unitWidth, height: 112 * unitWidth }} />
                        <Image source={require('../../img/rope.png')} style={{ width: 22 * unitWidth, height: 112 * unitWidth }} />
                    </View>
                </View>
                {/* 邀请规则 */}
                <View style={[styles.styles_v5, { marginTop: 10 * unitWidth }]}>
                    <View style={styles.notes_styles}>
                        <Image source={require('../../img/push_style.png')} style={styles.push_styles} />
                        <Text style={styles.noets_text_styles}>邀请规则</Text>
                        <Image source={require('../../img/push_style.png')} style={styles.push_styles} />
                    </View>
                    <Text style={styles.tex8}>1.每邀请一名有效好友，你就可以获得10算力奖励;</Text>
                    <Text style={styles.tex9}>2.你邀请的有效好友，其邀请一名有效好友，即二级好友，你将获得5算力奖励;</Text>
                    <Text style={styles.tex9}>3.系统会自动计算，只要达到有效用户条件，算力会自动发放到您的账号，请在APP里联系客服.</Text>

                    {/* 绳子 */}
                    <View style={[styles.rope_styles, { marginTop: -80 * unitWidth }]}>
                        <Image source={require('../../img/rope.png')} style={{ width: 22 * unitWidth, height: 112 * unitWidth }} />
                        <Image source={require('../../img/rope.png')} style={{ width: 22 * unitWidth, height: 112 * unitWidth }} />
                    </View>
                </View>
               

            </ScrollView>

        </LinearGradient >

    }
   
}
const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    viewstyles: {
        width: 250 * unitWidth,
        height: 160 * unitHeight,
        borderRadius: 10 * unitWidth,
        backgroundColor: "#c5e4ff",
        marginTop: 20 * unitHeight
    },
    styles_v1: {
        marginLeft: 30 * unitWidth,
        marginTop: 85 * unitWidth,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
  
    styles_v3: {
        marginTop: 55 * unitWidth,
        flexDirection: 'row',
        height: 46 * unitWidth,
        alignItems: 'center'

    },
    styles_v4: {
        marginTop: 21 * unitWidth,
        flexDirection: 'row',
    },
   
   
    styles_v7: {
        marginLeft: 46 * unitWidth,
        marginTop: 43 * unitWidth,
        marginRight: 46 * unitWidth,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center'
    },
    styles_v8: {
        marginTop: 68 * unitWidth,
        justifyContent: 'center',
        alignItems: 'center',
        // flexDirection: 'row'

    },
    styles_v9: {
        marginTop: 30 * unitWidth,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'

    },
    backstyles: {
        width: 24 * unitWidth,
        height: 41 * unitWidth,
    },
    textstyles: {
        fontSize: 34 * unitWidth,
        lineHeight: 50 * unitWidth,
        color: "#ffffff"
    },
    img1: {
        width: 517 * unitWidth,
        height: 80 * unitWidth,
        marginTop: 54 * unitWidth,
        alignItems: 'center'
    },
    img4: {
        marginTop: 49 * unitWidth,
        width: 270 * unitWidth,
        height: 80 * unitWidth,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 40 * unitWidth,
        shadowColor: "rgba(255, 162, 93, 0.55)",
        shadowOffset: {
            width: 0,
            height: 3.5
        },
        shadowRadius: 5,
        shadowOpacity: 1,
        elevation: 1

    },
    tex1: {
        fontSize: 26 * unitWidth,
        color: "#ffffff",
    },
    tex2: {
        fontSize: 22 * unitWidth,
        lineHeight: 50 * unitWidth,
        color: "#2a2c31"
    },
    tex3: {
        fontSize: 22 * unitWidth,
        lineHeight: 50 * unitWidth,
        color: "#2a2c31",
        marginLeft: 20 * unitWidth
    },
    tex4: {
        fontSize: 22 * unitWidth,
        lineHeight: 50 * unitWidth,
        color: "#2a2c31",
        marginLeft: 20 * unitWidth
    },
    tex5: {
        marginTop: 52 * unitWidth,
        fontSize: 26 * unitWidth,
        lineHeight: 50 * unitWidth,
        color: "#626970"
    },
    tex6: {
        fontSize: 56 * unitWidth,
        color: "#33363b",
        fontWeight: 'bold'
    },
    tex7: {
        fontSize: 30 * unitWidth,
        lineHeight: 50 * unitWidth,
        color: "#ffffff",
        textAlign: 'center'
    },
    tex8: {
        width: 554 * unitWidth,
        marginTop: 40 * unitWidth,
        fontSize: 28 * unitWidth,
        color: "#7c8faf",
        marginLeft: 20 * unitWidth,
        marginRight: 10 * unitWidth,
        lineHeight: 36 * unitWidth,
        alignSelf: 'center'

    },
    tex9: {
        width: 554 * unitWidth,
        fontSize: 28 * unitWidth,
        color: "#7c8faf",
        marginLeft: 20 * unitWidth,
        marginRight: 10 * unitWidth,
        lineHeight: 36 * unitWidth,

    },
    tex10: {
        fontSize: 28 * unitWidth,
        lineHeight: 50 * unitWidth,
        color: "#2a2c31",
        fontWeight: 'bold'
    },
    tex11: {
        fontSize: 28 * unitWidth,
        lineHeight: 50 * unitWidth,
        color: "#626970",
        fontWeight: 'bold'
    },
    tex12: {
        fontSize: 26 * unitWidth,
        color: "#626970",
        textAlign: 'center',
        marginTop: 10 * unitHeight,
    },
    tex13: {
        fontSize: 20 * unitWidth,
        color: "#347cdf",
        textAlign: 'center',
        marginTop: 18 * unitHeight
    },
    tex14: {
        fontSize: 20 * unitWidth,
        color: "#347cdf",
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 10 * unitHeight
    },
    tex15: {
        fontSize: 20 * unitWidth,
        color: "#347cdf",
        textAlign: 'center'
    },
    img2: {
        width: 750 * unitWidth,
        height: 471 * unitWidth
    },
    img3: {
        width: 46 * unitWidth,
        height: 46 * unitWidth,
    },
    notes_styles: {
        flexDirection: 'row',
        marginTop: 45 * unitWidth,
        alignItems: 'center'
    },
    push_styles: {
        width: 46 * unitWidth,
        height: 26 * unitWidth,

    },
    noets_text_styles: {
        fontSize: 28 * unitWidth,
        lineHeight: 50 * unitWidth,
        color: "#2a2c31",
        marginLeft: 20 * unitWidth,
        marginRight: 20 * unitWidth,
        fontWeight: 'bold'
    },
    linestyles: {
        width: 165 * unitWidth,
        height: 3 * unitWidth,
        backgroundColor: "#ffd4a0",
    },
    rope_styles: {
        flexDirection: 'row',
        width: 545 * unitWidth,
        height: 112 * unitWidth,
        marginRight: 47 * unitWidth,
        marginLeft: 47 * unitWidth,
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'absolute',
        marginTop: -75 * unitWidth
    }
});