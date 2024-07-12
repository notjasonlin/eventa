import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useLayoutEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/redux/store";
import { Conversation } from "../../../interfaces/converstaionInterface";
import { fetchConversations } from "../../../functions/messagingFunctions/conversationFunctions";
import { Link } from "expo-router";

const MessagesPage = () => {
    const navigation = useNavigation();
    const user = useSelector((state: RootState) => state.authentication.session?.user);
    const [conversations, setConversations] = useState<Conversation[] | null>(null);

    useEffect(() => {
        const grabConvos = async () => {
            if (user) {
                const convos = await fetchConversations(user.id);
                setConversations(convos);
            }
        }
        grabConvos();
    }, [user]);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Messages",
        });
    }, [navigation]);

    return (
        <View style={styles.container}>
            {user && conversations && conversations.length > 0 ? (
                <FlatList
                    data={conversations}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <Link href={{ pathname: "(messages)/ConversationPage", params: { convo: item.id, sender: user.id, reciever: user.id === item.user1ID ? item.user2ID : item.user1ID} }} asChild>
                            <TouchableOpacity style={styles.conversationItem}>
                                <Text style={styles.conversationText}>
                                    {user.id === item.user1ID ? item.user2ID : item.user1ID}
                                </Text>
                            </TouchableOpacity>
                        </Link>
                    )}
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
