import { View, Text, Image } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'

import icons from "../../constants/icons";

const TabIcon = ({ icon, focused, color, name }) => {
    return (
        <View className="justify-center items-center gap-1">
            <Image source={icon} resizeMode='contain' tintColor={color} className='w-6 h-6' />
            <Text style={{ color: color }} className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xs`}>
                {name}
            </Text>
        </View>
    )
}

const TabLayout = () => {
    return (
        <Tabs screenOptions={{
            tabBarShowLabel: false,
            tabBarActiveTintColor: '#FFA001',
            tabBarInactiveTintColor: '#CDCDE0',
            tabBarStyle: {
                backgroundColor: '#161622',
                borderTopWidth: 1,
                borderTopColor: '#232533',
                height: 84
            }
        }}>
            <Tabs.Screen
                name='dashboard'
                options={{
                    title: 'dashboard',
                    headerShown: false,
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon name="Home" color={color} focused={focused} icon={icons.home} />

                    )
                }}
            />

            <Tabs.Screen
                name='create'
                options={{
                    title: 'create',
                    headerShown: false,
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon name="Home" color={color} focused={focused} icon={icons.home} />

                    )
                }}
            />
        </Tabs>
    )
}

export default TabLayout