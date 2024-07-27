import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const ScreensLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen name="[RunTextId]" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="light" backgroundColor="#161622" />
    </>
  );
};

export default ScreensLayout;
