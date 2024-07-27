import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const SettingsLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="settings-menu"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
      <StatusBar style="light" backgroundColor="#161622" />
    </>
  );
};

export default SettingsLayout;
