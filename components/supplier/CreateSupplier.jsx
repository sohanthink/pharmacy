import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import FormField from '../FormField';
import CustomButton from '../CustomButton';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addSupplier } from '../../utils/api/supplierApi';

const CreateSupplier = ({ companyNames, isLoading }) => {
    const [form, setForm] = useState({
        supplier_name: "",
        supplier_email: "",
        supplier_phone: "",
        medicine_company_id: "",
    });
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [open, setOpen] = useState(false);
    const [selectedCompany, setSelectedCompany] = useState(null);


    useEffect(() => {
        setForm((prevForm) => ({ ...prevForm, medicine_company_id: selectedCompany }));
    }, [selectedCompany]);

    const queryClient = useQueryClient();

    const resetForm = () => {
        setForm({
            supplier_name: "",
            supplier_email: "",
            supplier_phone: "",
            medicine_company_id: "",
        });
        setSelectedCompany(null);
    };

    const validateEmail = (email) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

    const validateForm = () => {
        if (!form.supplier_name) return "Please provide the supplier name.";
        if (!form.supplier_email || !validateEmail(form.supplier_email)) return "Please enter a valid Supplier Email.";
        if (!form.medicine_company_id) return "Company selection is required.";
        if (!form.supplier_phone) return "Supplier Phone number is required.";
        if (isNaN(form.supplier_phone)) return "Supplier Phone must contain only numbers.";
        return null;
    };

    const AddSupplierMutation = useMutation({
        mutationFn: () => addSupplier(
            form.supplier_name,
            form.supplier_email,
            form.supplier_phone,
            form.medicine_company_id,
        ),
        onSuccess: () => {
            setSuccessMessage("Supplier added successfully!");
            resetForm();
            queryClient.invalidateQueries(["suppliers"]);
        },
        onError: (error) => {
            setError(error?.message || "An error occurred while adding the supplier.");
        },
    });

    const submit = async () => {
        setError(null);
        setSuccessMessage(null);
        const validationError = validateForm();
        if (validationError) {
            setError(validationError);
            return;
        }
        console.log(form);

        await AddSupplierMutation.mutateAsync();
    };

    const DropdownCompanyNames = companyNames?.map(item => ({
        label: item.company_name,
        value: item.id,
    })) || [];

    return (
        <View className="w-full flex-1 bg-white p-5">
            <Text className="text-lg font-bold mb-4">Add Supplier</Text>

            {error && <Text className="text-red-500 mb-2">{error}</Text>}
            {successMessage && <Text className="text-green-500 mb-2">{successMessage}</Text>}

            <FormField
                title="Full Name"
                value={form.supplier_name}
                handleChangeText={(value) => setForm({ ...form, supplier_name: value })}
                placeholder="Enter supplier name"
            />
            <FormField
                title="Email Address"
                value={form.supplier_email}
                handleChangeText={(value) => setForm({ ...form, supplier_email: value })}
                placeholder="Enter supplier email"
                styles="mt-3"
            />
            <FormField
                title="Phone Number"
                value={form.supplier_phone}
                handleChangeText={(value) => setForm({ ...form, supplier_phone: value })}
                placeholder="Enter supplier phone"
                styles="mt-3"
            />

            <View className="mt-4">
                <Text className="font-semibold mb-2">Select a Company</Text>
                <DropDownPicker
                    open={open}
                    value={selectedCompany}
                    items={DropdownCompanyNames}
                    setOpen={setOpen}
                    setValue={setSelectedCompany} // Directly setting the selected company
                    placeholder="Select a company"
                    containerStyle={{ marginBottom: 15 }}
                    style={{ backgroundColor: '#fafafa' }}
                    dropDownStyle={{ backgroundColor: '#fafafa' }}
                    listMode="SCROLLVIEW"
                    disabled={isLoading}
                />
            </View>

            <CustomButton
                title="Add Supplier"
                handlePress={submit}
                containerStyles="mt-4"
                isLoading={AddSupplierMutation.isPending || isLoading}
            />
        </View>
    );
};

export default CreateSupplier;
