import { View, Text } from 'react-native'
import React from 'react'
import Drawer from 'expo-router/drawer'
import { GestureHandlerRootView } from 'react-native-gesture-handler'



const _layout = () => {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Drawer
                screenOptions={{
                    // drawerLabelStyle: {
                    //     // marginLeft: -20
                    // },
                    headerShown: false,
                    // drawerActiveBackgroundColor: 'gray',
                    // drawerActiveTintColor: 'white',
                    // drawerInactiveTintColor: 'white'
                }}
            // drawerContent={CustomDrawerContent}
            >

                <Drawer.Screen
                    name="index"
                    options={{
                        drawerLabel: 'Home',
                        title: 'Home',
                        headerShown: false,
                        // drawerIcon: ({ size, color }) => (
                        //     <Ionicons name='md-home' size={size} color={color} />
                        // )

                    }}
                />
                <Drawer.Screen
                    name="create"
                    options={{
                        drawerLabel: 'Create',
                        title: 'Create',
                        headerShown: false,
                        // drawerIcon: ({ size, color }) => (
                        //     <Ionicons name='ios-information-circle' size={size} color={color} />
                        // )

                    }}
                />
                <Drawer.Screen
                    name="about"
                    options={{
                        drawerLabel: 'About',
                        title: 'About',
                        headerShown: false,
                        // drawerIcon: ({ size, color }) => (
                        //     <Ionicons name='ios-information-circle' size={size} color={color} />
                        // )

                    }}
                />
            </Drawer>
        </GestureHandlerRootView>
    )
}

export default _layout