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
  device: DeviceParams | null
}

export default function Settings(params: SettingsParams) {
  const { device } = params
  
  const handleSpeedChange = (speed: number) => {
    console.log("speed: " + speed)
  }
  const handleDistanceChange = (distance: number) => {
    console.log("distance:" + distance)
  }

  const navigation = useNavigation()
  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigation.navigate(Routes.Home as never)} style={styles.backButton}>
        <FontAwesome style={styles.icon} name="arrow-left" size={22} color="white" />
      </Pressable>
      <Text style={styles.text}>
          <FormattedMessage id="speed" />
        </Text>
      <View style={styles.speedContainer}>        
        <Pressable onPress={() => handleSpeedChange(1)} style={styles.button}>
          <>
            <Text style={styles.text}>
              <FormattedMessage id="speedSlow" />
            </Text>
          </>
        </Pressable>
        <Pressable onPress={() => handleSpeedChange(2)} style={styles.button}>
          <>
            <Text style={styles.text}>
              <FormattedMessage id="speedMedium" />
            </Text>
          </>
        </Pressable>
        <Pressable onPress={() => handleSpeedChange(3)} style={styles.button}>
          <>
            <Text style={styles.text}>
              <FormattedMessage id="speedFast" />
            </Text>
          </>
        </Pressable>
      </View>
      <Text style={styles.text}>
        <FormattedMessage id="distance" />
      </Text>
      <View style={styles.distanceContainer}>
        <Pressable onPress={() => handleDistanceChange(1)} style={styles.button}>
          <>
            <Text style={styles.text}>
              <FormattedMessage id="distance" />
            </Text>
          </>
        </Pressable>
      </View>
      {device && <DeviceComponent id={device.id} name={device.name} rssi={device.rssi} manufacturer={device.manufacturer} serviceData={device.serviceData} />}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    padding: 15,
    backgroundColor: "#303032",
  },
  speedContainer: {
    display: "flex",
    flexDirection: "row",
  },
  distanceContainer: {
    display: "flex",
    flexDirection: "row",
  },
  button: {
    padding: 20,
    margin: 20,
    borderRadius: 10,
    backgroundColor: "#6B7B67",
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
  },
  backButton: {
    marginTop: 20,
    marginBottom: 20,
  },
  icon: {},
})
