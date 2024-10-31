import { View, Text, ScrollView, Pressable, ActivityIndicator, RefreshControl } from 'react-native';
import React, { useState } from 'react';
import Title from '../../../components/Title';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { useFetchSuppliers } from '../../../utils/hooks';
import Layout from '../../../components/Layout';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteSupplier } from '../../../utils/api';

const Index = () => {
    const [refreshing, setRefreshing] = useState(false);
    const [deletingId, setDeletingId] = useState(null)
    const { data: suppliers, isLoading, error, refetch } = useFetchSuppliers();

    const queryClient = useQueryClient();
    const onRefresh = async () => {
        setRefreshing(true);
        await refetch(); // Re-fetch the suppliers data
        setRefreshing(false);
    };

    const handleUpdate = (id) => {
        console.log("Update supplier", id);
    };

    const handleDelete = async (id) => {
        setDeletingId(id);
        await deleteMutation.mutateAsync(id);
    };




    // Mutation for deleting a supplier
    const deleteMutation = useMutation({
        mutationFn: (id) => deleteSupplier(id),
        onSuccess: () => {
            // Invalidate the suppliers query to refresh data
            queryClient.invalidateQueries(["suppliers"]);
            setDeletingId(null)
        },
        onError: (error) => {
            console.error("Error deleting supplier:", error.message);
            setDeletingId(null);
        },
    });




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
        <Layout>
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                className="px-5"
                refreshControl={
                    <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
                }
            >
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
                                <View className="">
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
                                    {
                                        deletingId === supplier.id
                                            ?
                                            <Feather name="loader" size={24} color="black" />
                                            :
                                            <MaterialIcons name="delete" size={18} color="#F44336" />
                                    }
                                </Pressable>
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </Layout>
    );
};

export default Index;
