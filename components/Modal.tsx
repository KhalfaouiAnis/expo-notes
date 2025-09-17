import { SquircleButton } from "expo-squircle-view"
import { useState } from "react"
import { Modal, View, StyleSheet, Text, TextInput } from "react-native"
import { nanoid } from "nanoid/non-secure"
import { COLORS } from "~/core/theme/colors"
import useNotesStore from "~/store/store"
import { toast } from "sonner-native"

type AddNoteModalProps = {
    visible: boolean,
    setVisible: (visible: boolean) => void
}

const AddNoteModal = ({ visible, setVisible }: AddNoteModalProps) => {
    const [noteText, setNotetext] = useState("")
    const { addNote } = useNotesStore()

    const handleAddNote = () => {
        const newNote: Note = {
            id: nanoid(),
            title: noteText
        }

        addNote(newNote)
        setNotetext("")
        setVisible(false)
        toast.success("Note added successfully")
    }

    const closeModal = () => setVisible(false)

    return (
        <Modal visible={visible} transparent style={styles.modal}>
            <View style={[
                styles.modalContainer,
                {
                    backgroundColor: 'rgba(0,0,0,0.4'
                }]}>
                <View style={styles.modalView} className="p-8">
                    <Text className="text-2xl font-medium text-primary"></Text>
                    <TextInput
                        placeholder="Create a note"
                        placeholderTextColor="grey"
                        className="mt-2 rounded rounded-b border-primary bg-white py-4 text-xl"
                        onChangeText={setNotetext}
                    />

                    <View className="mt-4 flex flex-row items-center justify-between py-4">
                        <SquircleButton
                            style={styles.button}
                            cornerSmoothing={100}
                            preserveSmoothing
                            borderRadius={24}
                            onPress={closeModal}
                        >
                            <Text className="text-xl text-white">
                                Cancel
                            </Text>
                        </SquircleButton>
                        <SquircleButton
                            style={styles.button}
                            cornerSmoothing={100}
                            preserveSmoothing
                            borderRadius={24}
                            onPress={handleAddNote}
                        >
                            <Text className="text-xl text-white">
                                Add
                            </Text>
                        </SquircleButton>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default AddNoteModal

const styles = StyleSheet.create({
    modal: {
        zIndex: 100
    },
    modalContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    modalView: {
        backgroundColor: "white",
        width: '90%',
        borderRadius: 10,
        paddingTop: 24,
    },
    button: {
        backgroundColor: COLORS.primary,
        height: 48,
        width: "48%",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    }
})