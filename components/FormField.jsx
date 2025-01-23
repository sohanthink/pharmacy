import { View, Text, TextInput } from 'react-native'
import React from 'react'

const FormField = ({ title, value, placeholder, handleChangeText, styles, textStyles, disabled, ...props }) => {
    return (
        <View className={`${styles}`}>
            <Text className={`font-psemibold mb-2 text-black ${textStyles}`}>{title}</Text>
            <TextInput
                placeholder={placeholder}
                placeholderTextColor='rgba(0, 0, 0, 0.2)'
                className='bg-white text-black px-3 py-3 rounded-md font-plight border-[0.3px]'
                value={value}
                onChangeText={handleChangeText}
                editable={!disabled}
                {...props}
            />
        </View>
    )
}

export default FormField