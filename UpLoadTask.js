import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    FlatList,
    Dimensions,
    StatusBar,
    TouchableOpacity,
    Modal,
    ActivityIndicator
} from 'react-native';
import { Actions } from 'react-native-router-flux'
import { unitWidth, unitHeight } from '../../AdapterUtil.js';
import local from '../Utils/StorageUtils.js';
import NetUtils from '../Utils/NetUtils.js'
import { toastShort } from '../Utils/ToastUtils.js';
import LinearGradient from 'react-native-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';
var widths = Dimensions.get('window').width

export default class UpLoadTask extends Component {
    constructor(props) {
        super(props)
        this.state = {
            canShow: false,
            invitationRules: "",
            data: [],
            flag_state: false,
            isloading: false
        }
    }
    componentDidMount() {
        this.getThirdTaskRegulation()
        this.listOwnThirdTask()
    }

    render() {
        return <LinearGradient style={styles.container}
            colors={['rgb(55,140,255)', 'rgb(82,112,253)']}>
            <StatusBar
                backgroundColor="transparent"
                translucent={true}
                hidden={false}
                animated={true} />
            <View style={{ flexDirection: 'row', marginTop: 90 * unitHeight, justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => Actions.reset('app')}>
                    <View style={{ width: (widths / 3) - 30 * unitWidth }}>
                        <Image source={require('../../img/push_back.png')} style={styles.Image1} />
                    </View>
                </TouchableOpacity>

                <View style={{ width: widths / 3 }}>
                    <Text style={styles.txt1}>任务管理</Text>
                </View>

                <TouchableOpacity onPress={() => this.setState({ canShow: true })}>
                    <View style={{ width: (widths / 3) - 30 * unitWidth }}>
                        <Image source={require('../../img/why.png')} style={styles.Image} />
                    </View>
                </TouchableOpacity>


            </View>

            {/* 已上传任务 */}

            <View style={styles.uploadtasked_styles}>


                {/* 已上传任务标题 */}
                <View style={{ flexDirection: 'row', marginTop: 64 * unitHeight, alignItems: 'center' }}>
                    <View style={styles.view_stylse} />
                    <Text style={styles.upload_task_txt2}>已上传任务</Text>
                </View>

                {this.state.isloading ? <ActivityIndicator size="large" color="gray" animating={this.state.isloading} /> : null}
                {this.state.data.length == 0 ? <Text style={{ fontSize: 34 * unitWidth, marginTop: 80 * unitHeight, fontWeight: 'bold', textAlign: 'center' }}>暂无数据</Text> : null}
                {/* 任务列表数据 */}
                < FlatList
                    style={{ marginBottom: 40 * unitHeight }}
                    //隐藏垂直
                    showsVerticalScrollIndicator={false}
                    // 数据数组
                    data={this.state.data}
                    // key
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={this._renderItem}
                />

            </View>


            {/* 任务说明 */}
            <Modal
                visible={this.state.canShow}
                animationType={"slide"}
                transparent={true}
                onRequestClose={this.onRequestClose.bind(this)}
            >
                <View style={styles.modalLayer}>

                    <View style={styles.rule_styles}>
                        <Text style={styles.rule_text}>任务说明</Text>
                        <ScrollView>
                            <Text style={styles.tex8}>{this.state.invitationRules}</Text>
                        </ScrollView>
                        <TouchableOpacity onPress={this.onRequestClose.bind(this)}>
                            <LinearGradient
                                style={styles.rule_sure_styles}
                                colors={['rgb(55,140,255)', 'rgb(82,112,253)']}>
                                <Text style={{ color: "#ffffff", fontSize: 26 * unitWidth, textAlign: 'center' }}>确定</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>

                </View>
            </Modal>
            {/* 上传新任务,绝对定位 */}
            <TouchableOpacity onPress={() => Actions.upLoadTask_top1()} style={styles.uploadtask_styles}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
                        <Image source={require('../../img/upload_task.png')} style={styles.task_img_styles} />
                        <Text style={styles.upload_task_txt}>上传新任务</Text>
                    </View>
                    <Image source={require('../../img/upload_task_icon.png')} style={styles.upload_task_icon_styles} />
                </View>
            </TouchableOpacity>
        </LinearGradient>
    }

    _renderItem = ({ item }) => (

        <View style={styles.list_item_stylse}>

            {this._state_view_type(item)}

            {/* 状态信息 */}
            <View style={{ marginLeft: 32 * unitWidth, flex: 1 }}>
                <Text style={{ fontSize: 32 * unitWidth, color: '#374163', fontWeight: 'bold' }}>{item.taskName}</Text>

                {this._state_type(item)}


                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 24 * unitHeight }}>
                    <Text style={styles.item_txt}>完成数量</Text>
                    <Text style={[styles.item_txt, { fontWeight: 'bold', marginLeft: 5 * unitWidth }]}>{item.getTaskRewardUserNum == "" || item.getTaskRewardUserNum == null ? 0 : item.getTaskRewardUserNum}/{item.taskNum}</Text>
                </View>
            </View>

