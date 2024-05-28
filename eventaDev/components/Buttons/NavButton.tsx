import { View } from "react-native";
import { useRouter } from "expo-router";
import MessageButton from "./MessageButton";
import ProfileButton from "./ProfileButton";

interface NavButtonProps {
    messageDestination: string;
    profileDestination: string;
}

const NavButton = ({ messageDestination, profileDestination }: NavButtonProps) => {
    const router = useRouter();
    
    const messageNavHandler = () => {
        router.push(messageDestination);
    }

    const profileNavHandler = () => {
        router.push(profileDestination);
    }
    
    return (
        <View style={{ flexDirection: 'row' }}>
            <MessageButton onPress={messageNavHandler}>Messages</MessageButton>
            <ProfileButton onPress={profileNavHandler}>Profile</ProfileButton>
        </View>
    );
}

export default NavButton;
