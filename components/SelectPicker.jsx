import { View, Text } from 'react-native';
import React, { useState, useEffect } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { useFetchMedicineCategories } from '../utils/hooks';

const SelectPicker = ({ selectedValue, onValueChange }) => {
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([]);

    const { data: medicineCategories, isLoading } = useFetchMedicineCategories();

    useEffect(() => {
        if (medicineCategories) {
            const formattedItems = medicineCategories.data.data.map((category) => ({
                label: category.category_name,
                value: category.id,
                name: category.category_name,
            }));
            setItems(formattedItems);
        }
    }, [medicineCategories]);

    const handleSelectChange = (value) => {
        const selectedItem = items.find((item) => item.value === value);
        if (selectedItem) {
            onValueChange({ id: selectedItem.value, name: selectedItem.name }); // Pass both ID and name
        } else {
            console.warn("Selected item not found in items list");
        }
    };

    return (
        <View style={{ zIndex: open ? 1000 : 1, marginBottom: open ? 200 : 0 }}>
            <Text className="text-darkBg font-psemibold pb-2">Select a Category</Text>
            <DropDownPicker
                open={open}
                value={selectedValue ? selectedValue.id : null} // Controlled value
                items={items}
                setOpen={setOpen}
                setValue={(callback) => handleSelectChange(callback())} // Handle selection change
                setItems={setItems}
                placeholder={isLoading ? "Loading..." : "Choose a category"}
                style={{
                    backgroundColor: 'white',
                    borderColor: '#ddd',
                }}
                dropDownContainerStyle={{
                    borderColor: '#ddd',
                }}
                textStyle={{
                    fontSize: 15,
                }}
                className="border h-12 rounded-md"
            />
        </View>
    );
};

export default SelectPicker;
