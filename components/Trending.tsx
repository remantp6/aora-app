import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";
import * as Animatable from "react-native-animatable";
import React, { useCallback } from "react";
import icons from "@/constants/icons";
import { Video, ResizeMode } from "expo-av";

interface TrendingProps {
  posts: any;
}

const zoomIn = {
  0: { transform: [{ scale: 0.9 }] },
  1: { transform: [{ scale: 1.1 }] },
};

const zoomOut = {
  0: { transform: [{ scale: 1 }] },
  1: { transform: [{ scale: 0.9 }] },
};

interface TrendingItemProps {
  activeItem: string;
  item: {
    $id: string;
    thumbnail: string;
    video: string;
  };
}

const TrendingItem: React.FC<TrendingItemProps> = ({ activeItem, item }) => {
  const [play, setPlay] = React.useState(false);
  //console.log("item from trending", item);

 // console.log("activeItem from trending", activeItem);
 // console.log('video', item.video);

  return (
    <Animatable.View
      animation={activeItem === item.$id ? zoomIn : zoomOut}
      duration={500}
      style={{ marginRight: 30 }}
    >
      {play ? (
        <Video
          source={{ uri: require('../assets/images/sample-5s.mp4') }}
          resizeMode={ResizeMode.CONTAIN}
          className="flex justify-center items-center"
          style={{
            width: 208,
            height: 288,
            borderRadius: 33,
          }}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status) => {
            if (
              status.isLoaded && status.didJustFinish
            ) {
              setPlay(false);
            }
          }}
        />
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
          style={{
            position: "relative",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ImageBackground
            style={{
              width: 208,
              height: 288,
              borderRadius: 33,
              overflow: "hidden",
              marginVertical: 30,
              shadowColor: "#0f1217",
              shadowOffset: { width: 0, height: 10 },
              shadowOpacity: 0.3,
              shadowRadius: 20,
              elevation: 10,
            }}
            source={{ uri: item.thumbnail }}
            resizeMode="cover"
          />
          <Image
            source={icons.playBtn}
            style={{
              position: "absolute",
              width: 55,
              height: 55,
            }}
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};

const Trending: React.FC<TrendingProps> = ({ posts }) => {
  //console.log("posts from trending", posts);
  const [activeItem, setActiveItem] = React.useState(posts[1]?.$id || "");
 // console.log("activeItem", activeItem);

  const viewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: Array<{ key: string }> }) => {
      if (viewableItems.length > 0) {
      //  console.log("total viewableItems", viewableItems);
      //  console.log("viewableItems", viewableItems[0].key);
        setActiveItem(viewableItems[0].key);
      }
    },
    []
  );

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.$id}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => (
        <TrendingItem activeItem={activeItem} item={item} />
      )}
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={{ itemVisiblePercentThreshold: 70 }}
      horizontal
    />
  );
};

export default Trending;

const styles = StyleSheet.create({});
