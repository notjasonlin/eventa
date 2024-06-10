import { View, Modal, Text, TouchableOpacity, Pressable, StyleSheet, TextInput } from "react-native";
import React from "react";

type VendorModalProps = {
    hideModal: () => void;
    saveNewVendor: (text: string) => void;
};

function VendorModal(props: VendorModalProps) {
    const [text, setText] = React.useState("");

    const addNewVendor = () => {
        if (text.length === 0) {
            return;
        }

        props.saveNewVendor(text);
        setText("");
        props.hideModal(); 
    };

    return (
        <Modal animationType="fade" visible={true} transparent={true}>
            <Pressable onPress={props.hideModal} style={styles.modalBackDrop}>
                <View style={styles.eventForm}>
                    <Text style={styles.heading}>Add Vendor</Text>
                    <TextInput 
                        value={text} 
                        onChangeText={setText} 
                        placeholder='Enter new vendor' 
                        style={styles.input} 
                    />
                    <TouchableOpacity style={styles.button} onPress={addNewVendor}>
                        <Text> Add Item </Text>
                    </TouchableOpacity>
                </View>
            </Pressable>
        </Modal>
    );
}

export default VendorModal;

const styles = StyleSheet.create({
  modalBackDrop: {
    flex: 1,
    backgroundColor: "#000000aa",
    alignItems: "center",
    justifyContent: "center",
  },
  eventForm: {
    width: "95%",
    height: 230,
    borderRadius: 20,
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    margin: 20,
  },
  input: {
    width: "90%",
    height: 60,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    margin: 12,
    width: "90%",
    height: 40,
    borderRadius: 20,
    backgroundColor: "#46A16E",
    alignItems: "center",
    justifyContent: "center",
  },
});
