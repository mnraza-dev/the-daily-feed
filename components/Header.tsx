import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'

type Props = {}

const Header = (props: Props) => {
  return (
    <View style={styles.container}>
      <Image style={styles.userImage} source={{ uri: 'https://randomuser.me/api/portraits/men/34.jpg' }} />

      <Ionicons name='notifications-outline' size={30} color="black" />
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
  ,
  userImage:{
    width:50,
    height:50,
    borderRadius:30,

  }
})