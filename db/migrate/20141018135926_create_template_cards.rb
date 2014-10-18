class CreateTemplateCards < ActiveRecord::Migration
  def change
    create_table :template_cards do |t|
      t.string :name

      t.timestamps
    end
  end
end
