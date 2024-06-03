import { View, Text, FlatList, TouchableOpacity, ImageBackground, Image } from 'react-native';
import React, { useState } from 'react';
import * as AnimaTable from 'react-native-animatable';
import { icons } from '../constants';
import { Video, ResizeMode, AVPlaybackStatus } from 'expo-av';

// Define types for the props
interface TrendingProps {
  posts: Post[];
}

interface Post {
  $id: string;
  video: string;
  thmbnail: string;
}

interface TrendingItemProps {
  activeItem: any;
  item: Post;
}

const zoomIn = {
  0: {
    scale: 0.9
  },
  1: {
    scale: 1.1
  }
};

const zoomOut = {
  0: {
    scale: 1.1
  },
  1: {
    scale: 0.9
  }
};

const TrendingItem: React.FC<TrendingItemProps> = ({ activeItem, item }) => {
  const [play, setPlay] = useState(false);

  return (
    <AnimaTable.View
      className="mr-5"
      // @ts-ignore
      animation={activeItem === item.$id ? zoomIn : zoomOut}
      duration={500}
    >
      {play ? (
        <Video
          source={{ uri: item.video }}
          className="w-52 h-72 rounded-[33px] mt-3 bg-white/10"
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status: any) => {
            if (status.didJustFinish) {
              setPlay(false);
            }
          }}
        />
      ) : (
        <TouchableOpacity
          className="relative flex justify-center items-center"
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
        >
          <ImageBackground
            source={{
              uri: item.thmbnail,
            }}
            className="w-52 h-72 rounded-[33px] my-5 overflow-hidden shadow-lg shadow-black/40"
            resizeMode="cover"
          />

          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </AnimaTable.View>
  );
};

const Trending: React.FC<TrendingProps> = ({ posts }) => {
  const [activeItem, setActiveItem] = useState(posts[1]);

  const viewableItemsChanged = ({ viewableItems }: { viewableItems: any }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key);
    }
  };

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <TrendingItem activeItem={activeItem} item={item} />
      )}
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={{
        viewAreaCoveragePercentThreshold: 70,
      }}
      contentOffset={{ x: 170, y: 0 }}
      horizontal
    />
  );
};

export default Trending;
