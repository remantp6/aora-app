import React, { useEffect } from "react";
import { Alert } from "react-native";
import { Models } from "react-native-appwrite";

const useAppwrite = (fn: () => Promise<Models.Document[]>) => {
  const [postData, setPostData] = React.useState<Models.Document[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  // fetch videos here
  const fetchVideos = async () => {
    setIsLoading(true);
    try {
      const res = await fn();
      setPostData(res);
    } catch (e: any) {
      Alert.alert("Error", e.message);
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    fetchVideos();
  }, []);

  const reFetch = () => fetchVideos();

  return { postData, isLoading, reFetch };
};
export default useAppwrite;
