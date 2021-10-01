import React, { useState, useCallback } from "react"
import { FormattedMessage } from "react-intl"
import { ImageBackground, Pressable, StyleSheet, Text, View, Image, ActivityIndicator } from "react-native"
import { Ionicons, FontAwesome } from "@expo/vector-icons"
import "react-native-get-random-values"
import { useNavigation } from "@react-navigation/core"
import { Routes } from "../routes/routes"
import { useBluetooth } from "../ble/useBluetooth"

export default function Home() {
  const [connecting, setConnecting] = useState<boolean>(false)
  const navigation = useNavigation()
  const ble = useBluetooth()

  const onPressConnect = useCallback(() => {
    if (!connecting && !ble.connected) {
      console.log("start connecting")
      setConnecting(true)
      ble.connect()
      if (ble.connected) {
        setConnecting(false)
      }
    }
  }, [ble.connected])

  const onPressStart = () => {
    ble.toggleStart()
  }

  return (
    <ImageBackground source={require("./../assets/background.png")} style={styles.container}>
      <View>
        <Image source={require("./../assets/logo.png")} style={styles.logo} />
        {ble.connected && (
          <>
            <Pressable onPress={() => navigation.navigate(Routes.Settings as never)} style={styles.settingsButton}>
              <View style={styles.textContainer}>
                <Text style={styles.text}>
                  <FormattedMessage id="settings" />
                </Text>
                <FontAwesome name="sliders" size={22} color="white" />
              </View>
            </Pressable>
            <Pressable onPress={onPressStart} style={styles.button}>
              <View style={styles.textContainer}>
                {!ble.running && (
                  <>
                    <Text style={styles.text}>
                      <FormattedMessage id="start" />
                    </Text>
                    <Ionicons name="play-outline" size={22} color="white" />
                  </>
                )}
                {ble.running && (
                  <>
                    <Text style={styles.text}>
                      <FormattedMessage id="stop" />
                    </Text>
                    <Ionicons name="stop-outline" size={22} color="white" />
                  </>
                )}
              </View>
            </Pressable>
          </>
        )}
        {!ble.connected && (
          <>
            {!connecting && (
              <Pressable onPress={onPressConnect} style={styles.button}>
                <View style={styles.textContainer}>
                  <Text style={styles.text}>
                    <FormattedMessage id="connect" />
                  </Text>
                </View>
              </Pressable>
            )}
            {connecting && (
              <View style={styles.button}>
                <View style={styles.textContainer}>
                  <Text style={styles.text}>
                    <FormattedMessage id="connecting" />
                  </Text>
                  <ActivityIndicator size="small" color="white" />
                </View>
              </View>
            )}
          </>
        )}
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
    marginBottom: 225,
    justifyContent: "center",
  },
  button: {
    padding: 20,
    margin: 20,
    borderRadius: 10,
    backgroundColor: "#6B7B67",
  },
  settingsButton: {
    padding: 20,
    margin: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "white",
    borderStyle: "solid",
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
})
