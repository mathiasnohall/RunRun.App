import React from "react"
import { IntlProvider } from "react-intl"
import sv from "./lang/sv.json"
import Home from "./components/Home.component"
import Settings from "./components/Settings.component"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <IntlProvider messages={sv} locale="sv-SE">
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={() => ({
            headerShown: false,
          })}
        >
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Settings" component={Settings} />
        </Stack.Navigator>
      </NavigationContainer>
    </IntlProvider>
  )
}
