import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Screens from '../screens/exports'

const Stack = createNativeStackNavigator()

const HomeNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Screens.Home}
        options={{ headerShown: false, statusBarHidden: true }}
      />
    </Stack.Navigator>
  )
}

export default HomeNavigation