            {/* 状态操作/暂停/下架 */}
            {item.taskStatus == 0 || item.taskStatus == 1 || item.taskStatus == 4 ? null :
                <View style={{ flexDirection: 'row', marginRight: 22 * unitWidth }}>

                    <View style={styles.line_styles} />

                    <View style={{ marginLeft: 38 * unitWidth }}>

                        {item.taskStatus == 2 ?
                            <TouchableOpacity onPress={this.onStateTask.bind(this, item.id, 3)}>
                                <View style={styles.state_stylse}>
                                    <Image source={require('../../img/stop.png')} style={styles.state_img} />
                                    <Text style={styles.state_txt}>暂停</Text>
                                </View>
                            </TouchableOpacity> :
                            <TouchableOpacity onPress={this.onStateTask.bind(this, item.id, 2)}>
                                <View style={styles.state_stylse}>
                                    <Image source={require('../../img/start.png')} style={styles.state_img} />
                                    <Text style={styles.state_txt}>恢复</Text>
                                </View>
                            </TouchableOpacity>}



                        <TouchableOpacity onPress={this.onStateTask.bind(this, item.id, 4)}>
                            <View style={[styles.state_stylse, { marginTop: 22 * unitHeight }]}>
                                <Image source={require('../../img/delete_icon.png')} style={styles.state_img} />
                                <Text style={styles.state_txt}>下架</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>}
        </View>
    )

    /**
     * 0：审核中
     * 1：审核被拒
     * 2：审核通过，上架中
     * 3：暂停，用户不能继续领取任务；任务暂时下架，但是可以通过恢复按钮恢复
     * 4：已下架，任务完全结束，无法恢复，进行一次结算，退回用户任务费用。退回规则
     * @param {*} item 
     */
    _state_view_type(item) {
        if (item.taskStatus == 2) {
            return (<View style={styles.view_stylse2} />)
        } else if (item.taskStatus == 3) {
            return (<View style={[styles.view_stylse2, { backgroundColor: '#fcd651' }]} />)
        } else if (item.taskStatus == 0) {
            return (<View style={[styles.view_stylse2, { backgroundColor: '#37a3ff' }]} />)
        } else if (item.taskStatus == 1) {
            return (<View style={[styles.view_stylse2, { backgroundColor: '#ff7a7a' }]} />)
        } else if (item.taskStatus == 4) {
            return (<View style={[styles.view_stylse2, { backgroundColor: '#d9dddf' }]} />)
        }
    }
    /**
     * 0：审核中
     * 1：审核被拒
     * 2：审核通过，上架中
     * 3：暂停，用户不能继续领取任务；任务暂时下架，但是可以通过恢复按钮恢复
     * 4：已下架，任务完全结束，无法恢复，进行一次结算，退回用户任务费用。退回规则
     * @param {*} item 
     */
    _state_type(item) {
        if (item.taskStatus == 2) {
            return (<View style={styles.task_state_stylse}>
                <Text style={{ fontSize: 20 * unitWidth, color: '#fff', fontWeight: "bold" }}>上架中</Text>
            </View>)
        } else if (item.taskStatus == 3) {
            return (<View style={[styles.task_state_stylse, { backgroundColor: '#fcd651' }]}>
                <Text style={{ fontSize: 20 * unitWidth, color: '#fff', fontWeight: "bold" }}>已暂停</Text>
            </View>)
        } else if (item.taskStatus == 0) {
            return (<View style={[styles.task_state_stylse, { backgroundColor: '#37a3ff' }]}>
                <Text style={{ fontSize: 20 * unitWidth, color: '#fff', fontWeight: "bold" }}>审核中</Text>
            </View>)
        } else if (item.taskStatus == 1) {
            return (<View style={[styles.task_state_stylse, { backgroundColor: '#ff7a7a' }]}>
                <Text style={{ fontSize: 20 * unitWidth, color: '#fff', fontWeight: "bold" }}>已拒绝</Text>
            </View>)
        } else if (item.taskStatus == 4) {
            return (<View style={[styles.task_state_stylse, { backgroundColor: '#d9dddf' }]}>
                <Text style={{ fontSize: 20 * unitWidth, color: '#fff', fontWeight: "bold" }}>已下架</Text>
            </View>)
        }
    }

    onRequestClose() {
        this.setState({ canShow: false });
    }


   

}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    state_txt: {
        fontSize: 24 * unitWidth,
        color: "#777c8f",
        marginLeft: 11 * unitWidth
    },
    state_img: {
        width: 33 * unitWidth,
        height: 33 * unitWidth,
        alignSelf: 'center'
    },
    state_stylse: {
        width: 139 * unitWidth,
        height: 50 * unitHeight,
        borderRadius: 25 * unitWidth,
        backgroundColor: "#ebf2f2",
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    line_styles: {
        width: 2 * unitWidth,
        height: 110 * unitHeight,
        alignItems: 'center',
        borderRadius: 1 * unitWidth,
        backgroundColor: "#edf2f6",
    },
    item_txt: {
        fontSize: 26 * unitWidth,
        color: "#374163"
    },
    task_state_stylse: {
        width: 110 * unitWidth,
        height: 35 * unitHeight,
        borderRadius: 17 * unitWidth,
        backgroundColor: "#30d87f",
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        marginTop: 10 * unitHeight
    },
    view_stylse2: {
        height: 180 * unitHeight,
        borderTopLeftRadius: 10 * unitWidth,
        borderBottomLeftRadius: 10 * unitWidth,
        backgroundColor: "#30d87f",
        width: 10 * unitWidth,

    },
    list_item_stylse: {
        width: 690 * unitWidth,
        height: 188 * unitHeight,
        borderRadius: 20 * unitWidth,
        backgroundColor: "#ffffff",
        marginTop: 20 * unitHeight,
        alignSelf: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    upload_task_txt2: {
        fontSize: 26 * unitWidth,
        fontWeight: "bold",
        color: "#374163",
        marginLeft: 19 * unitWidth
    },
    view_stylse: {
        width: 6 * unitWidth,
        height: 19 * unitHeight,
        borderRadius: 3 * unitWidth,
        backgroundColor: "#549cec",
        marginLeft: 33 * unitWidth
    },
    upload_task_icon_styles: {
        width: 70 * unitWidth,
        height: 70 * unitWidth,
        marginRight: 38 * unitWidth
    },
    upload_task_txt: {
        fontSize: 34 * unitWidth,
        fontWeight: 'bold',
        color: "#374163",
        marginLeft: 17 * unitWidth
    },
    task_img_styles: {
        width: 33 * unitWidth,
        height: 43 * unitWidth,
        marginLeft: 34 * unitWidth
    },
    uploadtasked_styles: {
        backgroundColor: "rgb(243,245,249)",
        marginTop: 200 * unitWidth,
        flex: 1
    },
    uploadtask_styles: {
        width: 690 * unitWidth,
        height: 135 * unitHeight,
        borderRadius: 25 * unitWidth,
        backgroundColor: "#ffffff",
        shadowColor: "rgba(213, 221, 232, 0.86)",
        shadowOffset: {
            width: 0,
            height: 3.5
        },
        shadowRadius: 10.5,
        shadowOpacity: 1,
        alignSelf: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        position: 'absolute',
        top: 200 * unitHeight,
    },
    tex8: {
        width: 554 * unitWidth,
        marginTop: 40 * unitWidth,
        fontSize: 28 * unitWidth,
        color: "#7c8faf",
        marginLeft: 20 * unitWidth,
        marginRight: 10 * unitWidth,
        lineHeight: 50 * unitWidth,
        alignSelf: 'center'

    },
    rule_sure_styles: {
        alignSelf: 'center',
        justifyContent: 'center',
        width: 400 * unitWidth,
        height: 70 * unitWidth,
        borderRadius: 35 * unitWidth,
        shadowColor: "rgba(86, 116, 255, 0.52)",
        shadowOffset: {
            width: -0.9,
            height: 2.4
        },
        shadowRadius: 6.5,
        shadowOpacity: 1,
        marginTop: 50 * unitHeight,
        marginBottom: 57 * unitHeight
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
        height: 750 * unitHeight,
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
    txt1: {
        fontSize: 34 * unitWidth,
        color: "#fff",
        fontWeight: 'bold',
        alignSelf: 'center',
        textAlign: 'center',
    },
    Image: {
        width: 40 * unitWidth,
        height: 40 * unitWidth,
        alignSelf: 'flex-end',
    },
    Image1: {
        width: 21 * unitWidth,
        height: 41 * unitWidth,
        alignSelf: 'flex-start',
    },
})