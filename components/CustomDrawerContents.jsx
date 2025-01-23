import { View, Text, Pressable, Image } from 'react-native'
import React from 'react'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import * as SecureStore from 'expo-secure-store';
import { router } from 'expo-router';

import avatar from '../assets/images/avatar.png';

export default function CustomDrawerContent(props) {

    const { bottom } = useSafeAreaInsets();

    async function logout() {
        try {
            await SecureStore.deleteItemAsync('accessToken');
            router.replace("/");
        } catch (error) {
            console.error("Logout error: ", error);
        }
    }

    return (
        <View style={{ flex: 1 }}  >
            <DrawerContentScrollView {...props} scrollEnabled={false}>
                <View className="flex-row justify-between items-center" style={{ padding: 20 }}>
                    <Image
                        source={avatar}
                        style={{ height: 50, width: 50, borderRadius: 25 }}
                        resizeMode='contain'
                    />
                    <View>
                        <Text className='font-pmedium'>Mehedi Khan</Text>
                        <Text className='font-plight'>mehedi@gmail.com</Text>
                    </View>
                </View>
                <DrawerItemList {...props} />
            </DrawerContentScrollView>

            <Pressable onPress={logout} style={{ paddingBottom: bottom + 10 }} className="p-5 rounded-full">
                <Text className='bg-primary text-white font-pbold px-2 py-3 text-center'>Logout</Text>
            </Pressable>
        </View>
    )
}