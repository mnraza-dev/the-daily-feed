import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '@/constants/Colors'

type Props = {}

const SearchBar = (props: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.searchbar}>
        <Ionicons name="search-outline" size={20} color={Colors.lightGrey}
        />
        <TextInput
          style={styles.searchTxt}
          placeholder='Search'
          placeholderTextColor={Colors.lightGrey} autoCapitalize='none' />
      </View>
    </View>
  )
}

export default SearchBar

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20
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