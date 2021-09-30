import React from "react"
import { FormattedMessage } from "react-intl"
import { Pressable, StyleSheet, Text, View, Image } from "react-native"
import { FontAwesome } from "@expo/vector-icons"
import "react-native-get-random-values"
import { useNavigation } from "@react-navigation/native"
import DeviceComponent from "./Device.component"
import { Routes } from "../routes/routes"
import { useBluetooth } from "../ble/useBluetooth"

export default function Settings() {
  const { device, changeSpeed, changeDistance } = useBluetooth()

  const handleSpeedChange = (speed: number) => {
    console.log("speed: " + speed)
    changeSpeed(speed)
  }
  const handleDistanceChange = (distance: number) => {
    console.log("distance:" + distance)
    changeDistance(distance)
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
