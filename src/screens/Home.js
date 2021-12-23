import React, { useContext } from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import Context from '../context/exports'

const Todos = () => {
  const { userData, logout } = useContext(Context.Auth.Context)

  return (
    <View style={Styles.Container}>
      <Text style={Styles.Header}>Hello , {userData.username}!</Text>
      <Pressable style={Styles.Pressable} onPress={logout}>
        <Text style={Styles.PressableText}>Logout</Text>
      </Pressable>
    </View>
  )
}

const Styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Header: {
    color: '#455A64',
    fontSize: 23,
    marginVertical: 30,
  },
  Pressable: {
    backgroundColor: '#7986CB',
    paddingVertical: 12,
    paddingHorizontal: 19,
    borderRadius: 12,
  },
  PressableText: {
    color: '#fff',
    fontSize: 23,
  },
})

export default Todos
