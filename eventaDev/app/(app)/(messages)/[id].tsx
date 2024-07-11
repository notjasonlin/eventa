import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { createConversation } from '../../../functions/messagesFunctions/conversations';
import { sendMessage, fetchMessages } from '../../../functions/messagesFunctions/messages';
import { RootState } from '../../../store/redux/store'; 
import { useRoute } from '@react-navigation/native';

const MessagesPage = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [messageContent, setMessageContent] = useState('');
    const [messages, setMessages] = useState([]);
    const profile = useSelector((state: RootState) => state.authentication.profile);
    const { user1Id, user2Id } = route.params; // Make sure to pass route params

    useEffect(() => {
        fetchMessagesForConversation();
    }, [user1Id, user2Id]);

    const fetchMessagesForConversation = async () => {
        const conversationId = getConversationId(); // Implement logic to get or create conversation ID
        const messagesData = await fetchMessages(conversationId);
        if (messagesData) {
            setMessages(messagesData);
        }
    };

    const getConversationId = async () => {
        // Logic to find or create conversation ID between user1Id and user2Id
        const { data } = await createConversation(profile.id, user1Id);
        if (data) {
            return data.id;
        } else {
            Alert.alert('Error', 'Failed to create conversation');
            return null;
        }
    };

    const handleSendMessage = async () => {
        const conversationId = getConversationId(); // Ensure conversation ID is fetched or created
        if (conversationId) {
            const senderId = profile.id;
            const receiverId = user1Id === senderId ? user2Id : user1Id;
            const sentMessage = await sendMessage(senderId, receiverId, messageContent, conversationId);
            if (sentMessage) {
                setMessages([...messages, sentMessage]);
                setMessageContent('');
            } else {
                Alert.alert('Error', 'Failed to send message');
            }
        }
    };

    return (
        <View>
            <Text>Messages for Conversation</Text>
            <FlatList
                data={messages}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View>
                        <Text>{item.content}</Text>
                        <Text>{item.created_at}</Text>
                    </View>
                )}
            />
            <TextInput
                value={messageContent}
                onChangeText={setMessageContent}
                placeholder="Type your message..."
            />
            <Button title="Send" onPress={handleSendMessage} />
        </View>
    );
};

export default MessagesPage;
