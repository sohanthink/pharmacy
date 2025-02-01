import { View, Text, ScrollView, Alert } from 'react-native'
import React, { useState } from 'react'
import Layout from '../../../components/Layout'
import FormField from '../../../components/FormField'
import CustomButton from '../../../components/CustomButton'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { addStuff } from '../../../utils/api/stuffApi'
import { useMutation } from '@tanstack/react-query'

const Create = () => {
    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        password_confirmation: ''
    });
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    const handleInputChange = (name, value) => {
        setForm((prevForm) => ({
            ...prevForm,
            [name]: value,
        }));
    };

    const validateForm = () => {
        const errors = {};
        if (!form.name) errors.name = "Name is required.";
        if (!form.email) errors.email = "Email is required.";
        if (!form.phone) errors.phone = "Phone is required.";
        if (!form.password) errors.password = "Password is required.";
        if (form.password !== form.password_confirmation) errors.password_confirmation = "Passwords do not match.";
        return errors;
    };

    const handleSubmit = () => {
        const errors = validateForm();

        if (Object.keys(errors).length > 0) {
            Alert.alert("Please add the values", Object.values(errors).join("\n"));
            return;
        }
        addStuffMutation.mutate();
    }

    const resetForm = () => {
        setForm({
            name: '',
            email: '',
            phone: '',
            password: '',
            password_confirmation: ''
        });
    }

    const addStuffMutation = useMutation({
        mutationFn: () => addStuff(
            form.name,
            form.email,
            form.phone,
            form.password,
            form.password_confirmation
        ),
        onSuccess: () => {
            resetForm();
            setSuccessMessage("Stuff added successfully!");
            setTimeout(() => setSuccessMessage(null), 3000);
        },
        onError: (error) => {
            console.log('error Adding User/stuff', error);
            const errorMessage = error.response?.data?.message || error.message || "An error occurred while adding the stuff/user.";
            setErrorMessage(errorMessage);
            setTimeout(() => setErrorMessage(null), 3000);
        }
    });

    return (
        <Layout title="Add Stuff">
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
                enableOnAndroid={true}
                extraScrollHeight={20} // Adjust as needed
                keyboardShouldPersistTaps="handled"
            >
                <FormField
                    title="Name"
                    placeholder="Enter name"
                    value={form.name}
                    onChangeText={(value) => handleInputChange('name', value)}
                    styles='pt-2'
                />
                <FormField
                    title="Email Address"
                    placeholder="Enter Email"
                    value={form.email}
                    onChangeText={(value) => handleInputChange('email', value)}
                    styles='pt-2'
                />
                <FormField
                    title="Phone No"
                    placeholder="Phone No"
                    value={form.phone}
                    onChangeText={(value) => handleInputChange('phone', value)}
                    styles='pt-2'
                />
                <FormField
                    title="Password"
                    placeholder="Enter Password"
                    value={form.password}
                    onChangeText={(value) => handleInputChange('password', value)}
                    styles='pt-2'
                />
                <FormField
                    title="Confirm Password"
                    placeholder="Confirm Password"
                    value={form.password_confirmation}
                    onChangeText={(value) => handleInputChange('password_confirmation', value)}
                    styles='pt-2'
                />
                <CustomButton
                    title="Add Stuff"
                    handlePress={handleSubmit}
                    containerStyles="bg-primary mt-5 mb-10"
                    textStyles="text-white"
                    isLoading={addStuffMutation.isPending}
                />
            </KeyboardAwareScrollView>
        </Layout >
    )
}

export default Create
