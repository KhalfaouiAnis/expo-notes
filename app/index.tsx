import { Stack } from 'expo-router';
import { StyleSheet, View, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '~/components/home/Header';
import Note from '~/components/home/Note';
import Separator from '~/components/Separator';
import { DATA } from '~/core/constants';

export default function Home() {
  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <Stack.Screen options={{ headerShown: false }} />
      <Header />
      <View className="flex-1 p-4">
        <FlatList
          data={DATA}
          renderItem={({item}) => <Note item={item} />}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={Separator}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1
  }
})