import { View, Text } from "react-native";
import { useNavigation } from "expo-router";
import { useLayoutEffect } from "react";

const MessagesPage = () => {
    const navigation = useNavigation();

    useLayoutEffect(() => {
      navigation.setOptions({
          title: "Messages",
          
      });
  }, [navigation]);
    return (
        <View>
            <Text>Messages!</Text>
        </View>
    );
} 

export default MessagesPage;