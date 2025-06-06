import { View, Image, Text } from "react-native";

export default function SplashScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
      }}
    >
      <Image
        source={require("../assets/splash-icon.png")}
        style={{ width: 128, height: 128 }}
      />
      <Text style={{ fontSize: 24, marginTop: 16 }}>POHA Legacy</Text>
    </View>
  );
}
