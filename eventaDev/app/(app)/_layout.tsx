import { Stack } from "expo-router";
import NavButton from "../../components/Buttons/NavButton";
import AntDesign from '@expo/vector-icons/AntDesign';
import { TransitionPresets } from '@react-navigation/stack';
import * as Notifications from "expo-notifications";
import { useEffect } from "react";
import { Alert, Platform } from "react-native";


const RootLayout = () => {
    useEffect(() => {
        const configurePushNotifications = async () => {
            const { status } = await Notifications.getPermissionsAsync();
            let finalStatus = status;

            if (finalStatus !== "granted") {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }

            if (finalStatus !== "granted") {
                Alert.alert("Permissions required", "(Temporary alert, does not require permissions: add redux)");
            }

            const pushTokenData = await Notifications.getExpoPushTokenAsync();
            console.log("Push token", pushTokenData);

            if (Platform.OS === "android") {
                Notifications.setNotificationChannelAsync("default", {
                    name: "default",
                    importance: Notifications.AndroidImportance.DEFAULT,
                });
            }
        }

        configurePushNotifications();
    }, [])

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
