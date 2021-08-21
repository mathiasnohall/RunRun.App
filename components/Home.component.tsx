import React, { useEffect, useState } from "react"
import { FormattedMessage } from "react-intl"
import { ImageBackground, Pressable, StyleSheet, Text, View, Image } from "react-native"
import { Ionicons, FontAwesome } from "@expo/vector-icons"
import { BleManager, Device, State, Characteristic, Service, Descriptor, BleError } from "react-native-ble-plx"
import { Base64 } from '../base64';

const _manager : BleManager = new BleManager()
let _device : Device

export default function Home() {

  const [services, setServices] = useState<Service[]>([]);
  const [characteristics, setCharacteristics] = useState<Characteristic[]>([]);
  const [descriptors, setDescriptors] = useState<Descriptor[]>([]);

  const [running, setRunning] = useState<boolean>(false)
  const [connected, setConnected] = useState<boolean>(false)
  
  const getCharacteristics = async (service: Service) => {
    const newCharacteristics = await service.characteristics();
    setCharacteristics(newCharacteristics);
    newCharacteristics.forEach(async (characteristic) => {
      console.log("characteristic uuid: " + characteristic.uuid)
      const newDescriptors = await characteristic.descriptors();
      setDescriptors((prev) => [...new Set([...prev, ...newDescriptors])]);
    });
  };

  const getDeviceInformation = async (device: Device) => {
    // connect to the device
    console.log("connecting to " + device.localName)
    const connectedDevice = await device.connect();
    _device = device
    setConnected(true);

    const isConnected = await connectedDevice.isConnected();
    console.log("connected " + isConnected)
    const allServicesAndCharacteristics = await connectedDevice.discoverAllServicesAndCharacteristics();
    const discoveredServices = await allServicesAndCharacteristics.services();
    setServices(discoveredServices);
    console.log("connected to " + device.localName)
    discoveredServices.forEach(async (service) => {      
      console.log("service uuid:" + service.uuid)
      await getCharacteristics(service)
    });
    console.log("done")

  }

  const handleDeviceScan = async (error: BleError | null, device: Device | null) => {
    if (error) {
      console.log(error)
      return
    }
    if (device != null && device.localName === "Adafruit Bluefruit LE") {
      console.log("found " + device?.localName)
      console.log("can connect " +  device?.isConnectable)
      _manager.stopDeviceScan()
      
      device.onDisconnected(() => {
        console.log("disconneced")
        //setConnected(false)
      });
      await getDeviceInformation(device);
    }
  }

  useEffect(() => {
    if (!connected) {
      console.log("start scanning")
      _manager.startDeviceScan(null, { allowDuplicates: false }, async (error, device) => handleDeviceScan(error, device))


        // _manager.onStateChange((state) => {
        //   const subscription = _manager.onStateChange((state) => {
        //     if (state === State.PoweredOn) {
        //       _manager.startDeviceScan(null, { allowDuplicates: false }, function (error: BleError | null, device: Device | null) {
        //           if (error) {
        //             console.log(error)
        //             return
        //           }
        //           console.log(device?.localName)
        //           if (device != null && device.localName === "Adafruit Bluefruit LE") {
        //             _manager.stopDeviceScan()

        //             device.onDisconnected(() => {
        //               console.log("disconnected")
        //               setConnected(false)
        //             })

        //             console.log(device.isConnectable)

        //             console.log("connecting to: " + device.localName)
        //             device
        //               .connect()
        //               .then((device: Device) => {
        //                 console.log("hej")
        //                 console.log(device.localName)
        //                 return device.discoverAllServicesAndCharacteristics()
        //               })
        //               .then((device: Device) => {
        //                 console.log("connected to" + device.localName)
        //                 _device = device
        //                 setConnected(true)
        //                 // Do work on device with services and characteristics
        //               })
        //               .catch((error) => {
        //                 console.log(error)
        //                 // Handle errors
        //               })
        //           }
        //         })
        //       subscription.remove()
        //     }
        //   }, true)
        //   return () => {
        //     subscription.remove()
        //     //_manager.destroy()
        //   k
        // })
    }
  }, [connected, setConnected])

  const onPressStart = () => {
    if (!connected) {
      return
    }
    setRunning(!running)
    _manager.writeCharacteristicWithResponseForDevice(
      _device.id, 
      services[0].uuid, 
      characteristics[0].serviceUUID, 
      Base64.encode("start"), 
      "5eedbf05-52f0-40ed-8f22-14e818501dd8")
    console.log(_device.localName)    
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
