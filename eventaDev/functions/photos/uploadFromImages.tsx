import * as ImagePicker from 'expo-image-picker';
import { uploadOnePhoto } from './uploadOnePhoto';
import { useState } from 'react';

export const uploadFromImages = async () => {
    try {
        let res = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        

        if (!res.canceled) {
            let uri = res.assets[0].uri
            console.log(uri);
            uploadOnePhoto(uri);
        } else {
            throw new Error('Image picking cancelled');
        }
    } catch (error) {
        console.error('Error during image upload:', error);
    }
}
