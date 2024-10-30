import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const CustomButton = ({ title, handlePress, containerStyles, textStyles, isLoading }) => {
    return (
        <TouchableOpacity onPress={handlePress} activeOpacity={0.7} className={`bg-darkBg rounded-md py-2 justify-center items-center ${containerStyles} ${isLoading ? 'opacity-50' : ''}`} disabled={isLoading}>
            <Text className={`text-lightBg font-pmedium text-lg ${textStyles}`}>{title}</Text>
        </TouchableOpacity>
    )
}

export default CustomButton