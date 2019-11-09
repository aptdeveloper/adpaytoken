import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity,DeviceEventEmitter } from 'react-native';
import { QRscanner } from 'react-native-qr-scanner';
import { Actions } from 'react-native-router-flux';

export default class Scanner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            flashMode: false,
            zoom: 0.2
        };
    }
    render() {
        return (
            <View style={styles.container}>
                <QRscanner onRead={this.onRead} renderBottomView={this.bottomView} flashMode={this.state.flashMode} zoom={this.state.zoom} finderY={50} />
            </View>
        );
    }
    bottomView = () => {
        return (
            <View style={{ flex: 1, flexDirection: 'row', backgroundColor: '#0000004D' }}>
                <TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} onPress={() => this.setState({ flashMode: !this.state.flashMode })}>
                    <Text style={{ color: '#fff' }}>点我开启/关闭手电筒</Text>
                </TouchableOpacity>
            </View>
        );
    }
    onRead = (res) => {
        console.warn(res)
        DeviceEventEmitter.emit('scannerdata',res.data)
          Actions.pop()
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000'
    }
});