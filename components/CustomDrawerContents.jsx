import { View, Text, Pressable, Image } from 'react-native'
import React from 'react'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import * as SecureStore from 'expo-secure-store';
import { router } from 'expo-router';

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
                        source={{ uri: "https://scontent.fcgp36-1.fna.fbcdn.net/v/t39.30808-1/439426752_1114499739876223_724619995359030685_n.jpg?stp=c0.234.1580.1580a_dst-jpg_s480x480&_nc_cat=105&ccb=1-7&_nc_sid=0ecb9b&_nc_eui2=AeEhex-IEYxGE_1WrHy24hfrp1IdgCY4OOqnUh2AJjg46gT4cUwbUAW6aR0zK0L9sIgfUNER1aPaWCGBug2Xwtnr&_nc_ohc=iPE2he5d9rEQ7kNvgFs13EM&_nc_zt=24&_nc_ht=scontent.fcgp36-1.fna&_nc_gid=AnzCVZR9DcdaAPNrkU3CWGK&oh=00_AYDqaegw4MoaX5R89MMPSbXTTOa7gjrl6BtwNraOUuKzGQ&oe=673F84CC" }}
                        height={50} width={50} borderRadius={50} resizeMode='cover' />
                    <View>
                        <Text className='font-pmedium'>Mehedi Khan</Text>
                        <Text className='font-plight'>mehedi@gmail.com</Text>
                    </View>
                </View>
                <DrawerItemList {...props} />
            </DrawerContentScrollView>

            <Pressable onPress={logout} style={{ paddingBottom: bottom + 10 }} className="p-5 rounded-full">
                <Text className='bg-green-700 text-white font-pbold px-2 py-3 text-center'>Logout</Text>
            </Pressable>
        </View>
    )
}