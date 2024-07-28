import { Stack } from "expo-router";
import NavButton from "../../components/Buttons/NavButton";
import AntDesign from '@expo/vector-icons/AntDesign';
import { TransitionPresets } from '@react-navigation/stack';
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { useEffect, useRef, useState } from "react";
import { Alert, Platform } from "react-native";
import { StripeProvider } from "@stripe/stripe-react-native";
import { supabase } from "../../lib/supabase";
import { useSelector } from "react-redux";
import { RootState } from "../../store/redux/store";
import Constants from "expo-constants";

const configurePushNotifications = async () => {
    const { status } = await Notifications.getPermissionsAsync();
    let finalStatus = status;
    let token = "";

    if (Platform.OS === "android") {
        Notifications.setNotificationChannelAsync("default", {
            name: "default",
            importance: Notifications.AndroidImportance.DEFAULT,
        });
    }

    if (Device.isDevice) {
        if (finalStatus !== "granted") {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }

        if (finalStatus !== "granted") {
            Alert.alert("Permissions required", "(Temporary alert, does not require permissions: add redux)");
        }

        const pushTokenData = await Notifications.getExpoPushTokenAsync({
            projectId: Constants?.expoConfig?.extra?.eas.projectId,
        });
        token = pushTokenData.data;
        // console.log("Push token", pushTokenData);
    } else {
        console.error("Must use physical device for push notifications")
    }

    return token;
}

const RootLayout = () => {
    const [expoPushToken, setExpoPushToken] = useState("");
    const [notification, setNotification] =
        useState<Notifications.Notification>();
    const notificationListener = useRef<Notifications.Subscription>();
    const responseListener = useRef<Notifications.Subscription>();
    const session = useSelector((state: RootState) => state.authentication.session);

    useEffect(() => {
        configurePushNotifications().then(async (token) => {
            setExpoPushToken(token);
            // console.log(token);

            const { error } = await supabase
                .from("profile")
                .update({ expo_push_token: token })
                .eq("id", session?.user.id);
            console.log(error);
        });

        notificationListener.current =
            Notifications.addNotificationReceivedListener((notification) => {
                setNotification(notification);
            });

        responseListener.current =
            Notifications.addNotificationResponseReceivedListener((response) => {
                console.log(response);
            });

        return () => {
            Notifications.removeNotificationSubscription(
                notificationListener.current!
            );
            Notifications.removeNotificationSubscription(responseListener.current!);
        };
    }, []);

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
