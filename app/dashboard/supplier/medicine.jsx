import { View, Text } from 'react-native'
import React from 'react'
import MedicineCompany from '../../../components/supplier/MedicineCompany'
import { useFetchCompanyNames } from '../../../utils/hooks';
import { ScrollView } from 'react-native-gesture-handler';
import Layout from '../../../components/Layout';

const medicineCreate = () => {
    // Fetch existing company names
    const { data: fetchCompanyNames, isLoading, refetch } = useFetchCompanyNames();
    const companyNames = fetchCompanyNames?.data?.data || [];

    return (
        <Layout title="Company Create" className="flex-1">
            <ScrollView className="h-full">
                {/* Add Medicine Company */}
                <MedicineCompany
                    companyNames={companyNames}
                    isLoading={isLoading}
                />
            </ScrollView>
        </Layout>
    )
}

export default medicineCreate