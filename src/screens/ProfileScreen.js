import React , {useEffect, useState} from "react";
import {Text, View, StyleSheet, Image, TouchableOpacity, ScrollView} from "react-native"
import Toaster from "../components/Toaster";
import { getFirestore } from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";
import { app } from "../../api/FirebaseConfig";
import { getAuth } from "firebase/auth";

const ProfileScreen = function({navigation}){

    //const{userEmail} = route.params
    const auth = getAuth(app)
    const userEmail = auth.currentUser?.email

    const [fullname, setFullname] = useState('')
    const [username, setUsername] = useState('')
    const [dob, setDob] = useState('')
    const [contact, setContact] = useState('')

    const getProfileData = async function(){

        const firestore = getFirestore(app)
        const docRef = doc(firestore, "USERS", userEmail)
        const docSnap = await getDoc(docRef)
    
        if(docSnap.exists())
        {
            const data = docSnap.data()
            setFullname(data.fullname)
            setUsername(data.username)
            setDob(data.dob)
            setContact(data.phone)
        }
        else
        {
            Toaster("Some error occurred")
        }
    }
    
    useEffect( () => {
        getProfileData()
    }, [])
    
    return (
        <View>
            <View style={styling.header}></View>
            <Image style={styling.avatar} source={require('../../assets/user.png')}/>

            <TouchableOpacity style={styling.buttonContainer2}>
                <Text>Edit Profile</Text>  
            </TouchableOpacity> 
            <TouchableOpacity style={styling.buttonContainer} onPress={()=> navigation.navigate("Profile Picture")}>
                <Text>Change profile picture</Text> 
            </TouchableOpacity>

            <ScrollView style={{marginTop: 50}}>
            <View style={styling.body}>
                <View style={styling.bodyContent}>
                    <Text style={styling.name}>{username}</Text>
                    <Text style={styling.info}>{userEmail}</Text>
                    <View style={styling.descriptionContainer}>
                        <Text style={styling.description}>Fullname : {fullname}</Text>
                        <Text style={styling.description}>DOB      : {dob}</Text>
                        <Text style={styling.description}>Phone    : {contact}</Text>
                    </View>
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
        marginTop: 35,
    },
    descriptionContainer:{
       marginTop: 35
    },
    description: {
        fontSize:16,
        color: "#696969",
        fontWeight: "bold"
    },
    buttonContainer: {
        flex: 1,
        position: "absolute",
        top: 107,
        height:40,
        left: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
        borderRadius:30,
    },
    buttonContainer2: {
        flex: 1,
        position: "absolute",
        top: 107,
        left: 250,
        height:25,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: 80,
        borderRadius:30,
        backgroundColor: "#00BFFF",
    }

})

export default ProfileScreen