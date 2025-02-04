import { View, Text, ScrollView } from 'react-native';
import React, { useState } from 'react';
import Title from '../../../components/Title';

import Layout from '../../../components/Layout';
import MedicineCompany from '../../../components/supplier/MedicineCompany';
import CreateSupplier from '../../../components/supplier/CreateSupplier';
import { useFetchCompanyNames } from '../../../utils/hooks';


const Create = () => {

    // Fetch existing company names
    const { data: fetchCompanyNames, isLoading, refetch } = useFetchCompanyNames();
    const companyNames = fetchCompanyNames?.data?.data || [];


    return (
        <Layout title="Add Supplier">
            {/* <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="pt-2"> */}


            {/* Add supplier  */}
            <CreateSupplier
                companyNames={companyNames}
                isLoading={isLoading}
            />
        </Layout>
    );
};

export default Create;
