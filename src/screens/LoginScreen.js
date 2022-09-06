import React,{useState} from "react";
import {Text, TextInput, View, StyleSheet, TouchableOpacity} from "react-native"
import Toaster from "../components/Toaster";
import { auth } from "../../api/Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = function(){

    const navigation = useNavigation()
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const loginUser = function(){

      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          Toaster("Welcome "+user.email)
          navigation.navigate("Side Navigation")
      })
      .catch((error) => {
          //const errorCode = error.code;
          const errorMessage = error.message;
          Toaster(errorMessage)
      });
  }

    const validate = function(){

        if(email === "")
        {
          Toaster("Please enter a valid email id")
          return
        }
        if(password === "" || password.length<=5)
        {
          Toaster("Please enter a valid password which is more than 5 characters")
          return
        }
        else
        {
          loginUser()
        }
    }

    return (
        <View style={styling.container}>
            <View style={styling.inputContainer}>
                <TextInput autoCapitalize="none" autoCorrect={false} placeholder="Email" value={email} onChangeText={text => setEmail(text.trim())} style={styling.input} />
                <TextInput autoCapitalize="none" autoCorrect={false} placeholder="Password" value={password} onChangeText={text => setPassword(text.trim())} style={styling.input} secureTextEntry />
            </View> 

            <View style={styling.buttonContainer}>
                <TouchableOpacity style={styling.button} 
                    onPress={()=> validate()}>
                    <Text style={styling.buttonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styling.button, styling.buttonOutline]} onPress={()=> navigation.navigate("Registration") } >
                    <Text style={styling.buttonOutlineText}>Register</Text>
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

export default LoginScreen