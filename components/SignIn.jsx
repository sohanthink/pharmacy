import { View, Text, TextInput, ActivityIndicator, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from 'react';
import { router } from "expo-router";
import { Login } from "../utils/api/authApi";
import { useMutation } from '@tanstack/react-query';
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import * as SecureStore from 'expo-secure-store';

// Constants for better maintainability
const routes = {
    staff: "/staff",
    user: "/dashboard",
    admin: "/admin"
};

const PLACEHOLDERS = {
    EMAIL: "Enter your email",
    PASSWORD: "Enter your password"
};

async function saveToken(access_token, role) {
    if (!access_token) return;
    try {
        await SecureStore.setItemAsync('accessToken', access_token);
        await SecureStore.setItemAsync('role', role);
    } catch (error) {
        console.error("Token save failed:", error);
        throw new Error("Failed to save authentication token");
    }
}

async function getToken() {
    try {
        return await SecureStore.getItemAsync('accessToken');
    } catch (error) {
        console.error("Token retrieval failed:", error);
        return null;
    }
}

const SignIn = () => {
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState(null);
    const [isCheckingToken, setIsCheckingToken] = useState(true);

    // Enhanced role-based routing
    const handleRoleRouting = (role) => {
        const route = routes[role]
        router.replace(route);
    };

    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const token = await getToken();
                const role = await SecureStore.getItemAsync('role'); // Await the role retrieval
                if (token && role) {
                    handleRoleRouting(role);
                }
            } catch (error) {
                console.error("Auth check failed:", error);
            } finally {
                setIsCheckingToken(false);
            }
        };
        checkAuthStatus();
    }, []);


    const mutation = useMutation({
        mutationFn: () => Login(form.email, form.password),
        onSuccess: async (data) => {
            if (!data?.access_token) {
                throw new Error("Authentication failed: No token received");
            }
            await saveToken(data.access_token, data.role);
            if (data.role) {
                handleRoleRouting(data.role);
            } else {
                // Fallback if role isn't provided
                console.log("Role not provided. Redirecting to login");
                router.replace('/');
            }
        },
        onError: (error) => {
            setError(error.message || "Authentication failed. Please try again.");
        }
    });

    const validateForm = () => {
        if (!form.email.trim() || !form.password.trim()) {
            setError("Both email and password are required");
            return false;
        }

        if (!/\S+@\S+\.\S+/.test(form.email)) {
            setError("Please enter a valid email address");
            return false;
        }

        return true;
    };

    const handleSignIn = () => {
        setError(null);
        if (validateForm()) {
            mutation.mutate();
        }
    };

    if (isCheckingToken) {
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
                    <Image source={require('../assets/images/pharmacy.png')} className="w-24 h-24" />
                </Text>

                {error && (
                    <Text className="text-red-600 mb-4 font-pbold text-center">
                        {error}
                    </Text>
                )}

                <TextInput
                    className={`border w-full mb-4 p-2 text-black ${error ? 'border-red-600' : 'border-primary'
                        }`}
                    placeholder={PLACEHOLDERS.EMAIL}
                    placeholderTextColor="#666"
                    value={form.email}
                    onChangeText={(text) => setForm(prev => ({ ...prev, email: text.trim() }))}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    editable={!mutation.isPending}
                />

                <TextInput
                    className={`border rounded-sm w-full mb-6 p-2 ${error ? 'border-red-600' : 'border-primary'
                        }`}
                    placeholder={PLACEHOLDERS.PASSWORD}
                    placeholderTextColor="#666"
                    value={form.password}
                    onChangeText={(text) => setForm(prev => ({ ...prev, password: text }))}
                    secureTextEntry
                    editable={!mutation.isPending}
                />

                <TouchableOpacity
                    className={`p-3 w-full rounded-lg ${mutation.isPending ? 'bg-gray-400' : 'bg-primary'
                        }`}
                    onPress={handleSignIn}
                    disabled={mutation.isPending}
                    accessibilityLabel="Sign in button"
                >
                    <Text className="text-center text-white font-semibold">
                        {mutation.isPending ? 'Signing In...' : 'Sign In'}
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default SignIn;