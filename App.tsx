import React from "react"
import { IntlProvider } from "react-intl"
import sv from "./lang/sv.json"
import Home from "./components/Home.component"

export default function App() {
  return (
    <IntlProvider messages={sv} locale="sv-SE">
      <Home />
    </IntlProvider>
  )
}
