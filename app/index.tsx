import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, View, Image, Text } from "react-native";
import CustomButton from "@/components/CustomButton";
import Path from "../assets/images/path.svg";
import Logo from "../assets/images/logo.svg";
import Card from "../assets/images/card.svg";
import { Redirect, router } from "expo-router";
import { useGlobalContext } from "@/context/GlobalProvider";

const App = () => {
  // access the global context
  const { isLoggedIn, isLoading } = useGlobalContext();

  // if the user is logged in, redirect to the home page
  if (!isLoading && isLoggedIn) return <Redirect href="/home" />;
  return (
    <SafeAreaView style={{ backgroundColor: "#161622", height: "100%" }}>
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full flex justify-center items-center h-full px-4">
          <Logo />
          <View className="mt-8">
            <Card />
          </View>
          <View className=" pt-8 px-12">
            <Text className="relative text-4xl text-white font-bold text-center">
              Discover Endless Possibilities with {""}
              <Text className="text-[#ff8c00]">Aora</Text>
            </Text>
            <View className="absolute -bottom-1 right-12 ">
              <Path />
            </View>
          </View>
          <Text className="text-[#CDCDE0] text-center text-sm font-normal px-2 my-8">
            Where Creativity Meets Innovation: Embark on a Journey of Limitless
            Exploration with Aora
          </Text>
          <CustomButton
            title="Continue with Email"
            handlePress={() => router.push("/sign-in")}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
