import { View, Text, ScrollView } from 'react-native'
import React, { useState } from 'react'
import Title from '../../../components/Title'
import FormField from '../../../components/FormField'
import CustomButton from '../../../components/CustomButton'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addsupplier } from '../../../utils/api'
import Layout from '../../../components/Layout'

const Create = () => {
    const [error, setError] = useState(null)
    const [isLoading, setisLoading] = useState(false)
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

    const mutation = useMutation({
        mutationFn: () => addsupplier(
            form.supplier_name,
            form.supplier_email,
            form.supplier_phone,
            form.company_name,
        ),
        onSuccess: (data) => {
            setSuccessMessage("Supplier added successfully!");
            resetForm();
            queryClient.invalidateQueries(["suppliers"]);
        },
        onError: (error) => {
            setError(error.message || "An error occurred while adding the supplier.");
        },
    });
    console.log(mutation.isLoading);

    // Email validation
    const validateEmail = (email) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

    const validateForm = () => {
        if (!form.supplier_name) return "Please provide the supplier name.";
        if (!form.supplier_email || !validateEmail(form.supplier_email)) return "Please enter a valid Supplier Email.";
        if (!form.company_name) return "Company Name is required.";
        if (!form.supplier_phone) return "Supplier Phone number is required.";
        if (isNaN(form.supplier_phone)) return "Supplier Phone must contain only numbers.";
        return null;
    };


    const submit = async () => {
        setError(null);
        setSuccessMessage(null);

        const validationError = validateForm();
        if (validationError) {
            setError(validationError);
            return;
        }

        setisLoading(true)
        await mutation.mutateAsync();
        setisLoading(false)
    };

    return (
        <Layout>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="pt-2">

                <Title text="Add Supplier" />

                {(error || successMessage) && (
                    <Text className={`py-4 text-center font-semibold ${error ? 'text-red-500' : 'text-secondary'}`}>
                        {error || successMessage}
                    </Text>
                )}

                <View className="w-full flex-1">
                    <FormField
                        styles='mt-3'
                        title='Full Name'
                        value={form.supplier_name}
                        handleChangeText={(e) => setForm({ ...form, supplier_name: e })}
                        placeholder='Enter supplier halar name'
                    />
                    <FormField
                        styles='mt-3'
                        title='Email Address'
                        value={form.supplier_email}
                        handleChangeText={(e) => setForm({ ...form, supplier_email: e })}
                        placeholder='Enter supplier halar email'
                    />
                    <FormField
                        styles='mt-3'
                        title='Phone Number'
                        value={form.supplier_phone}
                        handleChangeText={(e) => setForm({ ...form, supplier_phone: e })}
                        placeholder='Enter supplier halar phone'
                    />
                    <FormField
                        styles='mt-3'
                        title='Company Name'
                        value={form.company_name}
                        handleChangeText={(e) => setForm({ ...form, company_name: e })}
                        placeholder='Enter supplier company name'
                    />

                    <CustomButton
                        title='Add supplier'
                        handlePress={submit}
                        containerStyles="mt-4"
                        isLoading={isLoading} // Use mutation's isLoading state
                    />
                </View>
            </ScrollView>
        </Layout>
    );
};

export default Create;
