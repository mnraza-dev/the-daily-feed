import { ActivityIndicator, FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Header from '@/components/Header'
import SearchBar from '@/components/Searchbar'
import { NewsDataType } from '@/types'
import BreakingNews from '@/components/BreakingNews'
import Animated, { useAnimatedRef, useSharedValue } from 'react-native-reanimated'
import Categories from '@/components/Categories'
import NewsList from '@/components/NewsList'
import Loading from '@/components/Loading'


type Props = {}

const Page = (props: Props) => {
  const { top: safeTop } = useSafeAreaInsets();
  const [breakingNews, setBreakingNews] = useState<NewsDataType[]>([]);
  const [news, setNews] = useState<NewsDataType[]>([]);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getBreakingNews();
    getNews();
  }, [])

  const getBreakingNews = async () => {
    try {
      const URL = `https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_API_KEY}&size=5`;
      const response = await axios.get(URL);
      if (response && response.data) {
        setBreakingNews(response.data.results);
        setLoading(false);
        // console.log(response.data);
      }
    }
    catch (err: any) {
      console.log("Error Message", err.message);
    }
  }
  const getNews = async (category: string = '') => {
    try {
      let categoryString = '';
      if (category.length !== 0) {
        categoryString = `&category=${category}`;
      }
      const URL = `https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_API_KEY}&size=10${categoryString}`;
      const response = await axios.get(URL);
      if (response && response.data) {
        setNews(response.data.results);
        setLoading(false);
        // console.log(response.data);
      }
    }
    catch (err: any) {
      console.log("Error Message", err.message);
    }
  }

  const onCatChanged = (category: string) => {
    // console.log('Category', category);
    setNews([]);
    getNews(category);

  }
  return (
    <ScrollView style={[styles.container, { paddingTop: safeTop }]}>

      <Header />
      <SearchBar withHorizontalPadding={true} />
      {
        loading ? (<Loading size={'large'} />) :
          (<BreakingNews newsList={breakingNews} />)
      }
      <Categories onCategoryChanged={onCatChanged} />
      <NewsList newsList={news} />
    </ScrollView >
  )
}

export default Page

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})