import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity, DeviceEventEmitter, Image } from 'react-native';
import { QRscanner } from 'react-native-qr-scanner';
import { Actions } from 'react-native-router-flux';
import { unitWidth, unitHeight } from '../../AdapterUtil.js';
export default class Scanner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            flashMode: false,
            zoom: Platform.OS == 'ios' ? 0 : 0.2
        };
    }
    render() {
        return (
            <View style={styles.container}>
                <QRscanner onRead={this.onRead} renderBottomView={this.bottomView} flashMode={this.state.flashMode} zoom={this.state.zoom} finderY={Platform.OS == 'ios' ? 40 : 50} />
            </View>
        );
    }
    bottomView = () => {
        return (
            <View style={{ flex: 1, backgroundColor: '#0000004D' }}>
                <TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} onPress={() => this.setState({ flashMode: !this.state.flashMode })}>
                    <Text style={{ color: '#fff' }}>点我开启/关闭手电筒</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} onPress={() => Actions.pop()}>
                    <Text style={{ color: '#fff' }}>点击退出</Text>
                </TouchableOpacity>
            </View>
        );
    }
    onRead = (res) => {
        console.warn(res)
        DeviceEventEmitter.emit('scannerdata', res.data)
        Actions.pop()
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000'
    }
});