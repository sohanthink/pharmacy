import { Tabs } from 'expo-router';
import { View, Text, Image } from 'react-native';
import { home } from '../../constants/icons';
import Dashboard from './dashboard'; // Ensure this imports correctly
import Create from './create';

// Icon component for tabs
const TabIcon = ({ icon, focused, color, name }) => {
    return (
        <View className="justify-center items-center gap-1">
            <Image source={icon} resizeMode="contain" tintColor={color} className="w-6 h-6" />
            <Text style={{ color: color }} className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xs`}>
                {name}
            </Text>
        </View>
    );
};

// Tab Layout component
const TabLayout = () => {
    return (
        <Tabs
            screenOptions={{
                tabBarShowLabel: false,
                tabBarActiveTintColor: '#FFA001',
                tabBarInactiveTintColor: '#CDCDE0',
                tabBarStyle: {
                    backgroundColor: '#161622',
                    borderTopWidth: 1,
                    borderTopColor: '#232533',
                    height: 84,
                },
            }}
        >
            <Tabs.Screen
                name="dashboard"
                component={Dashboard}
                options={{
                    title: 'Dashboard',
                    headerShown: false,
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon name="Dashboard" color={color} focused={focused} icon={home} />
                    ),
                }}
            />
            <Tabs.Screen
                name="create"
                component={Create} // Ensure you have this component defined
                options={{
                    title: 'Create',
                    headerShown: false,
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon name="Create" color={color} focused={focused} icon={home} />
                    ),
                }}
            />
        </Tabs>
    );
};

// Main Layout component integrating both Drawer and Tabs
const MainLayout = () => {
    return (
        <View style={{ flex: 1 }}>
            <TabLayout />
        </View>
    );
};

export default MainLayout;
