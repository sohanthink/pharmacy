import { View, Text, Button, Alert, TextInput, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { login } from '../utils/api';
import { router } from "expo-router";

const index = () => {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    if (!form.email || !form.password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    setLoading(true);

    try {
      const data = await login(form.email, form.password);
      // Handle login success and navigate to the dashboard
      Alert.alert('Success', `Welcome back, ${data.user.name}!`);
      router.replace("/dashboard");
    } catch (error) {
      Alert.alert('Login failed', error.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="h-full bg-lightBg">
      <StatusBar style="auto" />
      <View className="flex-1 items-center justify-center p-5">
        <Text className="font-pbold text-primary text-5xl mb-8">
          Olpo Takay Beshi LAv.
        </Text>
        <TextInput
          className="border border-primary w-full mb-4 p-2"
          placeholder="Email"
          value={form.email}
          onChangeText={(e) => setForm({ ...form, email: e })}
          keyboardType="email-address"
          editable={!loading} // Disable input when loading
        />
        <TextInput
          className="border border-primary w-full mb-4 p-2"
          placeholder="Password"
          value={form.password}
          onChangeText={(e) => setForm({ ...form, password: e })}
          secureTextEntry
          editable={!loading} // Disable input when loading
        />
        {loading ? (
          <ActivityIndicator size="large" color="#FFA001" />
        ) : (
          <Button
            title="Sign In"
            onPress={handleSignIn}
            disabled={loading}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default index;
