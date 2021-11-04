import { Model } from '@nozbe/watermelondb'
import { field, writer } from '@nozbe/watermelondb/decorators'

export default class Post extends Model {
  static table = 'todos'

  @field('content') content
  @field('is_done') is_done

  @writer async deleteTodo() {
    return await this.destroyPermanently()
  }
}
