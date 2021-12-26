import React, { createContext, useEffect, useState } from 'react'
import RNBootSplash from 'react-native-bootsplash'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AUTH_URL } from '@env'
import axios from 'axios'

const Context = createContext()

const CONSTANTS = {
  USER_DATA: 'USER_DATA',
}

const Provider = (props) => {
  const [userData, setUserData] = useState(null)

  const initalise = async () => {
    let data = await AsyncStorage.getItem(CONSTANTS.USER_DATA)
    if (data) setUserData(JSON.parse(data))
    await RNBootSplash.hide()
  }

  const fetchUserData = async () => {
    try {
      const response = await axios.get(AUTH_URL + 'verifyToken')
      setUserData(response.data)
      await AsyncStorage.setItem(
        CONSTANTS.USER_DATA,
        JSON.stringify(response.data)
      )
    } catch (error) {
      console.log(error)
      await AsyncStorage.removeItem(CONSTANTS.USER_DATA)
    }
  }

  const logout = async () => {
    try {
      await axios.get(AUTH_URL + 'logout')
      await AsyncStorage.removeItem(CONSTANTS.USER_DATA)
      setUserData(null)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    initalise()
  }, [])

  return (
    <Context.Provider value={{ userData, fetchUserData, logout }}>
      {props.children}
    </Context.Provider>
  )
}

export default AuthContext = { Provider, Context }
