import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const index = () => {
    return (
        <SafeAreaView>
            <ScrollView>
                <Text className="text-3xl">show supplier List Here</Text>
            </ScrollView>
        </SafeAreaView>

    )
}

export default index