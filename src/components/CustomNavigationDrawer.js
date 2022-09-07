import React, {useEffect, useState} from 'react';
import { View, Text, ImageBackground, Image, TouchableOpacity } from 'react-native';
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
                <ImageBackground source={require('../../assets/headerBG.jpg')} style={{ paddingTop: 50, paddingLeft: 15}}>
                    {imageUrl && <Image source={{uri: imageUrl}} style={{ height: 80, width: 80, borderRadius: 40, marginBottom: 10 }} />}
                    {imageUrl === "" && <Image source={require("../../assets/user.png")} style={{ height: 80, width: 80, borderRadius: 40, marginBottom: 10 }} />}
                    <Text style={{ color: '#fff', fontSize: 18, marginBottom: 5 }}> {username} </Text>
                    <Text style={{ color: '#fff', fontSize: 18, marginBottom: 10 }}> {userEmail} </Text>
                </ImageBackground>

                <View style={{ flex: 1, backgroundColor: '#fff', paddingTop: 10 }}>
                    <DrawerItemList {...props} />
                </View>
            </DrawerContentScrollView>

            <View style={{ padding: 20, borderTopWidth: 1, borderTopColor: '#ccc' }}>
                <TouchableOpacity onPress={() => { }} style={{ paddingVertical: 15 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons name="exit-outline" size={22} />
                        <Text style={{ fontSize: 15, fontFamily: 'Roboto-Medium', marginLeft: 5 }}> Sign Out </Text>
                    </View>
                </TouchableOpacity>
            </View>

        </View>
    );
};

export default CustomDrawer;