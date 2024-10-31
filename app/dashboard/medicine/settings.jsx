import { View, Text, FlatList, ScrollView } from 'react-native'
import React, { useState } from 'react'
import Layout from '../../../components/Layout'
import Title from '../../../components/Title'
import CustomButton from '../../../components/CustomButton'
import FormField from '../../../components/FormField'

const data = [
    {
        id: 1,
        category_name: 'ACME'
    },
    {
        id: 2,
        category_name: 'Beximco'
    },
    {
        id: 3,
        category_name: 'Hamdard'
    },
    {
        id: 4,
        category_name: 'Hamdard'
    },
    {
        id: 5,
        category_name: 'Hamdard'
    },
    {
        id: 6,
        category_name: 'What?'
    },
]

const categoryItem = ({ item }) => {
    return (
        <View className="bg-lime-300 mr-2 rounded-xl">
            <Text className="font-pbold text-lg p-8 text-darkBg">{item.category_name}</Text>
        </View>
    )
}


const Settings = () => {
    const [selectedCategory, setSelectedCategory] = useState(null)
    return (
        <Layout>
            <Title text="Medicine Settings" style='mt-3' />

            <ScrollView
                contentContainerStyle={{ flexGrow: 1, paddingBottom: 10 }}
            >
                <View>
                    <View className='py-5'>
                        <FormField
                            title='Add categories'
                            placeholder='Eg: Box-24, leaf-10, capsule-10'
                        />
                        <CustomButton title='Add Category' containerStyles='mt-4 w-1/2' textStyles="text-base" />
                    </View>
                    <View>
                        <FlatList
                            data={data}
                            keyExtractor={(item) => item.id}
                            renderItem={categoryItem}
                            horizontal
                        />
                    </View>
                </View>

                <View className="mt-4">
                    <View className='py-5'>
                        {/* dropdown for select category */}
                        <Text>Select a Category:</Text>
                        <FormField
                            title='Leaf Settings'
                            placeholder='Eg: Box-24, leaf-10, capsule-10'
                        />
                        <CustomButton title='Add Leaf' containerStyles='mt-4 w-1/2' textStyles="text-base" />
                    </View>
                    <View>
                        <FlatList
                            data={data}
                            keyExtractor={(item) => item.id}
                            renderItem={categoryItem}
                            horizontal
                        />
                    </View>
                </View>
                <Text>nice</Text>
                <Text>nice</Text>
                <Text>nice</Text>
                <Text>nice</Text>
                <Text>nice</Text>
                <Text>nice</Text>
                <Text>nice</Text>
                <Text>nice</Text>
                <Text>nice</Text>
                <Text>nice</Text>
                <Text>nice</Text>
                <Text>nice</Text>
                <Text>nice</Text>
                <Text>nice</Text>
            </ScrollView>
        </Layout>
    )
}


export default Settings