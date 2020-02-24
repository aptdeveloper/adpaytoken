
// import React, { Component, PropTypes } from 'react';
// import {
//   View,
//   requireNativeComponent,
// } from 'react-native';
 

// const RCTDXCaptchaView = requireNativeComponent('DXCaptchaView', {
//   propTypes: {
//     ...View.propTypes // 包含默认的View的属性
//   },
// });

// module.exports=RCTDXCaptchaView;

import React from 'react';
import {requireNativeComponent,View} from 'react-native';
import PropTypes from 'prop-types';

var iface = {
    name: 'DXCaptchaView',
    
    propTypes: {
        appid: PropTypes.string, //appid:对应Android原生程序中的DXCaptchaView的init方法
        ...View.propTypes
    },
}

module.exports = requireNativeComponent('DXCaptchaView', iface,{
    nativeOnly:{
        "testID": true,
        'renderToHardwareTextureAndroid': true,
        'accessibilityComponentType': true,
        'accessibilityLabel': true,
        'importantForAccessibility': true,
        'accessibilityLiveRegion': true,
        'onLayout':true,
    }
});