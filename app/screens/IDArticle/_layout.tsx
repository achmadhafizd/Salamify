import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const ScreensLayout = () => {
  return (
    <>
      <Stack>
      <Stack.Screen name="DetailsArticle" options={{ headerShown: false }} />
      <Stack.Screen name="UpdateArticle" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="light" backgroundColor="#161622" />
    </>
  );
};

export default ScreensLayout;
