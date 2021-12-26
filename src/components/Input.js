import React from 'react'
import { View, StyleSheet, Text, TextInput, Pressable } from 'react-native'

const Input = ({
  label,
  error,
  IconLeft,
  placeholder,
  IconRight,
  handleIconRight,
  keyboardType,
  maskText,
  value,
  onChange,
}) => {
  return (
    <View style={Styles.Container}>
      <View
        style={[
          Styles.InputContainer,
          { borderBottomColor: error ? '#F44336' : '#E0E0E0' },
        ]}
      >
        <IconLeft height={25} width={25} fill="#9E9E9E" />
        <TextInput
          style={Styles.TextInput}
          placeholder={placeholder}
          placeholderTextColor="#BDBDBD"
          keyboardType={keyboardType}
          secureTextEntry={maskText}
          value={value}
          onChangeText={onChange}
        />
        {IconRight && (
          <Pressable onPress={handleIconRight}>
            <IconRight height={25} width={25} fill="#9E9E9E" />
          </Pressable>
        )}
      </View>
      <Text style={Styles.Error}>{error}</Text>
    </View>
  )
}

const Styles = StyleSheet.create({
  Container: {
    width: '100%',
  },
  Error: {
    color: '#F44336',
    fontSize: 14,
    width: '100%',
    textAlign: 'right',
  },
  InputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
  },
  TextInput: {
    color: '#455A64',
    fontSize: 19,
    marginHorizontal: 7,
    width: '80%',
    letterSpacing: 0.3,
  },
})

export default Input
