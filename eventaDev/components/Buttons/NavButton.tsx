import IconButton from "./IconButton";
import { useRouter } from "expo-router";

interface NavButtonProps {
    children?: React.ReactNode;
    destination: string;
}

const NavButton = ({ children, destination }: NavButtonProps) => {
    const router = useRouter();
    
    const navHandler = () => {
        router.push(destination);
        // console.log("Pressed!");
    }
    
    return (
         <IconButton onPress={navHandler}>{children}</IconButton>
    );
}

export default NavButton;