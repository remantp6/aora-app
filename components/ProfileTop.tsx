import { View, Text, Image } from "react-native";
import React from "react";
import { useGlobalContext } from "@/context/GlobalProvider";
import icons from "@/constants/icons";

interface UserProfileProps {
  postCount: number;
  post: string;
  views: string;
  viewsCount: string;
}

const ProfileTop: React.FC<UserProfileProps> = ({
  postCount,
  post,
  views,
  viewsCount,
}) => {
  const { user, setUser, setIsLoggedIn } = useGlobalContext();
  return (
    <View className="pb-10">
      <View className="w-16 h-16 mx-auto border border-[#e8a33c] rounded-lg flex justify-center items-center">
        <Image
          source={{ uri: user?.avatar }}
          className="w-[90%] h-[90%] rounded-lg"
          resizeMode="cover"
        />
      </View>
      <View>
        <Text className="text-white text-lg font-bold text-center pt-2 pb-2">
          {user?.username}
        </Text>
        <View className="flex flex-row justify-center space-x-6">
          <View className="flex flex-col">
            <Text className="text-white text-lg font-bold text-center">
              {postCount}
            </Text>
            <Text className="text-[#c7c7d5] text-sm font-normal text-center">
              {post}
            </Text>
          </View>
          <View className="flex flex-col">
            <Text className="text-white text-lg font-bold text-center">
              {viewsCount}
            </Text>
            <Text className="text-[#c7c7d5] text-sm font-normal text-center">
              {views}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProfileTop;
