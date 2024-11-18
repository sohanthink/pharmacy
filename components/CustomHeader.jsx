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
        <View className="flex-row items-center justify-between p-2">
            <MaterialIcons onPress={closeDrawer} name="view-headline" size={40} color="black" className="p-0" />
            <Image
                source={{ uri: "https://scontent.fcgp36-1.fna.fbcdn.net/v/t39.30808-1/439426752_1114499739876223_724619995359030685_n.jpg?stp=c0.234.1580.1580a_dst-jpg_s480x480&_nc_cat=105&ccb=1-7&_nc_sid=0ecb9b&_nc_eui2=AeEhex-IEYxGE_1WrHy24hfrp1IdgCY4OOqnUh2AJjg46gT4cUwbUAW6aR0zK0L9sIgfUNER1aPaWCGBug2Xwtnr&_nc_ohc=iPE2he5d9rEQ7kNvgFs13EM&_nc_zt=24&_nc_ht=scontent.fcgp36-1.fna&_nc_gid=AnzCVZR9DcdaAPNrkU3CWGK&oh=00_AYDqaegw4MoaX5R89MMPSbXTTOa7gjrl6BtwNraOUuKzGQ&oe=673F84CC" }}
                height={50} width={50} borderRadius={50} resizeMode='cover' />
        </View>
    )
}

export default CustomHeader