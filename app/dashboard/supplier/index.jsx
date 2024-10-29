import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Title from '../../../components/Title'

const index = () => {
    return (
        <SafeAreaView className="bg-lightBg h-full w-full">
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="p-5">
                <Title text="All Supplier Binchod" />
            </ScrollView>
        </SafeAreaView>

    )
}

export default index