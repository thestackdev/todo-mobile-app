import React, { useEffect, useState, useContext } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
  StatusBar,
} from 'react-native'
import Input from '../components/Input'
import axios from 'axios'
import Assets from '../assets/exports'
import { isEmail, isPassword, isUsername } from '../helpers/validator'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { AUTH_URL } from '@env'

const { width, height } = Dimensions.get('screen')

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
    const usernameValid = isUsername(credentials.username)
    if (usernameValid !== 'valid') {
      setErrors({ username: usernameValid })
      return
    }
    const emailValid = isEmail(credentials.email)
    if (emailValid !== 'valid') {
      setErrors({ email: emailValid })
      return
    }
    const passwordValid = isPassword(credentials.password)
    if (passwordValid !== 'valid') {
      setErrors({ password: passwordValid })
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
    <KeyboardAwareScrollView
      style={Styles.Container}
      keyboardShouldPersistTaps="always"
    >
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <View style={Styles.Body}>
        <Assets.Register height={height * 0.3} width={width} />
        <Text style={Styles.BodyHeader}>Register</Text>
        <Input
          error={errors.username}
          IconLeft={Assets.User}
          maskText={false}
          keyboardType="default"
          placeholder="username"
          value={credentials.username}
          onChange={(username) => setCredentials({ ...credentials, username })}
        />
        <Input
          error={errors.email}
          IconLeft={Assets.Email}
          maskText={false}
          keyboardType="email-address"
          placeholder="Email ID"
          value={credentials.email}
          onChange={(email) => setCredentials({ ...credentials, email })}
        />
        <Input
          error={errors.password}
          IconLeft={Assets.Password}
          placeholder="Password"
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
          style={[Styles.Button, { backgroundColor: '#4285F4' }]}
        >
          {loading ? (
            <ActivityIndicator color="#fff" size={27} />
          ) : (
            <Text style={[Styles.ButtonText, { color: '#fff' }]}>Register</Text>
          )}
        </Pressable>
        <Text style={Styles.FooterText}>
          Already have an account?
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={Styles.FooterLink}> Login</Text>
          </TouchableWithoutFeedback>
        </Text>
      </View>
    </KeyboardAwareScrollView>
  )
}

const Styles = StyleSheet.create({
  Container: {
    height: height,
    backgroundColor: '#fff',
    flexDirection: 'column',
  },
  BodyHeader: {
    color: '#455A64',
    fontSize: 36,
    textAlign: 'left',
    width: '100%',
    marginTop: 23,
    marginBottom: 9,
    fontFamily: 'Inter-Bold',
  },
  Body: {
    marginTop: 23,
    alignSelf: 'center',
    alignItems: 'center',
    width: '86%',
  },
  Button: {
    borderWidth: 1,
    borderColor: '#4285F4',
    width: '100%',
    marginTop: 23,
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
  },
  ButtonText: {
    fontSize: 19,
    fontWeight: '500',
    fontFamily: 'Inter-SemiBold',
  },
  FooterText: {
    fontSize: 19,
    color: '#9E9E9E',
    marginVertical: 23,
    fontWeight: '500',
  },
  FooterLink: {
    color: '#4285F4',
    fontWeight: '700',
  },
})

export default Register
