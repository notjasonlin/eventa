import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { TextInput, TouchableOpacity, View, Text, FlatList, StyleSheet, Dimensions } from "react-native";
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
    const flatListRef = useRef<FlatList<Message>>(null);

    useEffect(() => {
        const grabMessages = async () => {
            if (typeof convo === "string") {
                const data = await fetchMessages(convo);
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

    useEffect(() => {
        if (messages && messages.length > 0 && flatListRef.current) {
            flatListRef.current.scrollToEnd({ animated: false });
        }
    }, [messages]);


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


    const renderMessage = (message: Message) => {
        if (message.sender === senderID) {
            return (
                <View style={styles.senderMessage}>
                    <View style={styles.senderContainer}>
                        <Text style={styles.messageText}>{message.content}</Text>
                    </View>
                </View>
            );
        } else {
            return (
                <View style={styles.receiverMessage}>
                    <View style={styles.recieverContainer}>
                        <Text style={styles.messageText}>{message.content}</Text>
                    </View>
                </View>
            );
        }
    }

    return (
        <>
            {messages &&
                <View style={styles.container}>
                    <FlatList
                        ref={flatListRef}
                        data={messages}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => renderMessage(item)}
                        keyExtractor={(item, index) => index.toString()}
                        contentContainerStyle={styles.messagesList}
                        onContentSizeChange={() => {
                            if (messages.length > 0 && flatListRef.current) {
                                flatListRef.current.scrollToEnd({ animated: false });
                            }
                        }}
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

const { width: screenWidth } = Dimensions.get('window');
const maxWidth = screenWidth * 0.75;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        padding: 10,
    },
    messagesList: {
        paddingBottom: 10,
    },
    senderMessage: {
        alignItems: 'flex-end',
    },
    receiverMessage: {
        alignItems: 'flex-start',
    },
    senderContainer: {
        backgroundColor: '#49936F',
        padding: 10,
        borderRadius: 5,
        marginBottom: 5,
        maxWidth: maxWidth,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    recieverContainer: {
        backgroundColor: '#c5cac7',
        padding: 10,
        borderRadius: 5,
        marginBottom: 5,
        maxWidth: maxWidth,
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
