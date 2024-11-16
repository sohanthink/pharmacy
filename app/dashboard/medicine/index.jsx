import React, { useState } from 'react';
import { FlatList, ActivityIndicator, Text, View, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';
import Layout from '../../../components/Layout';
import { useFetchMedicines } from '../../../utils/hooks';

const StyledTouchableOpacity = styled(TouchableOpacity);

const Index = () => {
    const [page, setPage] = useState(1);
    const { data: fetchMedicines, isLoading, error, refetch } = useFetchMedicines(page);

    const handleLoadMore = () => {
        if (fetchMedicines?.next_page_url) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    const renderMedicine = ({ item }) => (
        <View className="bg-white rounded-xl shadow-lg mb-2 p-5">
            <Text className="text-xl font-psemibold text-gray-800 mb-2">{item.medicine_name || "Unknown Medicine"}</Text>
            <Text className="text-sm text-gray-600 mb-4">
                {item.medicine_details || "No details available."}
            </Text>
            <View className="flex-row justify-between mb-2">
                <Text className="text-sm font-pmedium text-gray-700">Supplier Price:</Text>
                <Text className="text-base font-semibold text-blue-700">TK {item.supplier_price}</Text>
            </View>
            <View className="flex-row justify-between mb-2">
                <Text className="text-sm font-medium text-gray-700">Box MRP:</Text>
                <Text className="text-base font-semibold text-green-700">TK {item.box_mrp}</Text>
            </View>
            {/* <Text
                className={`text-sm font-bold mt-2 ${item.status === "1" ? "text-green-600" : "text-red-600"
                    }`}>
                {item.status === "1" ? "✔ Active" : "✖ Inactive"}
            </Text> */}
        </View>
    );

    if (isLoading && page === 1) {
        return (
            <Layout>
                <View className="flex-1 justify-center items-center">
                    <ActivityIndicator size="large" color="#0000ff" />
                    <Text className="text-gray-500 mt-4">Loading Medicines...</Text>
                </View>
            </Layout>
        );
    }

    if (error) {
        return (
            <Layout>
                <View className="flex-1 justify-center items-center">
                    <Text className="text-red-500 text-lg">Failed to load medicines. Please try again.</Text>
                </View>
            </Layout>
        );
    }

    return (
        <Layout>
            <Text className="text-2xl font-bold text-blue-800 pb-2 text-center">Medicine Inventory</Text>
            <FlatList
                data={fetchMedicines?.data.data || []}
                renderItem={renderMedicine}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle="p-4"
                showsVerticalScrollIndicator={false}
                onRefresh={refetch}
                refreshing={isLoading}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.5}
                ListFooterComponent={() =>
                    fetchMedicines?.next_page_url && (
                        <ActivityIndicator size="small" color="#0000ff" className="my-4" />
                    )
                }
            />
        </Layout>
    );
};

export default Index;
