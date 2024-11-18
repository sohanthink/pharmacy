import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import FormField from '../FormField';
import CustomButton from '../CustomButton';
import { addLeafSetting } from '../../utils/api/leafApi';
import { useMutation } from '@tanstack/react-query';
import { useFetchLeafSettings } from '../../utils/hooks';

const LeafSetting = () => {
    const [leafType, setLeafType] = useState(''); // Stores the leaf type
    const [leafSetting, setLeafSetting] = useState(''); // Stores the number of medicines
    const [successMessage, setSuccessMessage] = useState(null);
    const [error, setError] = useState(null);

    const { data: leafSettings, isLoading, refetch } = useFetchLeafSettings();
    const maindata = leafSettings?.data?.data;

    const addLeaf = () => {
        if (leafType && leafSetting && !isNaN(leafSetting)) {
            LeafAddMutation.mutate({ leaf_type: leafType, total_number: leafSetting });
        } else {
            setError(
                !leafType
                    ? "Please enter a leaf type"
                    : !leafSetting
                        ? "Please enter a number for medicine"
                        : isNaN(leafSetting)
                            ? "The number of medicine should be a valid number"
                            : "An unknown error occurred"
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
            setLeafType('');
            setLeafSetting('');
            setTimeout(() => setSuccessMessage(null), 3000);
            refetch();
        },
        onError: (error) => {
            setError(error?.response?.data?.message || "An error occurred while adding the leaf setting.");
        },
    });

    return (
        <View className="bg-white shadow-md rounded-xl p-3 mt-5">
            {/* Display success or error messages */}
            {successMessage && (
                <Text className="text-green-500 text-sm text-center font-pmedium py-2">
                    {successMessage}
                </Text>
            )}
            {error && (
                <Text className="text-red-500 py-2 text-sm text-center font-pmedium">
                    {error}
                </Text>
            )}

            <View className="pb-5">
                {/* Leaf Type FormField */}
                <FormField
                    title="Leaf Type"
                    placeholder="E.g., Box-24"
                    textStyles="text-darkBg"
                    styles="pt-3"
                    value={leafType}
                    onChangeText={setLeafType} // Update leaf type state
                />

                {/* Number of Medicines FormField */}
                <FormField
                    title="Number of Medicines"
                    placeholder="E.g., 24"
                    textStyles="text-darkBg"
                    styles="pt-3"
                    value={leafSetting}
                    onChangeText={setLeafSetting} // Update leaf setting state
                />

                {/* Add Leaf Button */}
                <CustomButton
                    title="Add Leaf"
                    containerStyles="mt-4 bg-[#E0E0E0]"
                    textStyles="text-base text-darkBg"
                    handlePress={addLeaf}
                    isLoading={LeafAddMutation.isPending}
                />
            </View>

            {/* Display the list of leaf settings */}
            <FlatList
                data={maindata}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View className="bg-primary mt-2 rounded-md">
                        {isLoading ? (
                            <ActivityIndicator size="large" color="#0000ff" />
                        ) : (
                            <Text className="font-pbold text-lg p-4 text-lightBg">
                                {item.leaf_type} : {item.total_number} medicines
                            </Text>
                        )}
                    </View>
                )}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

export default LeafSetting;
