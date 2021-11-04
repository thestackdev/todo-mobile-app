import { appSchema, tableSchema } from '@nozbe/watermelondb'

export default appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: 'todos',
      columns: [
        { name: 'content', type: 'string' },
        { name: 'is_done', type: 'boolean' },
      ],
    }),
  ],
})
