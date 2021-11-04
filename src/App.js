import React, { useState } from 'react'
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
} from 'react-native'
import * as styles from './styles/exports'
import * as todoDAO from './db/helpers/todo'
import withObservables from '@nozbe/with-observables'
import { trash, deleteAll, add } from './assets/exports'

const App = ({ todos }) => {
  const [input, setInput] = useState('')

  const handleDelete = (todo) => {
    todo.deleteTodo()
  }

  const handleAdd = async () => {
    if (!input) return
    todoDAO.create(input)
    setInput('')
  }

  return (
    <SafeAreaView style={styles.globals.safeArea}>
      <View style={styles.header.container}>
        <Text style={styles.header.title}>Todo List</Text>
        <TouchableOpacity onPress={todoDAO.deleteAll}>
          <Image style={styles.globals.icon} source={deleteAll} />
        </TouchableOpacity>
      </View>
      <View style={styles.list.container}>
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ padding: 5 }}
          keyboardShouldPersistTaps="always"
          data={todos}
          renderItem={({ item }) => (
            <View style={styles.list.item}>
              <Text style={styles.list.text}>{item.content}</Text>
              <TouchableOpacity onPress={() => handleDelete(item)}>
                <Image style={styles.globals.icon} source={trash} />
              </TouchableOpacity>
            </View>
          )}
        ></FlatList>
      </View>
      <View style={styles.footer.container}>
        <TextInput
          style={styles.footer.input}
          placeholder="Start typing here..."
          placeholderTextColor="#ccc"
          value={input}
          onChangeText={(text) => setInput(text)}
        />
        <TouchableOpacity style={styles.footer.icon} onPress={handleAdd}>
          <Image style={styles.globals.icon} source={add} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const observer = withObservables([], () => ({
  todos: todoDAO.observe(),
}))

export default observer(App)
