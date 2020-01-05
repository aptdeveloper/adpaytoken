import React, { Component } from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View, ScrollView, StatusBar, ActivityIndicator, Dimensions,FlatList } from 'react-native';
import Echarts from 'native-echarts';
import { Actions } from 'react-native-router-flux'
import { unitWidth, unitHeight } from '../../AdapterUtil.js';
import ClickUtil from '../Utils/ClickUtil.js';
import local from '../Utils/StorageUtils.js';
import NetUtils from '../Utils/NetUtils.js'
import base64 from "react-native-base64";
import { Buffer } from "buffer";
import { toastShort } from '../Utils/ToastUtils.js';
import RNReactNativeZlib from '@klarna/react-native-zlib'
import DateUtil from '../Utils/DateUtil.js';
import Language from '../Language/Language'
var upColor = '#ec0000';
var upBorderColor = '#8A0000';
var downColor = '#00da3c';
var downBorderColor = '#008F28';
var ScreenWidth = Dimensions.get('window').width;
export default class Market extends Component {
    constructor() {
        super()
        this.state = {
            data: [1,2,3,4,5,6,7],
            isloading: false
            // info: "",
            // aptdata: [],
            // categoryData: [],
            // values: [],
            // // volumes: [],
            // isloading: false
        };
    }
    componentDidMount() {
        this.quotesApi()
    }
    componentWillReceiveProps(props) {
        this.quotesApi()
    }
    render() {
        return <View style={styles.contaner}>
            <StatusBar
                backgroundColor="transparent"
                translucent={true}
                hidden={false}
                animated={true}
            barStyle={'dark-content'} // enum('default', 'light-content', 'dark-content')
            />
            <Text style={styles.txt}>{Language.market()}</Text>
            <View style={{ height: 2 * unitWidth, width: null, backgroundColor: "#efefef", marginTop: 24 * unitHeight }} />
            <View style={styles.market_v1}>
                <Text style={styles.txt1}>{Language.name()}</Text>
                <Text style={styles.txt1}>{Language.latest_pricing()}</Text>
                <Text style={styles.txt1}>{Language.fall_or_increase()}</Text>
            </View>
            <FlatList
                // 数据数组
                data={this.state.data}
                // key
                keyExtractor={(item, index) => index.toString()}
                renderItem={this._renderItem}
            // refreshControl={
            //     <RefreshControl
            //         // title={'loading'}
            //         colors={['#fff']}
            //         tintColor={'#fff'}
            //         refreshing={this.state.isloading}
            //         onRefresh={() => this.quotesApi()}
            //         /**
            //           * 从下往上拉去的时候加载更多
            //           */
            //         // onEndReached={this.quotesApi()}            //上拉加载方法
            //         // onEndReachedThreshold={0.2}                                        //距离底部有多远的时候进行加载
            //     />
            // }
            />
        </View>
    }
    _renderItem = ({ item }) => (
        <View style={[styles.market_v1, { marginTop: 43 * unitHeight, justifyContent: 'flex-start' }]}>
            <View style={{ width: ScreenWidth / 3 }}>
                <Text style={styles.txt2}>{item.currency}ETH<Text style={[styles.txt3, { color: "#405166" }]}>/AQ{item.tradeCurrency}</Text></Text>
                <Text style={[styles.txt3, { marginTop: 10 * unitHeight }]}>{item.vol}成交量 123456</Text>
            </View>
            <View style={{ width: ScreenWidth / 3, marginLeft: 25 * unitWidth }}>
                <Text style={styles.txt2}>{item.price}815963</Text>
                <Text style={[styles.txt3, { marginTop: 10 * unitHeight }]}>¥ {item.currencyExCNY}20.1618</Text>
            </View>
            {item%2 == 0 ?
                <View style={{ width: ScreenWidth / 3 }}>
                    <View style={styles.market_v2}>
                        <Text style={styles.txt4}>{item.increase}-12%</Text>
                    </View>
                </View> :
                <View style={{ width: ScreenWidth / 3 }}>
                    <View style={[styles.market_v2, { backgroundColor: "#00e1bf" }]}>
                        <Text style={styles.txt4}>{item.increase}+8%</Text>
                    </View>
                </View>}

        </View>
    )

