import { View, Text, FlatList } from 'react-native';
import Layout from '../../../components/Layout';
import Title from '../../../components/Title';
import CategorySection from '../../../components/medicine/CategorySection';
import LeafSetting from '../../../components/medicine/LeafSetting';

const Settings = () => {
    const sections = [{ key: 'CategorySection' }, { key: 'LeafSetting' }];

    const renderItem = ({ item }) => {
        if (item.key === 'CategorySection') {
            return <CategorySection />;
        } else if (item.key === 'LeafSetting') {
            return <LeafSetting />;
        }
        return null;
    };

    return (
        <Layout title="Medicine Settings">
            <FlatList
                data={sections}
                renderItem={renderItem}
                keyExtractor={(item) => item.key}
                contentContainerStyle={{ paddingBottom: 50 }}
                keyboardShouldPersistTaps="handled"
            />
        </Layout>
    );
};

export default Settings;
