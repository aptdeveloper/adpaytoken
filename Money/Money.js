import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    FlatList,
    StatusBar,
    ScrollView,
    ImageBackground
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
//导入路由操作
import { Actions } from 'react-native-router-flux'
//导入适配
import { unitWidth, unitHeight } from '../../AdapterUtil.js';
//导入防止点击工具类
import ClickUtil from '../Utils/ClickUtil.js';
import local from '../Utils/StorageUtils.js';
import { toastShort } from '../Utils/ToastUtils.js';
import NetUtils from '../Utils/NetUtils.js'
import CountDown from '../../CountDownReact.js'
export default class Money extends Component {
    constructor(props) {
        super(props)
        this.state = {
            flag: true
        }
    }
    _renderItem = ({ item: num }) => (
        <View style={styles.viewstyles8}>
            <View style={styles.viewstyles9}>
                <Text style={styles.txt10}>第一期兑换</Text>
                <View style={styles.viewstyles10}>
                    {/* <Text style={styles.txt11}>倒计时  <Text style={styles.txt11}>124:45:20</Text></Text> */}
                    <CountDown
                        style={{ alignSelf: 'center' }}
                        date={num}
                        // days={{ plural: 'Days ', singular: 'day ' }}
                        hours=':'
                        mins=':'
                        segs=''
                        onEnd={() => { this.setState({
                            flag:false
                        })}} // 结束回调
                    />
                </View>
            </View>

            <View style={styles.viewstyles11}>
                <View>
                    <Text style={styles.txt12}>1ETH = <Text style={styles.txt13}>100000<Text style={styles.txt14}> APT</Text></Text></Text>
                    <Text style={styles.txt15}>兑换率</Text>
                </View>

                <View style={{ width: 3 * unitWidth, height: 94 * unitHeight, backgroundColor: "#e1e7ea", marginLeft: 44 * unitWidth, marginRight: 51 * unitWidth, marginTop: 16 * unitHeight }} />

                <View >
                    <Text style={styles.txt16}>剩余<Text style={styles.txt17}> 664520</Text></Text>
                    <Text style={styles.txt16}>共   <Text style={styles.txt17}> 10000000</Text></Text>
                </View>

            </View>
            {this.state.flag ? (<LinearGradient style={styles.viewstyles12} colors={['rgb(55,163,255)', 'rgb(82,112,253)']}>
                <Text style={styles.txt18}>立即兑换</Text>
            </LinearGradient>) :
                (<LinearGradient style={styles.viewstyles12} colors={['rgb(160,161,163)', 'rgb(160,161,163)']}>
                    <Text style={styles.txt18}>立即兑换</Text>
                </LinearGradient>)}

        </View>
    )
    render() {
        return <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* 头部 */}
                <StatusBar
                    backgroundColor="transparent"
                    translucent={true}
                    hidden={false}
                    animated={true} />
                <ImageBackground source={require('../../img/m_bg.png')} style={styles.ImageBackgroundstyles}>
                    {/* 抬头 */}
                    <Text style={styles.txt1}>理财</Text>

                    {/* 购买数量，转入，转出 */}
                    <View style={styles.viewstyles1}>
                        <Text style={styles.txt2}>购买数量(APT)</Text>
                        <Text style={styles.txt3}>0.00</Text>
                        <View style={styles.viewstyles2}>
                            <Text style={styles.txt4}>T+2<Text style={styles.txt5}>周期可开始计算利息</Text></Text>
                        </View>
                        <View style={styles.viewstyles3}>
                            {/* 转出 */}
                            <View style={styles.viewstyles4}>
                                <Text style={styles.txt2}>累计收益(APT)</Text>
                                <Text style={styles.txt6}>0.00</Text>
                                <View style={styles.viewstyles6}>
                                    <Text style={styles.txt8}>转出</Text>
                                </View>
                            </View>
                            {/* 转入 */}
                            <View style={styles.viewstyles5}>
                                <Text style={styles.txt2}>日利率(%)</Text>
                                <Text style={styles.txt6}>0.00</Text>
                                <LinearGradient style={styles.viewstyles7} colors={['rgb(55,140,255)', 'rgb(82,112,253)']}>
                                    <Text style={styles.txt7}>转入</Text>
                                </LinearGradient>
                            </View>
                        </View>
                    </View>
                </ImageBackground>

                <Text style={styles.txt9}>限时兑换</Text>

