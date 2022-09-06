import React from "react";
import {Text, View, StyleSheet, Image, TouchableOpacity, ScrollView} from "react-native"

const ProfileScreen = function(){
    
    return (
        <View style={styling.container}>
            <View style={styling.header}></View>
            <Image style={styling.avatar} source={require('../../assets/user.png')}/>
            <ScrollView style={{marginTop: 50}}>
            <View style={styling.body}>
                <View style={styling.bodyContent}>

                    <Text style={styling.name}>Username</Text>
                    <Text style={styling.info}>user@gmail.com</Text>
                    <Text style={styling.description}>Lorem ipsum dolor sit amet</Text>

                    <TouchableOpacity style={styling.buttonContainer}>
                        <Text>Opcion 1</Text>  
                    </TouchableOpacity>              
                    <TouchableOpacity style={styling.buttonContainer}>
                        <Text>Opcion 2</Text> 
                    </TouchableOpacity>
                
                </View>
            </View>
            </ScrollView>
            
        </View>
    )
}

const styling = StyleSheet.create({
    header:{
        backgroundColor: "#00BFFF",
        height:100,
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: "white",
        alignSelf:'center',
        position: 'absolute',
        marginTop:30
    },
    bodyContent: {
        flex: 1,
        alignItems: 'center',
    },
    name:{
        fontSize:28,
        color: "black",
        fontWeight: "900"
    },
    info:{
        fontSize: 17,
        color: "#00BFFF",
        position: "absolute",
        marginTop: 30
    },
    description:{
        fontSize:16,
        color: "#696969",
        textAlign: 'center',
        marginTop: 40
    },
    buttonContainer: {
        marginTop:10,
        height:25,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: 150,
        borderRadius:30,
        backgroundColor: "#00BFFF",
    }
})

export default ProfileScreen