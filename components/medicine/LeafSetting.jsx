import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import SelectPicker from '../SelectPicker';
import FormField from '../FormField';
import CustomButton from '../CustomButton';
import { addLeafSetting } from '../../utils/api/leafApi';
import { useMutation } from '@tanstack/react-query';
import { useFetchLeafSettings } from '../../utils/hooks';

const leafData = [
    { id: 1, category_name: 'Leaf 1' },
    { id: 2, category_name: 'Leaf 2' },
    { id: 3, category_name: 'Leaf 3' },
];

const LeafSetting = () => {
    const [selectedCategory, setSelectedCategory] = useState(null); // Stores the selected category object
    const [leafSetting, setLeafSetting] = useState(''); // Stores the leaf description

    const [successMessage, setSuccessMessage] = useState(null);
    const [error, setError] = useState(null);

    const { data: leafSettings, isLoading, refetch } = useFetchLeafSettings();
    const maindata = leafSettings?.data?.data


    const handleCategoryChange = (value) => {
        setSelectedCategory(value); // Set the selected category object (includes ID and name)
    };

    const addLeaf = () => {
        if (selectedCategory && leafSetting && !isNaN(leafSetting)) {
            LeafAddMutation.mutate({ leaf_type: selectedCategory.name, total_number: leafSetting });
        } else {
            setError(
                !selectedCategory ? "Please select a category" :
                    !leafSetting ? "Please enter a number for medicine" :
                        isNaN(leafSetting) ? "The number of medicine should be a valid number" :
                            "An unknown error occurred"
            );
            setTimeout(() => setError(null), 3000); // Clear error after 3 seconds
        }
    };

    const LeafAddMutation = useMutation({
        mutationFn: ({ leaf_type, total_number }) => addLeafSetting(leaf_type, total_number),
        onMutate: () => {
            setSuccessMessage(null);
            setError(null);
        },
        onSuccess: () => {
            setSuccessMessage("Leaf setting added successfully!");
            setSelectedCategory(null);
            setLeafSetting('');
            setTimeout(() => setSuccessMessage(null), 3000);
            refetch()
        },
        onError: (error) => {
            setError(error?.response?.data?.message || "An error occurred while adding the leaf setting.");
        },
    });

    return (
        <View className="bg-whiteBg shadow-md rounded-xl p-3 mt-5">
            {successMessage && <Text className="text-green-500 text-sm text-center font-pmedium py-2">{successMessage}</Text>}
            {error && <Text className="text-red-500 py-2 text-sm text-center font-pmedium">{error}</Text>}
            <View className="pb-5">
                <SelectPicker
                    selectedValue={selectedCategory}
                    onValueChange={handleCategoryChange}
                />
                <FormField
                    title="No of medicine"
                    placeholder="Box-24 has 24 medicine"
                    textStyles="text-darkBg"
                    styles="pt-3"
                    value={leafSetting}
                    onChangeText={setLeafSetting} // Update leaf setting state
                />
                <CustomButton
                    title="Add Leaf"
                    containerStyles="mt-4 bg-[#E0E0E0]"
                    textStyles="text-base text-darkBg"
                    handlePress={addLeaf}
                    isLoading={LeafAddMutation.isPending}
                />
            </View>


            <FlatList
                data={maindata}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View className="bg-primary mt-2 rounded-md">
                        {
                            isLoading ?
                                (<ActivityIndicator size="large" color="#0000ff" />)
                                :
                                (
                                    <Text className="font-pbold text-lg p-4 text-lightBg">
                                        {item.leaf_type}: {item.total_number} medicine(s)
                                    </Text>
                                )
                        }
                    </View>
                )}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

export default LeafSetting;
