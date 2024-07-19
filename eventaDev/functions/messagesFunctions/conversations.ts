import { supabase } from '../../lib/supabase'; 

export const createConversation = async (user1Id: string, user2Id: string) => {
    try {
        const { data, error } = await supabase
            .from('conversations')
            .insert({
                user1Id: user1Id,
                user2Id: user2Id,
                created_date: new Date().toISOString(),
            });

        if (error) {
            console.error('Error creating conversation:', error.message);
            return null;
        }

        console.log('Conversation created:', data);
        return data;
    } catch (error) {
        console.error('Error creating conversation:', error.message);
        return null;
    }
};

export const fetchConversations = async (userId: string) => {
    try {
        const { data, error } = await supabase
            .from('conversations')
            .select('*')
            .eq('user1Id', userId)
            .or('user2Id', 'eq', userId);

        if (error) {
            console.error('Error fetching conversations:', error.message);
            return null;
        }

        console.log('Fetched conversations:', data);
        return data;
    } catch (error) {
        console.error('Error fetching conversations:', error.message);
        return null;
    }
};
