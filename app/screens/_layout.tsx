import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const ScreensLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen name="CreateArticle" options={{ headerShown: false }} />
        <Stack.Screen name="CreateKas" options={{ headerShown: false }} />
        <Stack.Screen name="CreatePetugas" options={{ headerShown: false }} />
        <Stack.Screen name="CreateQurban" options={{ headerShown: false }} />
        <Stack.Screen name="IDUstadz" options={{ headerShown: false }} />
        <Stack.Screen name="IDQurban" options={{ headerShown: false }} />
        <Stack.Screen name="IDArticle" options={{ headerShown: false }} />
        <Stack.Screen name="IDKas" options={{ headerShown: false }} />
        <Stack.Screen name="IDMasjid" options={{ headerShown: false }} />
        <Stack.Screen name="ControlerTimer" options={{ headerShown: false }} />
        <Stack.Screen name="ChangePassword" options={{ headerShown: false }} />
        <Stack.Screen name="ChangeEmail" options={{ headerShown: false }} />
        <Stack.Screen name="ChangeUsername" options={{ headerShown: false }} />
        <Stack.Screen name="AboutUs" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="light" backgroundColor="#161622" />
    </>
  );
};

export default ScreensLayout;
