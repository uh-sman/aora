import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ListRenderItem,
  TouchableOpacity,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchInput from "../../components/SearchInput";
import EmptyState from "../../components/EmptyState";
import {  getUserPosts } from "../../lib/appwrite";
import useAppwrite from "../../lib/useAppwrite";
import VideoCard from "../../components/VideoCard";
import { useLocalSearchParams } from "expo-router";
import { useGlobalContext } from "../../context/GlobalProvider";
import { icons } from "../../constants";
import InfoBox from "../../components/InfoBox";
interface Item {
  $id: string;
  id: string;
  title: string;
}

interface SearchProps {
  data: Item[];
}

const Profile: React.FC<SearchProps> = () => {
  const { user } = useGlobalContext()
  
  const { data: posts, refetch } = useAppwrite(() => getUserPosts(user.$id));
  const logout = () => {}

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item}/>}
        ListHeaderComponent={() => (
        <View className="w-full justify-center items-center mt-6 mb-12 px-4">
          <TouchableOpacity className="w-full items-end mb-10" onPress={logout}>
            <Image 
            source={icons.logout}
            resizeMode="contain"
            className="w-6 h-6"
            />
          </TouchableOpacity>
          <View className="w-16 h-16 border border-secondary rounded-lg justify-center items-center">
            <Image 
            source={{ uri: user?.avatar }}
            className="w-[90%] h-[90%] rounded-lg"
            resizeMode="cover"
            />
            <InfoBox title={user?.username} containerStyles="mt-5" titleStyles="text-lg"/>
            <View className="mt-5 flex-row">
            <InfoBox title={posts.length || 0} containerStyles="mr-10" titleStyles="text-xl" subtitle="Posts"/>
            <InfoBox title="1.2k"  titleStyles="text-xl" subtitle="Followers"/>
            </View>
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

export default Profile;