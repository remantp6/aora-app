import { Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import Eye from "../assets/icons/eye.svg";
import EyeHide from "../assets/icons/eye-hide.svg";

interface FormFieldProps {
  label: string;
  value: string;
  placeholder?: string;
  handleChangeText: (text: string) => void;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  value,
  placeholder,
  handleChangeText,
}) => {
  const [showPassword, setShowPassword] = useState<Boolean>(false);

  return (
    <View>
      <Text className="text-base text-[#a3a3a6] font-medium pb-[6px]">
        {label}
      </Text>
      <View className="px-3 w-full h-14 rounded-[10px] border-black-200  bg-[#232533] border-none flex flex-row items-center">
        <TextInput
          value={value}
          placeholder={placeholder}
          onChangeText={handleChangeText}
          placeholderTextColor="#CDCDE0"
          secureTextEntry={label === "Password" && !showPassword}
          className="h-full flex-1 text-white font-semibold text-base focus:outline-none"
        />
        {label === "Password" && (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setShowPassword(!showPassword)}
          >
            {!showPassword ? <Eye /> : <EyeHide />}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
