import React, { useState } from "react";
import { Modal, Pressable, TextInput, View, Text, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { startConversation } from "../functions/messagingFunctions/conversationFunctions";
import uuid from 'react-native-uuid';
import { sendMessage } from "../functions/messagingFunctions/messageFunctions";

type SendMessageModalProps = {
    hideModal: () => void
    userID: string
}

const SendMessageModal = ({ hideModal, userID }: SendMessageModalProps) => {
    const [message, setMessage] = useState<string>("")
    const DEFAULT_MESSAGE = "Hi, I'm looking to get a quote for this vendor!";

    const send = async () => {
        let content = ""
        if (message === "") {
            content = DEFAULT_MESSAGE;
        } else {
            content = message;
        }

        const id = uuid.v4().toString();
        await startConversation({id: id, user1ID: userID, user2ID: "8be048e2-ddd2-4c9f-99f5-d6b5da104b75"});
        await sendMessage(userID, "8be048e2-ddd2-4c9f-99f5-d6b5da104b75", id, content);
        
        Alert.alert("Message Sent!");
        hideModal();
    }
    
    return (
        <Modal animationType="fade" visible={true} transparent={true}>
            <Pressable onPress={hideModal} style={styles.modalBackDrop}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Message vendor!</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => setMessage(text)}
                        value={message}
                        placeholder={DEFAULT_MESSAGE}
                    />
                    <TouchableOpacity onPress={send} style={styles.sendButton}>
                        <Text style={styles.sendButtonText}>Send Message!</Text>
                    </TouchableOpacity>
                </View>
            </Pressable>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalBackDrop: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        width: 300,
        padding: 20,
        backgroundColor: "white",
        borderRadius: 10,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 15,
    },
    input: {
        width: "100%",
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 15,
    },
    sendButton: {
        backgroundColor: "#2196F3",
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    sendButtonText: {
        color: "white",
        fontWeight: "bold",
    },
});

export default SendMessageModal;
