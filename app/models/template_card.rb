# == Schema Information
#
# Table name: template_cards
#
#  id         :integer          not null, primary key
#  name       :string(255)
#  created_at :datetime
#  updated_at :datetime
#  image      :string(255)
#

class TemplateCard < ActiveRecord::Base
  mount_uploader :image, ImageUploader
end
