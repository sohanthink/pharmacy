import { Tabs } from 'expo-router';
import { View, Text, Image } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { home } from '../../constants/icons';
import AddSupplier from './screens/addSupplier';
import SupplierList from './screens/supplierList';
import dashboard from './dashboard';

// Define the drawer navigator
const Drawer = createDrawerNavigator();

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
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Drawer.Navigator initialRouteName="dashboard">
                <Drawer.Screen
                    name="Tabs"
                    component={TabLayout}
                    options={{
                        headerShown: false,
                    }}
                />

                <Drawer.Screen
                    name="dashboard"
                    component={dashboard}
                    options={{
                        headerShown: false,
                        drawerLabel: 'dashboard',
                    }}
                />
                <Drawer.Screen
                    name="AddSupplier"
                    component={AddSupplier}
                    options={{
                        headerShown: false,
                        drawerLabel: 'Another Screen',
                    }}
                />
                <Drawer.Screen
                    name="supplierList"
                    component={SupplierList}
                    options={{
                        headerShown: false,
                        drawerLabel: 'supplierlist',
                    }}
                />
                {/* Add more Drawer screens here if needed */}
            </Drawer.Navigator>
        </GestureHandlerRootView>
    );
};

export default MainLayout;
