import { supabase } from "../../lib/supabase"; // Adjust path as needed

export const sendMessage = async (senderId: string, receiverId: string, content: string, conversationId: string) => {
    try {
        const { data, error } = await supabase
            .from('messages')
            .insert({
                sender: senderId,
                receiver: receiverId,
                content: content,
                conversationId: conversationId,
            });

        if (error) {
            console.error('Error sending message:', error.message);
            return null;
        }

        console.log('Message sent successfully:', data);
        return data;
    } catch (error) {
        console.error('Error sending message:', error.message);
        return null;
    }
};

export const fetchMessages = async (conversationId: string) => {
    try {
        const { data, error } = await supabase
            .from('messages')
            .select('*')
            .eq('conversationId', conversationId)
            .order('created_at', { ascending: true });

        if (error) {
            console.error('Error fetching messages:', error.message);
            return null;
        }

        console.log('Fetched messages:', data);
        return data;
    } catch (error) {
        console.error('Error fetching messages:', error.message);
        return null;
    }
};
