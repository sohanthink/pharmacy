import React from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import Drawer from 'expo-router/drawer'
import CustomDrawerContents from '../../components/CustomDrawerContents'


const _layout = () => {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Drawer
                screenOptions={{
                    headerShown: false,
                    // drawerLabelStyle: {
                    //     // marginLeft: -20
                    // },
                    drawerActiveBackgroundColor: '#A294F9',
                    drawerActiveTintColor: 'white',
                    drawerInactiveTintColor: 'black',
                }}
                drawerContent={CustomDrawerContents}
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
                {/* <Drawer.Screen
                    name="about"
                    options={{
                        drawerLabel: 'About',
                        title: 'About',
                        headerShown: false,
                        // drawerIcon: ({ size, color }) => (
                        //     <Ionicons name='ios-information-circle' size={size} color={color} />
                        // )
                    }}
                /> */}
                <Drawer.Screen
                    name="supplier"
                    options={{
                        drawerLabel: 'Supplier',
                        title: 'Supplier',
                        headerShown: false,
                        // drawerIcon: ({ size, color }) => (
                        //     <Ionicons name='ios-information-circle' size={size} color={color} />
                        // )
                    }}
                />
                <Drawer.Screen
                    name="medicine"
                    options={{
                        drawerLabel: 'Medicine',
                        title: 'Medicine',
                        headerShown: false,
                        // drawerIcon: ({ size, color }) => (
                        //     <Ionicons name='ios-information-circle' size={size} color={color} />
                        // )
                    }}
                />
                <Drawer.Screen
                    name="stuff"
                    options={{
                        drawerLabel: 'Stuff',
                        title: 'Stuff',
                        headerShown: false,
                        // drawerIcon: ({ size, color }) => (
                        //     <Ionicons name='ios-information-circle' size={size} color={color} />
                        // )
                    }}
                />
            </Drawer>
        </GestureHandlerRootView >
    )
}

export default _layout