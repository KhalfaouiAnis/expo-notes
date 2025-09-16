import { Ionicons } from "@expo/vector-icons"
import { SquircleView } from "expo-squircle-view"
import { Text, View, StyleSheet } from "react-native"
import { DEFAULT_ICON_SIZE } from "~/core/constants"
type NoteProps = {
    item: Note
}

const Note = ({ item }: NoteProps) => {
    return (
        <SquircleView
            cornerSmoothing={100}
            preserveSmoothing
            style={styles.container}
        >
            <View className="flex w-full flex-row items-center justify-between px-2">
                <Text className="text-2xl">
                    {item.title}
                </Text>
                <Ionicons name="ellipsis-vertical" size={DEFAULT_ICON_SIZE} color="black" />
            </View>
        </SquircleView>
    )
}
export default Note

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: "#FAF9F0",
        paddingVertical: 24,
        borderRadius: 24
    }
})