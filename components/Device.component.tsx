import React from "react"
import { StyleSheet, Text, View } from "react-native"
import { FormattedMessage } from "react-intl"
import { decode } from "js-base64"

export type DeviceParams = {
  deviceId: string
  name: string
  localName: string
  rssi: number
  manufacturer: string
  mtu: number
  txPowerLevel: number
}

export default function Device(device: DeviceParams) {
  const { deviceId, name, localName, rssi, manufacturer, mtu, txPowerLevel } = device
  return (
    <View style={styles.container}>
      <Text>
        <FormattedMessage id="deviceInfo" />
      </Text>
      <View>
        <Text>{`Id : ${deviceId}`}</Text>
        <Text>{`Name : ${name}`}</Text>
        <Text>{`Name : ${localName}`}</Text>
        <Text>{`RSSI : ${rssi}`}</Text>
        <Text>{`Manufacturer data: ${decode(manufacturer)}`}</Text>
        <Text>{`Maximum Transfer Unit : ${mtu}`}</Text>
        <Text>{`Transfe Power level : ${txPowerLevel}`}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
  }
})
