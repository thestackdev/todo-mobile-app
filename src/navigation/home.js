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
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Append"
        component={Screens.Append}
        options={{
          title: '',
          headerStyle: { backgroundColor: '#fff' },
          headerShadowVisible: false,
          headerTintColor: '#4285F4',
        }}
      />
      <Stack.Screen
        name="Update"
        component={Screens.Update}
        options={{
          title: '',
          headerStyle: { backgroundColor: '#fff' },
          headerShadowVisible: false,
          headerTintColor: '#4285F4',
        }}
      />
    </Stack.Navigator>
  )
}

export default HomeNavigation
