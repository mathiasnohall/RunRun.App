import React, { useEffect, useState } from "react"
import { FormattedMessage, IntlProvider } from "react-intl"
import { ImageBackground, Pressable, StyleSheet, Text, View, Image } from "react-native"
import sv from "./lang/sv.json"
import { Ionicons, FontAwesome } from "@expo/vector-icons"
import { BleManager, Device } from "react-native-ble-plx"

export default function App() {
  const [running, setRunning] = useState<boolean>(false)
  const [connected, setConnected] = useState<boolean>(false)

  useEffect(() => {
    /*    try {
      const manager = new BleManager();
      manager.startDeviceScan(
        null,
        { allowDuplicates: true },
        (error, device) => {
          if (error) {
            console.log(error);
            return;
          }
          console.log(device?.localName);
          if (device != null && device.localName === "Adafruit Bluefruit LE") {
            manager.stopDeviceScan();
            device
              .connect()
              .then((device) => {
                setConnected(true);
                return device.discoverAllServicesAndCharacteristics();
              })
              .then((device) => {
                // Do work on device with services and characteristics
              })
              .catch((error) => {
                // Handle errors
              });
          }
        }
      );
    } catch {
      setConnected(true);
    }*/
    setTimeout(() => {
      setConnected(true)
    }, 2000)
  })

  const onPressStart = () => {
    setRunning(!running)
  }

  return (
    <IntlProvider messages={sv} locale="sv-SE">
      <ImageBackground source={require("./assets/background.png")} style={styles.container}>
        <View>
          <Image source={require("./assets/logo.png")} style={styles.logo} />
          <Pressable onPress={onPressStart} style={styles.button}>
            <View style={styles.textContainer}>
              {!connected && (
                <>
                  <Text style={styles.text}>
                    <FormattedMessage id="connecting" />
                  </Text>
                  <FontAwesome style={styles.icon} name="spinner" size={22} color="white" />
                </>
              )}
              {connected && !running && (
                <>
                  <Text style={styles.text}>
                    <FormattedMessage id="start" />
                  </Text>
                  <Ionicons style={styles.icon} name="play-outline" size={22} color="white" />
                </>
              )}
              {connected && running && (
                <>
                  <Text style={styles.text}>
                    <FormattedMessage id="stop" />
                  </Text>
                  <Ionicons style={styles.icon} name="stop-outline" size={22} color="white" />
                </>
              )}
            </View>
          </Pressable>
        </View>
      </ImageBackground>
    </IntlProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    resizeMode: "cover",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 305,
    height: 250,
    marginBottom: 150,
    justifyContent: "center",
  },
  button: {
    padding: 20,
    margin: 20,
    borderRadius: 10,
    backgroundColor: "#6B7B67",
  },
  textContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
  },
  icon: {},
})
