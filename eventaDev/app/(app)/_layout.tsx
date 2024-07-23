import { Stack } from "expo-router";
import NavButton from "../../components/Buttons/NavButton";
import AntDesign from '@expo/vector-icons/AntDesign';
import { TransitionPresets } from '@react-navigation/stack';
import * as Notifications from "expo-notifications";
import { useEffect } from "react";
import { StripeProvider } from "@stripe/stripe-react-native";


const RootLayout = () => {
    // useEffect(() => {
    //     Notifications.getExpoPushTokenAsync().then((pushToken) => {
    //         console.log("Push token", pushToken);
    //     })
    // }, [])

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
