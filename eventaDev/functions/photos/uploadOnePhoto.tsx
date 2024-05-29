import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { v4 as uuidv4 } from 'uuid';
import { ImagePickerResult } from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';


type Profile = {
    id: string;
};

export const uploadOnePhoto = async (uri: string) => {

    let userId = await FetchProfile();
    try {
        let file = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });

        // Buffer.from used as a binary buffer
        // let { data, error } = await supabase.storage.from("userImage").upload(userId + "/" + uuidv4, Buffer.from(file, 'base64'));

        // if (error) {
        //     console.log('Error uploading image:');
        //     throw error;
        // }

        // console.log('Image uploaded successfully:', data);
    } catch (error) {
        throw error;
    }
}

const FetchProfile = async () => {
    try {
        let { data: profile, error } = await supabase.from('profile').select('id');

        if (error || !profile || profile.length == 0) {
            console.log("Error fetching profile id");
        } else {
            let userId = profile[0].id;
            // console.log(userId);

            return userId;
        }
    } catch (error) {
        throw error;
    }
};