import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import icons from '../../constants/icons'
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';

async function logout() {
    try {
        await SecureStore.deleteItemAsync('accessToken');
        console.log("nice");
        router.replace("/");
    } catch (error) {
        console.error("Logout error: ", error);
    }
}

const dashboard = () => {
    return (
        <View>
            <Image source={icons.mehedi} resizeMode='contain' />
            <TouchableOpacity
                onPress={logout}
                style={{ backgroundColor: 'blue', padding: 10, marginTop: 20, borderRadius: 5 }}
            >
                <Text style={{ color: 'white', fontSize: 16 }}>Logout</Text>
            </TouchableOpacity>
        </View>
    )
}

export default dashboard