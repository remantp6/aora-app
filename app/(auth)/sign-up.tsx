import { Alert, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Logo from "../../assets/images/logo.svg";
import { Link, router } from "expo-router";
import { registerUser } from "@/libs/appwrite";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";

const SignUp = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const onSubmit = async () => {
    console.log("submission form data", form);
    if(!form.email || !form.password || !form.username) {
      Alert.alert("Error", "Please fill all the fields");
    }

    setIsSubmitting(true);

    try{
    await registerUser(form.email, form.password, form.username);
    router.replace("/home");
  } catch (error: any) {
    Alert.alert("Error", error.message);
  } finally {
    setIsSubmitting(false);
  }
  };
  return (
    <SafeAreaView className="bg-[#161622] h-full">
      <ScrollView>
        <View className="w-full min-h-[90vh] justify-center px-4">
        <Image
            source={require("../../assets/images/logoIcon.png")}
            style={{ width: 115, resizeMode: "contain" }}
          />
          <Text className="text-2xl font-semibold text-white mt-4 mb-10">
            Sign up
          </Text>
          <View className="space-y-6 mb-8">
            <FormField
              label="Username"
              placeholder="Your unique name" 
              value={form.username} 
              handleChangeText={(e) => setForm({...form, username: e})}
              />
            <FormField 
            label="Email" 
            placeholder="Your email address" 
            value={form.email} 
            handleChangeText={(e) => setForm({...form, email: e})} />
            <FormField
              label="Password"
              placeholder="Your password"
              value={form.password}
              handleChangeText={(e) => setForm({...form, password: e})}
            />
          </View>
          <CustomButton title="Sign up" handlePress={onSubmit} />
          <View className="flex justify-center items-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-regular">
              Already have an account?
            </Text>
            <Link
              href="/sign-in"
              className="text-lg font-semibold text-[#ff9d00]"
            >
              Login
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
