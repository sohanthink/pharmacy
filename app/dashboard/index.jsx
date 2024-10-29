import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import * as SecureStore from 'expo-secure-store';
import { router } from 'expo-router';

async function logout() {
    try {
        await SecureStore.deleteItemAsync('accessToken');
        router.replace("/");
    } catch (error) {
        console.error("Logout error: ", error);
    }
}

const index = () => {
    return (
        <View>
            <Text>NIce Dashboard</Text>
            <TouchableOpacity
                onPress={logout}
                style={{ backgroundColor: 'blue', padding: 10, marginTop: 20, borderRadius: 5 }}
            >
                <Text style={{ color: 'white', fontSize: 16 }}>Logout</Text>
            </TouchableOpacity>
        </View>
    )
}

export default index