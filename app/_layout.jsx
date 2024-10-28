import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useState, useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from 'expo-router/drawer';
import MainLayout from "./(tabs)/_layout";
import AddSupplier from "./(tabs)/AddSupplier";
import SupplierList from "./(tabs)/supplierList";

const useLoadFonts = () => {
    const [fontsLoaded] = useFonts({
        "Poppins_Black": require("../assets/fonts/Poppins-Black.ttf"),
        "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
        "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
        "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
        "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
        "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
        "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
        "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    });

    return fontsLoaded;
}

const LoadingScreen = () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#FFA001" />
        <Text>Loading...</Text>
    </View>
);

export default function RootLayout() {

    const [appIsReady, setAppIsReady] = useState(false);
    const fontsLoaded = useLoadFonts();

    useEffect(() => {
        const prepareApp = async () => {
            try {
                if (fontsLoaded) {
                    await SplashScreen.hideAsync();
                    setAppIsReady(true);
                }
            } catch (e) {
                console.error("Error preparing app:", e);
            }
        };
        prepareApp();
    }, [fontsLoaded]);

    if (!appIsReady) {
        return <LoadingScreen />;
    }

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Drawer.Navigator initialRouteName="Tabs">
                <Drawer.Screen
                    name="Tabs"
                    component={MainLayout} // Use MainLayout which has Tabs
                    options={{
                        headerShown: false,
                    }}
                />
                {/* Additional drawer screens can be added here */}
                <Drawer.Screen
                    name="addSupplier"
                    component={AddSupplier}
                    options={{
                        drawerLabel: 'Add Supplier',
                    }}
                />
                <Drawer.Screen
                    name="supplierList"
                    component={SupplierList}
                    options={{
                        drawerLabel: 'Supplier List',
                    }}
                />
            </Drawer.Navigator>
        </GestureHandlerRootView>
    );
}
