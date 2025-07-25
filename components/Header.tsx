import { Ionicons } from "@expo/vector-icons";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

export const Header = () => {
  return (
    <View style={styles.header}>
      <Image
        source={require("@/assets/images/logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      <TouchableOpacity style={styles.profileButton}>
        <Ionicons name="person-circle-outline" size={40} color="#D1D5DB" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 10,
    fontFamily: "Lato_400Regular",
  },
  logo: {
    width: 120,
    height: 40,
  },
  profileButton: {
    padding: 5,
  },
});
