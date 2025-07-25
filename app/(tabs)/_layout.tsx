import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { router, Tabs, usePathname } from "expo-router";
import { StyleSheet, TouchableOpacity, View } from "react-native";

export default function TabLayout() {
  const pathname = usePathname();
  return (
    <>
      <Tabs
        screenOptions={{ headerShown: false, tabBarActiveTintColor: "#005EE8" }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: (tab) => (
              <MaterialCommunityIcons
                name="home-thermometer-outline"
                size={24}
                color={tab.color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="analytics"
          options={{
            title: "Analytics",
            tabBarIcon: (tab) => (
              <MaterialIcons name="analytics" size={24} color={tab.color} />
            ),
          }}
        />
        <Tabs.Screen
          name="expenses"
          options={{
            href: null,
            tabBarStyle: { display: "none" }, // hides tab bar when this screen is active
          }}
        />
      </Tabs>
      {/* Floating Action Button */}
      {pathname !== "/expenses" && (
        <View style={styles.fabContainer} pointerEvents="box-none">
          <TouchableOpacity
            style={styles.fabButton}
            onPress={() => {
              router.push("/(tabs)/expenses");
            }}
          >
            <Ionicons name="add" size={28} color="white" />
          </TouchableOpacity>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  fabContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 40, // adjust as needed to float above the tab bar
    alignItems: "center",
    zIndex: 100,
    pointerEvents: "box-none",
  },
  fabButton: {
    backgroundColor: "#000000",
    borderRadius: 32,
    width: 64,
    height: 64,
    justifyContent: "center",
    alignItems: "center",
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});