                {/* 理财列表 */}
                <FlatList
                    style={{ marginTop: 24 * unitHeight }}
                    data={['2019-11-07T00:10:40+00:00', '2019-11-08T00:00:00+00:00', '2019-11-09T00:00:00+00:00']}
                    // key
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={this._renderItem}
                />
            </ScrollView>
        </View>
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    ImageBackgroundstyles: {
        width: null,
        height: 606 * unitWidth
    },
    viewstyles1: {
        width: 690 * unitWidth,
        height: 645 * unitWidth,
        marginTop: 34 * unitWidth,
        alignSelf: 'center',
        backgroundColor: "#ffffff",
        borderRadius: 20 * unitWidth,
        shadowColor: "rgba(211, 228, 252, 0.86)",
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 5,
        shadowOpacity: 2,
        elevation: 3
    },
    viewstyles2: {
        marginTop: 29 * unitWidth,
        width: 350 * unitWidth,
        height: 54 * unitWidth,
        borderRadius: 27 * unitWidth,
        backgroundColor: "#f3f5f9",
        alignSelf: 'center',
        justifyContent: 'center'
    },
    viewstyles3: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    viewstyles4: {
        marginTop: 30 * unitWidth,

    },
    viewstyles5: {
        marginTop: 30 * unitWidth,
    },
    viewstyles6: {
        width: 260 * unitWidth,
        height: 82 * unitWidth,
        marginTop: 34 * unitWidth,
        borderRadius: 5 * unitWidth,
        backgroundColor: "#e7ecf8",
        justifyContent: 'center'
    },
    viewstyles7: {
        width: 260 * unitWidth,
        height: 82 * unitWidth,
        marginTop: 34 * unitWidth,
        borderRadius: 5 * unitWidth,
        backgroundColor: "rgb(55,113,255)",
        marginLeft: 39 * unitWidth,
        justifyContent: 'center'
    },
    viewstyles8: {
        width: 690 * unitWidth,
        height: 435 * unitWidth,
        elevation: 2,
        borderRadius: 20 * unitWidth,
        backgroundColor: "#ffffff",
        shadowColor: "rgba(228, 227, 236, 0.86)",
        shadowOffset: {
            width: 0,
            height: 0
        },
        shadowRadius: 20 * unitWidth,
        shadowOpacity: 1,
        alignSelf: 'center',
        marginBottom: 30 * unitWidth,
        marginTop: 10 * unitWidth

    },
    viewstyles9: {
        flexDirection: 'row',
        marginLeft: 36 * unitWidth,
        marginTop: 37 * unitWidth
    },
    viewstyles10: {
        borderRadius: 3 * unitWidth,
        backgroundColor: "#ffe8e8",
        width: 250 * unitWidth,
        height: 38 * unitWidth,
        alignSelf: 'center',
        marginLeft: 17 * unitWidth,
        justifyContent: "center"
    },
    viewstyles11: {
        flexDirection: 'row',
        marginLeft: 36 * unitWidth,
        marginTop: 45 * unitWidth,
    },
    viewstyles12: {
        marginTop: 50 * unitWidth,
        width: 550 * unitWidth,
        height: 72 * unitWidth,
        borderRadius: 34.5 * unitWidth,
        shadowColor: "rgba(86, 116, 255, 0.52)",
        shadowOffset: {
            width: 0,
            height: 2.5
        },
        shadowRadius: 6.5,
        shadowOpacity: 1,
        alignSelf: 'center',
        justifyContent: 'center'
    },
    txt1: {
        fontSize: 34 * unitWidth,
        fontFamily: "PingFangTC-Semibold",
        color: "#ffffff",
        marginTop: 50 * unitWidth,
        textAlign: 'center'
    },
    txt2: {
        fontSize: 24 * unitWidth,
        fontFamily: "PingFangTC",
        color: "#626970",
        marginTop: 50 * unitWidth,
        textAlign: 'center'
    },
    txt3: {
        fontSize: 60 * unitWidth,
        fontFamily: "Montserrat-Regular",
        color: "#34383d",
        marginTop: 27 * unitWidth,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    txt4: {
        fontSize: 26 * unitWidth,
        fontFamily: "PingFangTC",
        textAlign: 'center',
        color: "#195bfc"
    },
    txt5: {
        fontSize: 26 * unitWidth,
        fontFamily: "PingFangTC",
        textAlign: 'center',
        color: "rgb(168,171,176)"
    },
    txt6: {
        fontSize: 36 * unitWidth,
        fontFamily: "Montserrat-Regular",
        color: "#34383d",
        marginTop: 22 * unitWidth,
        textAlign: 'center'
    },
    txt7: {
        fontSize: 30 * unitWidth,
        fontFamily: "PingFangTC",
        color: "#ffffff",
        textAlign: 'center'
    },
    txt8: {
        fontSize: 30 * unitWidth,
        fontFamily: "PingFangTC",
        color: "#969dae",
        textAlign: 'center'
    },
    txt9: {
        fontSize: 32 * unitWidth,
        fontFamily: "FZY4K--GBK1-0",
        color: "#2a2c31",
        fontWeight: 'bold',
        marginTop: 224 * unitWidth,
        marginLeft: 34 * unitWidth
    },
    txt10: {
        fontSize: 32 * unitWidth,
        fontFamily: "FZY4K--GBK1-0",
        color: "#2a2c31",
        fontWeight: 'bold',
    },
    txt11: {
        fontSize: 22 * unitWidth,
        fontFamily: "PingFangTC",
        color: "#ff2d41",
        textAlign: 'center'
    },
    txt12: {
        fontSize: 36 * unitWidth,
        fontFamily: "FZY4K--GBK1-0",
        color: "#ff3e2a",
        fontWeight: 'bold'
    },
    txt13: {
        fontSize: 33 * unitWidth,
        fontFamily: "Bebas",
        color: "#ff3e2a"
    },
    txt14: {
        fontSize: 28 * unitWidth,
        fontFamily: "FZY4K--GBK1-0",
        color: "#ff3e2a"
    },
    txt15: {
        fontSize: 24 * unitWidth,
        fontFamily: "PingFangTC",
        color: "#626970",
        marginTop: 18 * unitWidth
    },
    txt16: {
        fontSize: 26 * unitWidth,
        fontFamily: "PingFangTC",
        color: "#34383d",
        marginTop: 18 * unitWidth,
    },
    txt17: {
        fontSize: 34 * unitWidth,
        fontFamily: "Bebas",
        color: "#34383d",
        fontWeight: 'bold',
    },
    txt18: {
        fontSize: 30 * unitWidth,
        fontFamily: "PingFangTC-Semibold",
        color: "#ffffff",
        textAlign: 'center'
    }
});