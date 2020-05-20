import React, { Component } from 'react';
import {
    StyleSheet, Text, View, Image, FlatList, Dimensions, StatusBar,
    TouchableOpacity, Modal, TextInput, ScrollView, ActivityIndicator
} from 'react-native';
import { Actions } from 'react-native-router-flux'
import { unitWidth, unitHeight } from '../../AdapterUtil.js';
import local from '../Utils/StorageUtils.js';
import NetUtils from '../Utils/NetUtils.js'
import { toastShort } from '../Utils/ToastUtils.js';
import LinearGradient from 'react-native-linear-gradient';
import ImagePicker from 'react-native-image-crop-picker';
var widths = Dimensions.get('window').width

export default class UpLoadTask_top1 extends Component {
    constructor(props) {
        super(props)
        this.state = {
            //任务名
            taskName: '',
            //产品名
            productName: '',
            //产品简介
            productDesc: '',
            //用户需要上传的图片张数
            uploadImgNum: '',
            canShow: false,
            //用户是否上传文本 0 不上传  1 上传
            userTextFlag: "请选择（必填）",
            //app logo
            appPicUrl: '',
            cookies: '',
            isloadinged: false
        }
    }
    componentDidMount() {
        local.get('cookies').then((res) => this.setState({ cookies: res }))
    }
    render() {
        return <View style={styles.container}>
            <TouchableOpacity onPress={() => Actions.pop()}>
                <View style={{ flexDirection: 'row', marginTop: 80 * unitHeight, justifyContent: 'space-between' }}>
                    <Image source={require('../../img/back.png')} style={styles.Image} />
                    <Text style={styles.txt1}>上传任务</Text>
                    <Text style={{ marginRight: 30 * unitWidth }}>   </Text>
                </View>
            </TouchableOpacity>

            <View style={styles.top1_styles}>
                <ScrollView>
                    <View style={styles.top1_task_styles}>
                        <Image style={styles.top1_task_img} source={require('../../img/task_top1.png')} />
                        {/* 任务名称 */}
                        <View style={{ flexDirection: 'row', marginTop: 52 * unitHeight, alignItems: 'center' }}>
                            <Image source={require('../../img/bt.png')} style={styles.bt_img} />
                            <Text style={styles.task_top_txt}>任务名称</Text>
                        </View>
                        <TextInput
                            style={styles.TextInput_styles}
                            multiline={true}
                            placeholder={"请填写任务名称（必填）"}
                            clearButtonMode="while-editing"
                            onChangeText={(x) => {
                                this.setState({ taskName: x })
                                local.set('taskName', x)
                            }}
                        />
                        {/* 产品名称 */}
                        <View style={{ flexDirection: 'row', marginTop: 52 * unitHeight, alignItems: 'center' }}>
                            <Image source={require('../../img/bt.png')} style={styles.bt_img} />
                            <Text style={styles.task_top_txt}>产品名称</Text>
                        </View>

                        <TextInput
                            style={styles.TextInput_styles}
                            multiline={true}
                            placeholder={"请填写产品名称（必填）"}
                            clearButtonMode="while-editing"
                            onChangeText={(x) => {
                                this.setState({ productName: x })
                                local.set('productName', x)
                            }}
                        />


                        {/* 产品简介 */}

                        <View style={{ flexDirection: 'row', marginTop: 52 * unitHeight, alignItems: 'center' }}>
                            <Image source={require('../../img/bt.png')} style={styles.bt_img} />
                            <Text style={styles.task_top_txt}>产品简介</Text>
                        </View>
                        <TextInput
                            style={styles.TextInput_styles}
                            multiline={true}
                            placeholder={"请填写产品简介（必填）"}
                            clearButtonMode="while-editing"
                            onChangeText={(x) => {
                                this.setState({ productDesc: x })
                                local.set('productDesc', x)
                            }}
                        />

                        {/* 上传app图片 */}
                        <View style={{ flexDirection: 'row', marginTop: 52 * unitHeight, alignItems: 'center' }}>
                            <Image source={require('../../img/bt.png')} style={styles.bt_img} />
                            <Text style={styles.task_top_txt}>上传APP图片</Text>
                        </View>

                        <TouchableOpacity onPress={this.onUpdateimg.bind(this)}>
                            {this.state.appPicUrl != '' ?
                                <Image source={{ uri: this.state.appPicUrl }} style={styles.uploadimg_styles} /> :
                                <View style={styles.uploadimg_styles}>
                                    {this.state.isloadinged ? <ActivityIndicator size="large" color="gray" animating={this.state.isloadings} /> :
                                        <Image source={require('../../img/task_img.png')} style={styles.img_styles} />}
                                    <Text style={styles.upload_txt_styles}>上传图片</Text>
                                </View>}
                        </TouchableOpacity>

                        {/* 用户上传图片数 */}
                        <View style={{ flexDirection: 'row', marginTop: 52 * unitHeight, alignItems: 'center' }}>
                            <Image source={require('../../img/bt.png')} style={styles.bt_img} />
                            <Text style={styles.task_top_txt}>用户上传图片数</Text>
                        </View>
                        <TextInput
                            style={styles.TextInput_styles}
                            multiline={true}
                            placeholder={"用户提交审核时需上传的图片数量（必填）"}
                            clearButtonMode="while-editing"
                            keyboardType={'numeric'}
                            onChangeText={(x) => {
                                this.setState({ uploadImgNum: x })
                                local.set('uploadImgNum', x)
                            }}
                        />


                        {/* 用户是否需要上传文本 */}
                        <View style={{ flexDirection: 'row', marginTop: 52 * unitHeight, alignItems: 'center' }}>
                            <Image source={require('../../img/bt.png')} style={styles.bt_img} />
                            <Text style={styles.task_top_txt}>用户是否需要上传文本（例如：用户手机号/邮箱/微信号等相关任务证明）</Text>
                        </View>
                        <TouchableOpacity onPress={() => this.setState({ canShow: true })}>
                            <View style={{
                                flexDirection: 'row', width: 600 * unitWidth,
                                alignItems: 'center', marginLeft: 42 * unitWidth, marginTop: 28 * unitHeight, justifyContent: 'space-between'
                            }}>
                                <Text style={{ fontSize: 26 * unitWidth, color: '#7c8faf' }}>{this.state.userTextFlag}</Text>
                                <Image source={require('../../img/down.png')}
                                    style={{
                                        width: 14 * unitWidth, height: 10 * unitWidth,
                                    }} />
                            </View>
                            <View style={{
                                width: 600 * unitWidth,
                                height: 2 * unitWidth,
                                backgroundColor: "#efefef",
                                marginBottom: 50 * unitHeight,
                                marginLeft: 42 * unitWidth,
                                marginTop: 20 * unitHeight
                            }} />
                        </TouchableOpacity>
                    </View>
                </ScrollView>


                {/* 下一步按钮 */}
                <TouchableOpacity onPress={this.next_task.bind(this)}>
                    <View style={styles.next_styles}>
                        <Text style={{ color: "#ffffff", fontSize: 30 * unitWidth }} >下一步</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <Modal
                visible={this.state.canShow}
                animationType={"slide"}
                transparent={true}
                onRequestClose={this.onRequestClose.bind(this)}
            >
                <View style={styles.modalLayer}>

                    <View style={styles.rule_styles}>
                        <Text style={styles.rule_text}>选择是否需要</Text>
                        <TouchableOpacity onPress={this.onSelected_yes.bind(this)}>
                            <View style={styles.bnt_stylse}>
                                <Text style={[styles.select_styles, { color: 'rgb(82,112,253)' }]}>是</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={this.onSelected_no.bind(this)}>
                            <View style={[styles.bnt_stylse, { borderColor: "gray", marginBottom: 40 * unitHeight }]}>
                                <Text style={[styles.select_styles, { color: "gray" }]}>否</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

        </View>
    }
    //关闭弹窗
    onRequestClose() {
        this.setState({ canShow: false });
    }
    // 选择是否需要文本
    onSelected_yes() {
        this.setState({
            canShow: false,
            userTextFlag: "是"
        })
        local.set('userTextFlag', 1)
    }
    // 选择是否需要文本
    onSelected_no() {
        this.setState({
            canShow: false,
            userTextFlag: "否"
        })
        local.set('userTextFlag', 0)
    }
    //选择本地图片
    onUpdateimg() {
        let that = this;
        ImagePicker.openPicker({
            width: 500 * unitWidth,
            height: 800 * unitHeight,
            cropping: false
        }).then(image => {
            this.uploadPic(image.path)
        });
    }
    next_task() {
        if (this.state.taskName.trim() == '') {
            return toastShort('请填写任务名称！')
        }
        if (this.state.productName.trim() == '') {
            return toastShort('请填写产品名称！')
        }
        if (this.state.productDesc.trim() == '') {
            return toastShort('请填写产品简介！')
        }
        if (this.state.appPicUrl.trim() == '') {
            return toastShort('请上传产品logo图片！')
        }
        if (this.state.uploadImgNum.trim() == '') {
            return toastShort('请填写用户需要上传的图片张数！')
        }
        if (this.state.userTextFlag == "请选择（必填）") {
            return toastShort('请选择是否需要收集用户相关信息！')
        }
        Actions.upLoadTask_top2()
    }
 
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    bt_img: {
        width: 20 * unitWidth,
        height: 20 * unitWidth,
        alignItems: 'center',
        marginLeft: 41 * unitWidth,
    },
    bnt_stylse: {
        width: 400 * unitWidth,
        height: 84 * unitWidth,
        borderRadius: 42 * unitWidth,
        borderWidth: 2 * unitWidth,
        borderColor: 'rgb(82,112,253)',
        justifyContent: "center",
        alignItems: "center",
        alignSelf: 'center',
        marginTop: 30 * unitHeight
    },
    select_styles: {
        fontSize: 30 * unitWidth,
        fontWeight: 'bold',
    },
    rule_text: {
        color: "#2a2c31",
        fontSize: 32 * unitWidth,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 45 * unitHeight
    },
    rule_styles: {
        alignSelf: 'center',
        width: 600 * unitWidth,
        borderRadius: 20 * unitWidth,
        backgroundColor: "#ffffff",
        shadowColor: "rgba(30, 64, 129, 0.2)",
        shadowOffset: {
            width: 0,
            height: 0
        },
        shadowRadius: 23,
        shadowOpacity: 1
    },
    modalLayer: {
        backgroundColor: 'rgba(0, 0, 0, 0.45)',
        flex: 1,
        justifyContent: 'center',
    },
    next_styles: {
        width: 600 * unitWidth,
        height: 84 * unitWidth,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(82,112,253)',
        marginTop: 56 * unitHeight,
        borderRadius: 42 * unitWidth,
        shadowColor: "rgba(86, 116, 255, 0.52)",
        shadowOffset: {
            width: 0,
            height: 2.5
        },
        shadowRadius: 6.5,
        shadowOpacity: 1,
        marginBottom: 58 * unitHeight
    },
    upload_txt_styles: {
        fontSize: 26 * unitWidth,
        color: "#838b97",
        marginTop: 10 * unitHeight
    },
    img_styles: {
        width: 50 * unitWidth,
        height: 39 * unitWidth,
        alignSelf: 'center',
    },
    uploadimg_styles: {
        width: 160 * unitWidth,
        height: 160 * unitWidth,
        borderRadius: 10 * unitWidth,
        backgroundColor: "#e7ecf6",
        borderStyle: "solid",
        borderWidth: 1 * unitWidth,
        borderColor: "#aeaeae",
        marginLeft: 42 * unitWidth,
        marginTop: 24 * unitHeight,
        alignItems: 'center',
        justifyContent: 'center'
    },
    TextInput_styles: {
        width: 600 * unitWidth,
        marginLeft: 41 * unitWidth,
        marginTop: 20 * unitHeight,
        borderBottomWidth: 2 * unitWidth,
        borderColor: '#efefef',
        fontSize: 26 * unitWidth,
        lineHeight: 36 * unitHeight,
        fontWeight: 'bold',
        color: '#7c8faf',
        fontWeight: 'bold'

    },
    task_top_txt: {
        fontSize: 28 * unitWidth,
        color: "#2a2c31",
        fontWeight: 'bold',
        marginLeft: 10 * unitWidth,
        marginRight: 40 * unitWidth
    },
    top1_task_img: {
        marginTop: 48 * unitHeight,
        width: 534 * unitWidth,
        height: 92 * unitWidth,
        alignSelf: 'center'

    },
    top1_task_styles: {
        marginTop: 30 * unitHeight,
        width: 690 * unitWidth,
        alignSelf: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 20 * unitWidth,
    },
    top1_styles: {
        backgroundColor: 'rgb(241,240,246)',
        marginTop: 30 * unitHeight,
        flex: 1
    },
    Image: {
        width: 24 * unitWidth,
        height: 41 * unitHeight,
        alignSelf: 'flex-end',
        marginLeft: 30 * unitWidth
    },
    txt1: {
        fontSize: 34 * unitWidth,
        color: "#21262c",
        fontWeight: 'bold',
        alignSelf: 'center',
        textAlign: 'center',
    },

})