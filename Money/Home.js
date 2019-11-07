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
export default class Home extends Component {
    constructor(props) {
        super(props);
        this.onMoneyHide = this.onMoneyHide.bind(this);
        this.state = {
           
        }
    }
    componentWillReceiveProps(nextProps) {
      

    }
    
    componentDidMount() {
    
    }
    // banner
    renderSwiper() {
        var itemArr = [];
        for (var i = 0; i < this.state.imagelist.length; i++) {
            let data = this.state.imagelist[i];
            itemArr.push(
                <TouchableHighlight key={i} >
                    <Image source={{ uri: data.imgUrl }} style={Styles.bannerImg} />
                </TouchableHighlight>
            );
        }
        return itemArr;
    }
    //item
    _renderItem = ({ item }) => (
        <TouchableHighlight onPress={this.GoTaskDetails.bind(this, item)} underlayColor='#fff'>
            <View style={Styles.home_v4}>
                <View style={{ flex: 1 }}>
                    {item.rewardType == 1 ? (<View style={{ flexDirection: 'row', marginLeft: 29 * unitWidth }}>
                        <Text style={{ fontSize: 30 * unitWidth, fontFamily: "FZY4K--GBK1-0", color: '#2a2c31', lineHeight: 50 * unitWidth, fontWeight: 'bold' }}>{item.taskName}</Text>
                        <Text style={{ fontSize: 30 * unitWidth, color: '#ff121d', fontFamily: "PingFangTC-Semibold", marginLeft: 19 * unitWidth, lineHeight: 50 * unitWidth }}>{NetUtils.NumUtils(item.reward)}</Text>
                        <Text style={{ fontSize: 23 * unitWidth, color: '#33363b', fontFamily: "PingFangTC", lineHeight: 50 * unitWidth }}> APT</Text>
                    </View>) : (<View style={{ flexDirection: 'row', marginLeft: 29 * unitWidth }}>
                        <Text style={{ fontSize: 30 * unitWidth, fontFamily: "FZY4K--GBK1-0", color: '#2a2c31', lineHeight: 50 * unitWidth, fontWeight: 'bold' }}>{item.taskName}</Text>
                        <Text style={{ fontSize: 30 * unitWidth, color: '#ff121d', fontFamily: "PingFangTC-Semibold", marginLeft: 19 * unitWidth, lineHeight: 50 * unitWidth }}>{item.reward}</Text>
                        <Text style={{ fontSize: 23 * unitWidth, color: '#33363b', fontFamily: "PingFangTC", lineHeight: 50 * unitWidth }}> 算力</Text>
                    </View>)}
                    <View style={{ marginLeft: 29 * unitWidth, marginTop: 18 * unitWidth }}>
                        <Text style={{ fontSize: 25 * unitWidth, color: '#626970' }}>点击视频查看奖励~</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontSize: 21 * unitWidth, color: '#626970', marginTop: 18 * unitWidth }}>已有</Text>
                            <Text style={{ fontSize: 21 * unitWidth, color: '#ff121d', marginTop: 18 * unitWidth }}>{item.taskRewardumber}</Text>
                            <Text style={{ fontSize: 21 * unitWidth, color: '#626970', marginTop: 18 * unitWidth }}>人获得奖励</Text>
                        </View>
                    </View>
                    <View style={{ width: 212 * unitWidth, height: 56 * unitWidth, borderRadius: 12, justifyContent: 'center', backgroundColor: '#6580FE', marginLeft: 10, marginTop: 10, marginBottom: 19 * unitWidth }}>
                        <Text style={{ color: '#fff', fontSize: 25 * unitWidth, textAlign: 'center' }}>观看视频 >></Text>
                    </View>
                </View>
                <Image source={{ uri: item.taskIcon }} style={{ width: 164 * unitWidth, height: 166 * unitWidth, marginRight: 17 * unitWidth }} />
            </View>
        </TouchableHighlight>
    )
    render() {

        return <View style={Styles.container}>
            <ScrollView>
                <StatusBar
                    backgroundColor="transparent"
                    translucent={true}
                    hidden={false}
                    animated={true} />
                <View style={Styles.home_v1}>
                    {this.state.login_flag ? (<View style={{ flex: 1, flexDirection: "row" }}>
                        <View style={{ flexDirection: "row", alignItems: 'center', marginTop: 5 }}>

                            <Image style={{ width: 28 * unitWidth, height: 31 * unitWidth }} source={require('../../img/gold.png')} />

                            <Image style={{ width: 59 * unitWidth, height: 26 * unitWidth, marginLeft: 5 }} source={require('../../img/APT.png')} />
                        </View>

                        <View style={{ flexDirection: "row", alignItems: 'center' }}>
                            <Text style={{ fontSize: 25 * unitWidth, color: "#33363b", textAlign: 'center', marginTop: 5 }}>余额</Text>
                            {this.state.hide_flag ?
                                (<Text style={{ fontSize: 40 * unitWidth, color: "#33363b", marginLeft: 2, textAlign: 'center', alignItems: 'center' }}>{this.state.money}</Text>) :
                                (<Text style={{ fontSize: 40 * unitWidth, color: "#33363b", marginLeft: 2, textAlign: 'center', alignItems: 'center' }}>******</Text>)}

                            <Text style={{ fontSize: 25 * unitWidth, color: "#33363b", marginLeft: 1, marginTop: 5 }}>枚</Text>

                            <TouchableHighlight onPress={this.onMoneyHide} underlayColor='#fff'>
                                {this.state.hide_flag ?
                                    (<Image style={{ width: 35 * unitHeight, height: 22 * unitHeight, marginLeft: 3, marginTop: 4, alignItems: 'center' }} source={require('../../img/see_yes.png')} />) :
                                    (<Image style={{ width: 35 * unitHeight, height: 22 * unitHeight, marginLeft: 3, marginTop: 4, alignItems: 'center' }} source={require('../../img/see_no.png')} />)}

                            </TouchableHighlight>
                        </View>

                    </View>) : (<TouchableHighlight style={{ marginTop: 5, flex: 1, }} onPress={this.onGoLogin} underlayColor="#fff"><Text style={{ textDecorationLine: "underline", fontSize: 40 * unitWidth, color: "#33363b" }}>点击登陆</Text></TouchableHighlight>)}

                    <TouchableHighlight onPress={() => Actions.msg()} underlayColor='#fff'>
                        <Image style={{ width: 40 * unitHeight, height: 32 * unitHeight, marginTop: 5 }} source={require('../../img/msg.png')} />
                    </TouchableHighlight>
                    {this.state.isNewEmail ?
                        (<Image style={{ width: 15 * unitHeight, height: 13 * unitHeight, marginTop: 5, position: 'absolute', right: 10, top: -3 }} source={require('../../img/dot_red.png')} />) :
                        (<View />)}

                </View>

               
                < TouchableHighlight onPress={this.goImage.bind(this)} underlayColor="#fff" >
                    <View style={{ height: 349 * unitWidth, width: 697 * unitWidth, marginTop: 10 * unitWidth, alignSelf: 'center' }}>
                        <Swiper
                            //样式
                            style={Styles.wrapper}
                            //组件高度
                            height={349 * unitHeight}
                            //如果设置为false，那么滑动到最后一张时，再次滑动将不会滑到第一张图片。
                            loop={true}
                            // showButtons —— 是否显示左右翻页按钮
                            showsButtons={false}
                            // autoPlay —— 是否自动播放
                            autoplay={true}
                            //每隔2秒切换
                            autoplayTimeout={3}
                            //水平方向，为false可设置为竖直方向
                            horizontal={true}
                            // paginationStyle —— 包含小点点的容器的样式，这里用来调整位置
                            paginationStyle={Styles.paginationStyle}
                            // dotStyle —— 小点点的样式
                            dotStyle={Styles.dotStyle}
                            //为true时显示小圆点
                            showsPagination={false}
                            // activeDotStyle —— 当前被激活的小点点的样式
                            dotStyle={Styles.activeDotStyle}>
                            {/* ({this.state.imagelist.map((item) => {
                                <Image source={{ uri: item.imgUrl }} style={Styles.bannerImg} />
                            })}) */}
                            {/* <Image source={{ uri: this.state.imagelist[0].imgUrl }} style={Styles.bannerImg} />
                            <Image source={{ uri: this.state.imagelist[1].imgUrl }} style={Styles.bannerImg} /> */}
                            {/* <Image source={require('../../img/banner.png')} style={Styles.bannerImg} /> */}
                            {this.renderSwiper()}

                        </Swiper>
                    </View>
                </TouchableHighlight >
               
                < View style={Styles.home_v2} >

                    <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                        <Image style={{ width: 49 * unitWidth, height: 52 * unitWidth, marginLeft: 28 * unitWidth }} source={require('../../img/tz.png')} />
                        <MarqueeVertical
                            textList={this.state.Mdata}
                            width={424 * unitWidth}
                            height={92 * unitWidth}
                            direction={'up'}
                            numberOfLines={1}
                            bgContainerStyle={{ backgroundColor: '#fff' }}

                            textStyle={{ fontSize: 26 * unitWidth, color: "#33363b", marginLeft: 45 * unitWidth }}
                            onTextClick={(item) => {
                                alert('' + JSON.stringify(item));
                            }}
                        >
                        </MarqueeVertical>
                    </View>

                    <Text style={{ alignItems: 'center', color: "#777a7f", fontSize: 23 * unitWidth, marginRight: 35 * unitWidth }}>|        更多</Text>

                </View >

                <View style={Styles.home_v3}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                        <Image source={require('../../img/award.png')} style={{ width: 33 * unitWidth, height: 39 * unitWidth }} />
                        <Image source={require('../../img/task.png')} style={{ width: 124 * unitWidth, height: 31 * unitWidth, marginLeft: 17 * unitWidth }} />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image source={require('../../img/go.png')} style={{ width: 15 * unitWidth, height: 24 * unitWidth }} />
                    </View>
                </View>


                <FlatList
                    style={{ marginTop: 40 * unitHeight }}
                  
                    data={this.state.data}
                
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={this._renderItem}
                />

            </ScrollView>
        </View >
    }
}

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 53 * unitWidth,
        backgroundColor: '#fff',

    },
    home_v1: {
        flexDirection: "row",
        alignSelf: 'center',
        paddingRight: 28 * unitWidth,
        paddingLeft: 28 * unitWidth,
    },
    home_v2: {
        flexDirection: "row",
        elevation: 1.5,  
        shadowColor: 'rgba(228, 227, 236, 0.86)',
        shadowOffset: { width: 0, height: 0 },  
        shadowOpacity: 1,  
        shadowRadius: 10 * unitWidth, 
        height: 92 * unitWidth,
        width: 697 * unitWidth,
        borderRadius: 10 * unitWidth,
        alignItems: 'center',
        backgroundColor: '#fff',
        alignSelf: 'center'

        // borderColor:'black'
    },
    home_v3: {
        flexDirection: "row",
        marginTop: 38 * unitWidth,
        paddingRight: 28 * unitWidth,
        paddingLeft: 28 * unitWidth,
    },
    home_v4: {
        flexDirection: 'row',
        elevation: 1, 
        shadowColor: "rgba(228, 227, 236, 0.86)",  
        shadowOffset: { width: 0, height: 0 }, 
        shadowOpacity: 1,  
        shadowRadius: 20 * unitWidth,  
        height: 261 * unitWidth,
        width: 697 * unitWidth,
        borderRadius: 20 * unitWidth,
        alignItems: 'center',
        backgroundColor: '#fff',
        marginBottom: 30 * unitWidth,
        alignSelf: 'center',
        marginTop: 10 * unitHeight

    },
    wrapper: {
        height: 349 * unitWidth,
        width: 750 * unitWidth,
    },
    paginationStyle: {
        bottom: 0,
    },
    dotStyle: {
        width: 22,
        height: 3,
        backgroundColor: '#fff',
        opacity: 0.4,
        borderRadius: 0,
    },
    activeDotStyle: {
        width: 22,
        height: 3,
        backgroundColor: '#fff',
        borderRadius: 0,
    },
    bannerImg: {
        height: unitWidth * 320,
        width: unitWidth * 697,
        borderRadius: 8,
        resizeMode: 'contain',

    },
});