import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ListRenderItem,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchInput from "../../components/SearchInput";
import EmptyState from "../../components/EmptyState";
import { searchPosts } from "../../lib/appwrite";
import useAppwrite from "../../lib/useAppwrite";
import VideoCard from "../../components/VideoCard";
import { useLocalSearchParams } from "expo-router";
interface Item {
  $id: string;
  id: string;
  title: string;
}

interface BookmarkProps {
  data: Item[];
}

const Bookmark: React.FC<BookmarkProps> = () => {
  const { query } = useLocalSearchParams()
  const { data: posts, refetch } = useAppwrite(() => searchPosts(query));
  
  useEffect(() => {
   refetch()
  }, [query])

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item}/>}
        ListHeaderComponent={() => (
          <View className="flex my-6 px-4">
                <Text className=" font-psemibold text-xl text-gray-100">
                  Bookmarks
                </Text>
                <Text className="text-2xl font-psemibold text-white">
                  {query}
                </Text>
            <View className="mt-6 mb-8">
            <SearchInput
            placeholder="search something on aora"
            initialQuery={query}
            />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No videos found for this search..."
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Bookmark;
