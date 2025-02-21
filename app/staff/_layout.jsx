import React from 'react'
import { View, Text, Image } from 'react-native'
import { Tabs } from 'expo-router'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import FontAwesome from '@expo/vector-icons/FontAwesome';



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
// screenOptions={{
//     tabBarShowLabel: true,
//     tabBarActiveTintColor: '#FFA001',
//     tabBarInactiveTintColor: '#CDCDE0',
//     tabBarStyle: {
//         backgroundColor: '#161622',
//         borderTopWidth: 1,
//         borderTopColor: '#232533',
//         height: 80,
//         paddingTop: 10,
//         paddingVertical: 5,
//     },
// }}

const _layout = () => {
    return (
        <Tabs screenOptions={{
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
        }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    headerShown: false,
                    tabBarIcon: ({ color, size, focused }) => (
                        // <TabIcon name="Home" color={color} focused={focused} icon={icons.home} />
                        <MaterialIcons name='view-agenda' color={color} focused={focused} size={size} />
                    )
                }}
            />
            <Tabs.Screen
                name="sell"
                options={{
                    title: 'Sell',
                    headerShown: false,
                    tabBarIcon: ({ color, focused, size }) => (
                        <MaterialIcons name="sell" focused={focused} size={size} color={color} />
                    )
                }}
            />
            <Tabs.Screen
                name="list"
                options={{
                    title: 'List',
                    headerShown: false,
                    tabBarIcon: ({ color, focused, size }) => (
                        <FontAwesome name="list-alt" size={size} color={color} focused={focused} />
                    )
                }}
            />

        </Tabs>
    )
}

export default _layout