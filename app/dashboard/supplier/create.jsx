import { View, Text, ScrollView } from 'react-native'
import React, { useState } from 'react'
import Title from '../../../components/Title'
import FormField from '../../../components/FormField'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from '../../../components/CustomButton'
import { useMutation } from '@tanstack/react-query'
import { addsupplier } from '../../../utils/api'

const Create = () => {

    const [error, setError] = useState(null)
    const [form, setForm] = useState({
        supplier_name: "",
        supplier_email: "",
        supplier_phone: "",
        company_name: "",
        supplier_no: "",
    })

    const mutation = useMutation({
        mutationFn: () => addsupplier(
            form.supplier_name,
            form.supplier_email,
            form.supplier_phone,
            form.company_name,
            form.supplier_no,
        ),
        onSuccess: async (data) => {
            console.log(data);
        },
        onError: (error) => {
            setError(error.message)
            console.log(error.message);

        }
    })

    const submit = async () => {
        console.log(form);
        if (!form.supplier_email || form.company_name) {
            setError("Supplier Email And Company NAme required")
            return;
        }
        setError(null)
        mutation.mutate()
    }

    return (
        <SafeAreaView className="bg-lightBg h-full w-full">
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="p-5">
                <Title text="Add Supplier" />
                <Title>{error}</Title>
                <View className="w-full flex-1">
                    <FormField
                        styles='mt-3'
                        title='name'
                        value={form.supplier_name}
                        handleChangeText={(e) => setForm({ ...form, supplier_name: e })}
                        placeholder='Enter Supplier Halar Name'
                    />
                    <FormField
                        styles='mt-3'
                        title='Email'
                        value={form.supplier_email}
                        handleChangeText={(e) => setForm({ ...form, supplier_email: e })}
                        placeholder='Enter Supplier Halar Email'
                    />
                    <FormField
                        styles='mt-3'
                        title='Phone'
                        value={form.supplier_phone}
                        handleChangeText={(e) => setForm({ ...form, supplier_phone: e })}
                        placeholder='Enter Supplier Halar Phone'
                    />
                    <FormField
                        styles='mt-3'
                        title='Company'
                        value={form.company_name}
                        handleChangeText={(e) => setForm({ ...form, company_name: e })}
                        placeholder='Enter Supplier Company Name'
                    />
                    <FormField
                        styles='mt-3'
                        title='Supplier ID'
                        value={form.supplier_no}
                        handleChangeText={(e) => setForm({ ...form, supplier_no: e })}
                        placeholder='Enter an specific id for supplier'
                    />
                    <CustomButton
                        title='Add Supplier'
                        handlePress={submit}
                        containerStyles="mt-3"
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Create