import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';
import background from './assets/background.png';
import logo from './assets/logo.png';

export default function App() {
  const onPressStart = () => {
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={background} style={styles.image}>        
        <Image source={logo} />
        <Pressable onPress={onPressStart}>
          <Text style={styles.button}>Start running</Text>
        </Pressable>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: "cover",
  },
  button:{
    color:'red',    
  }
});
