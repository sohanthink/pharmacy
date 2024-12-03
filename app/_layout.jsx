import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useState, useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";

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
};

const LoadingScreen = () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#FFA001" />
        <Text>Loading...</Text>
    </View>
);

export default function RootLayout() {
    const [appIsReady, setAppIsReady] = useState(false);
    const fontsLoaded = useLoadFonts();
    const queryClient = new QueryClient();

    useEffect(() => {
        const prepareApp = async () => {
            try {
                // Prevent splash screen from auto-hiding
                await SplashScreen.preventAutoHideAsync();

                if (fontsLoaded) {
                    setAppIsReady(true);
                }
            } catch (e) {
                console.error("Error preparing app:", e);
            }
        };

        prepareApp();
    }, [fontsLoaded]);

    useEffect(() => {
        if (appIsReady) {
            SplashScreen.hideAsync(); // Hide splash screen when app is ready
        }
    }, [appIsReady]);

    if (!appIsReady) {
        return null; // Splash screen is still visible
    }

    return (
        <QueryClientProvider client={queryClient}>
            <Stack>
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name="dashboard" options={{ headerShown: false }} />
            </Stack>
        </QueryClientProvider>
    );
}
