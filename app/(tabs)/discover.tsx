import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import SearchBar from '@/components/Searchbar'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Colors } from '@/constants/Colors'
import newsCategoryList from '@/constants/Categories'
import CheckBox from '@/components/CheckBox'
import { useNewsCategories } from '@/hooks/useNewsCategories'
import { useNewsCountries } from '@/hooks/useNewsCountries'
import { Link } from 'expo-router'


type Props = {}

const Page = (props: Props) => {
  const { top: safeTop } = useSafeAreaInsets();
  const { newsCategories, toggleNewsCategory } = useNewsCategories();
  const { newsCountries, toggleCountry } = useNewsCountries();

  const [searchQuery, setSearchQuery] = useState('')
  const [country, setCountry] = useState('')
  const [category, setCategory] = useState('')


  return (
    <View style={[styles.container, { paddingTop: safeTop }]}>
      <SearchBar setSearchQuery={setSearchQuery} withHorizontalPadding={false} />
      <Text style={styles.title}>Categories</Text>
      <View style={styles.listContainer}>

        {newsCategories.map((item) => {
          return (
            <CheckBox checked={item.selected} onPress={() => {

              toggleNewsCategory(item.id)
              setSearchQuery(item.slug)

            }} key={item.id} label={item.title} />

          )
        })}
      </View>
      <Text style={styles.title}>Countries</Text>

      <View style={styles.listContainer}>

        {newsCountries.map((item, index) => {
          return (
            <CheckBox
              checked={item.selected}
              onPress={() => {

                toggleCountry(index)
                setCountry(item.code)
              }}
              key={index}
              label={item.name} />

          )
        })}
      </View>
      <Link href={{
        pathname: `/news/search`,
        params: { query: searchQuery, category, country }
      }}>
        <TouchableOpacity style={styles.SearchBtn} onPress={() => { }}>
          <Text style={styles.BtnText}>
            Search
          </Text>
        </TouchableOpacity>
      </Link>
    </View>
  )
}

export default Page

const styles = StyleSheet.create({
  SearchBtn: {
    backgroundColor: Colors.tint,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 18,


  },
  BtnText: {
    textAlign: 'center',
    color: Colors.white,
    fontSize: 16,
    fontWeight: 600,

  },
  container: {
    paddingHorizontal: 20,
    // marginVertical:20
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
    marginBottom: 10,
  },
  listContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginTop: 12,
    marginBottom: 20,
  },

})