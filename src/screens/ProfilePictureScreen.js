import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import Toaster from '../components/Toaster'
import { app } from '../../api/FirebaseConfig'
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { getAuth } from 'firebase/auth'

const ProfilePictureScreen = function () {

    const [image, setImage] = useState(null);
    const [uploadingStatus, setUploadingStatus] = useState(false);

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        //console.log(result);
        if (!result.cancelled) {
            setImage(result.uri);
        }
        else{
            Toaster("No image selected")
        }
    };

    const uploadImage = async function(){

        setUploadingStatus(true)
        Toaster("Uploading file...This may take time depending on your connectivity")
        const firebaseStorage = getStorage(app)
        const auth = getAuth(app)
        const userEmail = auth.currentUser?.email

        try{
            const response = await fetch(image)
            const blob = await response.blob();

            var storageRef = ref(firebaseStorage, `USERS/${userEmail}`)
            await uploadBytes(storageRef, blob)
                    .then((snapshot) => {
                        Toaster("File uploaded successfully")
                        setUploadingStatus(false)
                    })
                    .catch((error) => {
                        //const errorCode = error.code;
                        const errorMessage = error.message;
                        Toaster(errorMessage)
                        setUploadingStatus(false)
                    })
        }
        catch(e){
            console.log(e)
        }
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            {image && <Image source={{ uri: image }} style={{ width: 300, height: 200 }} />}
            <View style={styling.buttonContainer}>
				<TouchableOpacity style={styling.button} onPress={() => pickImage()}>
					<Text style={styling.buttonText}>Choose an image</Text>
				</TouchableOpacity>

                {image ?  
                        <TouchableOpacity style={styling.button} onPress={() => uploadImage()}>
                            <Text style={styling.buttonText}>Upload image</Text>
                        </TouchableOpacity> 
                        : null}
               
			</View>
            {uploadingStatus ? <ActivityIndicator style={styling.pBar} size="large" /> : null}
        </View>
    );
}

const styling = StyleSheet.create({
    buttonContainer: {
		width: '60%',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 40,
	},
    button: {
		backgroundColor: '#0782F9',
		width: '100%',
		padding: 15,
		borderRadius: 20,
		alignItems: 'center',
        marginBottom: 10
	},
    buttonText: {
		color: 'white',
		fontWeight: '700',
		fontSize: 16,
	},
    pBar: {
		borderColor: "black",
		position: "absolute",
		top: 550
	}
})

export default ProfilePictureScreen

