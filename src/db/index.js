import { Database } from '@nozbe/watermelondb'
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite'

import Todo from './models/todo.js'
import schema from './schema/todo'

const adapter = new SQLiteAdapter({ dbName: 'todo', schema })

const database = new Database({
  adapter,
  modelClasses: [Todo],
})

export default database
