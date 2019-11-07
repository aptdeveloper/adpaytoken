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
    ImageBackground,
    TouchableHighlight
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Actions } from 'react-native-router-flux'
import { unitWidth, unitHeight } from '../../AdapterUtil.js';
import ClickUtil from '../Utils/ClickUtil.js';
import local from '../Utils/StorageUtils.js';
import { toastShort } from '../Utils/ToastUtils.js';
import NetUtils from '../Utils/NetUtils.js'
import CountDown from '../../CountDownReact.js'
export default class DownLoadTaskDetails extends Component {
    constructor(props) {
        super(props)
        const item = this.props.item;
        this.state = {
   
        }
    }
    componentDidMount() {
       
    }
    render() {
        return <View style={styles.container}>
            <ScrollView>
                <View style={{ flexDirection: 'row', marginTop: 80 * unitHeight, justifyContent: 'space-between' }}>

                    <TouchableHighlight onPress={() => Actions.pop()} underlayColor='#fff'>
                        <Image source={require('../../img/back.png')} style={styles.Image} />
                    </TouchableHighlight>
                    <Text style={styles.txt1}>任务详情</Text>
                    <Text style={{ marginRight: 30 * unitWidth }}>   </Text>
                </View>
                <View style={{ backgroundColor: 'rgb(243,245,249)', marginTop: 35 * unitHeight }}>
                    <LinearGradient style={styles.viewstyles1} colors={['rgb(55,158,255)', 'rgb(68,135,254)']}>
                        <Image source={{ uri: this.state.item.taskIcon }} style={styles.Imagestyles} />
                        <View style={{ marginTop: 43 * unitHeight, marginLeft: 26 * unitWidth }}>
                            <Text style={styles.txt2}>{this.state.item.taskName}</Text>
                            <Text style={styles.txt3}>下载APP获得100算力奖励</Text>

                        </View>
                        <View style={styles.viewstyles2}>
                            {this.state.item.rewardType == 1?(<Text style={styles.txt4}>奖励 {NetUtils.NumUtils(this.state.item.reward)}</Text>):
                            (<Text style={styles.txt4}>奖励 {this.state.item.reward}</Text>)}
                        </View>
                    </LinearGradient>

                    <View style={styles.viewstyles3}>
                        <Text style={styles.txt5}>任务详情</Text>
                        <Text style={styles.txt6}>{this.state.item.createTime}</Text>
                        <Text style={styles.txt7}>{this.state.item.taskDetails}</Text>
                        <View style={styles.viewstyles4}>
                            <View style={{ height: 25 * unitHeight, width: 8 * unitWidth, backgroundColor: "#457dfe", borderRadius: 4 * unitWidth, alignSelf: 'center', marginRight: 10 * unitWidth }} />
                            <Text style={styles.txt1}>产品介绍</Text>
                        </View>
                        <Text style={styles.txt7}>{this.state.item.products}</Text>
                        <View style={styles.viewstyles4}>
                            <View style={{ height: 25 * unitHeight, width: 8 * unitWidth, backgroundColor: "#457dfe", borderRadius: 4 * unitWidth, alignSelf: 'center', marginRight: 10 * unitWidth }} />
                            <Text style={styles.txt1}>玩法攻略</Text>
                        </View>
                        <Text style={styles.txt7}>{this.state.item.products}</Text>

                        <View style={styles.viewstyles5}>
                            <Image source={require('../../img/invite_img.png')} style={styles.Imagestyles1} />
                            <Image source={require('../../img/invite_img.png')} style={styles.Imagestyles1} />
                            <Image source={require('../../img/invite_img.png')} style={styles.Imagestyles1} />
                        </View>

                    </View>
                </View>
            </ScrollView>
            <View style={styles.viewstyles6}>
                <Text style={styles.txt8}>立即下载</Text>
            </View>
        </View>
    }
   
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    Imagestyles1: {
        width: "33.3%",
        height: 326 * unitHeight
    },
    viewstyles1: {
        width: 690 * unitWidth,
        height: 180 * unitHeight,
        alignSelf: 'center',
        marginTop: 25 * unitHeight,
        borderRadius: 20 * unitWidth,
        flexDirection: 'row'
    },
    viewstyles2: {
        width: 150 * unitWidth,
        height: 60 * unitHeight,
        marginLeft: 50 * unitWidth,
        backgroundColor: "#ffffff",
        borderRadius: 30 * unitWidth,
        alignSelf: 'center',
        shadowColor: "rgba(30, 62, 176, 0.27)",
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowRadius: 9,
        shadowOpacity: 1,
        elevation: 1,
        justifyContent: 'center'

    },
    viewstyles6: {
        width: 750 * unitWidth,
        height: 110 * unitHeight,
        justifyContent: 'center',
        backgroundColor: "#3b98ff",
        shadowColor: "rgba(0, 0, 0, 0.15)",
        shadowOffset: {
            width: 0,
            height: 0
        },
        shadowRadius: 8,
        shadowOpacity: 1,
        position: 'absolute',
        bottom: 0
    },
    viewstyles4: {
        marginTop: 40 * unitHeight,
        marginLeft: 32 * unitWidth,
        flexDirection: 'row'
    },
    viewstyles3: {
        flex: 1,
        marginTop: 25 * unitHeight,
        width: 690 * unitWidth,
        height: 1162 * unitHeight,
        backgroundColor: "#ffffff",
        alignSelf: 'center',
        borderRadius: 20 * unitWidth,
        marginBottom: 110 * unitHeight,

    },
    viewstyles5: {
        marginLeft: 32 * unitWidth,
        marginRight: 32 * unitWidth,
        marginTop: 52 * unitHeight,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    Image: {
        width: 24 * unitWidth,
        height: 41 * unitHeight,
        alignSelf: 'flex-end',
        marginLeft: 30 * unitWidth
    },
    Imagestyles: {
        width: 80 * unitWidth,
        height: 80 * unitHeight,
        marginLeft: 38 * unitWidth,
        marginTop: 48 * unitHeight
    },
    txt1: {
        fontSize: 34 * unitWidth,
        fontFamily: "PingFangTC-Semibold",
        color: "#21262c",
        fontWeight: 'bold',
        alignSelf: 'center',
        textAlign: 'center',
    },
    txt2: {
        fontSize: 32 * unitWidth,
        fontFamily: "FZY4K--GBK1-0",
        color: "#ffffff"
    },
    txt3: {
        fontSize: 26 * unitWidth,
        fontFamily: "PingFangTC",
        color: "#ffffff",
        marginTop: 20 * unitHeight
    },
    txt4: {
        fontSize: 24 * unitWidth,
        fontFamily: "PingFangTC-Semibold",
        color: "#3e5bc5",
        fontWeight: 'bold',
        textAlign: 'center'
    },
    txt5: {
        marginTop: 40 * unitHeight,
        marginLeft: 32 * unitWidth,
        fontSize: 30 * unitWidth,
        fontFamily: "PingFangTC-Semibold",
        color: "#21262c",
        fontWeight: 'bold'
    },
    txt6: {
        marginTop: 19 * unitHeight,
        marginLeft: 32 * unitWidth,
        fontSize: 26 * unitWidth,
        fontFamily: "OpenSans",
        color: "#838b97"
    },
    txt7: {
        marginLeft: 32 * unitWidth,
        marginRight: 32 * unitWidth,
        marginTop: 29 * unitHeight,
        fontSize: 26 * unitWidth,
        fontFamily: "PingFangTC",
        color: "#21262c"
    },
    txt8: {
        fontSize: 32 * unitWidth,
        fontFamily: "FZY4K--GBK1-0",
        color: "#ffffff",
        textAlign: 'center'
    }
});