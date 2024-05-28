import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Feather } from '@expo/vector-icons';
import React from "react";


interface ProfileButtonProps {
    children?: React.ReactNode;
    location?: string;
    onPress?: () => void;
}

const ProfileButton = ({ children, onPress }: ProfileButtonProps) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            {/* <Text>
                {children}
            </Text> */}
            <Feather name="user" size={23} color="black" />
        </TouchableOpacity>
    );
}

export default ProfileButton;

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        marginHorizontal: 5,
    }
})