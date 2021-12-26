import React, { useEffect, useState, useContext } from 'react'
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  Pressable,
} from 'react-native'
import Context from '../context/exports'
import Assets from '../assets/exports'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Logout from '../modals/Logout'
import { useNavigation } from '@react-navigation/core'

const Todos = () => {
  const { userData } = useContext(Context.Auth.Context)
  const [data, setData] = useState([])
  const [pending, setPending] = useState([])
  const [today, setToday] = useState([])
  const [upcoming, setUpcoming] = useState([])
  const [modalOpen, setModalOpen] = useState(false)
  const navigation = useNavigation()
  const date = new Date().toLocaleDateString()

  const fetchData = async () => {
    let data = await AsyncStorage.getItem('TODOS')
    if (data) {
      data = JSON.parse(data)
      data = data.filter((todo) => !todo.status)
      setData(data)
    }
  }

  const updateFilters = async () => {
    const filtered = data.filter(
      (t) => new Date(t.date).toLocaleDateString() !== date
    )
    setPending(
      filtered.filter((t) => new Date(t.date).getTime() < new Date().getTime())
    )
    setToday(data.filter((t) => new Date(t.date).toLocaleDateString() === date))
    setUpcoming(
      filtered.filter((t) => new Date(t.date).getTime() > new Date().getTime())
    )
    if (data) await AsyncStorage.setItem('TODOS', JSON.stringify(data))
  }

  const appendCallback = (popData) => {
    setData([...data, { ...popData, status: false, _id: Date.now() }])
  }

  const updateCallBack = (todo) => {
    const todos = data.map((event) => {
      if (event._id === todo._id) {
        event.content = todo.content
        event.date = todo.date
      }
      return event
    })
    setData(todos)
  }

  const updateStatus = (_id) => {
    const todos = data.map((event) => {
      if (event._id === _id) event.status = !event.status
      return event
    })
    setData(todos)
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    updateFilters()
  }, [data])

  return (
    <View style={Styles.Container}>
      <StatusBar backgroundColor="#4285F4" barStyle="light-content" />
      <Logout modalOpen={modalOpen} setModalOpen={setModalOpen} />
      <Pressable
        style={Styles.Plus}
        onPress={() => navigation.navigate('Append', { appendCallback })}
      >
        <Assets.Plus height={36} width={36} fill="#fff" />
      </Pressable>
      <View style={Styles.Header}>
        <Text style={Styles.HeaderTitle}>Hello,</Text>
        <Text style={Styles.HeaderName}>{userData.username}!</Text>
        <Pressable style={Styles.Options} onPress={() => setModalOpen(true)}>
          <Assets.Logout height={30} width={30} fill="#fff" />
        </Pressable>
      </View>
      <ScrollView contentContainerStyle={Styles.Body}>
        {!data.length && (
          <View style={Styles.EmptyContainer}>
            <Assets.Null height={230} width={230} fill="#fff" />
            <Text style={Styles.EmptyText}>You don't have any tasks yet!</Text>
          </View>
        )}
        {pending.length > 0 && <Text style={Styles.Title}>Pending</Text>}
        {pending.map((todo, index) => (
          <View key={index} style={Styles.Tile}>
            {todo.status ? (
              <Pressable onPress={() => updateStatus(todo._id)}>
                <Assets.Check height={23} width={23} fill="#BDBDBD" />
              </Pressable>
            ) : (
              <Pressable onPress={() => updateStatus(todo._id)}>
                <Assets.UnCheck height={19} width={19} fill="#455A64" />
              </Pressable>
            )}
            <Pressable
              disabled={todo.status}
              onPress={() =>
                navigation.navigate('Update', { ...todo, updateCallBack })
              }
            >
              <Text
                style={
                  todo.status ? Styles.TileDisabledText : Styles.TileEnabledText
                }
              >
                {todo.content}
              </Text>
            </Pressable>
          </View>
        ))}
        {today.length > 0 && <Text style={Styles.Title}>Today</Text>}
        {today.map((todo, index) => (
          <View key={index} style={Styles.Tile}>
            {todo.status ? (
              <Pressable onPress={() => updateStatus(todo._id)}>
                <Assets.Check height={23} width={23} fill="#BDBDBD" />
              </Pressable>
            ) : (
              <Pressable onPress={() => updateStatus(todo._id)}>
                <Assets.UnCheck height={19} width={19} fill="#455A64" />
              </Pressable>
            )}
            <Pressable
              disabled={todo.status}
              onPress={() => navigation.navigate('Update', todo)}
            >
              <Text
                style={
                  todo.status ? Styles.TileDisabledText : Styles.TileEnabledText
                }
              >
                {todo.content}
              </Text>
            </Pressable>
          </View>
        ))}
        {upcoming.length > 0 && <Text style={Styles.Title}>Upcoming</Text>}
        {upcoming.map((todo, index) => (
          <View key={index} style={Styles.Tile}>
            {todo.status ? (
              <Pressable onPress={() => updateStatus(todo._id)}>
                <Assets.Check height={23} width={23} fill="#BDBDBD" />
              </Pressable>
            ) : (
              <Pressable onPress={() => updateStatus(todo._id)}>
                <Assets.UnCheck height={19} width={19} fill="#455A64" />
              </Pressable>
            )}
            <Pressable
              disabled={todo.status}
              onPress={() => navigation.navigate('Update', todo)}
            >
              <Text
                style={
                  todo.status ? Styles.TileDisabledText : Styles.TileEnabledText
                }
              >
                {todo.content}
              </Text>
            </Pressable>
          </View>
        ))}
      </ScrollView>
    </View>
  )
}

const Styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#4285F4',
  },
  EmptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  EmptyText: {
    color: '#9E9E9E',
    fontSize: 23,
    fontFamily: 'Inter-SemiBold',
    marginVertical: 30,
  },
  Header: {
    margin: 30,
  },
  Plus: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#4285F4',
    zIndex: 1,
    padding: 12,
    borderRadius: 1000,
  },
  HeaderTitle: {
    color: '#fff',
    fontSize: 19,
    fontFamily: 'Inter-Regular',
  },
  HeaderName: {
    color: '#fff',
    fontSize: 25,
    fontFamily: 'Inter-Medium',
  },
  Options: {
    position: 'absolute',
    top: -5,
    right: 0,
  },
  Body: {
    backgroundColor: '#fff',
    flexGrow: 1,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    padding: 23,
    paddingTop: 9,
    paddingBottom: 30,
  },
  Title: {
    color: '#607D8B',
    fontSize: 25,
    fontFamily: 'Inter-Bold',
    borderBottomColor: '#E0E0E0',
    borderBottomWidth: 1,
    paddingBottom: 5,
    marginVertical: 12,
  },
  Tile: {
    marginVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  TileEnabledText: {
    fontSize: 19,
    color: '#455A64',
    fontFamily: 'Inter-Regular',
    marginLeft: 12,
  },
  TileDisabledText: {
    fontSize: 19,
    color: '#BDBDBD',
    fontFamily: 'Inter-Regular',
    marginLeft: 12,
    textDecorationLine: 'line-through',
  },
})

export default Todos
