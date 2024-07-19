import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useLayoutEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/redux/store";
import { Conversation } from "../../../interfaces/converstaionInterface";
import { deleteConversation, fetchConversations } from "../../../functions/messagingFunctions/conversationFunctions";
import { Link } from "expo-router";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

const MessagesPage = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const user = useSelector((state: RootState) => state.authentication.session?.user);
    const [conversations, setConversations] = useState<Conversation[] | null>(null);
    const [toggleDelete, setToggleDelete] = useState<boolean>(false);
    const [trigger, setTrigger] = useState<boolean>(false);

    useEffect(() => {
        const grabConvos = async () => {
            if (user) {
                const convos = await fetchConversations(user.id);
                setConversations(convos);
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
            {user && conversations && conversations.length > 0 ? (
                <FlatList
                    data={conversations}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => {
                        const reciever = user.id === item.user1ID ? item.user2ID : item.user1ID;
                        return (
                            <Link href={{ pathname: "(messages)/ConversationPage", params: { convo: item.id, sender: user.id, reciever: reciever } }} asChild>
                                <TouchableOpacity style={styles.conversationItem}>
                                    <Text style={styles.conversationText}>
                                        {reciever}
                                    </Text>
                                    {toggleDelete &&
                                        <TouchableOpacity onPress={() => handleDelete(item.id, reciever)}>
                                            <Feather name="x-circle" size={18} color="red" />
                                        </TouchableOpacity>
                                    }
                                </TouchableOpacity>
                            </Link>
                        )
                    }}
                />
            ) : (
                <View style={styles.noConversations}>
                    <Text style={styles.noConversationsText}>No conversations!</Text>
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
});

export default MessagesPage;
