import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import SelectPicker from '../SelectPicker';
import FormField from '../FormField';
import CustomButton from '../CustomButton';

const leafData = [
    { id: 1, category_name: 'Leaf 1' },
    { id: 2, category_name: 'Leaf 2' },
    { id: 3, category_name: 'Leaf 3' },
];



const LeafSetting = () => (
    <View className="bg-whiteBg shadow-md rounded-xl p-3 mt-5">
        <View className='pb-5'>
            <SelectPicker />
            <FormField
                title='Leaf Settings'
                placeholder='Eg: Box-24, leaf-10, capsule-10'
                textStyles='text-darkBg'
                styles='pt-3'
            />
            <CustomButton
                title='Add Leaf'
                containerStyles='mt-4 bg-[#E0E0E0]'
                textStyles="text-base text-darkBg"
            />
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
            {leafData.map((item) => (
                <View key={item.id} className="bg-secondary mt-2 rounded-md">
                    <Text className="font-pbold text-lg p-8 text-darkBg">{item.category_name}</Text>
                </View>
            ))}
        </ScrollView>
    </View>
);

export default LeafSetting