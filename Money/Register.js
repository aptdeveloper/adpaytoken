import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    TextInput,
    ActivityIndicator
} from 'react-native';
import { unitWidth, unitHeight } from '../../AdapterUtil.js';
import { Actions } from 'react-native-router-flux'
import ClickUtil from '../Utils/ClickUtil.js';
import CommUtils from '../Utils/CommUtils.js';
import { toastShort } from '../Utils/ToastUtils.js';
import NetUtils from '../Utils/NetUtils.js';
import CountdownUtil from '../Utils/CountdownUtil.js';
export default class Register extends Component {
    constructor(props) {
        super(props)
        this.onimage = this.onimage.bind(this)
        this.state = {
            select_flag: "no",
            telPhone: '',
            pwd: '',
            code: '',
            textcode: '发送验证码',
            textcode_flag: true,
            isloading:false
        }
    }
    render() {
        return <View style={styles.container}>

            <View style={{ alignItems: 'flex-end' }}>
                <TouchableOpacity onPress={this.goback} >
                    <Image source={require('../../img/back_x.png')} style={styles.backximgstyles} />
                </TouchableOpacity>
            </View>

            <View style={styles.Register_V1}>
                <Text style={styles.registertextstyles}>注册</Text>
            </View>

            <View style={styles.Forget_Password_v3}>
                <Text style={styles.phonetextstyles}>手机号/邮箱</Text>
                <View style={{ flexDirection: 'row' }}>
                    <TextInput style={styles.phoneTextInputstyles}
                        placeholder="请输入手机号/邮箱"
                        clearButtonMode="while-editing"
                        keyboardType={'numeric'}
                        onChangeText={(x) => {
                            this.setState({
                                telPhone: x
                            })
                        }} />
                    <TouchableOpacity style={styles.verificationcodestyles} onPress={this.onCode.bind(this)}  >
                        <View style={styles.verificationcodestyles}>
                        {this.state.iscodeloading ? <ActivityIndicator size="small" color="gray" animating={this.state.iscodeloading} style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: 8,
                            }} /> : <Text style={styles.verificationcodetextstyles}>{this.state.textcode}</Text>}
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.Forget_Password_v4}>
                <Text style={styles.phonetextstyles}>验证码</Text>
                <TextInput style={styles.phoneTextInputstyles}
                    placeholder="请输入验证码"
                    clearButtonMode="while-editing"
                    keyboardType={'numeric'}
                    onChangeText={(x) => {
                        this.setState({
                            code: x
                        })
                    }} />
            </View>
            <View style={styles.Forget_Password_v5}>
                <Text style={styles.phonetextstyles}>密码</Text>
                <TextInput style={styles.phoneTextInputstyles}
                    placeholder="请输入密码"
                    clearButtonMode="while-editing"
                    secureTextEntry={true}
                    onChangeText={(x) => {
                        this.setState({
                            pwd: x
                        })
                    }} />
            </View>

            <View style={styles.Register_V2}>
                <TouchableOpacity onPress={this.onimage} underlayColor='#fff'>
                    {this.state.select_flag != 'no' ?
                        (<Image source={require('../../img/select_yes.png')} style={{ width: 28 * unitWidth, height: 28 * unitWidth }} />) :
                        (<Image source={require('../../img/select_no.png')} style={{ width: 28 * unitWidth, height: 28 * unitWidth }} />)}
                </TouchableOpacity>
               <TouchableOpacity  onPress={()=>Actions.agreement()}>
                <Text style={{
                    fontSize: 25 * unitWidth,
                    lineHeight: 50 * unitWidth,
                    fontFamily: "PingFangTC",
                    color: "rgb(98,105,112)",
                    marginLeft: 5 * unitWidth
                }}>我已阅读并同意<Text style={{
                    fontSize: 25 * unitWidth,
                    lineHeight: 50 * unitWidth,
                    fontFamily: "PingFangTC",
                    color: "rgb(67,104,196)"
                }}>隐私政策协议</Text></Text>
                </TouchableOpacity>
            </View>
            {this.state.isloading ? <ActivityIndicator size="large" color="gray" animating={this.state.isloading} style={{
                alignItems: 'center',
                justifyContent: 'center',
                padding: 8,
            }} /> : null}
            <TouchableOpacity onPress={this.onRegister.bind(this)} underlayColor='#fff'>
                <View style={styles.login_V5} >
                    <Text style={styles.login_text}>注册</Text>
                </View>
            </TouchableOpacity>
            <View style={styles.login_V6} >
                <TouchableOpacity underlayColor='#fff'>
                    <Text style={styles.register_text} onPress={this.goback}>登录</Text>
                </TouchableOpacity>
            </View>
        </View>
    }
    goback() {
        Actions.pop();
    }
    onimage() {
        if (this.state.select_flag === 'no') {
            this.setState({
                select_flag: 'yes'
            });
        } else {
            this.setState({
                select_flag: 'no'
            });
        }


    }
  
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 51 * unitWidth,
        paddingLeft: 60 * unitWidth,
        paddingRight: 60 * unitWidth,
        backgroundColor: '#fff'
    },
    login_V6: {
        marginTop: 54 * unitWidth
    },
    register_text: {
        fontFamily: "PingFangTC-Semibold",
        color: "#21262c",
        fontSize: 32 * unitWidth,
        lineHeight: 50 * unitWidth,
        textAlign: 'center'
    },
    backximgstyles: {
        width: 48 * unitWidth,
        height: 48 * unitWidth,
        alignItems: 'flex-end'
    },
    Register_V1: {
        marginTop: 67 * unitWidth
    },
    Register_V2: {
        marginTop: 25 * unitWidth,
        flexDirection: 'row',
        alignItems: 'center'
    },
    registertextstyles: {
        color: "#21262c",
        fontSize: 44 * unitWidth,
        lineHeight: 50 * unitWidth,
        fontFamily: "PingFangTC-Semibold",
    },
    Forget_Password_v3: {
        marginTop: 119 * unitWidth,
    },
    phoneTextInputstyles: {
        fontSize: 40 * unitWidth,
        borderBottomWidth: 2 * unitWidth,
        borderColor: '#efefef',
        width: 630 * unitWidth

    },
    phonetextstyles: {
        fontSize: 30 * unitWidth,
        lineHeight: 50 * unitWidth,
        fontFamily: "PingFangTC",
        color: "#626970"
    },
    verificationcodestyles: {
        width: 200 * unitWidth,
        height: 60 * unitWidth,
        backgroundColor: "#3771ff",
        alignSelf: 'center',
        marginTop: 40 * unitWidth,
        justifyContent: 'center',
        borderRadius: 16,
        elevation: 1, 
        shadowColor: 'rgba(86, 116, 255, 0.52)',
        shadowOffset: { width: 0, height: 0 },  
        shadowOpacity: 0,
        shadowRadius: 8,  
        position: 'absolute',
        right: 0,


    },
    verificationcodetextstyles: {
        lineHeight: 50 * unitWidth,
        fontSize: 26 * unitWidth,
        color: "#ffffff",
        fontFamily: "PingFangTC",
        textAlign: 'center'
    },
    Forget_Password_v4: {
        marginTop: 49 * unitWidth,
    },
    Forget_Password_v5: {
        marginTop: 49 * unitWidth,
    },
    login_V5: {
        marginTop: 65 * unitWidth,
        width: 631 * unitWidth,
        height: 81 * unitWidth,
        backgroundColor: "#3771ff",
        alignSelf: 'center',
        justifyContent: 'center',
        borderRadius: 16,
        elevation: 1,  
        shadowColor: 'rgba(86, 116, 255, 0.52)',
        shadowOffset: { width: 0, height: 0 }, 
        shadowOpacity: 0,  
        shadowRadius: 8,  
    },
    login_text: {
        color: "#ffffff",
        fontSize: 30 * unitWidth,
        lineHeight: 50 * unitWidth,
        fontFamily: "PingFangTC-Semibold",
        textAlign: 'center'
    },
});