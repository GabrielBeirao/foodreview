import {
    StyleSheet, Text, View, Image, useWindowDimensions, TouchableOpacity
} from "react-native";
import React, { useState } from 'react';
import Logo from '../assets/images/logo.png';
import CustomInput from "../components/CustomInput.js";
import CustomButton from "../components/CustomButton.js";
import api from "../api/index.js";



const RegisterUser = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [admin, setAdmin] = useState('');
    const { height } = useWindowDimensions();


    const onRegisterPressed = async () => {
       
        try {
            const data = await api.post('/user/register', {
                name: name,
                email: email,
                password: password,
                admin: admin
            });
            if(data.status === 200){
                console.log(data)
                alert(data.data.message)
                navigation.navigate('Login')
            }else
                console.log(data)
  
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <View style={styles.view}>
            <Image
                source={Logo}
                style={[styles.logo, { height: height * 0.3 }]}
                resizeMode="contain"
            />
            <CustomInput
                placeholder="Name"
                value={name}
                setValue={setName}
            />
            <CustomInput
                placeholder="Email"
                value={email}
                setValue={setEmail}
            />
            <CustomInput
                placeholder="Password"
                value={password}
                setValue={setPassword}
                secureTextEntry={true}
            /><CustomInput
                placeholder="Admin"
                value={admin}
                setValue={setAdmin}
            />
            <CustomButton text="Register" onPress={onRegisterPressed} />
            <TouchableOpacity
                onPress={() => navigation.navigate("Login")}
            >
                <Text>
                    Já tem uma conta?{" "}
                    <Text style={styles.loginText}>Faça o login</Text>
                </Text>
            </TouchableOpacity>
        </View>
    )
};
const styles = StyleSheet.create({
    view: {
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#ede9ea',
        flex: 1

    },
    logo: {
        width: '70%',
        maxHeight: 150,
       
    
    },
    loginText: {
        fontWeight: "bold",
        color: "#c15eff",
    }

});

export default RegisterUser;