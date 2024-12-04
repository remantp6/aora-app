import { useState } from "react";
import { router, usePathname } from "expo-router";
import { View, TouchableOpacity, Image, TextInput, Alert } from "react-native";
import icons from "../constants/icons";

interface SearchInputProps {
  initialQuery?: any;
};

const SearchInput: React.FC<SearchInputProps> = ({initialQuery}) => {
  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery || "");

  return (
    <View className="flex flex-row items-center space-x-4 w-full h-16 my-8 px-2 bg-black-100 rounded-2xl border-2 border-[#1d1d2b] bg-[#1d1d2b]">
      <TextInput
        className="h-full focus:outline-none text-base mt-0.5 text-white flex-1 font-regular"
        value={query}
        placeholder="Search a video topic"
        placeholderTextColor="#CDCDE0"
        onChangeText={(e) => setQuery(e)}
      />

      <TouchableOpacity
        onPress={() => {
          if (!query) {
            return Alert.alert("Missing query", "Please enter a valid query");
          }
          // if the current path is /search, update the query param i.e. if we already in search page
          if (pathname.startsWith("/search")) router.setParams({ query });
          else router.push(`/search/${query}`);
        }}
        activeOpacity={0.9}
      >
        <Image source={icons.search} style={{ width: 30, height: 30 }} />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
