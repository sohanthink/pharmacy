import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
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
                    paddingTop: 10,
                    paddingVertical: 5,
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Stuff',
                    headerShown: false,
                    tabBarIcon: ({ color, focused, size }) => (
                        <MaterialCommunityIcons name="google-street-view" color={color} focused={focused} size={size} />
                    ),
                }}
            />
            <Tabs.Screen
                name="create"
                options={{
                    title: 'Add Stuff',
                    headerShown: false,
                    tabBarIcon: ({ size, color }) => (
                        <MaterialCommunityIcons name="human-male-male" size={size} color={color} />
                    ),
                }}
            />
        </Tabs>
    )
}

export default _layout