import { View, Text, Image } from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useNavigation } from 'expo-router';
import { DrawerActions } from '@react-navigation/native';
import Title from './Title';


const CustomHeader = ({ title }) => {
    const navigation = useNavigation();

    const closeDrawer = () => {
        navigation.dispatch(DrawerActions.openDrawer())
    }
    return (
        <View className="flex-row flex items-center justify-between px-3">
            {
                title &&
                <View className="rounded-lg px-2">
                    <Title text={title} style="text-xl text-primary" />
                </View>
            }
            <MaterialIcons onPress={closeDrawer} name="view-headline" size={40} color="black" className="p-0" />
        </View>
    )
}

export default CustomHeader