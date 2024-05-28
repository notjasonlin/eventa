import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import React from "react";


interface MessageButtonProps {
    children?: React.ReactNode;
    location?: string;
    onPress?: () => void;
}

const MessageButton = ({ children, onPress }: MessageButtonProps) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            {/* <Text>
                {children}
            </Text> */}
            <AntDesign name="mail" size={24} color="black" />
        </TouchableOpacity>
    );
}

export default MessageButton;

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        marginHorizontal: 20,
    }
})