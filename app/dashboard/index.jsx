import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { router, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { AntDesign } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import Layout from '../../components/Layout';



const index = () => {
    return (
        <Layout>
            <ScrollView className="">
                <StatusBar style="auto" className="text-darkBg" />
                <Text>NIce Dashboard</Text>
            </ScrollView>
        </Layout>
    )
}

export default index