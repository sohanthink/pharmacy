import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'

const _layout = () => {
    return (
        <Tabs
            screenOptions={{
                tabBarShowLabel: false,
                tabBarActiveTintColor: '#FFA001',
                tabBarInactiveTintColor: '#CDCDE0',
                tabBarStyle: {
                    backgroundColor: '#161622',
                    borderTopWidth: 1,
                    borderTopColor: '#232533',
                    height: 84,
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'About',
                    headerShown: false,
                    // tabBarIcon: ({ color, focused }) => (
                    //     <TabIcon name="Dashboard" color={color} focused={focused} icon={home} />
                    // ),
                }}
            />
            <Tabs.Screen
                name="create"
                options={{
                    title: 'Create',
                    headerShown: false,
                    // tabBarIcon: ({ color, focused }) => (
                    //     <TabIcon name="Dashboard" color={color} focused={focused} icon={home} />
                    // ),
                }}
            />
            <Tabs.Screen
                name="update"
                options={{
                    title: 'Update',
                    headerShown: false,
                    // tabBarIcon: ({ color, focused }) => (
                    //     <TabIcon name="Dashboard" color={color} focused={focused} icon={home} />
                    // ),
                }}
            />
        </Tabs>
    )
}

export default _layout