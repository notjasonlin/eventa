import { supabase } from '../../lib/supabase';
import uuid from 'react-native-uuid';

export const fetchConversations = async (userID: string) => {
    let { data: conversations, error } = await supabase
        .from('conversations')
        .select('id, user1ID, user2ID')
        .or(`user1ID.eq.${userID},user2ID.eq.${userID}`);

    if (error) {
        console.error("Error fetching conversations:", error);
        return null;
    }

    return conversations;
}

export const startConversation = async (convoData: Record<string, any>) => {
    const defaultValues = {
        id: uuid.v4().toString(),
    };

    const mergedData = { ...defaultValues, ...convoData };


    const { data, error } = await supabase
        .from('conversations')
        .insert([mergedData])

    if (error) {
        console.error("Error starting conversation:", error);
    }
}

