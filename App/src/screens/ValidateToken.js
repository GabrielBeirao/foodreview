import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useContext } from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { Context } from '../context/dataContext';

import api from '../api';

const ValidateToken = ({ navigation }) => {
    const {state, dispatch} = useContext(Context);

    const verifyToken = async () => {
        const token = await AsyncStorage.getItem('token');
        if(token){
            try {
                const data = await api.get('/user/verify', {
                    headers: {
                        token: token
                    }
                });
                await dispatch({ type: 'verify', payload: data.data.authData})
                navigation.navigate("Routes")
            } catch (error) {
                console.log(error);
                dispatch({type: 'logIn', payload: false})
            }
        }else{
            dispatch({type: 'logIn', payload: false})
        }
    };
    verifyToken();



    return(
        <View style={styles.container}>
            <ActivityIndicator color='red' size={45} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default ValidateToken;