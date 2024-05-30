import { Stack } from "expo-router";
import NavButton from "../../components/Buttons/NavButton";
import AntDesign from '@expo/vector-icons/AntDesign';

const RootLayout = () => {
    return (
        <Stack>
            <Stack.Screen
                name="(tabs)"
                options={{
                    headerShown: false,
                }}
            />
            {/* <Stack.Screen
                name="(messages)/[id]"
                options={{
                    headerLeft: () => (
                        <NavButton
                            destination="(tabs)"
                            icon={<AntDesign name="left" size={24} color="black"/>}
                        />
                      ),
                }}
            />
            <Stack.Screen
                name="(profile)/Account"
                options={{
                    headerLeft: () => (
                        <NavButton
                            destination="(tabs)"
                            icon={<AntDesign name="left" size={24} color="black"/>}
                        />
                      ),
                }}
            /> */}
        </Stack>
    );

};

export default RootLayout;
