import React, { useState } from 'react';
import { View, Text } from 'react-native';
import Layout from '../../../components/Layout';
import FormField from '../../../components/FormField';
import CustomButton from '../../../components/CustomButton';
import Title from '../../../components/Title';
import DropDownPicker from 'react-native-dropdown-picker';

import { useFetchMedicineCategories, useFetchLeafSettings, useFetchCompanyNames } from '../../../utils/hooks';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

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
    console.log(form);

    const [categoryOpen, setCategoryOpen] = useState(false);
    const [leafSettingOpen, setLeafSettingOpen] = useState(false);
    const [companyOpen, setCompanyOpen] = useState(false);

    const { data: medicineCategories, isLoading: isCategoriesLoading } = useFetchMedicineCategories();
    const { data: leafSettings, isLoading: isLeafSettingsLoading } = useFetchLeafSettings();
    const { data: fetchCompanyNames, isLoading: isCompaniesLoading } = useFetchCompanyNames();

    const handleInputChange = (name, value) => {
        setForm((prevForm) => ({
            ...prevForm,
            [name]: value,
        }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!form.category_id) newErrors.category_id = "Category is required.";
        if (!form.leaf_setting_id) newErrors.leaf_setting_id = "Leaf setting is required.";
        if (!form.medicine_company_id) newErrors.medicine_company_id = "Company is required.";
        if (!form.medicine_name) newErrors.medicine_name = "Medicine name is required.";
        if (!form.shelf_id) newErrors.shelf_id = "Shelf ID is required.";
        if (!form.supplier_price) newErrors.supplier_price = "Supplier price is required.";
        if (!form.box_mrp) newErrors.box_mrp = "Box MRP is required.";
        return newErrors;
    };

    const handleSubmit = () => {

        console.log("Submitting Form Data:", form);
        // Add logic here to send the form data to your API
    };

    return (
        <Layout>
            <Title text="Add New Medicine" style="my-2 text-center" />
            <View className='p-1'>
                <KeyboardAwareScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                    extraHeight={150} // Ensures enough space when the keyboard is open
                    enableOnAndroid={true} // Helps manage Android keyboard behavior
                    nestedScrollEnabled={true}
                    className="bg-white rounded-xl p-4 shadow-md"
                >

                    {/* Medicine Category Dropdown */}
                    <View style={{ flexShrink: 1 }} className='z-[3000]'>
                        <Text className='py-2 font-pbold'>Choose a category</Text>
                        <DropDownPicker
                            open={categoryOpen}
                            setOpen={setCategoryOpen}
                            value={form.category_id}
                            setValue={(callback) => {
                                const newValue = callback(form.category_id);
                                setForm((prev) => ({ ...prev, category_id: newValue }));
                            }}
                            items={medicineCategories?.data?.data.map(category => ({
                                label: category.category_name,
                                value: category.id,
                            })) || []}
                            placeholder="Select Category"
                            loading={isCategoriesLoading}
                            listMode="FLATLIST"
                            flatListProps={{
                                keyExtractor: (item) => item.value.toString(),
                                nestedScrollEnabled: true,
                            }}
                            scrollViewProps={{ nestedScrollEnabled: true }}
                            zIndex={3000} zIndexInverse={1000}
                        />
                    </View>

                    {/* Leaf Setting Dropdown */}
                    <View className='z-[2000]'>
                        <Text className='py-2 font-pbold'>Choose a Leaf</Text>
                        <DropDownPicker
                            open={leafSettingOpen}
                            setOpen={setLeafSettingOpen}
                            items={leafSettings?.data?.data.map(setting => ({
                                label: setting.total_number,
                                value: setting.id,
                            })) || []}
                            value={form.leaf_setting_id}
                            setValue={(callback) => {
                                const newValue = callback(form.leaf_setting_id);
                                setForm((prev) => ({ ...prev, leaf_setting_id: newValue }));
                            }}
                            // setValue={(value) => handleInputChange('leaf_setting_id', value)}
                            placeholder="Select Leaf Setting"
                            loading={isLeafSettingsLoading}
                            flatListProps={{
                                nestedScrollEnabled: true,
                            }}
                            scrollViewProps={{ nestedScrollEnabled: true }}
                            zIndex={2000} zIndexInverse={2000}
                        />
                    </View>

                    {/* Medicine Company Dropdown */}
                    <View className='z-[1000]'>
                        <Text className='py-2 font-pbold'>Choose a Medicine company</Text>
                        <DropDownPicker
                            open={companyOpen}
                            setOpen={setCompanyOpen}
                            items={fetchCompanyNames?.data?.data.map(company => ({
                                label: company.company_name,
                                value: company.id,
                            })) || []}
                            value={form.medicine_company_id}
                            setValue={(callback) => {
                                const newValue = callback(form.medicine_company_id);
                                setForm((prev) => ({ ...prev, medicine_company_id: newValue }));
                            }}
                            // setValue={(value) => handleInputChange('medicine_company_id', value)}
                            placeholder="Select Medicine Company"
                            loading={isCompaniesLoading}
                            flatListProps={{
                                nestedScrollEnabled: true,
                            }}
                            scrollViewProps={{ nestedScrollEnabled: true }}
                            zIndex={1000} zIndexInverse={3000}
                        />
                    </View>

                    {/* Text Fields */}
                    <FormField
                        title="Medicine Name"
                        placeholder="Enter medicine name"
                        value={form.medicine_name}
                        onChangeText={(value) => handleInputChange('medicine_name', value)}
                        styles='pt-2'
                    />
                    <FormField
                        title="Shelf ID"
                        placeholder="Enter shelf ID"
                        value={form.shelf_id}
                        onChangeText={(value) => handleInputChange('shelf_id', value)}
                        styles='pt-2'
                    />
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
                        containerStyles="bg-[#4CAF50] mt-5 mb-20"
                        textStyles="text-white"
                    />
                </KeyboardAwareScrollView>
            </View >

        </Layout >
    );
};

export default MedicineCreate;
