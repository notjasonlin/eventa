import { View } from "react-native";
import { useRouter } from "expo-router";
import IconButton from "./IconButton";

interface NavButtonProps {
    destination: string;
    icon: React.ReactNode;
}

const NavButton = ({ destination, icon }: NavButtonProps) => {
    const router = useRouter();
    
    const navHandler = () => {
        router.push(destination);
    }
    
    return (
        <View style={{ flexDirection: 'row' }}>
            <IconButton onPress={navHandler} icon={icon}>Messages</IconButton>
        </View>
    );
}

export default NavButton;
