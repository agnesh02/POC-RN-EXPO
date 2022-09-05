import React,{useState} from "react";
import {Text, TextInput, View, StyleSheet, TouchableOpacity} from "react-native"
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../api/Firebase";
import Toaster from "../components/Toaster";

const RegistrationScreen = function(){

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setconfirmPassword] = useState('')

    const registerUser = function(){
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                Toaster("User registered successfully")
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                Toaster(errorMessage)
            });
    }

    const validate = function(){
        if(username === "" || username.length<=2)
        {
            Toaster("Please enter a valid username with more than 2 characters")
            return
        }
        if(email === "")
        {
            Toaster("Please enter a valid email id")
            return
        }
        if(password === "" || password.length<=5)
        {
            Toaster("Please enter a valid password with more than 5 characters")
            return
        }
        if(confirmPassword === "" || confirmPassword != password)
        {
            Toaster("Passwords does not match")
            return
        }
        else
        {
            registerUser()
        }
    }
    

    return(
        <View style={styling.container}>
        <View style={styling.inputContainer}>
            <TextInput autoCapitalize="none" autoCorrect={false} placeholder="Username" value={username} onChangeText={text => setUsername(text)} style={styling.input} />
            <TextInput autoCapitalize="none" autoCorrect={false} placeholder="Email" value={email} onChangeText={text => setEmail(text)} style={styling.input} />
            <TextInput autoCapitalize="none" autoCorrect={false} placeholder="Password" value={password} onChangeText={text => setPassword(text)} style={styling.input} secureTextEntry />
            <TextInput autoCapitalize="none" autoCorrect={false} placeholder="Confirm Password" value={confirmPassword} onChangeText={text => setconfirmPassword(text)} style={styling.input} secureTextEntry />
        </View>

        <View style={styling.buttonContainer}>
            <TouchableOpacity style={styling.button} 
                onPress={()=> {
                        validate()
                    } 
                }>
                <Text style={styling.buttonText}>Register Now</Text>
            </TouchableOpacity>
        </View>
    </View>
    )
}

const styling = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      inputContainer: {
        width: '80%'
      },
      input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
      },
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
        borderRadius: 10,
        alignItems: 'center',
      },
      buttonOutline: {
        backgroundColor: 'white',
        marginTop: 5,
        borderColor: '#0782F9',
        borderWidth: 2,
      },
      buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
      },
      buttonOutlineText: {
        color: '#0782F9',
        fontWeight: '700',
        fontSize: 16,
      }
})

export default RegistrationScreen