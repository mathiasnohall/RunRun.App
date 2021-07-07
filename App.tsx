import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { FormattedMessage, IntlProvider } from 'react-intl';
import { ImageBackground, Pressable, StyleSheet, Text, View, Image } from 'react-native';
import background from './assets/background.png';
import logo from './assets/logo.png';
import sv from './lang/sv.json';
import { Ionicons } from '@expo/vector-icons';

export default function App() {

  const [running, setRunning] = useState<boolean>(false);


  const onPressStart = () => {
    setRunning(!running);
  };

  return (
    <IntlProvider messages={sv} locale="sv-SE">
      <ImageBackground source={background} style={styles.container}> 
        <View>
          <Image source={logo} style={styles.logo}/>
          <Pressable 
            onPress={onPressStart}
            style={styles.button}
            >
            <View style={styles.textContainer}>
              {!running && (
              <>
                <Text style={styles.text}><FormattedMessage id="start" /></Text>
                <Ionicons style={styles.icon} name="play-outline" size={22} color="white" />
              </>  
              )}
              {running && (
              <>
                <Text style={styles.text}><FormattedMessage id="stop" /></Text>
                <Ionicons style={styles.icon} name="stop-outline" size={22} color="white" />
              </>  
              )}              
              </View>
          </Pressable>
        </View>
      </ImageBackground>
      </IntlProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    resizeMode: "cover",
    flexDirection: "column",
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 305,
    height: 250,
    marginBottom: 150,
    justifyContent: "center"
  },
  button: {     
    padding: 20,
    margin: 20,
    borderRadius: 10,
    backgroundColor: '#6B7B67'
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline'
  },
  text: {
    color:'#fff',   
    fontWeight:'bold',
    fontSize: 20,
  },
  icon: {

  }
});
