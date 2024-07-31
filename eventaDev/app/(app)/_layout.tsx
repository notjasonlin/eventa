import { Stack } from "expo-router";
import NavButton from "../../components/Buttons/NavButton";
import AntDesign from "@expo/vector-icons/AntDesign";
import { TransitionPresets } from "@react-navigation/stack";
import * as Notifications from "expo-notifications";
import { useEffect } from "react";
import { Alert, Platform } from "react-native";
import { StripeProvider } from "@stripe/stripe-react-native";
import * as Contacts from "expo-contacts";

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
        Alert.alert(
          "Permissions required",
          "(Temporary alert, does not require permissions: add redux)"
        );
      }

      const pushTokenData = await Notifications.getExpoPushTokenAsync();
    //   console.log("Push token", pushTokenData);

      if (Platform.OS === "android") {
        Notifications.setNotificationChannelAsync("default", {
          name: "default",
          importance: Notifications.AndroidImportance.DEFAULT,
        });
      }
    };

    configurePushNotifications();
  }, []);

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === "granted") {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.PhoneNumbers, Contacts.Fields.Birthday],
        });

        if (data.length > 0) {
        //   console.log("data", data);
          const contact = data[0];
          const number = contact.phoneNumbers;
          const firstName = contact.firstName;
          const lastName = contact.lastName;
          console.log("Phone number", number, "First name", firstName, "Last name", lastName);

          //console.log(contact);
        }
      }
    })();
  }, []);

  return (
    <StripeProvider
      publishableKey={
        "pk_test_51Pc8OiJKz0GBX0rUq3nmv4LpaMT9DT7Rq61UKkvwHGT9x91dRyq2qZPUwlvzMMPf1yOwAxFfhkq6PkxlibirmFrq000ccVB30h" ||
        ""
      }
    >
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
