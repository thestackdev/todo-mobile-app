import database from '../index'

const Todos = database.collections.get('todos')

export const Observe = () => todos.query().observe()

export const Create = async (content) => {
  await database.write(async () => {
    await todos.create((todo) => {
      todo.content = content
      todo.is_done = false
    })
  })
}

export default { Create, Observe, Todos }
