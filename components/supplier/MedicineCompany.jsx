import { View, Text, ScrollView } from 'react-native';
import React, { useState } from 'react';
import FormField from '../FormField';
import CustomButton from '../CustomButton';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addMedicineCompany } from '../../utils/api/companyNameApi';

const MedicineCompany = ({ companyNames, isLoading }) => {
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [form, setForm] = useState({ company_name: '' });

    const queryClient = useQueryClient();


    // Mutation for adding a new company
    const companyNameAddMutation = useMutation({
        mutationFn: () => addMedicineCompany(form.company_name),
        onSuccess: () => {
            setError(null);
            setSuccessMessage('Company Name Added Successfully');
            setForm({ company_name: '' });

            // Refetch the company names after successful addition
            queryClient.invalidateQueries('fetchCompanyNames');
        },
        onError: (error) => {
            setError(error.message || "An error occurred while adding the medicine company name.");
        },
    });

    // Function to handle adding a new company
    const addCompany = async () => {
        if (form.company_name.trim()) {
            await companyNameAddMutation.mutateAsync();
        } else {
            setError("Please enter a valid company name.");
        }
    };

    return (
        <View className="bg-white p-5 mb-5">
            {/* Display error or success message */}
            {(error || successMessage) && (
                <Text className={`py-4 text-center font-semibold ${error ? 'text-red-500' : 'text-secondary'}`}>
                    {error || successMessage}
                </Text>
            )}
            <FormField
                title="Medicine company name"
                value={form.company_name}
                handleChangeText={(e) => setForm({ ...form, company_name: e })}
                placeholder="Enter company name"
            />
            <CustomButton
                title="Add Company"
                handlePress={addCompany}
                containerStyles="mt-2"
                isLoading={companyNameAddMutation.isPending}
            />

            {/* Display loading state if data is being fetched */}
            {isLoading ? (
                <Text>Loading companies...</Text>
            ) : (
                <ScrollView horizontal>
                    <View className="flex-row gap-3 py-3">
                        {companyNames.length > 0 ? (
                            companyNames.map((item) => (
                                <Text key={item.id} className="font-pbold p-3 bg-slate-500 text-white rounded-md">
                                    {item.company_name}
                                </Text>
                            ))
                        ) : (
                            <Text className="font-pbold p-3 bg-gray-400 text-white rounded-md">
                                No companies found.
                            </Text>
                        )}
                    </View>
                </ScrollView>
            )}
        </View>
    );
};

export default MedicineCompany;
