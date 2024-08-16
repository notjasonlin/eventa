import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useLayoutEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/redux/store";
import { Conversation } from "../../../interfaces/conversationInterface";
import { deleteConversation, fetchConversations } from "../../../functions/messagingFunctions/conversationFunctions";
import { Link } from "expo-router";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { grabProfileByID } from "../../../functions/profileFunctions";
import { Chat } from "../../../interfaces/chatInterface";

const MessagesPage = () => {
    const navigation = useNavigation();
    const user = useSelector((state: RootState) => state.authentication.session?.user);
    const withProfile = useSelector((state: RootState) => state.userContacts.withProfile);
    const withoutProfile = useSelector((state: RootState) => state.userContacts.withoutProfile);
    const [conversations, setConversations] = useState<Conversation[] | null>(null);
    const [chats, setChats] = useState<Chat[] | null>(null);
    const [toggleDelete, setToggleDelete] = useState<boolean>(false);
    const [trigger, setTrigger] = useState<boolean>(false);
    const [showContacts, setShowContacts] = useState<boolean>(false);
    const contacts = useSelector((state: RootState) => state.userContacts.contacts);

    useEffect(() => {
        // console.log("contacts", contacts);

        const grabConvos = async () => {
            if (user) {
                const convos = await fetchConversations(user.id);
                setConversations(convos);

                const senderProfile = await grabProfileByID(user.id);
                const userChats: Chat[] = [];
                if (convos && senderProfile) {
                    for (const convo of convos) {
                        const reciever = senderProfile.id === convo.user1ID ? convo.user2ID : convo.user1ID;
                        const recieverProfile = await grabProfileByID(reciever);
                        if (recieverProfile) {
                            userChats.push({ "convo": convo, "sender": senderProfile, "reciever": recieverProfile });
                        }
                    }
                    setChats(userChats);
                }
            }
        }
        grabConvos();
    }, [user, trigger]);

    const renderHeaderRight = (
        <>
            {!toggleDelete &&
                <TouchableOpacity onPress={() => setToggleDelete(true)}>
                    <MaterialCommunityIcons name="delete-circle-outline" size={25} color="black" />
                </TouchableOpacity>
            }
            {toggleDelete &&
                <TouchableOpacity onPress={() => setToggleDelete(false)}>
                    <MaterialCommunityIcons name="delete-circle-outline" size={25} color="red" />
                </TouchableOpacity>
            }
        </>
    );

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Messages",
            headerRight: () => renderHeaderRight,
        });
    }, [navigation, toggleDelete]);

    const handleDelete = (convoID: string, reciever: string) => {
        const deleteConvo = async () => {
            await deleteConversation(convoID);
            setTrigger(!trigger);
        }

        Alert.alert(`Delete converstaion with ${reciever}?`, "", [
            {
                text: "Delete",
                style: "destructive",
                onPress: deleteConvo,
            },
            {
                text: "Cancel",
                style: "cancel",
            }
        ])
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={[styles.headerButton, !showContacts && styles.selectedButton]} onPress={() => setShowContacts(false)}>
                    <Text style={styles.headerButtonText}>Current Conversations</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.headerButton, showContacts && styles.selectedButton]} onPress={() => setShowContacts(true)}>
                    <Text style={styles.headerButtonText}>Invite Contacts</Text>
                </TouchableOpacity>
            </View>
            {!showContacts ? (
                user && conversations && conversations.length > 0 ? (
                    <FlatList
                        data={chats}
                        keyExtractor={(item) => item.convo.id.toString()}
                        renderItem={({ item }) => {
                            return (
                                <Link href={{ pathname: "(messages)/ConversationPage", params: { convo: item.convo.id, sender: item.sender.id, reciever: item.reciever.id } }} asChild>
                                    <TouchableOpacity style={styles.conversationItem}>
                                        <Text style={styles.conversationText}>
                                            {item.reciever.firstName}
                                        </Text>
                                        {toggleDelete && (
                                            <TouchableOpacity onPress={() => handleDelete(item.convo.id, item.reciever.id)}>
                                                <Feather name="x-circle" size={18} color="red" />
                                            </TouchableOpacity>
                                        )}
                                    </TouchableOpacity>
                                </Link>
                            );
                        }}
                    />
                ) : (
                    <View style={styles.noConversations}>
                        <Text style={styles.noConversationsText}>No conversations!</Text>
                    </View>
                )
            ) : (
                <View style={styles.contactsContainer}>
                    <FlatList
                        data={[...withProfile, ...withoutProfile]}
                        keyExtractor={(item) => item.phoneNumber}
                        renderItem={({ item }) => {
                            return (
                                <TouchableOpacity style={styles.contactItem}>
                                    <Text style={styles.contactText}>{item.firstName + " " + item.lastName}</Text>
                                </TouchableOpacity>
                            );
                        }}
                    />
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 10,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    headerButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#888',
        width: '48%',
        alignItems: 'center',
    },
    headerButtonText: {
        color: '#000000',
        fontSize: 16,
    },
    selectedButton: {
        backgroundColor: '#007bff',
        borderColor: '#007bff',
    },
    conversationItem: {
        backgroundColor: '#ffffff',
        padding: 15,
        marginVertical: 5,
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    conversationText: {
        fontSize: 16,
        color: '#333',
    },
    noConversations: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noConversationsText: {
        fontSize: 18,
        color: '#888',
    },
    contactsContainer: {
        flex: 1,
        backgroundColor: '#ffffff',
        padding: 10,
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    contactItem: {
        padding: 15,
        marginVertical: 5,
        backgroundColor: '#f9f9f9',
        borderRadius: 5,
    },
    contactText: {
        fontSize: 16,
        color: '#333',
    },
});

export default MessagesPage;
