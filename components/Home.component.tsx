import React, { useEffect, useState } from "react"
import { FormattedMessage } from "react-intl"
import { ImageBackground, Pressable, StyleSheet, Text, View, Image } from "react-native"
import { Ionicons, FontAwesome } from "@expo/vector-icons"
import { BleManager, Device, BleError } from "react-native-ble-plx"
import { v4 as uuidv4 } from "uuid"
import { encode } from "js-base64"

const _manager: BleManager = new BleManager()
let _device: Device

const UARTServiceUUID = "6e400001-b5a3-f393-e0a9-e50e24dcca9e"
const UARTTX = "6e400002-b5a3-f393-e0a9-e50e24dcca9e"
const UARTRX = "6e400003-b5a3-f393-e0a9-e50e24dcca9e"

export default function Home() {
  const [running, setRunning] = useState<boolean>(false)
  const [connected, setConnected] = useState<boolean>(false)

  const getDeviceInformation = async (device: Device) => {
    const connectedDevice = await device.connect()
    _device = device

    const isConnected = await connectedDevice.isConnected()
    console.log("connected " + isConnected)
    const allServicesAndCharacteristics = await connectedDevice.discoverAllServicesAndCharacteristics()
    setConnected(true)
  }

  const handleDeviceScan = async (error: BleError | null, device: Device | null) => {
    if (error) {
      console.log(error)
      return
    }
    if (device != null && device.localName === "Adafruit Bluefruit LE") {
      console.log("found " + device?.localName)
      _manager.stopDeviceScan()

      device.onDisconnected(() => {
        console.log("disconneced")
        setConnected(false)
      })
      await getDeviceInformation(device)
    }
  }

  useEffect(() => {
    if (!connected) {
      console.log("start scanning")
      _manager.startDeviceScan(null, { allowDuplicates: false }, async (error, device) => handleDeviceScan(error, device))
    }
  }, [connected, setConnected])

  const getInputValue = (): string => {
    if (running) {
      return encode("stop")
    }
    return encode("start")
  }

  const onPressStart = () => {
    if (!connected) {
      return
    }

    _manager.writeCharacteristicWithResponseForDevice(_device.id, UARTServiceUUID, UARTTX, getInputValue(), uuidv4())
    setRunning(!running)
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
