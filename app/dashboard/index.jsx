import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { AntDesign } from '@expo/vector-icons';
import Layout from '../../components/Layout';

const index = () => {
    return (
        <Layout>
            <ScrollView className="p-5">
                <StatusBar style="auto" className="text-darkBg" />

                {/* Header Section */}
                <View className="mb-4">
                    <Text className="text-3xl font-extrabold text-gray-800 mb-1">Dashboard</Text>
                    <Text className="text-gray-500 text-lg">Glimpse of your system</Text>
                </View>

                {/* Cards Container */}
                <View className="flex-row justify-between gap-1">
                    {/* Total Supplier Card */}
                    <TouchableOpacity
                        className="bg-primary rounded-lg shadow-lg w-1/2 p-5"
                        onPress={() => router.push('dashboard/supplier')} // Navigate to Supplier page
                    >
                        <View className="flex-row justify-between items-center">
                            <View>
                                <Text className="text-2xl font-bold text-lime-100">Total Suppliers</Text>
                                <Text className="text-4xl font-bold text-lime-100">10</Text>
                                <Text className="text-lime-100 opacity-80">Manage your suppliers efficiently</Text>
                            </View>
                        </View>
                    </TouchableOpacity>

                    {/* Total Medicines Card */}
                    <TouchableOpacity
                        className="bg-secondary rounded-lg shadow-lg w-1/2 p-5"
                        onPress={() => router.push('/medicines')} // Navigate to Medicines page
                    >
                        <View className="flex-row justify-between items-center">
                            <View>
                                <Text className="text-2xl font-bold text-darkBg">Total Medicines</Text>
                                <Text className="text-4xl font-bold text-darkBg">50</Text>
                                <Text className="text-darkBg opacity-80">Keep track of your medicines</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </Layout>
    );
};

export default index;
