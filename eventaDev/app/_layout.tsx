import { Stack } from "expo-router";

const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />
      {/* <Stack.Screen name="(tabs)/(messages)"/> */}
    </Stack>
  );
};

export default RootLayout;
