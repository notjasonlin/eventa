import { TouchableOpacity, Image, View } from "react-native";

interface ImageButtonProps {
    uri: string | null;
}

const PLACE_HOLDER = "https://meehvdwhjxszsdgpeljs.supabase.co/storage/v1/object/sign/userImage/0d1dc9b9-7d81-490f-8504-e5e7982b95f4/4b32b93a-8285-452c-92b7-03f97c24b201?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ1c2VySW1hZ2UvMGQxZGM5YjktN2Q4MS00OTBmLTg1MDQtZTVlNzk4MmI5NWY0LzRiMzJiOTNhLTgyODUtNDUyYy05MmI3LTAzZjk3YzI0YjIwMSIsImlhdCI6MTcxNzA5MzM4OSwiZXhwIjoyMDMyNDUzMzg5fQ.4lK4rfqVM5HvFyWyEMIM06EtLpFx6gBrRFQsWbshVvs"


const ImageButton = ({ uri }: ImageButtonProps) => {
    return (
        <View style={{ flex: 1 }}>
            <TouchableOpacity >
                <Image source={{ uri: uri || PLACE_HOLDER }} style={{ flex: 1 }} />
            </TouchableOpacity>
        </View>
    );
}

export default ImageButton;