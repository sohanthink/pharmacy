import React from 'react'
import { Text } from 'react-native'

const Title = ({ text, style }) => {
    return (
        <Text className={`text-3xl font-pbold text-center text-primary ${style}`}>{text}</Text>
    )
}

export default Title