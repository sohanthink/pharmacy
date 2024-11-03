import { View, Text, FlatList } from 'react-native';
import React, { useState } from 'react';
import SelectPicker from '../SelectPicker';
import FormField from '../FormField';
import CustomButton from '../CustomButton';

const leafData = [
    { id: 1, category_name: 'Leaf 1' },
    { id: 2, category_name: 'Leaf 2' },
    { id: 3, category_name: 'Leaf 3' },
];

const LeafSetting = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [leafSetting, setLeafSetting] = useState(''); // Add a state for the leaf description

    const handleCategoryChange = (value) => {
        setSelectedCategory(value.name);
        console.log("Selected Category:", value.name); // Log the selected value directly
    };

    const addLeaf = () => {
        if (selectedCategory) {
            console.log('Clicked Leaf:', selectedCategory, 'leafsetting:', leafSetting);
            // Here you can save the selectedCategory and leafDescription to your database
        } else {
            console.log('Please select a category first');
        }
    };

    return (
        <View className="bg-whiteBg shadow-md rounded-xl p-3 mt-5">
            <View className='pb-5'>
                <SelectPicker
                    selectedValue={selectedCategory}
                    onValueChange={handleCategoryChange}
                />
                <FormField
                    title='Leaf Settings'
                    placeholder='Eg: Box-24, leaf-10, capsule-10'
                    textStyles='text-darkBg'
                    styles='pt-3'
                    onChangeText={setLeafSetting} // Update the state when the text changes
                />
                <CustomButton
                    title='Add Leaf'
                    containerStyles='mt-4 bg-[#E0E0E0]'
                    textStyles="text-base text-darkBg"
                    handlePress={addLeaf}
                />
            </View>
            <FlatList
                data={leafData}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View className="bg-primary mt-2 rounded-md">
                        <Text className="font-pbold text-lg p-8 text-lightBg">
                            {item.category_name}
                        </Text>
                    </View>
                )}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

export default LeafSetting;
