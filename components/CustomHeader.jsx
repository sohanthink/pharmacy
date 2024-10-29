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
        <View className="flex-row items-center justify-between pb-5">
            <View><MaterialIcons onPress={closeDrawer} name="view-headline" size={34} color="black" /></View>
            <View className="flex-row gap-4 items-center">
                <Text className="font-pbold"> Sohan Mollah</Text>
                <Image
                    source={{ uri: "https://pharmacy.sohanthink.com/storage/profile/photo-bg-blackjpeg-1730234925.webp" }}
                    height={50} width={50} borderRadius={50} resizeMode='cover' />
            </View>
        </View>
    )
}

export default CustomHeader