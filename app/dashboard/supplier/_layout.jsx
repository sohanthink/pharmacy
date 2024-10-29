import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { AntDesign, Feather, MaterialIcons } from '@expo/vector-icons'
import * as NavigationBar from 'expo-navigation-bar';

NavigationBar.setBackgroundColorAsync('#161622');

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
                    height: 84,
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
                    title: 'Create',
                    headerShown: false,
                    // tabBarIcon: ({ color, focused }) => (
                    //     <TabIcon name="Dashboard" color={color} focused={focused} icon={home} />
                    // ),
                    tabBarIcon: ({ size, color }) => (
                        <AntDesign name="addusergroup" size={size} color={color} />
                    )
                }}
            />

            {/* <Tabs.Screen
                name="update"
                options={{
                    title: 'Update',
                    headerShown: false,
                    // tabBarIcon: ({ color, focused }) => (
                    //     <TabIcon name="Dashboard" color={color} focused={focused} icon={home} />
                    // ),
                }}
            /> */}
        </Tabs>
    )
}

export default _layout