    quotesApi() {
 
    }
    // componentDidMount() {
    //     this.getinfo()
    //     this.getdata()
    // }
    // componentWillReceiveProps(){
    //     this.getinfo()
    //     this.getdata()
    // }
    // splitData() {
    //     let rawData = this.state.aptdata
    //     let categoryData = [];
    //     let values = []
    //     let volumes = []
    //     for (var i = 0; i < rawData.length; i++) {
    //         categoryData.push(DateUtil.formatDate(rawData[i].ts, "MM-dd hh:mm"));
    //         values.push([Number.parseFloat(rawData[i].openval), Number.parseFloat(rawData[i].closeval), Number.parseFloat(rawData[i].lowval), Number.parseFloat(rawData[i].highval)])
    //         // volumes.push([i, rawData[i].volval[4], rawData[i].volval[0] > rawData[i].volval[1] ? 1 : -1])
    //     }
    //     this.setState({
    //         categoryData: categoryData,
    //         values: values,
    //         // volumes: volumes
    //     })
    // }
    // calculateMA(dayCount) {
    //     var result = [];
    //     for (var i = 0, len = this.state.values.length; i < len; i++) {
    //         if (i < dayCount) {
    //             result.push('-');
    //             continue;
    //         }
    //         var sum = 0;
    //         for (var j = 0; j < dayCount; j++) {
    //             sum += this.state.values[i - j][1];
    //         }
    //         result.push(sum / dayCount);
    //     }
    //     return result;
    // }
    // getinfo() {
    //     let url = NetUtils.Url() + "AofexApi/market/24detail"
    //     NetUtils.PostorGet(url, 'GET', (data) => {
    //         if (data.code == 200) {
    //             this.setState({
    //                 info: data.data
    //             })
    //         } 
    //     })
    // }
    // getdata() {
    //     this.setState({
    //         isloading: true
    //     })
    //     let url = NetUtils.Url() + "AofexApi/market/kline?beginTime=" + (new Date().getTime() - (50 * 60000)) + "&endTime=" + new Date().getTime()
    //     NetUtils.PostorGet(url, 'GET', (data) => {
    //         this.setState({
    //             isloading: false
    //         })
    //         if (data.code == 200) {
    //             this.setState({
    //                 aptdata: data.data
    //             })
    //             this.splitData()
    //             // console.log(this.state.values)
    //         } else {
    //             this.setState({
    //                 isloading: false
    //             })
    //         }

    //     })
    // }
    // render() {
    //     const option2 = {
    //         backgroundColor: '#FAFAFA',
    //         // title: {
    //         //     text: 'fdsfsd',
    //         //     // left: 0,
    //         // },
    //         tooltip: {
    //             trigger: 'axis',
    //             axisPointer: {
    //                 type: 'cross'
    //             }
    //         },
    //         legend: {
    //             data: ['日K', 'MA5', 'MA10', 'MA20', 'MA30']
    //         },
    //         // 网格
    //         grid: {
    //             left: '10%',
    //             right: '10%',
    //             bottom: '15%',
    //             show: true,
    //             // backgroundColor:'#FFFFFF'
    //         },
    //         xAxis: {
    //             type: 'category',
    //             data: this.state.categoryData,
    //             scale: true,
    //             boundaryGap: false,
    //             axisLine: { onZero: false },
    //             splitLine: { show: true },
    //             splitNumber: 20,
    //             min: 'dataMin',
    //             max: 'dataMax'
    //         },
    //         yAxis: {
    //             position: 'right',
    //             scale: true,
    //             splitArea: {
    //                 show: false
    //             },
    //             axisLabel: {
    //                 inside: true,
    //                 formatter: '{value}\n'
    //             }

