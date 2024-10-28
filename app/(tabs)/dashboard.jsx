import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import icons from '../../constants/icons'
import { router } from 'expo-router';

import * as SecureStore from 'expo-secure-store';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';





async function logout() {
    try {
        await SecureStore.deleteItemAsync('accessToken');
        router.replace("/");
    } catch (error) {
        console.error("Logout error: ", error);
    }
}

const Dashboard = () => {
    return (
        <SafeAreaView className="h-full bg-lightBg">
            <StatusBar style="auto" className="text-darkBg" />

            <Image source={icons.mehedi} resizeMode='contain' />
            <TouchableOpacity
                onPress={logout}
                style={{ backgroundColor: 'blue', padding: 10, marginTop: 20, borderRadius: 5 }}
            >
                <Text style={{ color: 'white', fontSize: 16 }}>Logout</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default Dashboard