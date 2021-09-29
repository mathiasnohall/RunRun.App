import React from "react"
import { FormattedMessage } from "react-intl"
import { Pressable, StyleSheet, Text, View, Image } from "react-native"
import { FontAwesome } from "@expo/vector-icons"
import "react-native-get-random-values"
import { useNavigation } from "@react-navigation/native"
import DeviceComponent, { DeviceParams } from "./Device.component"
import { Routes } from "../routes/routes"

export type SettingsParams = {
  speedChange: (speed: number) => void
  distanceChange: (speed: number) => void
  device: DeviceParams
}

export default function Settings(params: SettingsParams) {
  const { speedChange, distanceChange, device } = params
  const navigation = useNavigation()
  return (
    <View>
      <Pressable onPress={() => navigation.navigate(Routes.Home as never)} style={styles.button}>
        <FontAwesome style={styles.icon} name="arrow-left" size={22} color="white" />
      </Pressable>
      <View>
        <Text style={styles.text}>
          <FormattedMessage id="speed" />
        </Text>
        <Pressable onPress={() => speedChange(1)} style={styles.button}>
          <>
            <Text style={styles.text}>
              <FormattedMessage id="speedSlow" />
            </Text>
          </>
        </Pressable>
        <Pressable onPress={() => speedChange(2)} style={styles.button}>
          <>
            <Text style={styles.text}>
              <FormattedMessage id="speedMedium" />
            </Text>
          </>
        </Pressable>
        <Pressable onPress={() => speedChange(3)} style={styles.button}>
          <>
            <Text style={styles.text}>
              <FormattedMessage id="speedFast" />
            </Text>
          </>
        </Pressable>
      </View>

      <View>
        <Text style={styles.text}>
          <FormattedMessage id="distance" />
        </Text>
        <Pressable onPress={() => distanceChange(1)} style={styles.button}>
          <>
            <Text style={styles.text}>
              <FormattedMessage id="distance" />
            </Text>
          </>
        </Pressable>
      </View>
      <DeviceComponent id={device.id} name={device.name} rssi={device.rssi} manufacturer={device.manufacturer} serviceData={device.serviceData} />
    </View>
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
