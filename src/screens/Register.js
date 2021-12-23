import React, { useEffect, useState, useContext } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  ScrollView,
  Keyboard,
} from 'react-native'
import Input from '../components/Input'
import axios from 'axios'
import Assets from '../assets/exports'
import { isEmail, isPassword, isUsername } from '../helpers/validator'
import { AUTH_URL } from '@env'

const Register = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState(false)
  const [credentials, setCredentials] = useState({
    username: null,
    email: null,
    password: null,
  })
  const [errors, setErrors] = useState({
    username: null,
    email: null,
    password: null,
  })
  const [loading, setLoading] = useState(false)
  const handleSubmit = async () => {
    Keyboard.dismiss()
    if (!isUsername(credentials.username)) {
      setErrors({ username: 'Invalid username' })
      return
    }
    if (!isEmail(credentials.email)) {
      setErrors({ email: 'Invalid email' })
      return
    }
    if (!isPassword(credentials.password)) {
      setErrors({ password: 'Invalid password' })
      return
    }
    setLoading(true)
    try {
      const response = await axios.post(AUTH_URL + 'register', credentials)
      navigation.push('Verify', { _id: response.data })
    } catch (error) {
      if (error.response) {
        setErrors(error.response.data)
      }
    }
    setLoading(false)
  }

  useEffect(() => {
    setErrors({})
  }, [credentials])

  return (
    <View style={Styles.Container}>
      <View style={Styles.Header}>
        <Text style={Styles.HeaderText}>Register Now!</Text>
      </View>
      <ScrollView
        style={Styles.Body}
        keyboardShouldPersistTaps="always"
        contentContainerStyle={{ alignItems: 'center' }}
      >
        <Input
          label="Username"
          error={errors.username}
          IconLeft={Assets.User}
          maskText={false}
          keyboardType="default"
          placeholder="Your username"
          value={credentials.username}
          onChange={(username) => setCredentials({ ...credentials, username })}
        />
        <Input
          label="Email"
          error={errors.email}
          IconLeft={Assets.Email}
          maskText={false}
          keyboardType="email-address"
          placeholder="Your email address"
          value={credentials.email}
          onChange={(email) => setCredentials({ ...credentials, email })}
        />
        <Input
          label="Password"
          error={errors.password}
          IconLeft={Assets.Password}
          placeholder="Your password"
          maskText={!showPassword}
          keyboardType={showPassword ? 'visible-password' : 'default'}
          IconRight={showPassword ? Assets.EyeOpen : Assets.EyeClose}
          handleIconRight={() => setShowPassword(!showPassword)}
          value={credentials.password}
          onChange={(password) => setCredentials({ ...credentials, password })}
        />
        <Pressable
          onPress={handleSubmit}
          disabled={loading}
          style={[Styles.Button, { backgroundColor: '#4DB6AC' }]}
        >
          {loading ? (
            <ActivityIndicator color="#fff" size={27} />
          ) : (
            <Text style={[Styles.ButtonText, { color: '#fff' }]}>Sign Up</Text>
          )}
        </Pressable>
        <Pressable
          onPress={() => navigation.pop()}
          style={[Styles.Button, { backgroundColor: '#fff', marginBottom: 50 }]}
        >
          <Text style={[Styles.ButtonText, { color: '#4DB6AC' }]}>Sign In</Text>
        </Pressable>
      </ScrollView>
    </View>
  )
}

const Styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#4DB6AC',
  },
  Header: {
    flex: 0.2,
    marginLeft: 23,
    justifyContent: 'flex-end',
  },
  HeaderText: {
    fontWeight: '500',
    color: '#fff',
    fontSize: 34,
  },
  Body: {
    flex: 0.8,
    backgroundColor: '#fff',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    paddingTop: 19,
    marginTop: 34,
  },
  Button: {
    borderWidth: 1,
    borderColor: '#4DB6AC',
    width: '90%',
    marginTop: 23,
    borderRadius: 9,
    padding: 12,
    alignItems: 'center',
  },
  ButtonText: {
    fontSize: 19,
    fontWeight: '500',
  },
})

export default Register
