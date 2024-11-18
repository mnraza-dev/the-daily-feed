import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '@/constants/Colors'

type Props = {}

const Header = (props: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <Image style={styles.userImage} source={{ uri: 'https://randomuser.me/api/portraits/men/34.jpg' }} />
        <View style={{
          gap:3
        }}>
          <Text style={styles.welcomeText}>Welcome</Text>
          <Text style={styles.usernameText}>John Doe</Text>
        </View>
      </View>

      <TouchableOpacity onPress={() => console.log('notification')}>
        <Ionicons name='notifications-outline' size={24} color={Colors.black} />
      </TouchableOpacity>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  container: {

    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  }
  ,
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 30,

  },
  userInfo:{
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  welcomeText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.darkGrey,
  },
  usernameText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.black,
  }
})