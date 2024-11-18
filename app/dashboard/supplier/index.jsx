import { View, Text, ScrollView, Pressable, ActivityIndicator, RefreshControl, Linking, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Title from '../../../components/Title';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import Layout from '../../../components/Layout';

import { useFetchCompanyNames, useFetchSuppliers } from '../../../utils/hooks';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteSupplier } from '../../../utils/api/supplierApi';

const Index = () => {
    const [refreshing, setRefreshing] = useState(false);
    const [deletingId, setDeletingId] = useState(null);

    const { data: suppliers, isLoading: isSuppliersLoading, error: suppliersError, refetch } = useFetchSuppliers();
    const { data: companyNames, isLoading: isCompanyNamesLoading, error: companyNamesError } = useFetchCompanyNames();

    // Extract company data into a list of objects with id and company_name
    const companies = companyNames?.data?.data || [];

    const queryClient = useQueryClient();

    const onRefresh = async () => {
        setRefreshing(true);
        await refetch(); // Re-fetch suppliers data
        setRefreshing(false);
    };

    const handleDelete = async (id) => {
        setDeletingId(id);
        await deleteMutation.mutateAsync(id);
    };

    // Mutation for deleting a supplier
    const deleteMutation = useMutation({
        mutationFn: (id) => deleteSupplier(id),
        onSuccess: () => {
            queryClient.invalidateQueries(["suppliers"]); // Invalidate to refresh data
            setDeletingId(null);
        },
        onError: (error) => {
            console.error("Error deleting supplier:", error.message);
            setDeletingId(null);
        },
    });

    if (isSuppliersLoading || isCompanyNamesLoading) {
        return <ActivityIndicator size="large" color="#0000ff" className="flex-1 justify-center" />;
    }

    if (suppliersError || companyNamesError) {
        return (
            <View className="flex-1 justify-center items-center">
                <Text className="text-red-500">Failed to load suppliers & Company names.</Text>
            </View>
        );
    }

    return (
        <Layout>
            <Title text="All Suppliers" />
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                refreshControl={
                    <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
                }
            >

                <View className="flex flex-row flex-wrap justify-between mt-5">
                    {suppliers?.data?.data.map((supplier) => {
                        // Find the matching company name based on supplier's medicine_company_id
                        const company = companies.find((c) => c.id === supplier.medicine_company_id);
                        return (
                            <View
                                key={supplier.id}
                                className="bg-white rounded-lg p-3 mb-2 shadow-md w-[49%]"
                            >
                                <View className='space-y-2'>
                                    <Text className="text-xs font-psemibold text-gray-800">
                                        {supplier.supplier_name}
                                    </Text>
                                    <Text className="text-sm font-pbold text-secondary">
                                        {company ? `(${company.company_name})` : ""}
                                    </Text>
                                    <Text className="text-[10px] text-gray-600">
                                        {supplier.supplier_email}
                                    </Text>
                                    <TouchableOpacity onPress={() => Linking.openURL(`tel:${supplier.supplier_phone}`)}>
                                        <Text className="text-xs text-gray-500">{supplier.supplier_phone}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        );
                    })}
                </View>

            </ScrollView>
        </Layout>
    );
};

export default Index;
