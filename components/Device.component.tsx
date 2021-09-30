import React from "react"
import { StyleSheet, Text, View } from "react-native"
import { FormattedMessage } from "react-intl"

export type DeviceParams = {
  id: string 
  name: string
  rssi: string
  manufacturer: string
  serviceData: string
}

export default function Device(device: DeviceParams) {
  const { id, name, rssi, manufacturer, serviceData } = device
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        <FormattedMessage id="deviceInfo" />
      </Text>
      <View style={styles.container}>
        <Text>{`Id : ${id}`}</Text>
        <Text>{`Name : ${name}`}</Text>
        <Text>{`RSSI : ${rssi}`}</Text>
        <Text>{`Manufacturer : ${manufacturer}`}</Text>
        <Text>{`ServiceData : ${serviceData}`}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {},
})
