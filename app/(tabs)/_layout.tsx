import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { Tabs, usePathname } from "expo-router";
import { FloatingButton } from "@/components/FloatingButton";

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
      {pathname !== "/expenses" && <FloatingButton />}
    </>
  );
}
