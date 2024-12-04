import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";

interface CustomButtonProps {
  title: string;
  handlePress: () => void;
}
const CustomButton: React.FC<CustomButtonProps> = ({ title, handlePress }) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      style={styles.customButtonStyle}
    >
      <Text className="text-base font-bold text-[#161622]">{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  customButtonStyle: {
    backgroundColor: "#ff9100",
    borderRadius: 10,
    minWidth: "100%",
    minHeight: 58,
    justifyContent: "center",
    alignItems: "center",
  },
});
