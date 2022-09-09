import React from "react";
import {Text, StyleSheet} from "react-native"
import {WebView} from "react-native-webview"

const LiveStreamScreen = function(){

    return (
        <WebView source={{ uri: 'https://google.co.in'}} />
    )
}

const styling = StyleSheet.create({

})

export default LiveStreamScreen