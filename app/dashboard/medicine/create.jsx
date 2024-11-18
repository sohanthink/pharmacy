import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import Layout from '../../../components/Layout';
import FormField from '../../../components/FormField';
import CustomButton from '../../../components/CustomButton';
import Title from '../../../components/Title';
import DropDownPicker from 'react-native-dropdown-picker';
import { useFetchMedicineCategories, useFetchLeafSettings, useFetchCompanyNames } from '../../../utils/hooks';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useMutation } from '@tanstack/react-query';
import { addMedicine } from '../../../utils/api/medicineApi';

const MedicineCreate = () => {
    const [form, setForm] = useState({
        category_id: '',
        leaf_setting_id: '',
        medicine_company_id: '',
        medicine_name: '',
        shelf_id: '',
        medicine_details: '',
        supplier_price: '',
        box_mrp: ''
    });

    const [categoryOpen, setCategoryOpen] = useState(false);
    const [leafSettingOpen, setLeafSettingOpen] = useState(false);
    const [companyOpen, setCompanyOpen] = useState(false);

    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    const { data: medicineCategories, isLoading: isCategoriesLoading } = useFetchMedicineCategories();
    const { data: leafSettings, isLoading: isLeafSettingsLoading } = useFetchLeafSettings();
    const { data: fetchCompanyNames, isLoading: isCompaniesLoading } = useFetchCompanyNames();

    const resetForm = () => {
        setForm({
            category_id: '',
            leaf_setting_id: '',
            medicine_company_id: '',
            medicine_name: '',
            shelf_id: '',
            medicine_details: '',
            supplier_price: '',
            box_mrp: ''
        });
    };

    const handleInputChange = (name, value) => {
        setForm((prevForm) => ({
            ...prevForm,
            [name]: value,
        }));
    };

    const validateForm = () => {
        const errors = {};
        if (!form.category_id) errors.category_id = "Category is required.";
        if (!form.leaf_setting_id) errors.leaf_setting_id = "Leaf setting is required.";
        if (!form.medicine_company_id) errors.medicine_company_id = "Company is required.";
        if (!form.medicine_name) errors.medicine_name = "Medicine name is required.";
        // if (!form.shelf_id) errors.shelf_id = "Shelf ID is required.";
        if (!form.supplier_price) errors.supplier_price = "Supplier price is required.";
        if (!form.box_mrp) errors.box_mrp = "Box MRP is required.";
        return errors;
    };

    const AddMedicineMutation = useMutation({
        mutationFn: () => addMedicine(
            form.category_id,
            form.leaf_setting_id,
            form.medicine_company_id,
            form.medicine_name,
            form.shelf_id,
            form.medicine_details,
            form.supplier_price,
            form.box_mrp
        ),
        onSuccess: () => {
            setSuccessMessage("Medicine added successfully!");
            resetForm();
            // Hide success message after 3 seconds
            setTimeout(() => setSuccessMessage(null), 3000);
        },
        onError: (error) => {
            console.log('error hoiche', error.message);
            setErrorMessage(error?.message || "An error occurred while adding the medicine.");
            // Hide error message after 3 seconds
            setTimeout(() => setErrorMessage(null), 3000);
        }
    });

    const handleSubmit = () => {
        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            Alert.alert("Please add the values", Object.values(errors).join("\n"));
            return;
        }
        AddMedicineMutation.mutate();
    };

    const sharedDropDownProps = {
        listMode: "FLATLIST",
        placeholder: "Select an option",
        scrollViewProps: { nestedScrollEnabled: true },
        flatListProps: { nestedScrollEnabled: true },
        zIndexInverse: 1000,
    };

    return (
        <Layout>
            <Title text="Add New Medicine" style="my-2 text-center" />
            <View className='p-1'>
                {/* Success and Error Messages */}
                {successMessage && (
                    <View className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                        <Text className="font-bold">{successMessage}</Text>
                    </View>
                )}

                {errorMessage && (
                    <View className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        <Text className="font-bold">{errorMessage}</Text>
                    </View>
                )}
                <KeyboardAwareScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                    extraHeight={150}
                    enableOnAndroid={true}
                    nestedScrollEnabled={true}
                    className="bg-white rounded-xl p-4 shadow-md"
                >
                    {/* Medicine Category Dropdown */}
                    <View style={{ flexShrink: 1 }} className='z-[6000]'>
                        <Text className='py-2 font-pbold'>Choose a Category</Text>
                        <DropDownPicker
                            className='bg-slate-100 border-[0.3px]'
                            {...sharedDropDownProps}
                            open={categoryOpen}
                            setOpen={setCategoryOpen}
                            value={form.category_id}
                            setValue={(callback) => {
                                const newValue = callback(form.category_id);
                                handleInputChange('category_id', newValue);
                            }}
                            items={medicineCategories?.data?.data.map(category => ({
                                label: category.category_name,
                                value: category.id,
                            })) || []}
                            loading={isCategoriesLoading}
                        />
                    </View>

                    {/* Leaf Setting Dropdown */}
                    {/* <View className='z-[2000]'>
                        <Text className='py-2 font-pbold'>Choose a Leaf Setting</Text>
                        <DropDownPicker
                            className='bg-slate-100 border-[0.3px]'
                            {...sharedDropDownProps}
                            open={leafSettingOpen}
                            setOpen={setLeafSettingOpen}
                            value={form.leaf_setting_id}
                            setValue={(callback) => {
                                const newValue = callback(form.leaf_setting_id);
                                handleInputChange('leaf_setting_id', newValue);
                            }}
                            items={leafSettings?.data?.data.map(setting => ({
                                label: setting.total_number,
                                value: setting.id,
                            })) || []}
                            loading={isLeafSettingsLoading}
                        />
                    </View> */}

                    {/* Leaf Setting Dropdown */}
                    <View>
                        <Text className='py-2 font-pbold'>Choose a Leaf</Text>
                        <DropDownPicker
                            className='bg-slate-100 border-[0.3px]'
                            {...sharedDropDownProps}
                            open={leafSettingOpen}
                            setOpen={setLeafSettingOpen}
                            value={form.leaf_setting_id}
                            setValue={(callback) => {
                                const newValue = callback(form.leaf_setting_id);
                                handleInputChange('leaf_setting_id', newValue);
                            }}
                            items={leafSettings?.data?.data.map(setting => ({
                                label: `${setting.leaf_type} has ${setting.total_number} medicines`, // Display text
                                value: setting.id, // Send id as value
                            })) || []}
                            loading={isLeafSettingsLoading}
                        />
                    </View>

                    {/* Medicine Company Dropdown */}
                    <View className='z-[1000]'>
                        <Text className='py-2 font-pbold'>Choose a Medicine Company</Text>
                        <DropDownPicker
                            className='bg-slate-100 border-[0.3px]'
                            {...sharedDropDownProps}
                            open={companyOpen}
                            setOpen={setCompanyOpen}
                            value={form.medicine_company_id}
                            setValue={(callback) => {
                                const newValue = callback(form.medicine_company_id);
                                handleInputChange('medicine_company_id', newValue);
                            }}
                            items={fetchCompanyNames?.data?.data.map(company => ({
                                label: company.company_name,
                                value: company.id,
                            })) || []}
                            loading={isCompaniesLoading}
                        />
                    </View>

                    {/* Form Fields */}
                    <FormField
                        title="Medicine Name"
                        placeholder="Enter medicine name"
                        value={form.medicine_name}
                        onChangeText={(value) => handleInputChange('medicine_name', value)}
                        styles='pt-2'
                    />
                    {/* <FormField
                        title="Shelf ID"
                        placeholder="Enter shelf ID"
                        value={form.shelf_id}
                        onChangeText={(value) => handleInputChange('shelf_id', value)}
                        styles='pt-2'
                    /> */}
                    <FormField
                        title="Medicine Details"
                        placeholder="Enter details about the medicine"
                        value={form.medicine_details}
                        onChangeText={(value) => handleInputChange('medicine_details', value)}
                        styles='pt-2'
                    />
                    <FormField
                        title="Supplier Price"
                        placeholder="Enter supplier price"
                        keyboardType="numeric"
                        value={form.supplier_price}
                        onChangeText={(value) => handleInputChange('supplier_price', value)}
                        styles='pt-2'
                    />
                    <FormField
                        title="Box MRP"
                        placeholder="Enter box MRP"
                        keyboardType="numeric"
                        value={form.box_mrp}
                        onChangeText={(value) => handleInputChange('box_mrp', value)}
                        styles='pt-2'
                    />

                    {/* Submit Button */}
                    <CustomButton
                        title="Add Medicine"
                        handlePress={handleSubmit}
                        containerStyles="bg-[#4CAF50] mt-5 mb-10"
                        textStyles="text-white"
                        isLoading={AddMedicineMutation.isPending}
                    />
                </KeyboardAwareScrollView>
            </View>
        </Layout>
    );
};

export default MedicineCreate;
