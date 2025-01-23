import React, { useState } from 'react';
import { FlatList, ActivityIndicator, Text, View } from 'react-native';
import Layout from '../../../components/Layout';
import { useFetchCompanyNames, useFetchMedicineCategories, useFetchMedicines } from '../../../utils/hooks';

const MedicineInventory = () => {
    const [page, setPage] = useState(1); // State to track pagination

    // Custom hooks to fetch data
    const {
        data: medicines,
        isLoading: isMedicinesLoading,
        error: medicinesError,
        refetch: refetchMedicines,
    } = useFetchMedicines(page);

    const {
        data: medicineCategories,
        isLoading: isCategoriesLoading,
    } = useFetchMedicineCategories();

    const { data: companyNames } = useFetchCompanyNames();

    /**
     * Handles pagination by incrementing the current page
     * if the next page URL is available.
     */
    const handleLoadMore = () => {
        if (medicines?.next_page_url) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    /**
     * Renders a single medicine item within the FlatList.
     * Maps the medicine category and company name using their IDs.
     */
    const renderMedicine = ({ item }) => {
        const categoryName = medicineCategories?.data?.data.find(
            (category) => category.id === item.category_id
        )?.category_name;

        const companyName = companyNames?.data?.data.find(
            (company) => company.id === item.medicine_company_id
        )?.company_name;

        return (
            <View className="flex-1 space-y-[4px] bg-white rounded-xl p-4 mx-[2px]">
                <Text className="text-sm font-psemibold text-gray-800">
                    {item.medicine_name || "Unknown Medicine"}
                </Text>

                <View className="flex-row gap-x-1">
                    <Text className="text-[10px] font-pbold text-primary">
                        {categoryName || "Category: Unknown"}
                    </Text>
                    <Text className="text-[10px] font-pbold text-darkBg">
                        ({companyName || "Company: Unknown"})
                    </Text>
                </View>

                <Text className="text-[10px] text-gray-600">
                    {item.medicine_details || "No details."}
                </Text>

                <View className="flex-row gap-1 items-center">
                    <Text className="text-[11px] font-pmedium tetext-primary">Supplier:</Text>
                    <Text className="text-[11px] font-semibold tetext-primary">
                        {item.supplier_price} TK
                    </Text>
                </View>

                <View className="flex-row gap-1 items-center">
                    <Text className="text-[11px] font-medium tetext-primary">Box MRP:</Text>
                    <Text className="text-[11px] font-semibold tetext-primary">
                        {item.box_mrp} TK
                    </Text>
                </View>
            </View>
        );
    };

    // Handle loading state for initial fetch
    if (isMedicinesLoading && page === 1) {
        return (
            <Layout>
                <View className="flex-1 justify-center items-center">
                    <ActivityIndicator size="large" color="#0000ff" />
                    <Text className="text-gray-500 mt-4">Loading Medicines...</Text>
                </View>
            </Layout>
        );
    }

    // Handle error state
    if (medicinesError) {
        return (
            <Layout>
                <View className="flex-1 justify-center items-center">
                    <Text className="text-red-500 text-lg">
                        Failed to load medicines. Please try again.
                    </Text>
                </View>
            </Layout>
        );
    }

    // Main UI rendering the medicine inventory list
    return (
        <Layout title="Medicine Inventory">
            <FlatList
                data={medicines?.data?.data || []} // List of medicines
                renderItem={renderMedicine} // Render each item
                keyExtractor={(item) => item.id.toString()} // Unique key for each item
                showsVerticalScrollIndicator={false} // Hide scroll indicator
                onRefresh={refetchMedicines} // Pull-to-refresh functionality
                refreshing={isMedicinesLoading} // Loading indicator during refresh
                onEndReached={handleLoadMore} // Load more on scroll
                onEndReachedThreshold={0.5} // Threshold for loading more
                numColumns={2} // Display items in 2 columns
                columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 3 }} // Style for row
                ListFooterComponent={() =>
                    medicines?.next_page_url && (
                        <ActivityIndicator size="small" color="#0000ff" className="my-4" />
                    )
                }
                ListFooterComponentStyle={{ paddingBottom: 0 }} // Footer style
                className="pt-4"
            />
        </Layout>
    );
};

export default MedicineInventory;
