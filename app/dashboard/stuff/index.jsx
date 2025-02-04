import { View, Text, FlatList, Pressable, ActivityIndicator, RefreshControl, Linking, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useFetchStuff } from '../../../utils/hooks';
import Layout from '../../../components/Layout';
import { StatusBar } from 'expo-status-bar';

const StuffItem = ({ item }) => (
    <View className="bg-white rounded-lg p-3 mb-1 w-[49%] justify-center">
        <View className='space-y-2'>
            <Text className="text-xs font-psemibold text-gray-800">{item.name}</Text>
            <Text className="text-[10px] text-gray-600">{item.email}</Text>
            <TouchableOpacity onPress={() => Linking.openURL(`tel:${item.phone}`)}>
                <Text className="text-xs text-gray-500">{item.phone}</Text>
            </TouchableOpacity>
        </View>
    </View>
);

const Stuff = () => {
    const [refreshing, setRefreshing] = useState(false);
    const { data: stuffdata, isLoading, error, refetch } = useFetchStuff();
    const stuff = stuffdata?.data || [];

    const onRefresh = () => {
        setRefreshing(true);
        refetch().finally(() => setRefreshing(false));
    };

    if (isLoading) {
        return <ActivityIndicator size="large" color="#0000ff" className="flex-1 justify-center" />;
    }

    if (error) {
        return (
            <View className="flex-1 justify-center items-center">
                <Text className="text-red-500">Failed to load stuff. Please try again.</Text>
            </View>
        );
    }

    if (stuff.length === 0) {
        return (
            <View className="flex-1 justify-center items-center">
                <Text className="text-gray-500">No stuff available.</Text>
            </View>
        );
    }

    return (
        <Layout title="All Stuffs/users">
            <StatusBar className="text-darkBg" />
            <FlatList
                data={stuff}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <StuffItem item={item} />}
                numColumns={2}
                contentContainerStyle={{ flexGrow: 1, padding: 5 }}
                columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 4 }}
                refreshControl={
                    <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
                }
            />
        </Layout>
    );
};

export default Stuff;