import React, { useEffect, useState } from "react"
import { FormattedMessage } from "react-intl"
import { Pressable, StyleSheet, Text, View, Image } from "react-native"
import { FontAwesome } from "@expo/vector-icons"
import "react-native-get-random-values"
import { useNavigation } from "@react-navigation/native"

export default function Settings() {
  const handleSpeedChange = (speed: number) => void {}

  const navigation = useNavigation()
  return (
    <View>
      <FontAwesome style={styles.icon} name="arrow-left" size={22} color="white" />
      <Pressable onPress={() => navigation.navigate("Home")} style={styles.button} />
      <Text style={styles.text}>
        <FormattedMessage id="speed" />
      </Text>
      <Pressable onPress={handleSpeedChange(7)} style={styles.button}>
        <>
          <Text style={styles.text}>
            <FormattedMessage id="speed.slow" />
          </Text>
        </>
      </Pressable>
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
