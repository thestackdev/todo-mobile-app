import React, { useContext } from 'react'
import Context from './context/exports'

import AuthNavigation from './navigation/auth'
import HomeNavigation from './navigation/home'

const App = () => {
  const { userData } = useContext(Context.Auth.Context)

  if (!userData) return <AuthNavigation />
  return <HomeNavigation />
}

export default App
