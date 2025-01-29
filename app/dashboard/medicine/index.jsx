import React, { useState, useEffect } from "react";
import { FlatList, ActivityIndicator, Text, View } from "react-native";
import Layout from "../../../components/Layout";
import { useFetchCompanyNames, useFetchMedicineCategories, useFetchMedicines } from "../../../utils/hooks";
import api from "../../../utils/api/axiosInstance";

const MedicineInventory = () => {
    const [allMedicines, setAllMedicines] = useState([]); // Cumulative medicines
    const [page, setPage] = useState(1); // Tracks the current page
    const [isLoadingMore, setIsLoadingMore] = useState(false); // Loading state for pagination
    const [hasMoreData, setHasMoreData] = useState(true); // Track if more data is available

    const { data: medicines, isLoading: isMedicinesLoading, error: medicinesError, refetch: refetchMedicines } =
        useFetchMedicines(page);

    const { data: medicineCategories } = useFetchMedicineCategories();
    const { data: companyNames } = useFetchCompanyNames();

    // Append new medicines when the page changes or new data is fetched
    useEffect(() => {
        if (medicines?.data?.data) {
            setAllMedicines((prev) => {
                // Reset if page is 1, otherwise append
                if (page === 1) {
                    return medicines.data.data; // Replace with new data
                } else {
                    const newMedicines = medicines.data.data.filter(
                        (newMedicine) => !prev.some((medicine) => medicine.id === newMedicine.id)
                    );
                    return [...prev, ...newMedicines]; // Append new data
                }
            });
            setIsLoadingMore(false); // Reset loading state
        }
    }, [medicines, page]); // Trigger when medicines or page changes

    const updateMedicinesList = (newMedicines) => {
        setAllMedicines((prev) => {
            const filteredNewMedicines = newMedicines.filter(
                (newMedicine) => !prev.some((medicine) => medicine.id === newMedicine.id)
            );
            return [...prev, ...filteredNewMedicines];
        });
    };

    const handleLoadMore = async () => {
        if (isLoadingMore || !hasMoreData || isMedicinesLoading) return; // Prevent unnecessary API calls
        setIsLoadingMore(true);

        const nextPage = page + 1;
        setPage(nextPage);
        try {
            const response = await api.get(`/user/medicine?page=${nextPage}`);
            if (response?.data?.data?.data) {
                updateMedicinesList(response.data.data.data);
            } else {
                setHasMoreData(false); // No more data available
            }
        } catch (error) {
            console.error("Failed to fetch next page:", error);
        } finally {
            setIsLoadingMore(false);
        }
    };

    const renderMedicine = ({ item }) => {
        const categoryName = medicineCategories?.data?.data.find(
            (category) => category.id === item.category_id
        )?.category_name;

        const companyName = companyNames?.data?.data.find(
            (company) => company.id === item.medicine_company_id
        )?.company_name;

        return (
            <View className="flex-1 space-y-[4px] bg-white rounded-xl p-4 mx-[2px]">
                <Text className="text-sm font-semibold text-gray-800">
                    {item.medicine_name || "Unknown Medicine"}
                </Text>

                <View className="flex-row gap-x-1">
                    <Text className="text-[10px] font-semibold text-darkBg">
                        {categoryName || "Category: Unknown"}
                    </Text>
                    <Text className="text-[10px] font-semibold text-darkBg">
                        ({companyName || "Company: Unknown"})
                    </Text>
                </View>

                <Text className="text-[10px] text-gray-600">
                    {item.medicine_details || "No details available."}
                </Text>

                <View className="flex-row gap-1 items-center">
                    <Text className="text-[11px] font-medium text-darkBg">Supplier:</Text>
                    <Text className="text-[11px] font-bold text-darkBg">{item.supplier_price} TK</Text>
                </View>

                <View className="flex-row gap-1 items-center">
                    <Text className="text-[11px] font-medium text-darkBg">Box MRP:</Text>
                    <Text className="text-[11px] font-bold text-darkBg">{item.box_mrp} TK</Text>
                </View>
            </View>
        );
    };

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

    return (
        <Layout title="Medicine Inventory">
            <FlatList
                data={allMedicines}
                renderItem={renderMedicine}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={true}
                onRefresh={() => {
                    setPage(1);
                    setAllMedicines([]);
                    refetchMedicines();
                }}
                refreshing={isMedicinesLoading && page === 1}
                onEndReached={handleLoadMore}
                // onEndReachedThreshold={0.1}
                numColumns={2}
                columnWrapperStyle={{ justifyContent: "space-between", marginBottom: 3 }}
                ListFooterComponent={() =>
                    isLoadingMore && <ActivityIndicator size="small" color="#0000ff" />
                }
            />
        </Layout>
    );
};

export default MedicineInventory;
