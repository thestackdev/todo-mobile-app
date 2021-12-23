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
import Context from '../context/exports'
import { isEmail, isPassword } from '../helpers/validator'
import { AUTH_URL } from '@env'

const Login = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState(false)
  const [credentials, setCredentials] = useState({
    email: null,
    password: null,
  })
  const [errors, setErrors] = useState({ email: null, password: null })
  const [loading, setLoading] = useState(false)
  const { fetchUserData } = useContext(Context.Auth.Context)

  const handleSubmit = async () => {
    if (!isEmail(credentials.email)) {
      setErrors({ email: 'Invalid Email' })
      return
    }
    if (!isPassword(credentials.password)) {
      setErrors({ password: 'Invalid password' })
      return
    }
    Keyboard.dismiss()
    setLoading(true)
    try {
      await axios.post(AUTH_URL + 'login', credentials)
      fetchUserData()
    } catch (error) {
      const response = error.response
      if (response) {
        if (response.data.email && response.data.email === 'Email Unverified') {
          navigation.push('Verify', { _id: response.data._id })
        } else {
          setErrors(error.response.data)
        }
      }
      setLoading(false)
    }
  }

  useEffect(() => {
    setErrors({})
  }, [credentials])

  return (
    <View style={Styles.Container}>
      <View style={Styles.Header}>
        <Text style={Styles.HeaderText}>Welcome!</Text>
      </View>
      <ScrollView
        style={Styles.Body}
        keyboardShouldPersistTaps="always"
        contentContainerStyle={{ alignItems: 'center' }}
      >
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
          onPress={() => navigation.navigate('Register')}
          style={Styles.ForgotPasswordContainer}
        >
          <Text style={Styles.ForgotPassword}>Forgot Password?</Text>
        </Pressable>
        <Pressable
          onPress={handleSubmit}
          disabled={loading}
          style={[Styles.Button, { backgroundColor: '#4DB6AC' }]}
        >
          {loading ? (
            <ActivityIndicator color="#fff" size={27} />
          ) : (
            <Text style={[Styles.ButtonText, { color: '#fff' }]}>Sign In</Text>
          )}
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate('Register')}
          style={[Styles.Button, { backgroundColor: '#fff', marginBottom: 50 }]}
        >
          <Text style={[Styles.ButtonText, { color: '#4DB6AC' }]}>Sign Up</Text>
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
  ForgotPasswordContainer: {
    marginHorizontal: 23,
    marginBottom: 19,
    width: '90%',
  },
  ForgotPassword: {
    color: '#26A69A',
    fontSize: 16,
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

export default Login
