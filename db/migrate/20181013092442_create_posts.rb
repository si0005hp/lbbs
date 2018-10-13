class CreatePosts < ActiveRecord::Migration[5.1]
  def change
    create_table :posts do |t|
      t.text :title, null: false
      t.text :body, null: false
      t.references :user, foreign_key: true, null: false

      t.timestamps
    end
    add_index :posts, :created_at
    add_index :posts, %i[user_id created_at]
  end
end
