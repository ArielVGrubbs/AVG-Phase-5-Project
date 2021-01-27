class CreateChannels < ActiveRecord::Migration[6.0]
  def change
    create_table :channels do |t|
      t.string :title
      t.text :description
      t.string :image_url

      t.timestamps
    end
  end
end
