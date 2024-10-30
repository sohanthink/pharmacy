import { View, Text, Image } from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useNavigation } from 'expo-router';
import { DrawerActions } from '@react-navigation/native';


const CustomHeader = () => {
    const navigation = useNavigation();

    const closeDrawer = () => {
        navigation.dispatch(DrawerActions.openDrawer())
    }
    return (
        <View className="flex-row items-center justify-between px-5 py-2">
            <View><MaterialIcons onPress={closeDrawer} name="view-headline" size={40} color="black" /></View>
            <View className="flex-row gap-4 items-center">
                <View>
                    {/* <Text className="font-psemibold text-lg"> Sohan Mollah</Text> */}
                </View>
                <Image
                    source={{ uri: "https://pharmacy.sohanthink.com/storage/profile/photo-bg-blackjpeg-1730234925.webp" }}
                    height={50} width={50} borderRadius={50} resizeMode='cover' />
            </View>
        </View>
    )
}

export default CustomHeader