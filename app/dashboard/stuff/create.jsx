import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import Layout from '../../../components/Layout'
import FormField from '../../../components/FormField'
import CustomButton from '../../../components/CustomButton'

const Create = () => {
    return (
        <Layout title="Add Stuff">
            <ScrollView>
                <FormField
                    title="Stuff Name"
                    placeholder="Enter Stuff name"
                    // value={form.medicine_name}
                    onChangeText={(value) => handleInputChange('medicine_name', value)}
                    styles='pt-2'
                />
                <FormField
                    title="Stuff Email Address"
                    placeholder="Enter Stuff Email"
                    // value={form.medicine_name}
                    onChangeText={(value) => handleInputChange('medicine_name', value)}
                    styles='pt-2'
                />
                <FormField
                    title="Stuff Phone No"
                    placeholder="Phone No"
                    // value={form.medicine_name}
                    onChangeText={(value) => handleInputChange('medicine_name', value)}
                    styles='pt-2'
                />
                <FormField
                    title="Stuff Password"
                    placeholder="Enter Stuff Password"
                    // value={form.medicine_name}
                    onChangeText={(value) => handleInputChange('medicine_name', value)}
                    styles='pt-2'
                />
                <FormField
                    title="Confirm Stuff Password"
                    placeholder="Confirm Password"
                    // value={form.medicine_name}
                    onChangeText={(value) => handleInputChange('medicine_name', value)}
                    styles='pt-2'
                />
                <CustomButton
                    title="Add Stuff"
                    // handlePress={handleSubmit}
                    containerStyles="bg-primary mt-5 mb-10"
                    textStyles="text-white"
                // isLoading={AddMedicineMutation.isPending}
                />
            </ScrollView>
        </Layout >
    )
}

export default Create