import React from 'react'
import { AppRegistry, LogBox } from 'react-native'
import { name as appName } from './app.json'
import App from './src/App'
import Context from './src/context/exports'
import axios from 'axios'

axios.defaults.withCredentials = true

import { NavigationContainer } from '@react-navigation/native'

LogBox.ignoreAllLogs()

const Wrapper = () => {
  return (
    <Context.Auth.Provider value={Context.Auth.Context}>
      <NavigationContainer>
        <App />
      </NavigationContainer>
    </Context.Auth.Provider>
  )
}

AppRegistry.registerComponent(appName, () => Wrapper)
