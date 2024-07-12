import { supabase } from '../../lib/supabase';

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

export const startConversation = async (user1ID: string, user2ID: string) => {
    const { data, error } = await supabase
        .from('conversations')
        .insert([
            { user1ID: user1ID, user2ID: user2ID },
        ])

    if (error) {
        console.error("Error starting conversation:", error);
    }
}

