import { AppProvider } from "@/redux/AppProvider";
import {
  Lato_400Regular,
  Lato_700Bold,
  Lato_900Black,
  useFonts,
} from "@expo-google-fonts/lato";
import { Stack } from "expo-router";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Lato_400Regular,
    Lato_700Bold,
    Lato_900Black,
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <AppProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </AppProvider>
  );
}
