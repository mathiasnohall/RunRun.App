import React from "react"
import { IntlProvider } from "react-intl"
import sv from "./lang/sv.json"
import Home from "./components/Home.component"
import Settings from "./components/Settings.component"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Routes } from "./routes/routes"
import { BleProvider } from "./context/bleContext"
import { SettingsProvider } from "./context/settingsContext"

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <BleProvider>
      <SettingsProvider>
        <IntlProvider messages={sv} locale="sv-SE">
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName={Routes.Home}
              screenOptions={() => ({
                headerShown: false,
              })}
            >
              <Stack.Screen name={Routes.Home} component={Home} />
              <Stack.Screen name={Routes.Settings} component={Settings} />
            </Stack.Navigator>
          </NavigationContainer>
        </IntlProvider>
      </SettingsProvider>
    </BleProvider>
  )
}
