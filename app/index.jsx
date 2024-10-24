import { View, Text, ScrollView, Button, Alert, TextInput } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

import { login } from '../utils/api'

const index = () => {

  const [form, setForm] = useState({
    email: "",
    password: ""
  })

  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    if (!form.email || !form.password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    setLoading(true);

    try {
      const data = await login(email, password);
      // Handle login success, e.g., navigate to the dashboard
      Alert.alert('Success', `Welcome back, ${data.user.name}!`);
    } catch (error) {
      Alert.alert('Login failed', error.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="h-full bg-lightBg">
      <View className="flex-1 items-center justify-center p-5">
        <Text className="font-pbold text-primary text-5xl mb-8">
          Olpo Takay Beshi LAv.
        </Text>
        <TextInput
          className="border border-primary w-full mb-4 p-2"
          placeholder="Email"
          value={form.email}
          handleChangeText={(e) => setForm({ ...form, email: e })}
          keyboardType="email-address"
        />
        <TextInput
          className="border border-primary w-full mb-4 p-2"
          placeholder="Password"
          value={form.password}
          handleChangeText={(e) => setForm({ ...form, password: e })}
          secureTextEntry
        />
        <Button
          title={loading ? 'Signing In...' : 'Sign In'}
          onPress={handleSignIn}
          disabled={loading}
        />
      </View>
    </SafeAreaView>
  );
};

export default index;
