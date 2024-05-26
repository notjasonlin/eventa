import { Pressable, StyleSheet, Text } from "react-native";

interface IconButtonProps {
    children?: React.ReactNode;
    location?: string;
    onPress?: () => void;
}

const IconButton = ({ children, onPress }: IconButtonProps) => {
    return (
        <Pressable onPress={onPress} style={styles.container}>
            <Text>
                {children}
            </Text>
        </Pressable>
    );
}

export default IconButton;

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        marginHorizontal: 20,
    }
})