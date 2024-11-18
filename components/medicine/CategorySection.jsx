import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import FormField from '../FormField';
import CustomButton from '../CustomButton';
import { addCategory } from '../../utils/api/categoryApi';
import { useMutation } from '@tanstack/react-query';

import { useFetchMedicineCategories } from '../../utils/hooks';

const CategorySection = () => {
    const [form, setForm] = useState({ category_name: '' });
    const [successMessage, setSuccessMessage] = useState(null);
    const [error, setError] = useState(null);
    const [isDisabled, setIsDisabled] = useState(true);

    const { data: medicineCategories, isLoading, refetch } = useFetchMedicineCategories();

    // console.log('medicine category:', medicineCategories);

    useEffect(() => {
        setIsDisabled(!form.category_name);
    }, [form.category_name]);

    const categoryAddMutation = useMutation({
        mutationFn: () => addCategory(form.category_name),
        onMutate: () => {
            setSuccessMessage(null);
            setError(null);
        },
        onSuccess: () => {
            setSuccessMessage("Category added successfully!");
            setForm({ category_name: '' });
            setTimeout(() => setSuccessMessage(null), 3000);
            refetch();
        },
        onError: (error) => {
            setError(error?.response?.data?.message || "An error occurred while adding the category.");
        },
    });

    const addCategories = () => {
        categoryAddMutation.mutate();
    };

    return (
        <View className="bg-white rounded-xl p-3 shadow-md">
            {successMessage && <Text style={{ color: 'green' }}>{successMessage}</Text>}
            {error && <Text style={{ color: 'red' }}>{error}</Text>}
            <View className="py-5">
                <FormField
                    title="Add categories"
                    placeholder="Eg: Box-24, leaf-10, capsule-10"
                    textStyles="text-darkBg"
                    value={form.category_name}
                    handleChangeText={(e) => setForm({ ...form, category_name: e })}
                />
                <CustomButton
                    handlePress={addCategories}
                    title={categoryAddMutation.isLoading ? 'Adding...' : 'Add'}
                    containerStyles="bg-[#E0E0E0] mt-3"
                    textStyles="text-base text-darkBg"
                    isLoading={categoryAddMutation.isLoading || isDisabled}
                />
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {isLoading ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                ) : (
                    medicineCategories?.data?.data.map((item) => (
                        <View key={item.id} className="bg-secondary mr-2 rounded-3xl flex-row mx-1 justify-center items-center p-3">
                            <Text className="font-pbold text-md text-lightBg">
                                {item.category_name}
                            </Text>
                        </View>
                    ))
                )}
            </ScrollView>
        </View>
    );
};

export default CategorySection;
