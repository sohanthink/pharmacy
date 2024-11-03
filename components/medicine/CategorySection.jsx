import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import FormField from '../FormField';
import CustomButton from '../CustomButton';
import { addcategories } from '../../utils/api';
import { useMutation } from '@tanstack/react-query';
import { useFetchMedicineCategories } from '../../utils/hooks';

const CategorySection = () => {
    const [form, setForm] = useState({ category_name: '' });
    const [successMessage, setSuccessMessage] = useState(null);
    const [error, setError] = useState(null);
    const [isDisabled, setIsDisabled] = useState(true);

    const { data: medicineCategories, isLoading, refetch } = useFetchMedicineCategories();

    useEffect(() => {
        setIsDisabled(!form.category_name);
    }, [form.category_name]);

    const categoryAddMutation = useMutation({
        mutationFn: () => addcategories(form.category_name),
        onMutate: () => {
            setSuccessMessage(null);
            setError(null);
        },
        onSuccess: (data) => {
            setSuccessMessage("Category added successfully!");
            setForm({ category_name: '' });
            setTimeout(() => setSuccessMessage(null), 3000);
            refetch();
        },
        onError: (error) => {
            setError(error?.message?.data || "An error occurred while adding the category.");
        },
    });

    const addCategories = () => {
        categoryAddMutation.mutate();
    };


    return (
        <View className="bg-whiteBg rounded-xl p-3 shadow-md">
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
                    title={categoryAddMutation.isPending ? 'Adding...' : 'Add'}
                    containerStyles="bg-[#E0E0E0] mt-3"
                    textStyles="text-base text-darkBg"
                    isLoading={categoryAddMutation.isPending || isDisabled}
                />
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {
                    isLoading ? <ActivityIndicator size="large" color="#0000ff" /> :
                        medicineCategories?.data?.data.map((item) => (
                            <View key={item.id} className="bg-secondary mr-2 rounded-3xl">
                                <Text className="font-pbold text-md p-3 text-lightBg">{item.category_name}</Text>
                            </View>
                        ))
                }
            </ScrollView>
        </View>
    );
};

export default CategorySection;
