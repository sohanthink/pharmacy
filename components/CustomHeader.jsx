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
        <View className="flex-row items-center justify-between px-4 py-2">
            <MaterialIcons onPress={closeDrawer} name="view-headline" size={40} color="black" className="p-0" />
            <Image
                source={{ uri: "https://pharmacy.sohanthink.com/storage/profile/photo-bg-blackjpeg-1730234925.webp" }}
                height={50} width={50} borderRadius={50} resizeMode='cover' />
        </View>
    )
}

export default CustomHeader