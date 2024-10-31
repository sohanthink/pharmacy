import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { AntDesign, MaterialIcons } from '@expo/vector-icons'

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
                    paddingVertical: 5,
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'view',
                    headerShown: false,
                    tabBarIcon: ({ size, color }) => (
                        <MaterialIcons name='view-agenda' size={size} color={color} />
                    )
                }}
            />
            <Tabs.Screen
                name="settings"
                options={{
                    title: 'settings',
                    headerShown: false,
                    tabBarIcon: ({ size, color }) => (
                        <AntDesign name="setting" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="create"
                options={{
                    title: 'create',
                    headerShown: false,
                    tabBarIcon: ({ size, color }) => (
                        <AntDesign name="medicinebox" size={size} color={color} />
                    ),
                }}
            />
        </Tabs>
    )
}

export default _layout