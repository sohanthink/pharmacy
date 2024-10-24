import { useFonts } from "expo-font";
import { Slot, SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

    const [fontsLoaded, error] = useFonts({
        "Poppins_Black": require("../assets/fonts/Poppins-Black.ttf"),
        "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
        "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
        "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
        "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
        "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
        "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
        "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    })

    useEffect(() => {
        if (error) throw error;
        if (fontsLoaded) SplashScreen.hideAsync()
    }, [fontsLoaded, error])

    if (!fontsLoaded && !error) return null

    return (
        <>
            <Stack>
                <Stack.Screen name="index" options={{ headerShown: false }} />
                {/* <Stack.Screen name="(auth)" options={{ headerShown: false }} /> */}
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                {/* <Stack.Screen name="search/[query]" options={{ headerShown: false }} /> */}
            </Stack>
        </>
    );
}
