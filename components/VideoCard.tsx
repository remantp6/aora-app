import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import icons from "@/constants/icons";
import { useVideoPlayer, VideoView } from "expo-video";

interface VideoCardProps {
  posts: any;
}

const VideoCard: React.FC<VideoCardProps> = ({ posts }) => {
  const [play, setPlay] = React.useState(false);
  const assetId = require('../assets/images/sample.mp4');
  const player = useVideoPlayer(assetId);

  return (
    <View className="px-4 mb-8">
      {/* Header with Avatar and Menu */}
      <View className="flex flex-row justify-between items-center">
        <View className="flex flex-row items-center space-x-4">
          <View className="w-14 h-14 border border-[#e8a33c] rounded-lg flex justify-center items-center">
            <Image
              source={{ uri: posts?.creator?.avatar }}
              style={{ width: 50, height: 50, borderRadius: 8 }}
              resizeMode="cover"
            />
          </View>
          <View>
            <Text className="text-white text-sm font-normal">
              {posts?.title}
            </Text>
            <Text className="text-[#CDCDE0]">{posts?.creator?.username}</Text>
          </View>
        </View>

        <Image
          source={icons.menu}
          style={{ width: 30, height: 26 }}
          resizeMode="contain"
        />
      </View>

      {/* Thumbnail or Playing Section */}
      <View className="mt-4">
        {play ? (
          <VideoView
            style={{ width: "100%", height: 220, borderRadius: 10 }}
            player={player} allowsFullscreen allowsPictureInPicture
          />
        ) : (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setPlay(true)}
            className="relative flex justify-center items-center"
          >
            <Image
              source={{ uri: posts?.thumbnail }}
              style={{ width: "100%", height: 220, borderRadius: 10 }}
              resizeMode="cover"
            />
            <Image
              source={icons.playBtn}
              className="absolute"
              style={{ width: 55, height: 55 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default VideoCard;
