import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import * as SecureStore from 'expo-secure-store';
import { router, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { AntDesign } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

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
        <SafeAreaView className="bg-lightBg h-full w-full">
            <ScrollView className="">
                <StatusBar style="auto" className="text-darkBg" />
                <Text>NIce Dashboard</Text>
                <TouchableOpacity
                    onPress={logout}
                    style={{ backgroundColor: 'blue', padding: 10, marginTop: 20, borderRadius: 5 }}
                >
                    <Text style={{ color: 'white', fontSize: 16 }}><AntDesign name="logout" size={24} color="white" /> Logout</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    )
}

export default index