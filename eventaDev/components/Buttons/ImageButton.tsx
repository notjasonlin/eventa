import React from 'react';
import { TouchableOpacity, Image, View, StyleSheet } from "react-native";

interface ImageButtonProps {
    uri: string | null;
    onPress?: () => void;
}

const PLACE_HOLDER = "https://meehvdwhjxszsdgpeljs.supabase.co/storage/v1/object/public/userImage/0d1dc9b9-7d81-490f-8504-e5e7982b95f4/4b32b93a-8285-452c-92b7-03f97c24b201";

const ImageButton = ({ uri, onPress}: ImageButtonProps) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.touchable} onPress={onPress}>
                <Image source={{ uri: uri || PLACE_HOLDER }} style={styles.image} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    touchable: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 100,  // Set the width as needed
        height: 100, // Set the height as needed
        resizeMode: 'cover', // Adjust the resizeMode as needed
        borderRadius: 25,
    }
});

export default ImageButton;
