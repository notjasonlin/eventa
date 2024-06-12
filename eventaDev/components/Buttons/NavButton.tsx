import { View } from "react-native";
import { useRouter } from "expo-router";
import IconButton from "./IconButton";
import { Link } from "expo-router";

interface NavButtonProps {
    destination: string;
    icon: React.ReactNode;
}

const NavButton = ({ destination, icon }: NavButtonProps) => {
    return (
        <Link href={destination} style={{ flexDirection: 'row' }} asChild>
            <IconButton icon={icon} />
        </Link>
    );
}

export default NavButton;