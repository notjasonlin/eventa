import { Stack } from "expo-router";

const Nav = () => {
    return (
        <Stack>
            <Stack.Screen
                name="(tabs)"
                options={{
                    headerShown: false,
                }}
            />
        </Stack>
    );
}

export default Nav;