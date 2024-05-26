import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { AntDesign } from '@expo/vector-icons';


interface IconButtonProps {
    children?: React.ReactNode;
    location?: string;
    onPress?: () => void;
}

const IconButton = ({ children, onPress }: IconButtonProps) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            {/* <Text>
                {children}
            </Text> */}
            <AntDesign name="mail" size={24} color="black" />
        </TouchableOpacity>
    );
}

export default IconButton;

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        marginHorizontal: 20,
    }
})