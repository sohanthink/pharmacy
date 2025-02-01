// components/Layout.js
import React from "react";
import { StatusBar, View } from "react-native";
import CustomHeader from "./CustomHeader";
import { SafeAreaView } from "react-native-safe-area-context";

const Layout = ({ children, title }) => {
    return (
        <SafeAreaView className="bg-lightBg h-full w-full">
            <StatusBar barStyle="dark-content" />
            {/* Sticky Header */}
            <View className="z-10 w-full">
                <CustomHeader title={title} />
            </View>

            {/* Scrollable Content */}
            <View className="px-3 h-full">
                {children}
            </View>
        </SafeAreaView>
    );
};

export default Layout;
