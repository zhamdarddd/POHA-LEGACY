import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/poha-logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <View style={styles.titleRow}>
        <Text style={styles.title}>Poha</Text>
        <Text style={styles.legacy}>Legacy</Text>
      </View>
      <Text style={styles.subtitle}>"Building a Legacy of Knowledge"</Text>
      <View style={styles.dotsContainer}>
        <View style={[styles.dot, styles.activeDot]} />
        <View style={styles.dot} />
        <View style={styles.dot} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 10,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: 6,
  },
  title: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#2F4252",
    marginRight: 6,
  },
  legacy: {
    fontSize: 22,
    color: "#2F4252",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 16,
    color: "#2F4252",
    fontStyle: "italic",
    marginVertical: 18,
    textAlign: "center",
  },
  dotsContainer: {
    flexDirection: "row",
    marginTop: 10,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 6,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#D9D9D9",
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: "#2F4252",
  },
});
