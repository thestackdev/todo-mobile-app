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
      <View style={Styles.Header}>
        <Text style={Styles.Label}>{label}</Text>
        <Text style={Styles.Error}>{error}</Text>
      </View>
      <View style={Styles.InputContainer}>
        <IconLeft height={25} width={25} fill="#455A64" />
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
            <IconRight height={25} width={25} fill="#455A64" />
          </Pressable>
        )}
      </View>
    </View>
  )
}

const Styles = StyleSheet.create({
  Container: {
    marginHorizontal: 23,
    marginVertical: 12,
    width: '90%',
  },
  Header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  Label: {
    color: '#455A64',
    fontSize: 19,
  },
  Error: {
    color: '#F44336',
    fontSize: 14,
  },
  InputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  TextInput: {
    color: '#455A64',
    fontSize: 19,
    marginHorizontal: 7,
    width: '80%',
  },
})

export default Input
