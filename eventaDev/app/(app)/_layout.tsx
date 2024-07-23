import { Stack } from "expo-router";
import NavButton from "../../components/Buttons/NavButton";
import AntDesign from '@expo/vector-icons/AntDesign';
import { TransitionPresets } from '@react-navigation/stack';
import * as Notifications from "expo-notifications";
import { useEffect } from "react";
import { Alert, Platform } from "react-native";
import { StripeProvider } from "@stripe/stripe-react-native";

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
        <StripeProvider publishableKey={'pk_test_51Pc8OiJKz0GBX0rUq3nmv4LpaMT9DT7Rq61UKkvwHGT9x91dRyq2qZPUwlvzMMPf1yOwAxFfhkq6PkxlibirmFrq000ccVB30h' || ''} >
            <Stack>
                <Stack.Screen
                    name="(tabs)"
                    options={{
                        headerShown: false,
                        animation: "slide_from_left",
                    }}
                />
            </Stack>
        </StripeProvider>
    );

};

export default RootLayout;
