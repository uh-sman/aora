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
import { getBookmarkedPost, searchPosts } from "../../lib/appwrite";
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
  const { data: posts, refetch } = useAppwrite(getBookmarkedPost());
  
 

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        horizontal
        renderItem={({ item }) => <VideoCard video={item}/>}
        ListHeaderComponent={() => (
          <View className="flex my-6 px-4">
                <Text className="text-2xl font-psemibold text-white">
                Bookmarks
                </Text>
            <View className="mt-6 mb-8">
            {/* <SearchInput
            placeholder="search something on aora"
            initialQuery={}
            /> */}
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
