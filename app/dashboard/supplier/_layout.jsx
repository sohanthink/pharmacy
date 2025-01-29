import { Platform } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { AntDesign, Feather, MaterialIcons, Ionicons } from '@expo/vector-icons'
import * as NavigationBar from 'expo-navigation-bar';

if (Platform.OS === 'android') {
    NavigationBar.setBackgroundColorAsync('#161622');
}

const _layout = () => {

    return (
        <Tabs
            screenOptions={{
                tabBarShowLabel: true,
                tabBarActiveTintColor: '#FFA001',
                tabBarInactiveTintColor: '#CDCDE0',
                tabBarStyle: {
                    backgroundColor: '#161622',
                    borderTopWidth: 1,
                    borderTopColor: '#232533',
                    height: 80,
                    paddingTop: 10,
                    paddingVertical: 5,
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'View',
                    headerShown: false,
                    // tabBarIcon: ({ color, focused }) => (
                    //     <TabIcon name="Dashboard" color={color} focused={focused} icon={home} />
                    // ),
                    tabBarIcon: ({ size, color }) => (
                        <MaterialIcons name='view-agenda' size={size} color={color} />
                    )
                }}
            />
            <Tabs.Screen
                name="create"
                options={{
                    title: 'Create supplier',
                    headerShown: false,
                    // tabBarIcon: ({ color, focused }) => (
                    //     <TabIcon name="Dashboard" color={color} focused={focused} icon={home} />
                    // ),
                    tabBarIcon: ({ size, color }) => (
                        <AntDesign name="addusergroup" size={size} color={color} />
                    )
                }}
            />

            <Tabs.Screen
                name="medicine"
                options={{
                    title: 'Med. Company',
                    headerShown: false,
                    // tabBarIcon: ({ color, focused }) => (
                    //     <TabIcon name="Dashboard" color={color} focused={focused} icon={home} />
                    // ),
                    tabBarIcon: ({ size, color }) => (
                        <Ionicons name="medkit" size={size} color={color} />
                        // <AntDesign name="addusergroup" size={size} color={color} />
                    )
                }}
            />
        </Tabs>
    )
}

export default _layout