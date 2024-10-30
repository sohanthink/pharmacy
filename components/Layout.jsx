// components/Layout.js
import React from "react";
import { View } from "react-native";
import CustomHeader from "./CustomHeader";
import { SafeAreaView } from "react-native-safe-area-context";

const Layout = ({ children }) => {
    return (
        <SafeAreaView className="bg-lightBg h-full w-full">
            {/* Sticky Header */}
            <View className="z-10 w-full">
                <CustomHeader />
            </View>

            {/* Scrollable Content */}
            <View className="flex-1 mt-2">
                {children}
            </View>
        </SafeAreaView>
    );
};

export default Layout;
