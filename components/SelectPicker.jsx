import { View, Text } from 'react-native';
import React, { useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';

const SelectPicker = () => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);

    const [items, setItems] = useState([
        { label: 'Technology', value: 'technology' },
        { label: 'Health', value: 'health' },
        { label: 'Finance', value: 'finance' },
        { label: 'Education', value: 'education' },
        { label: 'Entertainment', value: 'entertainment' },
    ]);

    return (
        <View style={{ zIndex: open ? 1000 : 1, marginBottom: open ? 200 : 0 }}>
            <Text className="text-darkBg font-psemibold">Select a Category:</Text>
            <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                placeholder="Choose a category"
                style={{
                    backgroundColor: 'white',
                    borderColor: '#ddd',
                }}
                dropDownContainerStyle={{
                    borderColor: '#ddd',
                }}
                textStyle={{
                    fontSize: 16,
                }}
                className="border h-12 rounded-md"
            />
        </View>
    );
};

export default SelectPicker;
