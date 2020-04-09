import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    StatusBar,
    ImageBackground,
    TouchableOpacity,
    ScrollView,
    Modal,
    TouchableWithoutFeedback,
    DeviceEventEmitter,
    Platform,
    Linking
} from 'react-native';
import { Actions } from 'react-native-router-flux'

import { toastShort } from '../Utils/ToastUtils.js';

import ImageViewer from 'react-native-image-zoom-viewer';
import CameraRoll from "@react-native-community/cameraroll";
import RNFS from 'react-native-fs';
export default class ImageShow extends Component {
    constructor(props) {
        super(props)
        let Obj = {};
        let ImageObjArray = [];
        Obj.url = this.props.img;
        ImageObjArray.push(Obj)

        this.state = {
            images: ImageObjArray,
            imageIndex: 0,
        }

    }
    componentDidMount() {
        toastShort("点击图片退出/长按可保存")
    }

    render() {
        return <View style={{ flex: 1 }}>
            <ImageViewer
                imageUrls={this.state.images} // 照片路径
                enableImageZoom={true} // 是否开启手势缩放
                saveToLocalByLongPress={true} //是否开启长按保存
                index={this.state.imageIndex} // 初始显示第几张
                // failImageSource={aaa} // 加载失败图片
                menuContext={{ "saveToLocal": "保存图片", "cancel": "取消" }}
                onChange={(index) => { }} // 图片切换时触发
                onClick={() => { // 图片单击事件
                    Actions.pop()
                }}
                onSave={(url) => {
                    this.savePhoto(url)
                }}
            />
        </View>
    }
    savePhoto(url) {
        // if (Platform.OS == 'ios') {
        //     let promise = CameraRoll.saveToCameraRoll(url);
        //     promise.then(function (result) {
        //         toastShort("已保存到系统相册")
        //     }).catch(function (error) {
        //         toastShort('保存失败');
        //     });
        // } else {
            //保存图片
            DownloadImage(url).then((res) => {
                if (res.statusCode == 200) {
                    this.close()
                    toastShort('图片保存成功')
                } else {
                    this.close()
                    toastShort('图片保存失败')
                }
            })
                .catch((error) => {
                    this.close()
                    toastShort('图片保存失败')
                    // console.log(error)
                })
        // }
    }

}
/**
 * 下载网页图片
 * @param uri  图片地址
 * @returns {*}
 */
export const DownloadImage = (uri) => {
    if (!uri) return null;
    return new Promise((resolve, reject) => {
        let timestamp = (new Date()).getTime();//获取当前时间错
        let random = String(((Math.random() * 1000000) | 0))//六位随机数
        let dirs = Platform.OS === 'ios' ? RNFS.LibraryDirectoryPath : RNFS.ExternalDirectoryPath; //外部文件，共享目录的绝对路径（仅限android）
        const downloadDest = `${dirs}/${timestamp + random}.jpg`;
        const formUrl = uri;
        const options = {
            fromUrl: formUrl,
            toFile: downloadDest,
            background: true,
            begin: (res) => {
                // console.log('begin', res);
                // console.log('contentLength:', res.contentLength / 1024 / 1024, 'M');
            },
        };
        try {
            const ret = RNFS.downloadFile(options);
            ret.promise.then(res => {
                // console.log('success', res);
                // console.log('file://' + downloadDest)
                var promise = CameraRoll.saveToCameraRoll(downloadDest);
                promise.then(function (result) {
                    toastShort('保存成功');
                }).catch(function (error) {
                    console.log('error', error);
                    toastShort('保存失败');
                });
                resolve(res);
            }).catch(err => {
                reject(new Error(err))
            });
        } catch (e) {
            reject(new Error(e))
        }

    })

}