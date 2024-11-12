import { View, Text, ScrollView } from 'react-native';
import React, { useState } from 'react';
import Title from '../../../components/Title';
import FormField from '../../../components/FormField';
import CustomButton from '../../../components/CustomButton';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addSupplier } from '../../../utils/api/supplierApi';

import Layout from '../../../components/Layout';
import MedicineCompany from '../../../components/supplier/MedicineCompany';


const Create = () => {
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [form, setForm] = useState({
        supplier_name: "",
        supplier_email: "",
        supplier_phone: "",
        company_name: "",
    });

    const queryClient = useQueryClient();

    // Reset form fields
    const resetForm = () => setForm({
        supplier_name: "",
        supplier_email: "",
        supplier_phone: "",
        company_name: "",
    });

    // Mutation for adding a supplier
    const mutation = useMutation({
        mutationFn: () => addsupplier(
            form.supplier_name,
            form.supplier_email,
            form.supplier_phone,
            form.company_name,
        ),
        onSuccess: () => {
            setSuccessMessage("Supplier added successfully!");
            resetForm();
            queryClient.invalidateQueries(["suppliers"]);
        },
        onError: (error) => {
            setError(error.message || "An error occurred while adding the supplier.");
        },
    });

    // Email validation function
    const validateEmail = (email) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

    // Form validation function
    const validateForm = () => {
        if (!form.supplier_name) return "Please provide the supplier name.";
        if (!form.supplier_email || !validateEmail(form.supplier_email)) return "Please enter a valid Supplier Email.";
        if (!form.company_name) return "Company Name is required.";
        if (!form.supplier_phone) return "Supplier Phone number is required.";
        if (isNaN(form.supplier_phone)) return "Supplier Phone must contain only numbers.";
        return null;
    };

    // Form submission handler
    const submit = async () => {
        setError(null);
        setSuccessMessage(null);

        const validationError = validateForm();
        if (validationError) {
            setError(validationError);
            return;
        }
        await mutation.mutateAsync();
    };



    return (
        <Layout>
            <ScrollView contentContainerStyle={{ flexGrow: 0 }} className="pt-2">
                <Title text="Add Company & Supplier" style="text-center text-2xl" />

                {/* Display error or success message */}
                {(error || successMessage) && (
                    <Text className={`py-4 text-center font-semibold ${error ? 'text-red-500' : 'text-secondary'}`}>
                        {error || successMessage}
                    </Text>
                )}

                {/* Add Medicine Company */}
                <MedicineCompany />

                {/* Add supplier  */}
                <View className="w-full flex-1 bg-whiteBg p-5">
                    {/* Form fields */}
                    <FormField
                        title="Full Name"
                        value={form.supplier_name}
                        handleChangeText={(e) => setForm({ ...form, supplier_name: e })}
                        placeholder="Enter supplier name"
                    />
                    <FormField
                        styles="mt-3"
                        title="Email Address"
                        value={form.supplier_email}
                        handleChangeText={(e) => setForm({ ...form, supplier_email: e })}
                        placeholder="Enter supplier email"
                    />
                    <FormField
                        styles="mt-3"
                        title="Phone Number"
                        value={form.supplier_phone}
                        handleChangeText={(e) => setForm({ ...form, supplier_phone: e })}
                        placeholder="Enter supplier phone"
                    />
                    <FormField
                        styles="mt-3"
                        title="Company Name"
                        value={form.company_name}
                        handleChangeText={(e) => setForm({ ...form, company_name: e })}
                        placeholder="Enter company name"
                    />

                    {/* Submit button */}
                    <CustomButton
                        title="Add Supplier"
                        handlePress={submit}
                        containerStyles="mt-4"
                        isLoading={mutation.isPending} // Use mutation's isLoading state
                    />
                </View>
            </ScrollView>
        </Layout>
    );
};

export default Create;