    //         },
    //         dataZoom: [
    //             {
    //                 filterMode: 'filter',
    //                 type: 'inside',
    //                 start: 80,
    //                 end: 100,
    //                 zoomLock: true,
    //             },
    //             {
    //                 zoomLock: true,
    //                 show: false,
    //                 type: 'slider',
    //                 y: '90%',
    //                 start: 30,
    //                 end: 100
    //             }
    //         ],
    //         series: [
    //             {
    //                 name: '日K',
    //                 type: 'candlestick',
    //                 data: this.state.values,
    //                 itemStyle: {
    //                     normal: {
    //                         color: '#ec0000',
    //                         color0: '#00da3c',
    //                         borderColor: '#8A0000',
    //                         borderColor0: '#008F28'
    //                     }
    //                 },
    //                 markPoint: {
    //                     label: {
    //                         normal: {
    //                             formatter: function (param) {
    //                                 return param != null ? Math.round(param.value) : '';
    //                             }
    //                         }
    //                     },
    //                     // data: [
    //                     //     // {
    //                     //     //     name: 'XX标点',
    //                     //     //     coord: ['2013/5/31', 2300],
    //                     //     //     value: 2300,
    //                     //     //     itemStyle: {
    //                     //     //         normal: { color: 'rgb(41,60,85)' }
    //                     //     //     }
    //                     //     // },
    //                     //     {
    //                     //         name: 'highest value',
    //                     //         type: 'max',
    //                     //         valueDim: 'highest' 
    //                     //     },
    //                     //     {
    //                     //         name: 'lowest value',
    //                     //         type: 'min',
    //                     //         valueDim: 'lowest'
    //                     //     }, 
    //                     //     {
    //                     //         name: 'average value on close',
    //                     //         type: 'average',
    //                     //         valueDim: 'close'
    //                     //     }
    //                     // ],
    //                     tooltip: {
    //                         formatter: function (param) {
    //                             return param.name + '<br>' + (param.data.coord || '');
    //                         }
    //                     },
    //                     markLine: {
    //                         symbol: ['none', 'none'],
    //                         data: [
    //                             [
    //                                 {
    //                                     name: 'from lowest to highest',
    //                                     type: 'min',
    //                                     valueDim: 'lowest',
    //                                     symbol: 'circle',
    //                                     symbolSize: 10,
    //                                     label: {
    //                                         normal: { show: false },
    //                                         emphasis: { show: false }
    //                                     }
    //                                 },
    //                                 {
    //                                     type: 'max',
    //                                     valueDim: 'highest',
    //                                     symbol: 'circle',
    //                                     symbolSize: 10,
    //                                     label: {
    //                                         normal: { show: false },
    //                                         emphasis: { show: false }
    //                                     }
    //                                 }
    //                             ],
    //                             {
    //                                 name: 'min line on close',
    //                                 type: 'min',
    //                                 valueDim: 'close'
    //                             },
    //                             {
    //                                 name: 'max line on close',
    //                                 type: 'max',
    //                                 valueDim: 'close'
    //                             }
    //                         ]
    //                     }

