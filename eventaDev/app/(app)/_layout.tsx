import { Stack } from "expo-router";
import NavButton from "../../components/Buttons/NavButton";
import AntDesign from '@expo/vector-icons/AntDesign';
import { TransitionPresets } from '@react-navigation/stack';
import * as Notifications from "expo-notifications";
import { useEffect } from "react";


const RootLayout = () => {
    // useEffect(() => {
    //     Notifications.getExpoPushTokenAsync().then((pushToken) => {
    //         console.log("Push token", pushToken);
    //     })
    // }, [])

    return (
        <Stack>
            <Stack.Screen
                name="(tabs)"
                options={{
                    headerShown: false,
                    animation: "slide_from_left",
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
            />
            <Stack.Screen
                name="(event_files)/[id]"
                options={{
                    headerShown: false,
                }}
            /> */}
        </Stack>
    );

};

export default RootLayout;
