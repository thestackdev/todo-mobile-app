import React, { createContext, useEffect, useState } from 'react'
import RNBootSplash from 'react-native-bootsplash'
import axios from 'axios'
import database from '../db'
import { AUTH_URL } from '@env'

const Context = createContext()

const CONSTANTS = {
  USER_DATA: 'USER_DATA',
}

const Provider = (props) => {
  const [userData, setUserData] = useState(null)

  const initalise = async () => {
    const data = await database.localStorage.get(CONSTANTS.USER_DATA)
    setUserData(data)
    await RNBootSplash.hide()
  }

  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        'https://apis.shanmukeshwar.me/auth/auth/verifyToken'
      )
      setUserData(response.data)
      await database.localStorage.set(CONSTANTS.USER_DATA, response.data)
    } catch (error) {
      await database.localStorage.remove(CONSTANTS.USER_DATA)
    }
  }

  const logout = async () => {
    try {
      await axios.get(AUTH_URL + 'logout')
      await database.localStorage.remove(CONSTANTS.USER_DATA)
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
