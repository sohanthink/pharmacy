import { View, Text, Button, Alert, TextInput, ActivityIndicator, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from 'react';
import { router } from "expo-router";
import { Login } from "../utils/api";
import { useMutation } from '@tanstack/react-query';
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import * as SecureStore from 'expo-secure-store';

async function saveToken(access_token) {
    try {
        await SecureStore.setItemAsync('accessToken', access_token);
    } catch (error) {
        console.error("Error saving token:", error);
    }
}

async function getToken() {
    try {
        return await SecureStore.getItemAsync('accessToken');
    } catch (error) {
        console.error("Error retrieving token:", error);
        return null;
    }
}



const SignIn = () => {
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkLogin = async () => {
            try {
                const token = await getToken();
                console.log("Token fetched:", token);  // Debug log

                if (token) {
                    // If the token exists, redirect to the dashboard
                    router.replace("/dashboard");
                } else {
                    // No token, allow user to log in
                    setLoading(false);  // Disable the loading screen and show login form
                }
            } catch (error) {
                console.error("Error during token check:", error);
                setLoading(false);  // Make sure to stop loading if there's an error
            }
        };

        checkLogin();
    }, []);


    const mutation = useMutation({
        mutationFn: () => Login(form.email, form.password),
        onSuccess: async (data) => {
            // Alert.alert('Success', `Welcome back, ${data.access_token}!`);
            await saveToken(data.access_token)
            router.replace("/dashboard");
        },
        onError: (error) => {
            setError(error.message || 'Something went wrong');
        }
    });

    const handleSignIn = () => {
        if (!form.email || !form.password) {
            setError('Please enter both email and password');
            return;
        }
        setError(null);
        mutation.mutate();
    };

    if (loading) {
        return (
            <View className="flex-1 items-center justify-center">
                <ActivityIndicator size="large" color="#FFA001" />
            </View>
        );
    }

    return (
        <SafeAreaView className="h-full bg-lightBg">
            <StatusBar style="auto" className="text-darkBg" />
            <View className="flex-1 items-center justify-center p-5">
                <Text className="font-pbold text-primary text-5xl mb-8">
                    Olpo Takay Beshi LAv.
                </Text>

                {error && (
                    <Text className="text-red-600 mb-4 font-pbold">
                        {error}
                    </Text>
                )}

                <TextInput
                    className={`border w-full mb-4 p-2 placeholder:text-red-500 text-black ${error ? 'border-red-600' : 'border-primary'}`}
                    placeholder="Email lekh BAinchod"
                    placeholderTextColor={error ? "red" : '#202020'}
                    value={form.email}
                    onChangeText={(e) => setForm({ ...form, email: e })}
                    keyboardType="email-address"
                    editable={!mutation.isLoading}
                />

                <TextInput
                    className={`border w-full mb-4 p-2 ${error ? 'border-red-600' : 'border-primary'}`}
                    placeholder="Password Lekh"
                    placeholderTextColor={error ? "red" : '#202020'}
                    value={form.password}
                    onChangeText={(e) => setForm({ ...form, password: e })}
                    secureTextEntry
                    editable={!mutation.isLoading}
                />

                {mutation.isLoading ? (
                    <ActivityIndicator size="large" color="#FFA001" />
                ) : (
                    <TouchableOpacity
                        className="bg-primary p-3 w-full rounded-lg"
                        onPress={handleSignIn}
                        disabled={mutation.isLoading}
                    >
                        <Text className="text-center text-white font-semibold">
                            Sign In
                        </Text>
                    </TouchableOpacity>
                )}
            </View>
        </SafeAreaView>
    );
};

export default SignIn;
