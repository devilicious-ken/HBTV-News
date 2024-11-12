import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { Colors } from "react-native/Libraries/NewAppScreen";

const Page = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <ImageBackground 
        source={require('@/assets/images/getting-started.jpg')}
        style={{flex: 1}}
        resizeMode="cover"
      >
      <View style={styles.wrapper}>
      <Text style={styles.title}>HBTV News</Text>
      <Text style={styles.tagline}>Stay Informed, Stay Ahead</Text>
      <Text style={styles.description}>HBTV News brings you the latest headlines, breaking news, and in-depth analysis from around the world. With a sleek, user-friendly interface and real-time updates, HBTV News ensures you never miss a story. Stay informed and stay ahead with HBTV News, your trusted source for accurate and timely news coverage.</Text>
      <TouchableOpacity style={styles.btn} onPress={() => router.replace("/(tabs)")}>
        <Text style={styles.btnText}>Go to Home Screen</Text>
      </TouchableOpacity>
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
    backgroundColor: Colors.tint,
    paddingVertical: 15,

  },
  btnText: {

  }
});
