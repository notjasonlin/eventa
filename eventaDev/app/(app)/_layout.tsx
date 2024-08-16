import { Stack } from "expo-router";
import NavButton from "../../components/Buttons/NavButton";
import AntDesign from "@expo/vector-icons/AntDesign";
import { TransitionPresets } from "@react-navigation/stack";
import * as Notifications from "expo-notifications";
import { useEffect } from "react";
import { Alert, Platform } from "react-native";
import { StripeProvider } from "@stripe/stripe-react-native";
import * as Contacts from "expo-contacts";
import { grabProfileByPhone } from "../../functions/profileFunctions";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store/redux/store";
import { addContactWOPrf, addContactWPrf, setCache } from "../../store/redux/contacts";
import { MMKVLoader } from 'react-native-mmkv-storage';

const RootLayout = () => {
  const dispatch = useDispatch<AppDispatch>();
  const MMKV = new MMKVLoader().initialize();
  const cache = useSelector((state: RootState) => state.userContacts.cacheStore)

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
    const addContact = async (digits: string, firstName: string, lastName: string, countryCode: string) => {
      const data = await grabProfileByPhone(digits);
      if (data) {
        dispatch(addContactWPrf({
          "phoneNumber": digits, "firstName": firstName, "lastName": lastName,
          "countryCode": countryCode, "inDB": true, "profile": data
        }));
      } else {
        dispatch(addContactWOPrf({
          "phoneNumber": digits, "firstName": firstName, "lastName": lastName,
          "countryCode": countryCode, "inDB": false, "profile": null
        }));
      }
    };

    (async () => {
      if (!cache) {
        console.log("Enter!!!!")
        dispatch(setCache(MMKV));
        const { status } = await Contacts.requestPermissionsAsync();
        if (status === "granted") {
          const fields = [
            Contacts.Fields.PhoneNumbers,
            Contacts.Fields.Birthday,
            Contacts.Fields.FirstName,
            Contacts.Fields.LastName,
          ];

          const { data } = await Contacts.getContactsAsync({ fields });
          // console.log(data)
          const json = JSON.stringify(data)
          // console.log(json)

          await MMKV.setStringAsync("contacts", json);

          const test = await MMKV.getStringAsync("contacts");
          console.log(test);

          // if (data.length > 0) {
          //   let i = 0
          //   data.forEach((contact) => {
          //     const phoneNumbers = contact.phoneNumbers;
          //     if (phoneNumbers && phoneNumbers.length > 0) {
          //       phoneNumbers.forEach((phone) => {
          //         let digits = "";
          //         if (Platform.OS === "android") {
          //           digits = phone.number ? phone.number : ""; // andriod uses phone.number
          //           //digits = digits?.replace(/\D/g, ''); // Remove non-numeric characters for Android
          //         } else if (Platform.OS === "ios") {
          //           digits = phone.digits ? phone.digits : ""; // ios uses phone.digits
          //         }
          //         const firstName = contact.firstName ? contact.firstName : "";
          //         const lastName = contact.lastName ? contact.lastName : "";
          //         const countryCode = phone.countryCode || "Unknown"; // Handling possible absence of country code
          //         if (i++ < 3){
          //           // addContact(digits, firstName, lastName, countryCode);
          //         }

          //         // console.log(
          //         //   "Digits:",
          //         //   digits,
          //         //   "Country Code:",
          //         //   countryCode,
          //         //   "First name:",
          //         //   firstName,
          //         //   "Last name:",
          //         //   lastName
          //         // );
          //       });
          //     }
          //   });
          // }
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