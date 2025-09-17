import { Ionicons } from '@expo/vector-icons';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { SquircleButton, SquircleView } from 'expo-squircle-view';
import { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { toast } from "sonner-native"
import { SafeAreaView } from 'react-native-safe-area-context';
import { DEFAULT_ICON_SIZE } from '~/core/constants';
import { COLORS } from '~/core/theme/colors';
import useNotesStore from '~/store/store';

export default function Details() {
  const { noteId } = useLocalSearchParams();
  const { getNote, updateNote } = useNotesStore()

  const note = getNote(noteId as string)

  const [noteText, setNoteText] = useState(note?.title ?? "")

  const navigateBack = () => router.back()

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: 'Details', headerShown: false }} />
      <View className='flex-1 p-6'>
        <TouchableOpacity onPress={navigateBack}>
          <Ionicons name='arrow-back' size={DEFAULT_ICON_SIZE} />
        </TouchableOpacity>

        <SquircleView
          style={styles.textInputContainer}
          cornerSmoothing={100}
          preserveSmoothing
          borderRadius={24}
        >
          <TextInput
            multiline
            placeholder='Edit note'
            className='p-5 text-sl'
            autoFocus={false}
            defaultValue={note?.title ?? ""}
            onChangeText={setNoteText}
          />
        </SquircleView>
        <View className='absolute bottom-10 right-10'>
          <SquircleButton
            backgroundColor={COLORS.primary}
            style={styles.updateButton}
            cornerSmoothing={100}
            preserveSmoothing
            borderRadius={16}
            onPress={() => {
              if (note) {
                updateNote(note.id, { title: noteText })
              }
              toast.success("Note updated")
              navigateBack()
            }}
          >
            <Ionicons name='checkmark' color={"white"} size={40} />
          </SquircleButton>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  textInputContainer: {
    backgroundColor: "#F4F4F4"
  },
  updateButton: {
    width: 64,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center'
  }
})