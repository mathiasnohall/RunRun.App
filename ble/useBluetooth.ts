import { encode } from "js-base64"
import { v4 as uuidv4 } from "uuid"
import { BleError, BleManager, Device } from "react-native-ble-plx"
import BleContext from "../context/bleContext"
import { useContext } from "react"

const UARTServiceUUID = "6e400001-b5a3-f393-e0a9-e50e24dcca9e"
const UARTTX = "6e400002-b5a3-f393-e0a9-e50e24dcca9e"
const UARTRX = "6e400003-b5a3-f393-e0a9-e50e24dcca9e"

const DEVICE_NAME: string = "Adafruit Bluefruit LE"

export type BluetoothProps = {
  start: () => Promise<void>
  stop: () => Promise<void>
  changeSpeed: (speed: number) => Promise<void>
  changeDistance: (distance: number) => Promise<void>
  changeWait: (wait: number) => Promise<void>
  connect: () => void
  device: Device | null
  running: boolean
  connected: boolean
}

var manager: BleManager = new BleManager()

export const useBluetooth = (): BluetoothProps => {
  const { device, connected, running, setConnected: setConnected, setRunning: setRunning, setDevice } = useContext(BleContext)

  const sendUART = async (data: string) => {
    if (device) {
      await manager?.writeCharacteristicWithResponseForDevice(device.id, UARTServiceUUID, UARTTX, encode(data), uuidv4())
    }
  }

  const connect = () => {
    console.log("start connecting")
    manager?.startDeviceScan(null, { allowDuplicates: false }, async (error, device) => handleDeviceScan(error, device))
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
    if (device != null && device.localName === DEVICE_NAME) {
      console.log("found " + device?.localName)
      manager?.stopDeviceScan()

      device.onDisconnected(() => {
        console.log("disconneced")
        setConnected(false)
        setRunning(false)
        device = null
      })
      await getDeviceInformation(device)
      setConnected(true)
    }
  }
  const changeSpeed = async (speed: number) => {
    await sendUART("speed:" + speed)
  }

  const changeDistance = async (distance: number) => {
    await sendUART("distance:" + distance)
  }
  
  const changeWait = async (wait: number) => {
    await sendUART("wait:" + wait)
  }

  const start = async () => {
    if (!connected || running) {
      return
    }
    await sendUART("start")
    setRunning(true)
  }

  const stop = async () => {
    if (!connected || !running) {
      return
    }
    await sendUART("stop")
    setRunning(false)
  }

  return { start, stop, changeSpeed, changeDistance, changeWait, connect, device, connected, running }
}
