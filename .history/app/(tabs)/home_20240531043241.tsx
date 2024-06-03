import React from "react";
import { View, Text, FlatList, ListRenderItem, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {images} from "../../constants"
import SearchInput from "../../components/SearchInput";
import Trending from "../../components/Trending";
import EmptyState from "../../components/EmptyState";
interface Item {
  $id: string;
  id: string;
}

interface HomePropsValue {
  data: Item[];
}

const Home: React.FC<HomePropsValue> = ({ data }) => {
  const renderItem: ListRenderItem<Item> = ({ item }) => (
    <Text className="text-3xl text-white">{item.id}</Text>
  );
  const ListComponent = () => {
    <View className="my-6 px-4 space-y-6">
      <View className="justify-between items-start flew-row mb-6">
        <View>
          <Text className="font-pmedium text-sm text-gray-100">
            Welcome Back
          </Text>
          <Text className="text-2xl font-psemibold text-white">Usman</Text>
        </View>
      </View>
    </View>;
  };
  return (
    <SafeAreaView className="bg-primary">
      <FlatList
        data={data}
        keyExtractor={(item) => item.$id}
        renderItem={renderItem}
        ListHeaderComponent={() => (
          <View className="flex my-6 px-4 space-y-6">
            <View className="flex justify-between items-start flew-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Welcome Back
                </Text>
                <Text className="text-2xl font-psemibold text-white">
                  Usman
                </Text>
              </View>
              <View className="mt-1.5">
                <Image source={images.logoSmall}
                className="w-9 h-10"
                resizeMode="contain"
                />
              </View>
            </View>
            <SearchInput title="search" placeholder="search for a video topic"/>
            <View className="w-full flex-1 pt-5 pb-8 "></View>
            <Text className="text-gray-100 text-lg font-pregular mb-8">
                Latest Videos
            </Text>
            <Trending posts={[{ id: 1 }, { id: 2 }, { id: 3 }] ?? []} />
          </View>
        )}
        ListEmptyComponent={() => (
            <EmptyState title="No Videos Found" subtitle="Be the first one to upload a video"/>
        )}
      />
    </SafeAreaView>
  );
};

export default Home;






{/* <FlatList
        data={data}
        keyExtractor={(item) => item.$id}
        renderItem={renderItem}
        ListHeaderComponent={() => (
          <View className="flex my-6 px-4 space-y-6">
            <View className="flex justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Welcome Back
                </Text>
                <Text className="text-2xl font-psemibold text-white">
                  JSMastery
                </Text>
              </View>

              <View className="mt-1.5">
                <Image
                  source={images.logoSmall}
                  className="w-9 h-10"
                  resizeMode="contain"
                />
              </View>
            </View>

            <SearchInput />

            <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-lg font-pregular text-gray-100 mb-3">
                Latest Videos
              </Text>

              <Trending posts={latestPosts ?? []} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No videos created yet"
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      /> */}