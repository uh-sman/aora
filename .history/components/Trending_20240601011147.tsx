import { View, Text, FlatList, TouchableOpacity, ImageBackground, Image } from 'react-native'
import React, { useState } from 'react'
import * as AnimaTable from "react-native-animatable"
import { icons } from '../constants';
interface TrendingProps {
    posts: any
  }

  interface TrendingItemProps {
    activeItem: any;
    item: any
  }


  const zoomIn = {
    0: {
      scale: 0.9
    },
    1: {
      scale: 1
    }
  }
  const zoomOut = {
    0: {
      scale: 1
    },
    1: {
      scale: 0.9
    }
  }

const TrendingItem = ({ activeItem, item }: TrendingItemProps) => {
  const [play, setPlay] = useState(false)
  return (
    <AnimaTable.View
    className='mr-5'
    // @ts-ignore
    animation={activeItem.$id === item.$id ? zoomIn : zoomOut}
    duration={500}
    >
      {
        play ? <Text className='text-white'>Playing</Text> : (
          <TouchableOpacity className='relative justify-center items-center' activeOpacity={0.7} onPress={() => setPlay(true)}>
            <ImageBackground source={{ uri: item.thmbnail }}
            className='w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40'
            resizeMode='cover'
            />
            <Image source={icons.play} className='w-12 h-12 absolute' resizeMode='contain'/>
          </TouchableOpacity>
        )
      }
    </AnimaTable.View>
  )
}
const Trending = ({ posts }: TrendingProps) => {
  const [activeItem, setActiveItem] = useState(posts[0])
  return (
   <FlatList
    data={posts}
    keyExtractor={(item) => item.$id}
    renderItem={({ item }) => (
       <TrendingItem activeItem={activeItem} item={item}/>
    )}
    horizontal
    />
  )
}

export default Trending