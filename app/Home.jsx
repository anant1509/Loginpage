import { Button, StyleSheet, Text, View } from 'react-native'
import Toast from 'react-native-toast-message'
import React from 'react'
import { useRouter } from 'expo-router'

const Home = () => {
  // const router = useRouter();
  const ShowToast = () => {
    Toast.show({
      type: 'error',
      text2: 'This is a cross-platform toast! 👋',
      position: 'top',
      visibilityTime: 2000,
    });
  }
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home</Text>
      <Button title='Toast button' onPress={ShowToast} />
    </View>
  )
}

export default Home

const styles = StyleSheet.create({})