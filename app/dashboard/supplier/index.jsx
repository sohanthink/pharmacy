import { View, Text, ScrollView, Pressable, ActivityIndicator } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Title from '../../../components/Title';
import CustomHeader from '../../../components/CustomHeader';
import { MaterialIcons } from '@expo/vector-icons';
import { useFetchSuppliers } from '../../../utils/hooks';

const index = () => {
    const handleUpdate = (id) => {
        console.log("Update supplier", id);
    };

    const handleDelete = (id) => {
        console.log("Delete supplier", id);
    };

    const { data: suppliers, isLoading, error } = useFetchSuppliers();

    if (isLoading) {
        return <ActivityIndicator size="large" color="#0000ff" className="flex-1 justify-center" />;
    }
    if (error) {
        return (
            <View className="flex-1 justify-center items-center">
                <Text className="text-red-500">Failed to load suppliers.</Text>
            </View>
        );
    }

    return (
        <SafeAreaView className="bg-lightBg h-full w-full">
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="p-5">
                <CustomHeader />
                <Title text="All Suppliers" />
                <View className="mt-5">
                    {suppliers?.data?.data.map((supplier) => (
                        <View key={supplier.id} className="bg-white rounded-lg p-4 mb-4 shadow-md flex-row justify-between items-center">
                            <View className="flex-1">
                                <View className="flex-row items-center gap-3">
                                    <Text className="text-lg font-bold text-gray-800">
                                        {supplier.supplier_name}
                                    </Text>
                                    <Text className="text-sm text-gray-600">
                                        ({supplier.company_name})
                                    </Text>
                                </View>
                                <View className="mt-1">
                                    <Text className="text-xs text-gray-600">
                                        {supplier.supplier_email}
                                    </Text>
                                    <Text className="text-xs text-gray-500">
                                        {supplier.supplier_phone}
                                    </Text>
                                </View>
                            </View>
                            <View className="flex-row space-x-2">
                                <Pressable
                                    onPress={() => handleUpdate(supplier.id)}
                                    className="p-2 rounded-full bg-green-100 shadow"
                                >
                                    <MaterialIcons name="edit" size={18} color="#4CAF50" />
                                </Pressable>
                                <Pressable
                                    onPress={() => handleDelete(supplier.id)}
                                    className="p-2 rounded-full bg-red-100 shadow"
                                >
                                    <MaterialIcons name="delete" size={18} color="#F44336" />
                                </Pressable>
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default index;
