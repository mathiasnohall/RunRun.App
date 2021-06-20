import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ImageBackground, Pressable, StyleSheet, Text, View, Image } from 'react-native';
import background from './assets/background.png';
import logo from './assets/logo.png';

export default function App() {
  const onPressStart = () => {
  };

  return (
      <ImageBackground source={background} style={styles.container}> 
        <View>
          <Image source={logo} style={styles.logo}/>
          <Pressable onPress={onPressStart}>
            <Text style={styles.button}>Start running</Text>
          </Pressable>
        </View>
      </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: "cover",
    flexDirection: "column",
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo:{
    width: 305,
    height: 250,
    marginBottom: 150,
    justifyContent: "center"
  },
  button:{
    textAlign: 'center',
    color:'#fff',    
    padding: 20,
    margin: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#fff',
  }
});
