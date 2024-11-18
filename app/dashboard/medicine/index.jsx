import React, { useState } from 'react';
import { FlatList, ActivityIndicator, Text, View } from 'react-native';
import Layout from '../../../components/Layout';
import { useFetchCompanyNames, useFetchMedicineCategories, useFetchMedicines } from '../../../utils/hooks';
import Title from '../../../components/Title';

const Index = () => {
    const [page, setPage] = useState(1);
    const { data: fetchMedicines, isLoading: isMedicineLoading, error, refetch: refetchMedicines } = useFetchMedicines(page);
    const { data: medicineCategories, isLoading: isMedicineCategoryLoading, refetch: refetchMedicineCategory } = useFetchMedicineCategories();
    const { data: fetchCompanyNames } = useFetchCompanyNames()

    console.log("main log", fetchMedicines?.data?.data);
    console.log("company names", fetchCompanyNames?.data?.data);




    const handleLoadMore = () => {
        if (fetchMedicines?.next_page_url) {
            setPage((prevPage) => prevPage + 1);
        }
    };


    const renderMedicine = ({ item }) => {

        // Find the matching category
        const categoryName = medicineCategories?.data?.data.find(
            (category) => category.id === item.category_id
        )?.category_name;

        //find the matching company names
        const companyNames = fetchCompanyNames?.data?.data.find((companyName) => item.medicine_company_id === companyName.id)?.company_name;

        return (
            <View className="flex-1 bg-white rounded-xl shadow-lg mb-2 p-5 mx-2 space-y-2">
                <Text className="text-sm font-psemibold text-gray-800">{item.medicine_name || "Unknown Medicine"}</Text>
                {/* Display category name */}
                <Text className="text-sm font-pbold text-tertiary">
                    {categoryName ? `${categoryName}` : "Category: Unknown"}
                </Text>
                <Text className="text-sm font-pbold text-tertiary">
                    {companyNames ? `${companyNames}` : "Company: Unknown"}
                </Text>
                <Text className="text-[10px] text-gray-600">
                    {item.medicine_details || "No details."}
                </Text>
                <View className="flex-row justify-between items-center">
                    <Text className="text-xs font-pmedium text-secondary">Supplier:</Text>
                    <Text className="text-xs font-semibold text-secondary">{item.supplier_price}TK</Text>
                </View>
                <View className="flex-row justify-between items-center">
                    <Text className="text-xs font-medium text-secondary">Box MRP:</Text>
                    <Text className="text-xs font-semibold text-secondary">{item.box_mrp}TK</Text>
                </View>
            </View>
        );
    };


    if (isMedicineLoading && page === 1) {
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
            <Title text="Medicine Inventory" style="text-center text-2xl mb-3" />
            <FlatList
                data={fetchMedicines?.data.data || []}
                renderItem={renderMedicine}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
                onRefresh={refetchMedicines}
                refreshing={isMedicineLoading}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.5}
                numColumns={2} // Ensure 2 columns
                columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 10 }} // Adjust row spacing
                ListFooterComponent={() =>
                    fetchMedicines?.next_page_url && (
                        <ActivityIndicator size="small" color="#0000ff" className="my-4" />
                    )
                }
                ListFooterComponentStyle={{ paddingBottom: 0 }}
            />
        </Layout>
    );
};

export default Index;
