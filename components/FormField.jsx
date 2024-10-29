import { View, Text, TextInput } from 'react-native'
import React from 'react'

const FormField = ({ title, value, placeholder, handleChangeText, styles, ...props }) => {
    return (
        <View className={`${styles}`}>
            <Text className="font-psemibold mb-2">{title}</Text>
            <TextInput
                placeholder={placeholder}
                placeholderTextColor='#202020'
                className='border-black-100 border-[1.2px] p-2 rounded-lg'
                value={value}
                onChangeText={handleChangeText}
                {...props}
            />
        </View>
    )
}

export default FormField