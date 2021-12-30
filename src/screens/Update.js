import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TextInput,
  Pressable,
} from 'react-native'
import CalendarPicker from 'react-native-calendar-picker'

const Update = ({ route, navigation }) => {
  const [date, setDate] = useState(route.params.date)
  const [content, setContent] = useState(route.params.content)

  return (
    <View style={Styles.Container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <Text style={Styles.Header}>Update Task</Text>
      <TextInput
        style={Styles.TextInput}
        placeholder="Eg: Mobile Recharge"
        placeholderTextColor="#BDBDBD"
        multiline
        value={content}
        onChangeText={setContent}
      />
      <View style={Styles.CalendarWrapper}>
        <CalendarPicker
          initialDate={new Date(route.params.date)}
          onDateChange={setDate}
          textStyle={{ fontFamily: 'Inter-Regular', color: '#455A64' }}
          selectedDayTextColor="#fff"
          selectedDayColor="#4285F4"
          width={380}
        />
      </View>
      <Pressable
        style={Styles.Pressable}
        disabled={content === ''}
        onPress={() => {
          navigation.goBack()
          route.params.updateCallBack({
            client_id: route.params.client_id,
            content: content.trim(),
            date,
          })
        }}
      >
        <Text style={Styles.PressableText}>Update Task</Text>
      </Pressable>
    </View>
  )
}

const Styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 30,
  },
  Header: {
    color: '#455A64',
    fontSize: 30,
    fontFamily: 'Inter-Bold',
  },
  TextInput: {
    borderBottomColor: '#E0E0E0',
    borderBottomWidth: 1,
    color: '#455A64',
    fontSize: 23,
    marginVertical: 30,
  },
  CalendarWrapper: {
    marginVertical: 9,
  },
  Pressable: {
    backgroundColor: '#4285F4',
    position: 'absolute',
    borderRadius: 12,
    padding: 16,
    bottom: 30,
    left: 30,
    right: 30,
  },
  PressableText: {
    textAlign: 'center',
    color: '#fff',
    fontFamily: 'Inter-Medium',
    fontSize: 19,
  },
})

export default Update
