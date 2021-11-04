import database from '../index'

const todos = database.collections.get('todos')

export const observe = () => todos.query().observe()
export const create = async (content) => {
  await database.write(async () => {
    await todos.create((todo) => {
      todo.content = content
      todo.is_done = false
    })
  })
}
export const deleteAll = async () => {
  await database.write(async () => {
    await todos.query().destroyAllPermanently()
  })
}
