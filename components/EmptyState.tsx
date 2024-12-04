import { View, Text, Image } from "react-native";
import React from "react";
import icons from "@/constants/icons";
import CustomButton from "./CustomButton";

interface EmptyStateProps {
  title: string;
  subtitle: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ title, subtitle }) => {
  return (
    <View className="flex flex-col justify-center items-center px-4">
      <Image
        source={icons.empty}
        style={{ width: 270, height: 240 }}
        resizeMode="contain"
      />
      <View className="mb-6">
        <Text className="text-center text-xl font-bold text-white">
          {title}
        </Text>
        <Text className="text-center font-normal text-lg text-slate-400">
          {subtitle}
        </Text>
      </View>
      <CustomButton title="Create Video" handlePress={() => {}} />
    </View>
  );
};

export default EmptyState;
