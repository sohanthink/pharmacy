import React from 'react'
import { Text } from 'react-native'

const Title = ({ text, style }) => {
    return (
        <Text className={`text-2xl font-pbold text-left text-primary ${style}`}>{text}</Text>
    )
}

export default Title