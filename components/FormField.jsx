import { View, Text, TextInput } from 'react-native'
import React from 'react'

const FormField = ({ title, value, placeholder, handleChangeText, styles, textStyles, ...props }) => {
    return (
        <View className={`${styles}`}>
            <Text className={`font-psemibold mb-2 text-black ${textStyles}`}>{title}</Text>
            <TextInput
                placeholder={placeholder}
                placeholderTextColor='black'
                className='bg-slate-100 text-black px-3 py-4 rounded-md font-plight border-[0.3px]'
                value={value}
                onChangeText={handleChangeText}
                {...props}
            />
        </View>
    )
}

export default FormField