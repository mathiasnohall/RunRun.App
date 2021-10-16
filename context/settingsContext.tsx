import React, { createContext, FC, useState } from "react"

export interface ISettingsContext {
  speed: number,
  setSpeed: (speed: number) => void,
  wait: number,
  setWait: (wait: number) => void,
  distance: number
  setDistance: (distance: number) => void,
};

const defaultState: ISettingsContext = {
  speed: 255,
  setSpeed: () => {},
  wait: 5000,
  setWait: () => {},
  distance: 110,
  setDistance: () => {},
}

const SettingsContext = createContext<ISettingsContext>(defaultState)
export default SettingsContext

export const SettingsProvider: FC = ({ children }) => {
  const [speed, setSpeed] = useState(defaultState.speed)
  const [wait, setWait] = useState(defaultState.wait)
  const [distance, setDistance] = useState(defaultState.distance)

  return (
    <SettingsContext.Provider
      value={{
        speed, 
        setSpeed,
        wait,
        setWait,
        distance,
        setDistance
      }}
    >
      {children}
    </SettingsContext.Provider>
  )
}
