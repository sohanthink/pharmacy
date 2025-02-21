import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import AntDesign from '@expo/vector-icons/AntDesign';
import * as SecureStore from 'expo-secure-store';

const DashboardCard = ({ title, value, description, onPress }) => (
    <TouchableOpacity
        className="bg-secondary rounded-lg shadow-md w-[48%] p-4"
        onPress={onPress}
    >
        <View>
            <Text className="text-xl font-semibold text-darkBg">{title}</Text>
            <Text className="text-2xl font-bold text-darkBg">{value}</Text>
            <Text className="text-darkBg opacity-80">{description}</Text>
        </View>
    </TouchableOpacity>
);

const StaffDashboard = () => {
    async function logout() {
        try {
            await SecureStore.deleteItemAsync('accessToken');
            router.replace("/");
        } catch (error) {
            console.error("Logout error: ", error);
        }
    }

    return (
        <SafeAreaView className="flex-1 bg-lightBg p-3">
            <StatusBar style="auto" />
            <ScrollView contentInsetAdjustmentBehavior="automatic" showsVerticalScrollIndicator={false}>
                <View className="flex-row items-center justify-between px-2">
                    <View>
                        <Text className="mt-4 text-2xl font-bold text-darkBg">Welcome to Staff System</Text>
                        <Text className="mb-4 text-lg text-gray-500">Glimpse of Staff System</Text>
                    </View>
                    <TouchableOpacity onPress={logout}>
                        <AntDesign name="logout" size={24} color="black" />
                    </TouchableOpacity>
                </View>

                <View className="flex-row flex-wrap gap-2">
                    <DashboardCard
                        title="Sell Target"
                        value="50000 tk"
                        description="Keep track of your sell targets of this month."
                    />
                    <DashboardCard
                        title="Target Gained"
                        value="10000 tk"
                        description="Keep track of your sell targets of this month."
                    />
                    <DashboardCard
                        title="Today's Total Sell"
                        value="5690 tk"
                        description="Todays in total sell is"
                    />
                    <DashboardCard
                        title="This Month's Total Sell"
                        value="555690 tk"
                        description="This months total sell is"
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default StaffDashboard;
