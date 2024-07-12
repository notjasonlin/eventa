import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useLayoutEffect, useState } from "react";
import { TextInput, TouchableOpacity, View, Text, FlatList, StyleSheet } from "react-native";
import { Message } from "../../../interfaces/messageInterface";
import { fetchMessages, sendMessage } from "../../../functions/messagingFunctions/messageFunctions";
import { supabase } from "../../../lib/supabase";

const ConversationPage = () => {
    const navigation = useNavigation();
    const { convo, sender, reciever } = useLocalSearchParams();
    const [convoID, setConvoID] = useState<string>("");
    const [senderID, setSenderID] = useState<string>("");
    const [recieverID, setRecieverID] = useState<string>("");
    const [messages, setMessages] = useState<Message[] | null>([])
    const [message, setMessage] = useState<string>("");

    useEffect(() => {
        const grabMessages = async () => {
            if (typeof convo === "string") {
                const data = await fetchMessages(convo);
                // const content: string[] | undefined = data?.filter((message) => message.content);
                setMessages(data);
            }
        }

        if (typeof convo === "string" && typeof sender === "string" && typeof reciever === "string") {
            setConvoID(convo);
            setSenderID(sender);
            setRecieverID(reciever);
            grabMessages();
        }
    }, [])


    useLayoutEffect(() => {
        navigation.setOptions({
            title: recieverID,
        });
    }, [navigation]);


    const sendMessageContent = async () => {
        if (message.trim() !== "") {
            await sendMessage(senderID, recieverID, convoID, message);
            setMessage("");
        }
    }

    useEffect(() => {
        const channel = supabase
            .channel(convoID)
            .on(
                "postgres_changes",
                { event: "*", schema: "public", table: "messages" },
                (payload) => {
                    if (messages) {
                        const newMessage = payload.new as Message;
                        setMessages((prevMessages) => {
                            if (prevMessages) {
                                return [...prevMessages, newMessage];
                            } else {
                                return [newMessage]; 
                            }
                        });
                    }
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [])

    return (
        <>
            {messages &&
                <View style={styles.container}>
                    <FlatList
                        data={messages}
                        renderItem={({ item }) => (
                            <View style={styles.messageContainer}>
                                <Text style={styles.messageText}>{item.content}</Text>
                            </View>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                        contentContainerStyle={styles.messagesList}
                    />

                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            onChangeText={(text) => setMessage(text)}
                            value={message}
                            placeholder="Send message"
                        />
                        <TouchableOpacity style={styles.sendButton} onPress={sendMessageContent}>
                            <Text style={styles.sendButtonText}>Send!</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            }
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        padding: 10,
    },
    messagesList: {
        paddingBottom: 10,
    },
    messageContainer: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 5,
        marginBottom: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    messageText: {
        fontSize: 16,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    input: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    sendButton: {
        marginLeft: 10,
        backgroundColor: '#007bff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    sendButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default ConversationPage;
