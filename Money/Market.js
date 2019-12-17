import React, { Component } from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View, ScrollView, StatusBar, ActivityIndicator } from 'react-native';
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
var upColor = '#00da3c';
var downColor = '#ec0000';
export default class Market extends Component {
    constructor() {
        super()
        this.state = {
            info: "",
            aptdata: [],
            categoryData: [],
            values: [],
            volumes: [],
            isloading: false
        };
    }

   
    render() {
        const option2 = {
            backgroundColor: '#FAFAFA',
            // title: {
            //     text: 'fdsfsd',
            //     // left: 0,
            // },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross'
                }
            },
            legend: {
                data: ['日K', 'MA5', 'MA10', 'MA20', 'MA30']
            },
            // 网格
            grid: {
                left: '10%',
                right: '10%',
                bottom: '15%',
                show: true,
                // backgroundColor:'#FFFFFF'
            },
            xAxis: {
                type: 'category',
                data: this.state.categoryData,
                scale: true,
                boundaryGap: false,
                axisLine: { onZero: false },
                splitLine: { show: true },
                splitNumber: 20,
                min: 'dataMin',
                max: 'dataMax'
            },
            yAxis: {
                position: 'right',
                scale: true,
                splitArea: {
                    show: false
                },
                axisLabel: {
                    inside: true,
                    formatter: '{value}\n'
                }

            },
            dataZoom: [
                {
                    filterMode: 'filter',
                    type: 'inside',
                    start: 99,
                    end: 100,
                    zoomLock: true,
                },
                {
                    zoomLock: true,
                    show: false,
                    type: 'slider',
                    y: '90%',
                    start: 99,
                    end: 100
                }
            ],
            series: [
                {
                    name: '日K',
                    type: 'candlestick',
                    data: this.state.values,
                    itemStyle: {
                        normal: {
                            color: '#ec0000',
                            color0: '#00da3c',
                            borderColor: '#8A0000',
                            borderColor0: '#008F28'
                        }
                    },
                    markPoint: {
                        label: {
                            normal: {
                                formatter: function (param) {
                                    return param != null ? Math.round(param.value) : '';
                                }
                            }
                        },
                        // data: [
                        //     // {
                        //     //     name: 'XX标点',
                        //     //     coord: ['2013/5/31', 2300],
                        //     //     value: 2300,
                        //     //     itemStyle: {
                        //     //         normal: { color: 'rgb(41,60,85)' }
                        //     //     }
                        //     // },
                        //     {
                        //         name: 'highest value',
                        //         type: 'max',
                        //         valueDim: 'highest' 
                        //     },
                        //     {
                        //         name: 'lowest value',
                        //         type: 'min',
                        //         valueDim: 'lowest'
                        //     }, 
                        //     {
                        //         name: 'average value on close',
                        //         type: 'average',
                        //         valueDim: 'close'
                        //     }
                        // ],
                        tooltip: {
                            formatter: function (param) {
                                return param.name + '<br>' + (param.data.coord || '');
                            }
                        },
                        markLine: {
                            symbol: ['none', 'none'],
                            data: [
                                [
                                    {
                                        name: 'from lowest to highest',
                                        type: 'min',
                                        valueDim: 'lowest',
                                        symbol: 'circle',
                                        symbolSize: 10,
                                        label: {
                                            normal: { show: false },
                                            emphasis: { show: false }
                                        }
                                    },
                                    {
                                        type: 'max',
                                        valueDim: 'highest',
                                        symbol: 'circle',
                                        symbolSize: 10,
                                        label: {
                                            normal: { show: false },
                                            emphasis: { show: false }
                                        }
                                    }
                                ],
                                {
                                    name: 'min line on close',
                                    type: 'min',
                                    valueDim: 'close'
                                },
                                {
                                    name: 'max line on close',
                                    type: 'max',
                                    valueDim: 'close'
                                }
                            ]
                        }

                    }
                },
                {
                    name: 'MA5',
                    type: 'line',
                    data: this.calculateMA(5),
                    smooth: true,
                    lineStyle: {
                        normal: { opacity: 0.5 }
                    }
                },
                {
                    name: 'MA10',
                    type: 'line',
                    data: this.calculateMA(10),
                    smooth: true,
                    lineStyle: {
                        normal: { opacity: 0.5 }
                    }
                },
                {
                    name: 'MA20',
                    type: 'line',
                    data: this.calculateMA(20),
                    smooth: true,
                    lineStyle: {
                        normal: { opacity: 0.5 }
                    }
                },
                {
                    name: 'MA30',
                    type: 'line',
                    data: this.calculateMA(30),
                    smooth: true,
                    lineStyle: {
                        normal: { opacity: 0.5 }
                    }
                },
                // {
                //     name: 'Volume',
                //     type: 'bar',
                //     xAxisIndex: 1,
                //     yAxisIndex: 1,
                //     data: this.state.volumes
                // }
            ]
        };
        const option = {
            backgroundColor: '#fff',
            animation: false,
            legend: {
                bottom: 10,
                left: 'center',
                data: ['Dow-Jones index', 'MA5', 'MA10', 'MA20', 'MA30']
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross'
                },
                backgroundColor: 'rgba(245, 245, 245, 0.8)',
                borderWidth: 1,
                borderColor: '#ccc',
                padding: 10,
                textStyle: {
                    color: '#000'
                },
                position: function (pos, params, el, elRect, size) {
                    var obj = { top: 10 };
                    obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 30;
                    return obj;
                }
                // extraCssText: 'width: 170px'
            },
            axisPointer: {
                link: { xAxisIndex: 'all' },
                label: {
                    backgroundColor: '#777'
                }
            },
            toolbox: {
                feature: {
                    dataZoom: {
                        yAxisIndex: true
                    },
                    brush: {
                        type: ['lineX', 'clear']
                    }
                }
            },
            brush: {
                xAxisIndex: 'all',
                brushLink: 'all',
                outOfBrush: {
                    colorAlpha: 0.1
                }
            },
            visualMap: {
                show: false,
                seriesIndex: 5,
                dimension: 2,
                pieces: [{
                    value: 1,
                    color: downColor
                }, {
                    value: -1,
                    color: upColor
                }]
            },
            grid: [
                {
                    left: '10%',
                    right: '8%',
                    height: '50%'
                },
                {
                    left: '10%',
                    right: '8%',
                    top: '63%',
                    height: '16%'
                }
            ],
            xAxis: [
                {
                    type: 'category',
                    data: this.state.categoryData,
                    scale: true,
                    boundaryGap: false,
                    axisLine: { onZero: false },
                    splitLine: { show: false },
                    splitNumber: 20,
                    min: 'dataMin',
                    max: 'dataMax',
                    axisPointer: {
                        z: 100
                    }
                },
                {
                    type: 'category',
                    gridIndex: 1,
                    data: this.state.categoryData,
                    scale: true,
                    boundaryGap: false,
                    axisLine: { onZero: false },
                    axisTick: { show: false },
                    splitLine: { show: false },
                    axisLabel: { show: false },
                    splitNumber: 20,
                    min: 'dataMin',
                    max: 'dataMax'
                    // axisPointer: {
                    //     label: {
                    //         formatter: function (params) {
                    //             var seriesValue = (params.seriesData[0] || {}).value;
                    //             return params.value
                    //             + (seriesValue != null
                    //                 ? '\n' + echarts.format.addCommas(seriesValue)
                    //                 : ''
                    //             );
                    //         }
                    //     }
                    // }
                }
            ],
            yAxis: [
                {
                    scale: true,
                    splitArea: {
                        show: true
                    }
                },
                {
                    scale: true,
                    gridIndex: 1,
                    splitNumber: 2,
                    axisLabel: { show: false },
                    axisLine: { show: false },
                    axisTick: { show: false },
                    splitLine: { show: false }
                }
            ],
            dataZoom: [
                {
                    type: 'inside',
                    xAxisIndex: [0, 1],
                    start: 98,
                    end: 100
                },
                {
                    show: true,
                    xAxisIndex: [0, 1],
                    type: 'slider',
                    top: '85%',
                    start: 98,
                    end: 100
                }
            ],
            series: [
                {
                    name: 'Dow-Jones index',
                    type: 'candlestick',
                    data: this.state.values,
                    itemStyle: {
                        normal: {
                            color: upColor,
                            color0: downColor,
                            borderColor: null,
                            borderColor0: null
                        }
                    },
                    tooltip: {
                        formatter: function (param) {
                            param = param[0];
                            return [
                                'Date: ' + param.name + '<hr size=1 style="margin: 3px 0">',
                                'Open: ' + param.data[0] + '<br/>',
                                'Close: ' + param.data[1] + '<br/>',
                                'Lowest: ' + param.data[2] + '<br/>',
                                'Highest: ' + param.data[3] + '<br/>'
                            ].join('');
                        }
                    }
                },
                {
                    name: 'MA5',
                    type: 'line',
                    data: this.calculateMA(5),
                    smooth: true,
                    lineStyle: {
                        normal: { opacity: 0.5 }
                    }
                },
                {
                    name: 'MA10',
                    type: 'line',
                    data: this.calculateMA(10),
                    smooth: true,
                    lineStyle: {
                        normal: { opacity: 0.5 }
                    }
                },
                {
                    name: 'MA20',
                    type: 'line',
                    data: this.calculateMA(20),
                    smooth: true,
                    lineStyle: {
                        normal: { opacity: 0.5 }
                    }
                },
                {
                    name: 'MA30',
                    type: 'line',
                    data: this.calculateMA(30),
                    smooth: true,
                    lineStyle: {
                        normal: { opacity: 0.5 }
                    }
                },
                {
                    name: 'Volume',
                    type: 'bar',
                    xAxisIndex: 1,
                    yAxisIndex: 1,
                    data: this.state.volumes
                }
            ]
        };
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor="transparent"
                    translucent={true}
                    hidden={false}
                    animated={true} />
                <Text style={styles.text1}>APT行情</Text>

                <View style={styles.View_styles1}>
                    <View style={{ marginLeft: 37 * unitWidth }}>
                        <Text style={styles.text2}>{this.state.info.closeval}</Text>
                        <Text style={styles.text3}>≈{this.state.info.closeval} CNY    <Text style={styles.text4}>{this.state.info.percentage}</Text></Text>
                    </View>
                    <View style={{
                        marginLeft: 100 * unitWidth
                    }}>
                        <View style={{
                            flexDirection: 'row',
                        }}>
                            <Text style={styles.text5}>24H最高</Text>
                            <Text style={styles.text6}>{this.state.info.highval}</Text>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            marginTop: 22 * unitWidth
                        }}>
                            <Text style={styles.text5}>24H最底</Text>
                            <Text style={styles.text6}>{this.state.info.lowval}</Text>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            marginTop: 22 * unitWidth
                        }}>
                            <Text style={styles.text5}>24H量</Text>
                            <Text style={styles.text6}>{this.state.info.amountval}</Text>
                        </View>
                    </View>
                </View>
                <View style={{ height: 15 * unitWidth, backgroundColor: "#f6f8fa", marginTop: 40 * unitWidth }} />
                {this.state.isloading ? <ActivityIndicator size="large" color="gray" animating={this.state.isloading} /> : <View />}
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Echarts option={option2} height={950 * unitHeight} width={860 * unitWidth} />
                </View>
                <View style={{ height: 15 * unitWidth, backgroundColor: "#f6f8fa" }} />

            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    text1: {
        fontSize: 34 * unitWidth,
        lineHeight: 50 * unitWidth,
        fontFamily: 'PingFangHeiTC-W8-Proportional',
        color: "#21262c",
        textAlign: 'center',
        marginTop: 55 * unitWidth,
        fontWeight: 'bold'
    },
    View_styles1: {
        flexDirection: 'row',
        marginTop: 60 * unitWidth,
        marginRight: 37 * unitWidth
    },
    text2: {
        fontSize: 60 * unitWidth,
        fontFamily: "Montserrat-Regular",
        color: "#eb6458",
        fontWeight: 'bold',

    },
    text3: {
        fontSize: 28 * unitWidth,
        fontFamily: "PingFang-SC-Bold",
        color: "#838b97",
        marginTop: 28 * unitWidth
    },
    text4: {
        fontSize: 28 * unitWidth,
        fontFamily: "PingFang-SC-Bold",
        color: "#eb6458",

    },
    text5: {
        fontSize: 26 * unitWidth,
        fontFamily: "Montserrat-Regular",
        color: "#838b97"
    },
    text6: {
        fontSize: 28 * unitWidth,
        fontFamily: "Montserrat-Regular",
        color: "#444444",
        marginLeft: 30 * unitWidth,
    }
});
