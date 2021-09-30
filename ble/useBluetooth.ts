import { encode } from "js-base64"
import { v4 as uuidv4 } from "uuid"
import { useEffect, useState } from "react"
import { BleError, BleManager, Device } from "react-native-ble-plx"

const UARTServiceUUID = "6e400001-b5a3-f393-e0a9-e50e24dcca9e"
const UARTTX = "6e400002-b5a3-f393-e0a9-e50e24dcca9e"
const UARTRX = "6e400003-b5a3-f393-e0a9-e50e24dcca9e"

export type BluetoothProps = {
  toggleStart: () => void
  changeSpeed: (speed: number) => void
  changeDistance: (distance: number) => void
  connect: () => void
  device: Device | null
  running: boolean
  connected: boolean
}

export const useBluetooth = (): BluetoothProps => {
  const [initiated, setInitiated] = useState<boolean>(false)
  const [manager, setManager] = useState<BleManager | null>(null)
  const [device, setDevice] = useState<Device | null>(null)

  const [running, setRunning] = useState<boolean>(false)
  const [connected, setConnected] = useState<boolean>(false)

  useEffect(() => {
    if (!initiated) setManager(new BleManager())
    setInitiated(true)
  }, [initiated, manager])

  const sendUART = (data: string) => {
    if (manager && device) {
      manager.writeCharacteristicWithResponseForDevice(device.id, UARTServiceUUID, UARTTX, encode(data), uuidv4())
    }
  }

  const connect = () => {
    if (manager) {
      manager.startDeviceScan(null, { allowDuplicates: false }, async (error, device) => handleDeviceScan(error, device))
    }
  }

  const getDeviceInformation = async (device: Device) => {
    const connectedDevice = await device.connect()
    setDevice(device)

    const isConnected = await connectedDevice.isConnected()
    console.log("connected " + isConnected)
    const allServicesAndCharacteristics = await connectedDevice.discoverAllServicesAndCharacteristics()
  }

  const handleDeviceScan = async (error: BleError | null, device: Device | null) => {
    if (error) {
      console.log(error)
      return
    }
    if (manager != null && device != null && device.localName === "Adafruit Bluefruit LE") {
      console.log("found " + device?.localName)
      manager.stopDeviceScan()

      device.onDisconnected(() => {
        console.log("disconneced")
        setConnected(false)
        setRunning(false)
      })
      await getDeviceInformation(device)
      setConnected(true)
    }
  }
  const changeSpeed = (speed: number) => {
    sendUART(encode("speed:"+speed))
  }
  const changeDistance = (distance: number) => {
    sendUART(encode("distance:"+distance))
  }

  const getInputValue = (): string => {
    if (running) {
      return encode("stop")
    }
    return encode("start")
  }

  const toggleStart = () => {
    if (!connected) {
      return
    }
    sendUART(getInputValue())
  }

  return { toggleStart, changeSpeed, changeDistance, connect, device, connected, running }
}
