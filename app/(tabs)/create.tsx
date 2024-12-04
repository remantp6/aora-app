import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import VideoInputField from "@/components/VideoInputField";
import { Image } from "react-native";
import icons from "@/constants/icons";
import CustomButton from "@/components/CustomButton";
import * as DocumentPicker from 'expo-document-picker';
import { createVideoPlayer, useVideoPlayer, VideoView } from 'expo-video';
import { router } from "expo-router";
import { useGlobalContext } from "@/context/GlobalProvider";
import { createVideoPost } from "@/libs/appwrite";

const Create = () => {
  const { user } = useGlobalContext();
  const [uploading, setUploading] = React.useState(false);
  const [form, setForm] = React.useState<{
    title: string;
    video: DocumentPicker.DocumentPickerAsset | null;
    thumbnail: DocumentPicker.DocumentPickerAsset | null;
    prompt: string;
  }>({
    title: "",
    video: null,
    thumbnail: null,
    prompt: "",
  });

  const openPicker = async (selectType: string) => {
    const result = await DocumentPicker.getDocumentAsync({
      type: selectType === 'image'
        ? ['image/png', 'image/jpg', 'image/jpeg']
        : ['video/mp4', 'video/gif']
    });
    console.log("pick doc", result);
    if (!result.canceled) {
      if (selectType === 'image') {
        setForm({ ...form, thumbnail: result.assets[0] });
      }
      if (selectType === 'video') {
        setForm({ ...form, video: result.assets[0] });
      }
    }
  };
  
  const player = form.video && createVideoPlayer(form.video.uri);

  const handleSubmitPublish = async () => {
    if (
      (form.prompt === "") ||
      (form.title === "") ||
      !form.thumbnail ||
      !form.video
    ) {
      return Alert.alert("Please provide all fields");
    }

    setUploading(true);
    console.log("form", form)

    try{
      await createVideoPost({
        ...form,
        userId: user.$id,
      });

      Alert.alert("Success", "Post uploaded successfully");
      router.push("/home");

    }catch(error: any){
      Alert.alert("Error", error.message)
    }finally{
      setForm({
        title: "",
        video: null,
        thumbnail: null,
        prompt: "",
      });

      setUploading(false);
    }
  };

  return (
    <SafeAreaView className="h-full bg-[#161622]">
      <ScrollView showsVerticalScrollIndicator={false} className="px-4 mt-8 mb-6">
        <Text className="text-white text-lg font-bold mb-8">Upload Video</Text>
        <VideoInputField
          label="Video Title"
          value={form.title}
          handleTextChange={(e: string) => setForm({ ...form, title: e })}
          placeholder="Give your video a catch title..."
        />
        <View className="mt-7 space-y-2">
          <Text className="text-base text-[#a3a3a6] font-medium">Upload Video</Text>
          <TouchableOpacity activeOpacity={0.6} onPress={() => openPicker('video')}>
           {
            form.video ? (
              player && <VideoView style={styles.video} player={player} allowsFullscreen allowsPictureInPicture />
            ): (
              <View className="w-full h-40 rounded-2xl bg-[#1d1d2b] justify-center items-center">
                <View className="h-14 w-14 border border-dashed border-[#e8a33c] rounded-lg justify-center items-center">
                  <Image
                    source={icons.upload}
                    style={{ width: 30, height: 30 }}
                    resizeMode="contain"
                    />
                </View>
              </View>
            )
           }
          </TouchableOpacity>
        </View>
        <View className="my-7 space-y-2">
          <Text className="text-base text-[#a3a3a6] font-medium">Thumbnail Image</Text>
          <TouchableOpacity activeOpacity={0.6} onPress={() => openPicker('image')}>
           {
            form.thumbnail ? (
              <Image
                source={{ uri: form.thumbnail.uri }}
                style={{ width: '100%', height: 160, borderRadius: 20 }}
                resizeMode="contain"/>
            ): (
              <View className="w-full h-32 rounded-2xl bg-[#1d1d2b] justify-center items-center">
                <View className="flex flex-row items-center space-x-2">
                  <Image
                    source={icons.upload}
                    style={{ width: 30, height: 30 }}
                    resizeMode="contain"
                    />
                    <Text className="text-[#CDCDE0] text-sm font-medium mt-2">Choose a file</Text>
                </View>
              </View>
            )
           }
          </TouchableOpacity>
        </View>
        <VideoInputField
          label="AI Prompt"
          value={form.prompt}
          handleTextChange={(e) => setForm({ ...form, prompt: e })}
          placeholder="The AI prompt of your video..."
        />
        <View className="mt-6">
        <CustomButton title="Submit & Publish" handlePress={handleSubmitPublish}/>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;

const styles = StyleSheet.create({
  video: {
    width: '100%',
    height: 160,
  },
})