    //                 }
    //             },
    //             {
    //                 name: 'MA5',
    //                 type: 'line',
    //                 data: this.calculateMA(5),
    //                 smooth: true,
    //                 lineStyle: {
    //                     normal: { opacity: 0.5 }
    //                 }
    //             },
    //             {
    //                 name: 'MA10',
    //                 type: 'line',
    //                 data: this.calculateMA(10),
    //                 smooth: true,
    //                 lineStyle: {
    //                     normal: { opacity: 0.5 }
    //                 }
    //             },
    //             {
    //                 name: 'MA20',
    //                 type: 'line',
    //                 data: this.calculateMA(20),
    //                 smooth: true,
    //                 lineStyle: {
    //                     normal: { opacity: 0.5 }
    //                 }
    //             },
    //             {
    //                 name: 'MA30',
    //                 type: 'line',
    //                 data: this.calculateMA(30),
    //                 smooth: true,
    //                 lineStyle: {
    //                     normal: { opacity: 0.5 }
    //                 }
    //             },
    //             // {
    //             //     name: 'Volume',
    //             //     type: 'bar',
    //             //     xAxisIndex: 1,
    //             //     yAxisIndex: 1,
    //             //     data: this.state.volumes
    //             // }
    //         ]
    //     };
    //     const option = {
    //         backgroundColor: '#fff',
    //         animation: false,
    //         legend: {
    //             bottom: 10,
    //             left: 'center',
    //             data: ['Dow-Jones index', 'MA5', 'MA10', 'MA20', 'MA30']
    //         },
    //         tooltip: {
    //             trigger: 'axis',
    //             axisPointer: {
    //                 type: 'cross'
    //             },
    //             backgroundColor: 'rgba(245, 245, 245, 0.8)',
    //             borderWidth: 1,
    //             borderColor: '#ccc',
    //             padding: 10,
    //             textStyle: {
    //                 color: '#000'
    //             },
    //             position: function (pos, params, el, elRect, size) {
    //                 var obj = { top: 10 };
    //                 obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 30;
    //                 return obj;
    //             }
    //             // extraCssText: 'width: 170px'
    //         },
    //         axisPointer: {
    //             link: { xAxisIndex: 'all' },
    //             label: {
    //                 backgroundColor: '#777'
    //             }
    //         },
    //         toolbox: {
    //             feature: {
    //                 dataZoom: {
    //                     yAxisIndex: true
    //                 },
    //                 brush: {
    //                     type: ['lineX', 'clear']
    //                 }
    //             }
    //         },
    //         brush: {
    //             xAxisIndex: 'all',
    //             brushLink: 'all',
    //             outOfBrush: {
    //                 colorAlpha: 0.1
    //             }
    //         },
    //         visualMap: {
    //             show: false,
    //             seriesIndex: 5,
    //             dimension: 2,
    //             pieces: [{
    //                 value: 1,
    //                 color: downColor
    //             }, {
    //                 value: -1,
    //                 color: upColor
    //             }]
    //         },
    //         grid: [
    //             {
    //                 left: '10%',
    //                 right: '8%',
    //                 height: '50%'
    //             },
    //             {
    //                 left: '10%',
    //                 right: '8%',
    //                 top: '63%',
    //                 height: '16%'
    //             }
    //         ],
    //         xAxis: [
    //             {
    //                 type: 'category',
    //                 data: this.state.categoryData,
    //                 scale: true,
    //                 boundaryGap: false,
    //                 axisLine: { onZero: false },
    //                 splitLine: { show: false },
    //                 splitNumber: 20,
    //                 min: 'dataMin',
    //                 max: 'dataMax',
    //                 axisPointer: {
    //                     z: 100
    //                 }
    //             },
    //             {
    //                 type: 'category',
    //                 gridIndex: 1,
    //                 data: this.state.categoryData,
    //                 scale: true,
    //                 boundaryGap: false,
    //                 axisLine: { onZero: false },
    //                 axisTick: { show: false },
    //                 splitLine: { show: false },
    //                 axisLabel: { show: false },
    //                 splitNumber: 20,
    //                 min: 'dataMin',
    //                 max: 'dataMax'
    //                 // axisPointer: {
    //                 //     label: {
    //                 //         formatter: function (params) {
    //                 //             var seriesValue = (params.seriesData[0] || {}).value;
    //                 //             return params.value
    //                 //             + (seriesValue != null
    //                 //                 ? '\n' + echarts.format.addCommas(seriesValue)
    //                 //                 : ''
    //                 //             );
    //                 //         }
    //                 //     }
    //                 // }
    //             }
    //         ],
    //         yAxis: [
    //             {
    //                 scale: true,
    //                 splitArea: {
    //                     show: true
    //                 }
    //             },
    //             {
    //                 scale: true,
    //                 gridIndex: 1,
    //                 splitNumber: 2,
    //                 axisLabel: { show: false },
    //                 axisLine: { show: false },
    //                 axisTick: { show: false },
    //                 splitLine: { show: false }
    //             }
    //         ],
    //         dataZoom: [
    //             {
    //                 type: 'inside',
    //                 xAxisIndex: [0, 1],
    //                 start: 98,
    //                 end: 100
    //             },
    //             {
    //                 show: true,
    //                 xAxisIndex: [0, 1],
    //                 type: 'slider',
    //                 top: '85%',
    //                 start: 98,
    //                 end: 100
    //             }
    //         ],
    //         series: [
    //             {
    //                 name: 'Dow-Jones index',
    //                 type: 'candlestick',
    //                 data: this.state.values,
    //                 itemStyle: {
    //                     normal: {
    //                         color: upColor,
    //                         color0: downColor,
    //                         borderColor: null,
    //                         borderColor0: null
    //                     }
    //                 },
    //                 tooltip: {
    //                     formatter: function (param) {
    //                         param = param[0];
    //                         return [
    //                             'Date: ' + param.name + '<hr size=1 style="margin: 3px 0">',
    //                             'Open: ' + param.data[0] + '<br/>',
    //                             'Close: ' + param.data[1] + '<br/>',
    //                             'Lowest: ' + param.data[2] + '<br/>',
    //                             'Highest: ' + param.data[3] + '<br/>'
    //                         ].join('');
    //                     }
    //                 }
    //             },
    //             {
    //                 name: 'MA5',
    //                 type: 'line',
    //                 data: this.calculateMA(5),
    //                 smooth: true,
    //                 lineStyle: {
    //                     normal: { opacity: 0.5 }
    //                 }
    //             },
    //             {
    //                 name: 'MA10',
    //                 type: 'line',
    //                 data: this.calculateMA(10),
    //                 smooth: true,
    //                 lineStyle: {
    //                     normal: { opacity: 0.5 }
    //                 }
    //             },
    //             {
    //                 name: 'MA20',
    //                 type: 'line',
    //                 data: this.calculateMA(20),
    //                 smooth: true,
    //                 lineStyle: {
    //                     normal: { opacity: 0.5 }
    //                 }
    //             },
    //             {
    //                 name: 'MA30',
    //                 type: 'line',
    //                 data: this.calculateMA(30),
    //                 smooth: true,
    //                 lineStyle: {
    //                     normal: { opacity: 0.5 }
    //                 }
    //             },
    //             {
    //                 name: 'Volume',
    //                 type: 'bar',
    //                 xAxisIndex: 1,
    //                 yAxisIndex: 1,
    //                 data: this.state.volumes
    //             }
    //         ]
    //     };
    //     const option3 = {
    //         title: {
    //             text: '',
    //             left: 0
    //         },
    //         tooltip: {
    //             trigger: 'axis',
    //             axisPointer: {
    //                 type: 'cross'
    //             }
    //         },
    //         legend: {
    //             data: ['日K', 'MA5', 'MA10', 'MA20', 'MA30']
    //         },
    //         grid: {
    //             left: '10%',
    //             right: '10%',
    //             bottom: '15%'
    //         },
    //         xAxis: {
    //             type: 'category',
    //             data: this.state.categoryData,
    //             scale: true,
    //             boundaryGap: false,
    //             axisLine: { onZero: false },
    //             splitLine: { show: false },
    //             splitNumber: 20,
    //             min: 'dataMin',
    //             max: 'dataMax'
    //         },
    //         yAxis: {
    //             scale: true,
    //             splitArea: {
    //                 show: true
    //             }
    //         },
    //         dataZoom: [
    //             {
    //                 type: 'inside',
    //                 start: 50,
    //                 end: 100
    //             },
    //             {
    //                 show: true,
    //                 type: 'slider',
    //                 top: '90%',
    //                 start: 50,
    //                 end: 100
    //             }
    //         ],
    //         series: [
    //             {
    //                 name: '日K',
    //                 type: 'candlestick',
    //                 data: this.state.values,
    //                 itemStyle: {
    //                     color: upColor,
    //                     color0: downColor,
    //                     borderColor: upBorderColor,
    //                     borderColor0: downBorderColor
    //                 },
    //                 markPoint: {
    //                     label: {
    //                         normal: {
    //                             formatter: function (param) {
    //                                 return param != null ? Math.round(param.value) : '';
    //                             }
    //                         }
    //                     },
    //                     data: [
    //                         {
    //                             name: 'XX标点',
    //                             coord: ['2013/5/31', 2300],
    //                             value: 2300,
    //                             itemStyle: {
    //                                 color: 'rgb(41,60,85)'
    //                             }
    //                         },
    //                         {
    //                             name: 'highest value',
    //                             type: 'max',
    //                             valueDim: 'highest'
    //                         },
    //                         {
    //                             name: 'lowest value',
    //                             type: 'min',
    //                             valueDim: 'lowest'
    //                         },
    //                         {
    //                             name: 'average value on close',
    //                             type: 'average',
    //                             valueDim: 'close'
    //                         }
    //                     ],
    //                     tooltip: {
    //                         formatter: function (param) {
    //                             return param.name + '<br>' + (param.data.coord || '');
    //                         }
    //                     }
    //                 },
    //                 markLine: {
    //                     symbol: ['none', 'none'],
    //                     data: [
    //                         [
    //                             {
    //                                 name: 'from lowest to highest',
    //                                 type: 'min',
    //                                 valueDim: 'lowest',
    //                                 symbol: 'circle',
    //                                 symbolSize: 10,
    //                                 label: {
    //                                     show: false
    //                                 },
    //                                 emphasis: {
    //                                     label: {
    //                                         show: false
    //                                     }
    //                                 }
    //                             },
    //                             {
    //                                 type: 'max',
    //                                 valueDim: 'highest',
    //                                 symbol: 'circle',
    //                                 symbolSize: 10,
    //                                 label: {
    //                                     show: false
    //                                 },
    //                                 emphasis: {
    //                                     label: {
    //                                         show: false
    //                                     }
    //                                 }
    //                             }
    //                         ],
    //                         {
    //                             name: 'min line on close',
    //                             type: 'min',
    //                             valueDim: 'close'
    //                         },
    //                         {
    //                             name: 'max line on close',
    //                             type: 'max',
    //                             valueDim: 'close'
    //                         }
    //                     ]
    //                 }
    //             },
    //             {
    //                 name: 'MA5',
    //                 type: 'line',
    //                 data: this.calculateMA(5),
    //                 smooth: true,
    //                 lineStyle: {
    //                     opacity: 0.5
    //                 }
    //             },
    //             {
    //                 name: 'MA10',
    //                 type: 'line',
    //                 data: this.calculateMA(10),
    //                 smooth: true,
    //                 lineStyle: {
    //                     opacity: 0.5
    //                 }
    //             },
    //             {
    //                 name: 'MA20',
    //                 type: 'line',
    //                 data: this.calculateMA(20),
    //                 smooth: true,
    //                 lineStyle: {
    //                     opacity: 0.5
    //                 }
    //             },
    //             {
    //                 name: 'MA30',
    //                 type: 'line',
    //                 data: this.calculateMA(30),
    //                 smooth: true,
    //                 lineStyle: {
    //                     opacity: 0.5
    //                 }
    //             },

