/** @format */

import React, { useEffect, useRef } from "react";
import {
  Animated,
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions
} from "react-native";

const { width, height } = Dimensions.get("window");

const SplashScreen = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial opacity value
  const scaleAnim = useRef(new Animated.Value(0.5)).current; // Initial scale value

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1500, // Duration of fade-in animation
        useNativeDriver: true
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 1500, // Duration of scale animation
        useNativeDriver: true
      })
    ]).start();

    const timer = setTimeout(() => {
      navigation.replace("Home");
    }, 3000); // 3 seconds delay to allow animations to finish

    // Cleanup timer on unmount
    return () => clearTimeout(timer);
  }, [navigation, fadeAnim, scaleAnim]);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require("../assets/image.png")}
        style={[
          styles.image,
          { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }
        ]}
        resizeMode='contain'
      />
      <Animated.Text style={[styles.title, { opacity: fadeAnim }]}>
        AWS
      </Animated.Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black"
  },
  image: {
    width: width * 0.8, // Responsive width
    height: height * 0.5, // Responsive height
    marginBottom: 20
  },
  title: {
    color: "#FFFFE0",
    fontSize: 44,
    fontWeight: "bold",
    textShadowColor: "rgba(255, 255, 0, 0.8)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 10
  }
});
