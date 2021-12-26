import React, { useEffect, useContext } from 'react'
import Context from './context/exports'
import GlobalFont from 'react-native-global-font'
import AuthNavigation from './navigation/auth'
import HomeNavigation from './navigation/home'

const App = () => {
  const { userData } = useContext(Context.Auth.Context)

  useEffect(() => {
    let fontName = 'Inter'
    GlobalFont.applyGlobal(fontName)
  }, [])

  if (!userData) return <AuthNavigation />
  return <HomeNavigation />
}

export default App