    //         ]
    //     };
    //     return (
    //         <View style={styles.container}>
    //             <StatusBar
    //                 backgroundColor="transparent"
    //                 translucent={true}
    //                 hidden={false}
    //                 animated={true} />
    //             <Text style={styles.text1}>APT行情</Text>

    //             <View style={styles.View_styles1}>
    //                 <View style={{ marginLeft: 37 * unitWidth }}>
    //                     <Text style={styles.text2}>{this.state.info.closeval}</Text>
    //                     <Text style={styles.text3}>≈{this.state.info.closeval} CNY    <Text style={styles.text4}>{this.state.info.percentage}</Text></Text>
    //                 </View>
    //                 <View style={{
    //                     marginLeft: 100 * unitWidth
    //                 }}>
    //                     <View style={{
    //                         flexDirection: 'row',
    //                     }}>
    //                         <Text style={styles.text5}>24H最高</Text>
    //                         <Text style={styles.text6}>{this.state.info.highval}</Text>
    //                     </View>
    //                     <View style={{
    //                         flexDirection: 'row',
    //                         marginTop: 22 * unitWidth
    //                     }}>
    //                         <Text style={styles.text5}>24H最底</Text>
    //                         <Text style={styles.text6}>{this.state.info.lowval}</Text>
    //                     </View>
    //                     <View style={{
    //                         flexDirection: 'row',
    //                         marginTop: 22 * unitWidth
    //                     }}>
    //                         <Text style={styles.text5}>24H量</Text>
    //                         <Text style={styles.text6}>{this.state.info.amountval}</Text>
    //                     </View>
    //                 </View>
    //             </View>
    //             <View style={{ height: 15 * unitWidth, backgroundColor: "#f6f8fa", marginTop: 40 * unitWidth }} />
    //             {this.state.isloading ? <ActivityIndicator size="large" color="gray" animating={this.state.isloading} /> : <View />}
    //             <View style={{ justifyContent: 'center', alignItems: 'center' }}>
    //                 <Echarts option={option2} height={950 * unitHeight} width={860 * unitWidth} />
    //             </View>
    //             <View style={{ height: 15 * unitWidth, backgroundColor: "#f6f8fa" }} />

