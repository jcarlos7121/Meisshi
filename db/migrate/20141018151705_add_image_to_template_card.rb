class AddImageToTemplateCard < ActiveRecord::Migration
  def change
    add_column :template_cards, :image, :string
  end
end
