import React, { useEffect, useState, useContext, useRef } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  ScrollView,
  Keyboard,
  TextInput,
} from 'react-native'
import axios from 'axios'
import Context from '../context/exports'
import { AUTH_URL } from '@env'

const Verify = ({ route }) => {
  const [otpInput, setOtpInput] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState({
    value: 'Please wait requesting otp...',
    color: '#FFC107',
  })
  const { fetchUserData } = useContext(Context.Auth.Context)
  const ref1 = useRef()
  const ref2 = useRef()
  const ref3 = useRef()
  const ref4 = useRef()
  const ref5 = useRef()
  const ref6 = useRef()

  const handleSubmit = async () => {
    if (otpInput.length < 6) {
      setError('Invalid OTP')
      return
    }

    Keyboard.dismiss()
    setLoading(true)
    try {
      await axios.post(AUTH_URL + 'verifyOtp', {
        purpose: 'EmailVerify',
        _id: route.params._id,
        otp: otpInput,
      })
      fetchUserData()
    } catch (error) {
      if (error.response) setError(error.response.data)
      setLoading(false)
    }
  }

  const requestOtp = async () => {
    try {
      await axios.post(AUTH_URL + 'requestotp', {
        purpose: 'EmailVerify',
        _id: route.params._id,
      })
      setStatus({
        value: 'An OTP has sent to your resgistered \n Email Address',
        color: '#90A4AE',
      })
    } catch (error) {
      setStatus({
        value: 'Unable to request otp , please try later',
        color: '#F44336',
      })
    }
  }

  useEffect(() => {
    requestOtp()
  }, [])

  useEffect(() => {
    setError(null)
  }, [otpInput])

  return (
    <View style={Styles.Container}>
      <View style={Styles.Header}>
        <Text style={Styles.HeaderText}>Please verify to continue!</Text>
      </View>
      <ScrollView
        style={Styles.Body}
        keyboardShouldPersistTaps="always"
        contentContainerStyle={{ alignItems: 'center' }}
      >
        <Text style={[Styles.TextSubbed, { color: status.color }]}>
          {status.value}
        </Text>
        <View style={Styles.InputContainer}>
          <TextInput
            style={Styles.TextInput}
            ref={ref1}
            maxLength={1}
            keyboardType="number-pad"
            onChangeText={(value) => {
              if (value.length > 0) {
                ref2.current.focus()
                setOtpInput(value)
              }
            }}
          />
          <TextInput
            style={Styles.TextInput}
            ref={ref2}
            maxLength={1}
            keyboardType="number-pad"
            onChangeText={(value) => {
              if (value.length > 0) {
                setOtpInput((prev) => prev + value)
                ref3.current.focus()
              } else {
                ref1.current.focus()
              }
            }}
          />
          <TextInput
            style={Styles.TextInput}
            ref={ref3}
            maxLength={1}
            keyboardType="number-pad"
            onChangeText={(value) => {
              if (value.length > 0) {
                ref4.current.focus()
                setOtpInput((prev) => prev + value)
              } else {
                ref2.current.focus()
              }
            }}
          />
          <TextInput
            style={Styles.TextInput}
            ref={ref4}
            maxLength={1}
            keyboardType="number-pad"
            onChangeText={(value) => {
              if (value.length > 0) {
                setOtpInput((prev) => prev + value)
                ref5.current.focus()
              } else {
                ref3.current.focus()
              }
            }}
          />
          <TextInput
            style={Styles.TextInput}
            ref={ref5}
            maxLength={1}
            keyboardType="number-pad"
            onChangeText={(value) => {
              if (value.length > 0) {
                setOtpInput((prev) => prev + value)
                ref6.current.focus()
              } else {
                ref4.current.focus()
              }
            }}
          />
          <TextInput
            style={Styles.TextInput}
            ref={ref6}
            maxLength={1}
            keyboardType="number-pad"
            onChangeText={(value) => {
              if (value.length > 0) {
                setOtpInput((prev) => prev + value)
              } else {
                ref5.current.focus()
              }
            }}
          />
        </View>
        {error && <Text style={Styles.TextError}>{error}</Text>}
        <Pressable
          onPress={handleSubmit}
          disabled={loading}
          style={[
            Styles.Button,
            { backgroundColor: otpInput.length > 5 ? '#4DB6AC' : '#BDBDBD' },
          ]}
        >
          {loading ? (
            <ActivityIndicator color="#fff" size={27} />
          ) : (
            <Text style={[Styles.ButtonText, { color: '#fff' }]}>Verify</Text>
          )}
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
    fontSize: 28,
  },
  Body: {
    flex: 0.8,
    backgroundColor: '#fff',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    paddingTop: 19,
    marginTop: 34,
  },
  TextSubbed: {
    fontSize: 19,
    textAlign: 'center',
    marginHorizontal: 19,
    lineHeight: 28,
    fontWeight: '500',
    marginVertical: 12,
  },
  TextError: {
    color: '#F44336',
    fontSize: 16,
    marginTop: 12,
    marginBottom: -12,
  },
  InputContainer: {
    flexDirection: 'row',
  },
  TextInput: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginHorizontal: 10,
    fontSize: 23,
    color: '#455A64',
  },
  Button: {
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

export default Verify