    //         </View>
    //     );
    // }
}
const styles = StyleSheet.create({
    contaner: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    txt4: {
        fontSize: 30 * unitWidth,
        textAlign: 'center',
        color: "#FFF",
        fontWeight: 'bold'
    },
    market_v2: {
        width: 172 * unitWidth,
        height: 69 * unitHeight,
        borderRadius: 5 * unitWidth,
        backgroundColor: "#e20050",
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#e20050"
    },
    txt2: {
        color: '#000',
        fontSize: 32 * unitWidth,
        fontWeight: 'bold'
    },
    txt1: {
        color: "#5d6c7f",
        fontSize: 22 * unitWidth
    },
    txt3: {
        fontSize: 24 * unitWidth,
        color: "#5b6e85"
    },
    market_v1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 34 * unitHeight,
        marginRight: 28 * unitWidth,
        marginLeft: 40 * unitWidth
    },
    txt: {
        color: '#000',
        fontSize: 32 * unitWidth,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 91 * unitHeight
    }
})
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#fff'
//     },
//     text1: {
//         fontSize: 34 * unitWidth,
//         lineHeight: 50 * unitWidth,
//         color: "#21262c",
//         textAlign: 'center',
//         marginTop: 55 * unitWidth,
//         fontWeight: 'bold'
//     },
//     View_styles1: {
//         flexDirection: 'row',
//         marginTop: 60 * unitWidth,
//         marginRight: 37 * unitWidth
//     },
//     text2: {
//         fontSize: 60 * unitWidth,
//         color: "#eb6458",
//         fontWeight: 'bold',

//     },
//     text3: {
//         fontSize: 28 * unitWidth,
//         color: "#838b97",
//         marginTop: 28 * unitWidth
//     },
//     text4: {
//         fontSize: 28 * unitWidth,
//         color: "#eb6458",

//     },
//     text5: {
//         fontSize: 26 * unitWidth,
//         color: "#838b97"
//     },
//     text6: {
//         fontSize: 28 * unitWidth,
//         color: "#444444",
//         marginLeft: 30 * unitWidth,
//     }
// });
