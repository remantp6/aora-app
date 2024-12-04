import {
  FlatList,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import EmptyState from "@/components/EmptyState";
import VideoCard from "@/components/VideoCard";
import useAppwrite from "@/libs/useAppwrite";
import { getUserPosts, logout } from "@/libs/appwrite";
import { useGlobalContext } from "@/context/GlobalProvider";
import icons from "@/constants/icons";
import UserProfile from "@/components/ProfileTop";

const Profile = () => {
  const { user, setUser, setIsLoggedIn } = useGlobalContext();
  console.log("user", user);
  const { postData: data } = useAppwrite(() => getUserPosts(user.id));

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      setIsLoggedIn(false);
      router.replace("/sign-in");
    } catch (error) {
      router.replace("/sign-in");
    }
  };

  return (
    <SafeAreaView className="bg-[#161622] h-full">
      <FlatList
        data={data}
        keyExtractor={(item) => item.$id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <VideoCard posts={item} />}
        ListHeaderComponent={() => (
          <View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                paddingHorizontal: 14,
                marginTop: 40,
              }}
            >
              <TouchableOpacity activeOpacity={0.7} onPress={handleLogout}>
              <Image
                source={icons.logout}
                style={{ width: 34, height: 36 }}
                resizeMode="contain"
              />
              </TouchableOpacity>
            </View>
            <UserProfile
              postCount={data.length}
              post="posts"
              views="views"
              viewsCount="1.2k"
            />
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No Videos found for the search"
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({});
