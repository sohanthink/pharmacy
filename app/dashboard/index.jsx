import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import Layout from '../../components/Layout';
import { useFetchMedicines, useFetchSuppliers } from '../../utils/hooks';

const index = () => {
    const { data: fetchMedicines } = useFetchMedicines()
    const { data: suppliers } = useFetchSuppliers()
    // console.log(suppliers?.data?.total);

    return (
        <>
            <StatusBar style="auto" className="text-darkBg" />
            <Layout title="Dashboard">
                <ScrollView>

                    <Text className="text-gray-500 text-lg mb-4">Glimpse of your system</Text>
                    <View className="flex-row flex-wrap gap-1">
                        {/* Total Supplier Card */}
                        <TouchableOpacity
                            className="bg-primary rounded-lg shadow-lg w-[48%] p-5"
                            onPress={() => router.push('dashboard/supplier')} // Navigate to Supplier page
                        >
                            <View className="flex-row justify-between items-center">
                                <View>
                                    <Text className="text-2xl font-bold text-lime-100">Total Suppliers</Text>
                                    <Text className="text-4xl font-bold text-lime-100">{suppliers?.data?.total}</Text>
                                    <Text className="text-lime-100 opacity-80">Manage your suppliers efficiently</Text>
                                </View>
                            </View>
                        </TouchableOpacity>

                        {/* Total Medicines Card */}
                        <TouchableOpacity
                            className="bg-secondary rounded-lg shadow-lg w-[48%] p-5"
                            onPress={() => router.push('/dashboard/medicine')} // Navigate to Medicines page
                        >
                            <View className="flex-row justify-between items-center">
                                <View>
                                    <Text className="text-2xl font-bold text-darkBg">Total Medicines</Text>
                                    <Text className="text-4xl font-bold text-darkBg">{fetchMedicines?.data?.total}</Text>
                                    <Text className="text-darkBg opacity-80">Keep track of your medicines</Text>
                                </View>
                            </View>
                        </TouchableOpacity>

                        {/* Total stuff Card */}
                        <TouchableOpacity
                            className="bg-secondary rounded-lg shadow-lg w-[48%] p-5"
                            onPress={() => router.push('/dashboard/stuff')} // Navigate to Medicines page
                        >
                            <View className="flex-row justify-between items-center">
                                <View>
                                    <Text className="text-2xl font-bold text-darkBg">Total Stuff</Text>
                                    <Text className="text-4xl font-bold text-darkBg">{fetchMedicines?.data?.total}</Text>
                                    <Text className="text-darkBg opacity-80">Keep track of your medicines</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </Layout>
        </>
    );
};

export default index;
