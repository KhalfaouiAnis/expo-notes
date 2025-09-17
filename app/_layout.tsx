import { ThemeProvider } from '@react-navigation/native';
import '../global.css';

import { Stack } from 'expo-router';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { useThemeConfig } from '~/core/theme/use-theme-config';
import { ReactNode } from 'react';
import { Toaster } from 'sonner-native';

const Providers = ({ children }: { children: ReactNode }) => {
  const theme = useThemeConfig()

  return <GestureHandlerRootView style={styles.container}>
    <ThemeProvider value={theme}>
      {children}
    </ThemeProvider>
    <Toaster position='bottom-center' />
  </GestureHandlerRootView>
}

export default function RootLayout() {
  return (
    <Providers>
      <Stack>
        <Stack.Screen name='index' />
        <Stack.Screen name='details' />
      </Stack>
    </Providers>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' }
})