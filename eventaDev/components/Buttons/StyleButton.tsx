import { View, TouchableOpacity, Text, StyleProp, ViewStyle } from "react-native";

interface StyleButtonProps {
    onPress: () => void;
    children: React.ReactNode;
    style?: StyleProp<ViewStyle>;
}

const StyleButton = ({ onPress, children, style }: StyleButtonProps) => {
    return (
        <View style={style}>
            <TouchableOpacity onPress={onPress}>
                <Text>
                    {children}
                </Text>
            </TouchableOpacity>
        </View>
    );
}

export default StyleButton;