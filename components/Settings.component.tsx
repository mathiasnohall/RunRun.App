import React, { useContext, useState } from "react"
import { FormattedMessage } from "react-intl"
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native"
import { FontAwesome } from "@expo/vector-icons"
import "react-native-get-random-values"
import { useNavigation } from "@react-navigation/native"
import DeviceComponent from "./Device.component"
import { Routes } from "../routes/routes"
import { useBluetooth } from "../ble/useBluetooth"
import SettingsContext from "../context/settingsContext"

export default function Settings() {
  const { device, changeSpeed, changeDistance, changeWait } = useBluetooth()
  const { speed, setSpeed, distance, setDistance, wait, setWait } = useContext(SettingsContext)
  const [loading, setLoading] = useState<boolean>(false)

  const handleSpeedChange = async (speed: number) => {
    console.log("speed: " + speed)
    setLoading(!loading)
    await changeSpeed(speed)
    setSpeed(speed)
    setLoading(!loading)
  }

  const handleDistanceChange = async (distance: number) => {
    console.log("distance:" + distance)
    setLoading(!loading)
    await changeDistance(distance)
    setDistance(distance)
    setLoading(!loading)
  }

  const handleWaitChange = async (wait: number) => {
    console.log("wait:" + wait)
    setLoading(!loading)
    await changeWait(wait)
    setWait(wait)
    setLoading(!loading)
  }

  const navigation = useNavigation()
  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigation.navigate(Routes.Home as never)} style={styles.backButton}>
        <FontAwesome style={styles.icon} name="arrow-left" size={22} color="white" />
      </Pressable>
      <Text style={styles.text}>
        <FormattedMessage id="speed" />
        {loading && <ActivityIndicator size="small" color="white" />}
      </Text>
      <View style={styles.speedContainer}>
        <Pressable disabled={loading} onPress={() => handleSpeedChange(150)} style={speed == 150 ? styles.selectedButton : styles.button}>
          <Text style={styles.text}>
            <FormattedMessage id="speedSlow" />
          </Text>
        </Pressable>
        <Pressable disabled={loading} onPress={() => handleSpeedChange(200)} style={speed == 200 ? styles.selectedButton : styles.button}>
          <Text style={styles.text}>
            <FormattedMessage id="speedMedium" />
          </Text>
        </Pressable>
        <Pressable disabled={loading} onPress={() => handleSpeedChange(255)} style={speed == 255 ? styles.selectedButton : styles.button}>
          <Text style={styles.text}>
            <FormattedMessage id="speedFast" />
          </Text>
        </Pressable>
      </View>
      <Text style={styles.text}>
        <FormattedMessage id="distance" />
        {loading && <ActivityIndicator size="small" color="white" />}
      </Text>
      <View style={styles.distanceContainer}>
        <Pressable disabled={loading} onPress={() => handleDistanceChange(70)} style={distance == 70 ? styles.selectedButton : styles.button}>
          <Text style={styles.text}>
            <FormattedMessage id="distanceShort" />
          </Text>
        </Pressable>
        <Pressable disabled={loading} onPress={() => handleDistanceChange(110)} style={distance == 110 ? styles.selectedButton : styles.button}>
          <Text style={styles.text}>
            <FormattedMessage id="distanceMedium" />
          </Text>
        </Pressable>
        <Pressable disabled={loading} onPress={() => handleDistanceChange(210)} style={distance == 210 ? styles.selectedButton : styles.button}>
          <Text style={styles.text}>
            <FormattedMessage id="distanceLong" />
          </Text>
        </Pressable>
      </View>

      <Text style={styles.text}>
        <FormattedMessage id="wait" />
        {loading && <ActivityIndicator size="small" color="white" />}
      </Text>
      <View style={styles.distanceContainer}>
        <Pressable disabled={loading} onPress={() => handleWaitChange(1000)} style={wait == 1000 ? styles.selectedButton : styles.button}>
          <Text style={styles.text}>
            <FormattedMessage id="waitShort" />
          </Text>
        </Pressable>
        <Pressable disabled={loading} onPress={() => handleWaitChange(5000)} style={wait == 5000 ? styles.selectedButton : styles.button}>
          <Text style={styles.text}>
            <FormattedMessage id="waitMedium" />
          </Text>
        </Pressable>
        <Pressable disabled={loading} onPress={() => handleWaitChange(10000)} style={wait == 10000 ? styles.selectedButton : styles.button}>
          <Text style={styles.text}>
            <FormattedMessage id="waitLong" />
          </Text>
        </Pressable>
      </View>
      {device && (
        <DeviceComponent
          deviceId={device.id}
          name={device.name ?? ""}
          localName={device.localName ?? ""}
          rssi={device.rssi ?? 0}
          manufacturer={device.manufacturerData ?? ""}
          mtu={device.mtu ?? 0}
          txPowerLevel={device.txPowerLevel ?? 0}
        />
      )}
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
    color: "#fff",
    backgroundColor: "#6B7B67",
  },
  selectedButton: {
    padding: 20,
    margin: 20,
    borderRadius: 10,
    color: "#6B7B67",
    backgroundColor: "#FB7938",
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
