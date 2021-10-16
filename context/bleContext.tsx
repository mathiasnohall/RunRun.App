import React, { createContext, FC, useState } from "react"
import { Device } from "react-native-ble-plx"

export interface IBleContext {
  device: Device | null
  connected: boolean
  running: boolean
  setConnected: (connected: boolean) => void
  setRunning: (running: boolean) => void
  setDevice: (device: Device) => void
}

const defaultState: IBleContext = {
  device: null,
  connected: false,
  running: false,
  setConnected: () => {},
  setRunning: () => {},
  setDevice: () => {},
}

const BleContext = createContext<IBleContext>(defaultState)
export default BleContext

export const BleProvider: FC = ({ children }) => {
  const [connected, setConnected] = useState(defaultState.connected)
  const [running, setRunning] = useState(defaultState.running)
  const [device, setDevice] = useState<Device | null>(defaultState.device)

  return (
    <BleContext.Provider
      value={{
        device,
        running,
        connected,
        setConnected,
        setRunning,
        setDevice,
      }}
    >
      {children}
    </BleContext.Provider>
  )
}
