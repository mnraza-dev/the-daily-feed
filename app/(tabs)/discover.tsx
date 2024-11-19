import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import SearchBar from '@/components/Searchbar'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Colors } from '@/constants/Colors'
import newsCategoryList from '@/constants/Categories'


type Props = {}

const Page = (props: Props) => {
  const { top: safeTop } = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: safeTop }]}>
      <SearchBar withHorizontalPadding={false} />
      <Text style={styles.title}>Categories</Text>
      <View style={styles.listContainer}>

        {newsCategoryList.map((item) => {
          return (
            <CheckBox  key={item.id}>
              <Text>{item.title}</Text>
            </CheckBox>
          )
        })}
      </View>
    </View>
  )
}

export default Page

const styles = StyleSheet.create({
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