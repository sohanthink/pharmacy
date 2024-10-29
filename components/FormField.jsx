import { View, Text, TextInput } from 'react-native'
import React from 'react'

const FormField = ({ title, value, placeholder, handleChangeText, styles, ...props }) => {
    return (
        <View className={`${styles}`}>
            <Text className="font-psemibold mb-2 text-primary">{title}</Text>
            <TextInput
                placeholder={placeholder}
                placeholderTextColor='grey'
                className='border-black-100 border-[1.2px] p-2 rounded-md font-pregular'
                value={value}
                onChangeText={handleChangeText}
                {...props}
            />
        </View>
    )
}

export default FormField