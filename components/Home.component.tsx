import React, { useEffect, useState } from "react"
import { FormattedMessage } from "react-intl"
import { ImageBackground, Pressable, StyleSheet, Text, View, Image } from "react-native"
import { Ionicons, FontAwesome } from "@expo/vector-icons"
import { BleManager, Device, State, Characteristic, Service, Descriptor } from "react-native-ble-plx"

export default function Home() {
  const [running, setRunning] = useState<boolean>(false)
  const [connected, setConnected] = useState<boolean>(false)

  let _manager : BleManager
  let _device : Device

  useEffect(() => {
    if (!connected) {
      try {
        _manager = new BleManager()
        _manager.onStateChange((state) => {
          const subscription = _manager.onStateChange((state) => {
            if (state === State.PoweredOn) {
              _manager.startDeviceScan(null, { allowDuplicates: false }, (error, device) => {
                if (error) {
                  console.log(error)
                  return
                }
                console.log(device?.localName)
                if (device != null && device.localName === "Adafruit Bluefruit LE") {
                  _manager.stopDeviceScan()

                  device.onDisconnected(() => {
                    console.log("disconnected")
                    setConnected(false)
                  })

                  console.log("connecting to: " + device.localName)
                  device
                    .connect()
                    .then((device) => {
                      return device.discoverAllServicesAndCharacteristics()
                    })
                    .then((device) => {
                      console.log("connected!")
                      _device = device
                      setConnected(true)
                      // Do work on device with services and characteristics
                    })
                    .catch((error) => {
                      console.log(error)
                      // Handle errors
                    })
                }
              })
              subscription.remove()
            }
          }, true)
          return () => {
            subscription.remove()
            _manager.destroy()
          }
        })
      } catch {}
    }
  }, [connected, setConnected])

  const onPressStart = () => {
    if (!connected) {
      return
    }
    _device.isConnected()
      .then(() => setRunning(!running))
    console.log(_device)
    
  }

  return (
    <ImageBackground source={require("./../assets/background.png")} style={styles.container}>
      <View>
        <Image source={require("./../assets/logo.png")} style={styles.logo} />
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
