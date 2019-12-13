import React, { Component } from 'react';
import {
    View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Actions } from 'react-native-router-flux'
import { unitWidth, unitHeight } from '../../AdapterUtil.js';
import ClickUtil from '../Utils/ClickUtil.js';
import local from '../Utils/StorageUtils.js';
import { toastShort } from '../Utils/ToastUtils.js';
import NetUtils from '../Utils/NetUtils.js'
import CountDown from '../Utils/AuditTaskCountDown.js'
import ImagePicker from 'react-native-image-crop-picker';
import ImageViewer from 'react-native-image-zoom-viewer';
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


    render() {
        return <View style={{ flex: 1 }}>
            <ImageViewer
                imageUrls={this.state.images}
                enableImageZoom={true}
                index={this.state.imageIndex}

                onChange={(index) => { }}
                onClick={() => {
                    Actions.pop()
                }}
            />
        </View>
    }
}