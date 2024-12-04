import { FlatList, RefreshControl, StyleSheet, Text, View, Image } from 'react-native'
import React, { useEffect } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context';
import EmptyState from '@/components/EmptyState';
import VideoCard from '@/components/VideoCard';
import useAppwrite from '@/libs/useAppwrite';
import { searchPosts } from '@/libs/appwrite';
import SearchInput from '@/components/SearchInput';

const Search = () => {
  const { query } = useLocalSearchParams();
  const { postData: data, reFetch } = useAppwrite(() => searchPosts(query as string));

  useEffect(() => {
    reFetch();
  }, [query]);

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
                Search Results
              </Text>
              <Text className="text-2xl font-bold text-white">{query}</Text>
            </View>
            <View>
              <Image
                source={require("../../assets/images/IconOnly.png")}
                style={{ width: 50, height: 50 }}
                resizeMode="contain"
              />
            </View>
          </View>
          <SearchInput initialQuery={query} />
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
  )
}

export default Search

const styles = StyleSheet.create({})