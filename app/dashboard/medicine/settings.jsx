import { View, Text, FlatList } from 'react-native';
import React from 'react';
import Layout from '../../../components/Layout';
import Title from '../../../components/Title';
import CustomButton from '../../../components/CustomButton';
import FormField from '../../../components/FormField';
import SelectPicker from '../../../components/SelectPicker';

const categoryData = [
    { id: 1, category_name: 'ACME' },
    { id: 2, category_name: 'Beximco' },
    { id: 3, category_name: 'Hamdard' },
    { id: 4, category_name: 'Hamdard' },
    { id: 5, category_name: 'Hamdard' },
    { id: 6, category_name: 'What?' },
];

const leafData = [
    { id: 1, category_name: 'Leaf 1' },
    { id: 2, category_name: 'Leaf 2' },
    { id: 3, category_name: 'Leaf 3' },
    // Add more leaf items as needed
];

const categoryItem = ({ item }) => (
    <View className="bg-secondary mr-2 rounded-md">
        <Text className="font-pbold text-lg p-8 text-darkBg">{item.category_name}</Text>
    </View>
);

const leafItem = ({ item }) => (
    <View className="bg-secondary mt-2 rounded-md">
        <Text className="font-pbold text-lg p-8 text-darkBg">{item.category_name}</Text>
    </View>
);

const Settings = () => {
    const renderCategorySection = () => (
        <View className='bg-whiteBg rounded-xl p-3 shadow-md'>
            <View className='py-5'>
                <FormField
                    title='Add categories'
                    placeholder='Eg: Box-24, leaf-10, capsule-10'
                    textStyles='text-darkBg'
                />
                <CustomButton title='Add' containerStyles='bg-[#E0E0E0] mt-3' textStyles="text-base text-darkBg" />
            </View>
            <FlatList
                data={categoryData}
                keyExtractor={(item) => item.id.toString()}
                renderItem={categoryItem}
                horizontal
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );

    const renderLeafSection = () => (
        <View className="bg-whiteBg shadow-md rounded-xl p-3 mt-5">
            <View className='pb-5'>
                <SelectPicker />
                <FormField
                    title='Leaf Settings'
                    placeholder='Eg: Box-24, leaf-10, capsule-10'
                    textStyles='text-darkBg'
                    styles='pt-3'
                />
                <CustomButton title='Add Leaf' containerStyles='mt-4 bg-[#E0E0E0]' textStyles="text-base text-darkBg" />
            </View>
            <FlatList
                data={leafData}
                keyExtractor={(item) => item.id.toString()}
                renderItem={leafItem}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );

    return (
        <Layout>
            <Title text="Medicine Settings" style='my-2 text-center' />
            <FlatList
                data={[]}
                keyExtractor={() => 'dummy'} // dummy key extractor since we are not displaying a list
                renderItem={() => null} // no actual items rendered
                ListHeaderComponent={renderCategorySection}
                ListFooterComponent={renderLeafSection}
                contentContainerStyle={{ paddingBottom: 10 }}
            />
        </Layout>
    );
};

export default Settings;
