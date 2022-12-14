import React, {useEffect, useState} from 'react';
import { View, Text, ImageBackground, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { app } from '../../api/FirebaseConfig';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { doc, getDoc } from 'firebase/firestore';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CustomDrawer = props => {

    const auth = getAuth(app)
    const userEmail = auth.currentUser?.email
    const [username, setUsername] = useState('')
    const [imageUrl, setImageUrl] = useState('')

    const getProfileData = async function(){

        const firestore = getFirestore(app)
        const docRef = doc(firestore, "USERS", userEmail)
        const docSnap = await getDoc(docRef)

        if(docSnap.exists())
        {
            const data = docSnap.data()
            setUsername(data.username)
            setImageUrl(data.image_uri)
        }
        else
        {
            //Toaster("Some error occurred")
        }
    }

    useEffect( ()=> {getProfileData()},[])

    return (
        <View style={{ marginTop:-40, flex: 1 }}>
            
            <DrawerContentScrollView {...props} contentContainerStyle={{ backgroundColor: '#8200d6' }}>

                <ImageBackground source={require('../../assets/headerBG.jpg')} style={styling.ImageBackgroundStyle}>

                    {imageUrl && <Image source={{uri: imageUrl}} style={styling.imageAvatarStyle} />}
                    {imageUrl === "" && <Image source={require("../../assets/user.png")} style={styling.imageAvatarStyle} />}
                    <Text style={styling.navHeaderTextStyle}> {username} </Text>
                    <Text style={styling.navHeaderTextStyle2}> {userEmail} </Text>
                
                </ImageBackground>

                <View style={{ flex: 1, backgroundColor: '#fff', paddingTop: 10 }}>
                    <DrawerItemList {...props} />
                </View>
            </DrawerContentScrollView>

            <View style={{ padding: 20, borderTopWidth: 1, borderTopColor: '#ccc' }}>
                <TouchableOpacity onPress={() => { }} style={{ paddingVertical: 15 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons name="exit-outline" size={22} />
                        <Text style={{ fontSize: 15, marginLeft: 5 }}> Sign Out </Text>
                    </View>
                </TouchableOpacity>
            </View>

        </View>
    );
};

const styling = StyleSheet.create({
    ImageBackgroundStyle: {
        paddingTop: 50, 
        alignItems: "center"
    },
    imageAvatarStyle: {
        height: 80,
        width: 80, 
        borderRadius: 40, 
        marginBottom: 10
    },
    navHeaderTextStyle: {
        color: '#fff', 
        fontSize: 18, 
        marginBottom: 5
    },
    navHeaderTextStyle2: {
        color: '#fff', 
        fontSize: 18, 
        marginBottom: 10
    }
})

export default CustomDrawer;