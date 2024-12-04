import {
  Alert,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, router } from "expo-router";
import { signIn } from "@/libs/appwrite";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import * as LocalAuthentication from "expo-local-authentication";

const SignIn = () => {
  const [isBiometricSupported, setIsBiometricSupported] =
    useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // Check if hardware supports biometrics
  useEffect(() => {
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setIsBiometricSupported(compatible);
    })();
  }, []);

  console.log("biometric supported", isBiometricSupported);

  const handleBiometricAuth = async () => {
    const savedBiometrics = await LocalAuthentication.isEnrolledAsync();
    console.log("savedBiometrics", savedBiometrics);
    if (!savedBiometrics) {
      return Alert.alert(
        "Biometric record not found",
        "Please verify your identity with your password",
        [{ text: "OK", onPress: () => fallBackToDefaultAuth() }]
      );
    }
    if(!savedBiometrics){
      Alert.alert("Biometric record not found", "Please verify your identity with your password");
    }

    const biometricAuth = await LocalAuthentication.authenticateAsync({
      promptMessage: "Authenticate",
      fallbackLabel: "Use Passcode",
      // disableDeviceFallback: true,
    });

    if (biometricAuth.success) {
      router.replace("/home");
    } else {
      Alert.alert("Authentication failed", "Please try again");
    }
  };

  const fallBackToDefaultAuth = () => {
    Alert.alert("Fallback", "Fallback to default authentication");
  };

  const onSubmit = async () => {
    console.log("submission form data", form);
    if (!form.email || !form.password) {
      Alert.alert("Error", "Please fill all the fields");
      return;
    }

    setIsSubmitting(true);

    try {
      await signIn(form.email, form.password);
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
          {/* <Logo /> */}
          <Image
            source={require("../../assets/images/logoIcon.png")}
            style={{ width: 115, resizeMode: "contain" }}
          />
          <Text className="text-2xl font-semibold text-white mt-2 mb-8">
            Sign in
          </Text>
          <View className="space-y-6">
            <FormField
              label="Email"
              placeholder="Your email address"
              value={form.email}
              handleChangeText={(e) => setForm({ ...form, email: e })}
            />
            <FormField
              label="Password"
              placeholder="Your password"
              value={form.password}
              handleChangeText={(e) => setForm({ ...form, password: e })}
            />
          </View>
          <Text className="text-sm text-[#a3a3a6] text-end py-5">
            Forgot password
          </Text>
          <CustomButton title="Sign in" handlePress={onSubmit} />
          <View className="flex justify-center items-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-regular">
              Don't have an account?
            </Text>
            <Link
              href="/sign-up"
              className="text-lg font-semibold text-[#ff9d00]"
            >
              Signup
            </Link>
          </View>
          {isBiometricSupported && (
            <>
              <View style={styles.container}>
                <View style={styles.line} />
                <Text style={styles.text}>or</Text>
                <View style={styles.line} />
              </View>
              <View className="flex flex-row items-center justify-center space-x-8">
                {Platform.OS === "android" ? (
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={handleBiometricAuth}
                  >
                    <MaterialIcons
                      name={"fingerprint"}
                      size={70}
                      color={"#bfbfbf"}
                    />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={handleBiometricAuth}
                  >
                    <AntDesign name={"scan1"} size={50} color={"#bfbfbf"} />
                  </TouchableOpacity>
                )}
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 34,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#aaa",
  },
  text: {
    marginHorizontal: 8,
    fontSize: 16,
    color: "#f1f1f1",
    fontWeight: "500",
  },
});
