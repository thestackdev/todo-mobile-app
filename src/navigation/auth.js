import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Screens from '../screens/exports'

const Stack = createNativeStackNavigator()

const AuthNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Screens.Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={Screens.Register}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Verify"
        component={Screens.Verify}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}

export default AuthNavigation
