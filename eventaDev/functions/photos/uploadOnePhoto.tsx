import { supabase } from '../../lib/supabase';
import uuid from 'react-native-uuid'; 
import * as FileSystem from 'expo-file-system';
import { Buffer } from 'buffer';
import * as mime from 'react-native-mime-types';
import { Alert } from 'react-native';

export const uploadOnePhoto = async (uri: string) => {
    try {
        let userId = await FetchProfile();
        let file = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });

        // Buffer.from used as a binary buffer
        let buffer = Buffer.from(file, 'base64');
        const uniquePath = `${userId}/${uuid.v4()}`;
        console.log('Uploading to path:', uniquePath);

        const mimeType = mime.lookup(uri);
        
        if (typeof(mimeType) !== "string") {
            Alert.alert("Invalid Image Type");
        } else {
            let { data, error } = await supabase.storage.from("userImage").upload(uniquePath, buffer, {
                contentType: mimeType,
            });
            if (error) {
                console.error('Error uploading image: ' + error);
            }
            console.log("Successfully Uploaded " + data);
        }
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

            return userId;
        }
    } catch (error) {
        throw error;
    }
};