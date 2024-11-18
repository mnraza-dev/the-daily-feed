import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";
import Animated, { FadeInDown, FadeInRight } from "react-native-reanimated";
import { StatusBar } from "expo-status-bar";

const Page = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ImageBackground
        source={require("@/assets/images/getting-started.jpg")}
        style={{ flex: 1, width: "100%", height: "100%" }}
        resizeMode="cover"
      >
        <View style={styles.wrapper}>
          <Animated.Text entering={FadeInRight.delay(300).duration(500)} style={styles.title}>Stay Updated!</Animated.Text>
          <Animated.Text entering={FadeInRight.delay(700).duration(500)} style={styles.description}>
            Get the latest news and personalised updates from around the world directly to your feed.
          </Animated.Text>
          <Animated.View
            entering={FadeInDown.delay(400).duration(500)}
            exiting={FadeInRight.delay(300).duration(500)}
            style={styles.btnWrapper}>
            <TouchableOpacity style={styles.btn} onPress={() => router.replace("/(tabs)")}>
              <Text style={styles.btnText}>Get Started </Text>
            </TouchableOpacity>
          </Animated.View>
        </View>

      </ImageBackground>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  wrapper: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 30,
    paddingBottom: 50,
    gap: 10,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    alignItems: "center",

  },
  title: {
    fontSize: 24, color: Colors.white,
    fontWeight: 600,
    letterSpacing: 1.5,
    lineHeight: 36,
    textAlign: 'center',
  },
  description: {
    fontSize: 16, color: Colors.white,
    fontWeight: 500,
    letterSpacing: 1.2,
    lineHeight: 22,
    textAlign: 'center',
  },
  btnWrapper: {
    width: "100%",
  },
  btn: {
    backgroundColor: Colors.tint,
    alignItems: "center",
    borderRadius: 10,
    paddingVertical: 15,
    marginVertical: 20,

  },
  btnText: {
    fontSize: 16,
    fontWeight: 700,
    color: Colors.white,
    letterSpacing: 1.2
  }
});
