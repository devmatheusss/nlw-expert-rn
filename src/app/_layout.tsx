import { Slot, Stack } from "expo-router";
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  useFonts
} from '@expo-google-fonts/inter'

import { Loading } from "@/components/loading";
import { SafeAreaView } from "react-native";
import colors from "tailwindcss/colors";

export default function Layout() {
  const [fontsLoaded] = useFonts({
    Inter_600SemiBold,
    Inter_500Medium,
    Inter_400Regular,
    Inter_700Bold
  })

  if (!fontsLoaded) {
    return <Loading />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: colors.slate[900]
        },
        animation: "ios"
      }}
    >
      <Stack.Screen
        name="index"
      />
      <Stack.Screen
        name="product/[id]"
      />
    </Stack>
  )

  // return (
  //   <SafeAreaView className="flex-1 bg-slate-900">
  //     <Slot />
  //   </SafeAreaView>
  // )
}