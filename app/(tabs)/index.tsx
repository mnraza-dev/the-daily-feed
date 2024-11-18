import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Header from '@/components/Header'
import SearchBar from '@/components/Searchbar'
import { NewsDataType } from '@/types'
import BreakingNews from '@/components/BreakingNews'
import Animated, { useAnimatedRef, useSharedValue } from 'react-native-reanimated'
import Categories from '@/components/Categories'


type Props = {}

const Page = (props: Props) => {
  const { top: safeTop } = useSafeAreaInsets();
  const [breakingNews, setBreakingNews] = useState<NewsDataType[]>([]);



  const [loading, setLoading] = useState(true)
  useEffect(() => {
    getBreakingNews();
  }, [])

  const getBreakingNews = async () => {
    try {
      const URL = `https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_API_KEY}&q=india`;
      const response = await axios.get(URL);
      if (response && response.data) {
        setBreakingNews(response.data.results);
        setLoading(false);
        console.log(response.data);
      }
    }
    catch (err: any) {
      console.log("Error Message", err.message);
    }
  }

  return (
    <View style={[styles.container, { paddingTop: safeTop }]}>

      <Header />
      <SearchBar />
      {
        loading ? (<ActivityIndicator size={'large'} />) :
         (<BreakingNews newsList={breakingNews} />)
      }
      <Categories />
    </View >
  )
}

export default Page

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})