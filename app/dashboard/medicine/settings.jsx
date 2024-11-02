import { View, Text, ScrollView } from 'react-native';
import Layout from '../../../components/Layout';
import Title from '../../../components/Title';
import CategorySection from '../../../components/medicine/CategorySection';
import LeafSetting from '../../../components/medicine/LeafSetting';

const Settings = () => {
    return (
        <Layout>
            <Title text="Medicine Settings" style='my-2 text-center' />
            <ScrollView
                contentContainerStyle={{ paddingBottom: 10 }}
                keyboardShouldPersistTaps="handled">
                <CategorySection />
                <LeafSetting />
            </ScrollView>
        </Layout>
    );
};

export default Settings;
