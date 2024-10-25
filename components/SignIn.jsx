import { View, Text, Button, Alert, TextInput, ActivityIndicator, TouchableOpacity } from "react-native";
import React, { useState } from 'react';
import { router } from "expo-router";
import { Login } from "../utils/api";
import { useMutation } from '@tanstack/react-query';
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

const SignIn = () => {
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState(null);

    const mutation = useMutation({
        mutationFn: () => Login(form.email, form.password),
        onSuccess: (data) => {
            Alert.alert('Success', `Welcome back, ${data.name}!`);
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

    return (
        <SafeAreaView className="h-full bg-lightBg">
            <StatusBar style="auto" />
            <View className="flex-1 items-center justify-center p-5">
                <Text className="font-pbold text-primary text-5xl mb-8">
                    Olpo Takay Beshi LAv.
                </Text>

                {error && (
                    <Text className="text-red-600 mb-4">
                        {error}
                    </Text>
                )}

                <TextInput
                    className={`border w-full mb-4 p-2 text-black ${error ? 'border-red-600' : 'border-primary'}`}
                    placeholder="Email"
                    value={form.email}
                    onChangeText={(e) => setForm({ ...form, email: e })}
                    keyboardType="email-address"
                    editable={!mutation.isLoading}
                />

                <TextInput
                    className={`border w-full mb-4 p-2 ${error ? 'border-red-600' : 'border-primary'}`}
                    placeholder="Password"
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
