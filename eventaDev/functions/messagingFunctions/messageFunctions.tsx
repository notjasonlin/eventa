import { supabase } from '../../lib/supabase';

export const fetchMessages = async (convoID: string) => {
    let { data: messages, error } = await supabase
        .from('messages')
        .select('*')
        .eq("conversationId", convoID)

    if (error) {
        console.error("Error fetching messages:", error);
        return null;
    }

    return messages;
}

export const sendMessage = async (sender: string, reciever: string, convoID: string, content: string) => {
    const { data, error } = await supabase
        .from('messages')
        .insert([
            { sender: sender, reciever: reciever, conversationId: convoID, content: content },
        ])

    if (error) {
        console.error("Error sending message:", error);
    }
}