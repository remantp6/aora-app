import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'

interface VideoInputFieldProps {
    label: string;
    placeholder: string;
    value: string;
    handleTextChange: (e: string) => void;
}
const VideoInputField: React.FC<VideoInputFieldProps> = ({label, placeholder, value, handleTextChange}) => {
  return (
    <View>
      <Text className="text-base text-[#a3a3a6] font-medium pb-[6px]">
        {label}
      </Text>
      <View className="px-3 w-full h-14 rounded-[10px] bg-[#232533] border-none flex flex-row items-center">
        <TextInput
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#CDCDE0"
          onChangeText={handleTextChange}
          className="h-full flex-1 text-[#CDCDE0] font-semibold text-sm focus:outline-none"
        />
      </View>
    </View>
  )
}

export default VideoInputField

const styles = StyleSheet.create({})