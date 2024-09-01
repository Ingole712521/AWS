/** @format */

import React, { useRef, useEffect, useState } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Dimensions
} from "react-native";

// Import logos from the assets folder
import logo1 from "../assets/auto.png";
import logo2 from "../assets/bucket.png";
import logo3 from "../assets/ec2.png";
import logo4 from "../assets/secret.png";
import logo5 from "../assets/sss.png";

const awsServices = [
  { id: "1", name: "EC2", detail: "Scalable virtual servers in the cloud." },
  {
    id: "2",
    name: "S3",
    detail: "Secure, durable, and scalable object storage."
  },
  {
    id: "3",
    name: "Lambda",
    detail: "Run code without provisioning or managing servers."
  },
  { id: "4", name: "RDS", detail: "Managed relational database service." },
  { id: "5", name: "DynamoDB", detail: "NoSQL database service." }
];

const logos = [
  { id: "1", source: logo1 },
  { id: "2", source: logo2 },
  { id: "3", source: logo3 },
  { id: "4", source: logo4 },
  { id: "5", source: logo5 }
];

const { height } = Dimensions.get("window");

const Home = () => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const [currentLogoIndex, setCurrentLogoIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLogoIndex((prevIndex) => (prevIndex + 1) % logos.length);
    }, 2000); // Change logo every 2 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    Animated.loop(
      Animated.timing(scrollY, {
        toValue: 1,
        duration: 5000, // Adjust the duration for slower/faster scrolling
        useNativeDriver: true
      })
    ).start();
  }, [scrollY]);

  const translateY = scrollY.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -50] // Adjust the output range for the scroll height
  });

  const renderService = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.serviceName}>{item.name}</Text>
      <Text style={styles.serviceDetail}>{item.detail}</Text>
    </View>
  );

  const ListHeader = () => (
    <View style={styles.headerContainer}>
      <Animated.Image
        source={logos[currentLogoIndex].source}
        style={[styles.logo, { transform: [{ translateY }] }]}
        resizeMode='contain'
      />
      <Text style={styles.header}>AWS Services</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={awsServices}
        renderItem={renderService}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={ListHeader}
        contentContainerStyle={styles.flatListContent}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    paddingHorizontal: 20,
    paddingTop: 20
  },
  flatListContent: {
    flexGrow: 1,
    justifyContent: "center"
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 20
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "white"
  },
  itemContainer: {
    backgroundColor: "black",
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    borderColor: "#ddd",
    borderWidth: 1,
    width: "100%"
  },
  serviceName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white"
  },
  serviceDetail: {
    fontSize: 14,
    color: "white"
  }
});
