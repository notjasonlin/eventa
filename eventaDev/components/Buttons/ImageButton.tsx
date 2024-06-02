import React from 'react';
import { TouchableOpacity, Image, View, StyleSheet } from "react-native";

interface ImageButtonProps {
    uri: string | null;
}

const PLACE_HOLDER = "https://meehvdwhjxszsdgpeljs.supabase.co/storage/v1/object/public/userImage/0d1dc9b9-7d81-490f-8504-e5e7982b95f4/c47e2b6b-70bc-4a64-af95-2cbb4899e613";

const ImageButton = ({ uri }: ImageButtonProps) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.touchable}>
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
    }
});

export default ImageButton;
