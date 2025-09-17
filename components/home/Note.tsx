import { Ionicons } from "@expo/vector-icons"
import { SquircleView } from "expo-squircle-view"
import { Text, View, StyleSheet, Platform } from "react-native"
import { DEFAULT_ICON_SIZE } from "~/core/constants"
import { MenuView } from "@react-native-menu/menu"
import { COLORS } from "~/core/theme/colors"
import { router } from "expo-router"
import useNotesStore from "~/store/store"

type NoteProps = {
    item: Note
}

const Note = ({ item }: NoteProps) => {
    const { deleteNote } = useNotesStore();

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
                <MenuView
                    onPressAction={({ nativeEvent }) => {
                        if (nativeEvent.event === "edit") {
                            router.push({
                                pathname: "/details",
                                params: { noteId: item.id }
                            })
                        } else if (nativeEvent.event === "destructive") {
                            deleteNote(item.id)
                        }

                    }}
                    actions={[
                        {
                            id: "edit",
                            title: "Edit",
                            titleColor: COLORS.primary,
                            image: Platform.select({ ios: 'plus' }),
                            imageColor: COLORS.primary
                        },
                        {
                            id: "destructive",
                            title: "Delete",
                            attributes: {
                                destructive: true,
                            },
                            image: Platform.select({
                                ios: 'trash'
                            })
                        }
                    ]}
                >
                    <Ionicons name="ellipsis-vertical" size={DEFAULT_ICON_SIZE} color="black" />
                </MenuView>
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