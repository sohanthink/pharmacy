import { View, Text, Image } from 'react-native'
import React from 'react'
import icons from '../../constants/icons'

const dashboard = () => {
    return (
        <View>
            <Image source={icons.mehedi} resizeMode='contain' />
        </View>
    )
}

export default dashboard