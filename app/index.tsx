import { Ionicons } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import { SquircleButton } from 'expo-squircle-view';
import { useState } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '~/components/home/Header';
import Note from '~/components/home/Note';
import AddNoteModal from '~/components/Modal';
import Separator from '~/components/Separator';
import { COLORS } from '~/core/theme/colors';
import useNotesStore from '~/store/store';

export default function Home() {

  const [isModalVisible, setIsModalVisible] = useState(false)
  const { notes } = useNotesStore()

  const openModal = () => {
    setIsModalVisible(true)
  }

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <Stack.Screen options={{ headerShown: false }} />
      <Header />
      <View className="flex-1 p-4">
        <FlatList
          data={notes}
          renderItem={({ item }) => <Note item={item} />}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={Separator}
        />
      </View>
      <AddNoteModal visible={isModalVisible} setVisible={setIsModalVisible} />

      <SquircleButton style={styles.addNoteButton} borderRadius={16}
        preserveSmoothing
        cornerSmoothing={100}
        onPress={openModal}
      >
        <Ionicons name='add' size={32} color={"white"} />
      </SquircleButton>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1
  },
  addNoteButton: {
    position: 'absolute',
    backgroundColor: COLORS.primary,
    right: 24,
    bottom: 40,
    height: 64,
    width: 64,
    alignItems: 'center',
    justifyContent: 'center'
  },
})