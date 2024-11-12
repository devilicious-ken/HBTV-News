import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { Colors } from "react-native/Libraries/NewAppScreen";
import Animated, { FadeInDown, FadeInRight } from "react-native-reanimated";
import { StatusBar } from "expo-status-bar";


const Page = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ImageBackground 
        source={require('@/assets/images/getting-started.jpg')}
        style={{flex: 1}}
        resizeMode="cover"
      >
      <View style={styles.wrapper}>
        <Animated.Text style={styles.title}
          entering={FadeInRight.delay(300).duration(500)}>HBTV News</Animated.Text>
        <Animated.Text style={styles.tagline}
          entering={FadeInRight.delay(300).duration(500)}>Stay Informed, Stay Ahead</Animated.Text>
        <Animated.Text style={styles.description}
          entering={FadeInRight.delay(700).duration(500)}>HBTV News brings you the latest headlines, breaking news, and in-depth analysis from around the world. With a sleek, user-friendly interface and real-time updates, HBTV News ensures you never miss a story. Stay informed and stay ahead with HBTV News, your trusted source for accurate and timely news coverage.</Animated.Text>
        <Animated.View entering={FadeInDown.delay(1200).duration(500)}>
          <TouchableOpacity style={styles.btn} onPress={() => router.replace("/(tabs)")}>
            <Text style={styles.btnText}>Get Started</Text>
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
  },
  wrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 50,
    paddingHorizontal: 30,
    gap: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  title: {
    color: Colors.white,
    fontSize: 24,
    fontWeight: '600',
    letterSpacing: 1.5,
    lineHeight: 36,
    textAlign: 'center',
  },
  tagline: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 1.2,
    lineHeight: 22,
    textAlign: 'center'
  },
  description: {
    color: Colors.white,
    fontSize: 13,
    fontWeight: '400',
    letterSpacing: 1.2,
    lineHeight: 22,
    textAlign: 'center'
  },
  btn: {
    backgroundColor: '#1DA000',
    paddingVertical: 15,
    marginVertical: 20,
    alignItems: 'center',
    borderRadius: 10,

  },
  btnText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '700'
  }
});
