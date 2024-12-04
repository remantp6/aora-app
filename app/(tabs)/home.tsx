import {
  FlatList,
  Image,
  RefreshControl,
  Text,
  View,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchInput from "@/components/SearchInput";
import Trending from "@/components/Trending";
import EmptyState from "@/components/EmptyState";
import { getLatestVideos, getVideos } from "@/libs/appwrite";
import useAppwrite from "@/libs/useAppwrite";
import VideoCard from "@/components/VideoCard";

const Home = () => {
  const { postData: data, reFetch } = useAppwrite(getVideos);
  const { postData: latestPost} = useAppwrite(getLatestVideos);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    // again videos will be fetched here
    reFetch();
    setRefreshing(false);
  };

  return (
    <SafeAreaView className="bg-[#161622] h-full">
      <FlatList
        data={data}
        keyExtractor={(item) => item.$id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <VideoCard posts={item}/>
        )}
        ListHeaderComponent={() => (
          <View className="flex mt-10 mb-6 px-4 ">
            <View className="flex flex-row justify-between items-start">
              <View className="my-auto">
                <Text className="font-normal text-sm text-gray-100">
                  Welcome Back
                </Text>
                <Text className="text-2xl font-bold text-white">JSMastery</Text>
              </View>

              <View>
                <Image
                  source={require("../../assets/images/IconOnly.png")}
                  style={{ width: 50, height: 50 }}
                  resizeMode="contain"
                />
              </View>
            </View>
            <SearchInput />
            <View className="mb-8">
              <Text className="text-sm font-medium text-[#CDCDE0]">
                Trending Videos
              </Text>
            </View>
            <View className="mb-8">
            <Trending posts={latestPost} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="Be the first to upload a video"
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Home;
