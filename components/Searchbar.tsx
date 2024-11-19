import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '@/constants/Colors'

type Props = {
  withHorizontalPadding: boolean,
  setSearchQuery: Function
}

const SearchBar = ({ withHorizontalPadding, setSearchQuery }: Props) => {
  return (
    <View style={[styles.container, withHorizontalPadding && { paddingHorizontal: 20 }]}>
      <View style={styles.searchbar}>
        <Ionicons name="search-outline" size={20} color={Colors.lightGrey}
        />
        <TextInput
          style={styles.searchTxt}
          placeholder='Search'
          placeholderTextColor={Colors.lightGrey} 
         onChangeText={query => setSearchQuery(query)}
         autoCapitalize='none' />
      </View>
    </View>
  )
}

export default SearchBar

const styles = StyleSheet.create({
  container: {
    // marginHorizontal: 20,
    marginVertical: 10
  },
  searchbar: {
    backgroundColor: '#E4E4E4',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
    flexDirection: 'row',
    gap: 10,

  },
  searchTxt: {
    fontSize: 14,
    flex: 1,
    color: Colors.darkGrey,

  }
})