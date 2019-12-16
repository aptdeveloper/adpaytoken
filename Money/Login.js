import React, { Component } from 'react';
import {
    DeviceEventEmitter,
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
import local from '../Utils/StorageUtils.js';
import CookieManager from 'react-native-cookies';
import { toastShort } from '../Utils/ToastUtils.js';
import DeviceInfo from 'react-native-device-info';
import NetUtils from '../Utils/NetUtils.js'
import CountdownUtil from '../Utils/CountdownUtil.js';

export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            phonetel: '',
            password: '',
            pwdLogin_flag: true,
            code: '',
            textcode: '',
            textcode_flag: true,
            placeholder: '',
            requset_flag: false,
            isloading: false,
            iscodeloading: false,
            keyboardType: '',

        }
    }
    componentWillUnmount() {
        CountdownUtil.stop()
    }
    render() {
        return <View style={styles.container}>
            <View style={{ alignItems: 'flex-end' }}>
                <TouchableOpacity onPress={this.goback} underlayColor="#fff">
                    <Image source={require('../../img/back_x.png')} style={styles.backximgstyles} />
                </TouchableOpacity>
            </View>
            {this.state.pwdLogin_flag ?
                (<View style={styles.login_V1}>
                    <Text style={styles.logintextstyles}>密码登录</Text>
                    <Text style={styles.logintextstyles1} onPress={this.onCodeLogin.bind(this)}>验证码登录</Text>
                </View>) :
                (<View style={styles.login_V1}>
                    <Text style={styles.logintextstyles}>验证码登录</Text>
                    <Text style={styles.logintextstyles1} onPress={this.onpwdLogin.bind(this)}>密码登录</Text>
                </View>)
            }
            <View style={styles.login_V2}>
                <Text style={styles.phonetextstyles}>手机号/邮箱</Text>
                <TextInput style={styles.phoneTextInputstyles}
                    placeholder="请输入手机号/邮箱"
                    clearButtonMode="while-editing"
                    keyboardType={this.state.keyboardType}
                    onChangeText={(tel) => {
                        this.setState({
                            phonetel: tel,
                        })
                    }} />
                {!this.state.pwdLogin_flag ?
                    (<TouchableOpacity style={styles.verificationcodestyles} onPress={this.onCode.bind(this)} underlayColor="#fff" >
                        <View>
                            {this.state.iscodeloading ? <ActivityIndicator size="small" color="gray" animating={this.state.iscodeloading} style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: 8,
                            }} /> : <Text style={styles.verificationcodetextstyles}>{this.state.textcode}</Text>}
                        </View>
                    </TouchableOpacity>) : (<View></View>)
                }
            </View>
            <View style={styles.login_V3}>
                {!this.state.pwdLogin_flag ? (<Text style={styles.phonetextstyles}>验证码</Text>) : (<Text style={styles.phonetextstyles}>密码</Text>)}
                {!this.state.pwdLogin_flag ?
                    <TextInput style={styles.phoneTextInputstyles}
                        placeholder="请输入验证码"
                        clearButtonMode="while-editing"
                        keyboardType={'numeric'}
                        onChangeText={(pwd) => {
                            this.setState({
                                password: pwd
                            })
                        }} /> :
                    <TextInput style={styles.phoneTextInputstyles}
                        placeholder='请输入密码'
                        clearButtonMode="while-editing"
                        secureTextEntry={true}
                        onChangeText={(pwd) => {
                            this.setState({
                                password: pwd
                            })
                        }} />}

            </View>

            <View style={styles.login_V4} >
                {this.state.pwdLogin_flag ? (<TouchableOpacity onPress={this.goForget_Password} underlayColor="#fff">
                    <Text style={styles.forgetpasswordstyles}>忘记密码?</Text>
                </TouchableOpacity>) : (<View />)}

            </View>
            {this.state.isloading ? <ActivityIndicator size="large" color="gray" animating={this.state.isloading} style={{
                alignItems: 'center',
                justifyContent: 'center',
                padding: 8,
            }} /> : null}
            <TouchableOpacity onPress={this.onLogin.bind(this)} >
                <View style={styles.login_V5} >
                    <Text style={styles.login_text}>登录</Text>
                </View>
            </TouchableOpacity>
            <View style={styles.login_V6} >
                <TouchableOpacity onPress={this.goRegister} >
                    <Text style={styles.register_text}>注册</Text>
                </TouchableOpacity>
            </View>
        </View>
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 61 * unitWidth,
        paddingRight: 55 * unitWidth,
        paddingTop: 51 * unitWidth,
        backgroundColor: '#fff'
    },
    outimagestyles: {
        width: 48 * unitWidth,
        height: 48 * unitWidth,
        backgroundColor: "#e0e4e5",
        borderRadius: 16,
        justifyContent: 'center',

    },
    outtextstyles: {
        color: '#fff',
        fontSize: 20 * unitWidth,
        alignItems: 'center',
        textAlign: 'center'
    },
    login_V1: {
        marginTop: 64 * unitWidth,
        flexDirection: 'row',
        alignItems: 'center'
    },
    logintextstyles: {
        fontSize: 44 * unitWidth,
        // lineHeight: 50 * unitWidth,
        color: "#21262c",
        fontFamily: "PingFangTC-Semibold",
    },
    logintextstyles1: {
        fontSize: 34 * unitWidth,
        // lineHeight: 50 * unitWidth,
        color: "#626970",
        fontFamily: "PingFang-SC-Regular",
        marginLeft: 39 * unitWidth
    },
    login_V2: {
        marginTop: 119 * unitWidth,
    },
    phonetextstyles: {
        fontSize: 30 * unitWidth,
        lineHeight: 50 * unitWidth,
        fontFamily: "PingFangTC",
        color: "#626970"
    },
    phoneTextInputstyles: {
        fontSize: 40 * unitWidth,
        borderBottomWidth: 2 * unitWidth,
        borderColor: '#efefef'


    },
    login_V3: {
        marginTop: 49 * unitWidth,
    },
    login_V4: {
        marginTop: 24 * unitWidth,
    },
    forgetpasswordstyles: {
        fontSize: 28 * unitWidth,
        lineHeight: 50 * unitWidth,
        color: "#626970",
        fontFamily: "PingFangTC",
        textAlign: 'right'
    },
    login_V5: {
        marginTop: 65 * unitWidth,
        width: 631 * unitWidth,
        height: 81 * unitWidth,
        backgroundColor: "#3771ff",
        alignSelf: 'center',
        justifyContent: 'center',
        borderRadius: 16,
      
    },
    login_text: {
        color: "#ffffff",
        fontSize: 30 * unitWidth,
        lineHeight: 50 * unitWidth,
        fontFamily: "PingFangTC-Semibold",
        textAlign: 'center'
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
    verificationcodetextstyles: {
        lineHeight: 50 * unitWidth,
        fontSize: 26 * unitWidth,
        color: "#ffffff",
        fontFamily: "PingFangTC",
        textAlign: 'center'
    },
    verificationcodestyles: {
        width: 200 * unitWidth,
        height: 60 * unitWidth,
        backgroundColor: "#3771ff",
        alignSelf: 'center',
        marginTop: 40 * unitWidth,
        justifyContent: 'center',
        borderRadius: 16,
      


    },
});