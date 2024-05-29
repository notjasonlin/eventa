import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";


interface IconButtonProps {
    onPress?: () => void;
    icon: React.ReactNode;
}

const IconButton = ({ icon, onPress }: IconButtonProps) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            {icon}
        </TouchableOpacity>
    );
}

export default IconButton;

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        marginHorizontal: 10,
    }
})