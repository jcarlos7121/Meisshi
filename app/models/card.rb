class Card < ActiveRecord::Base
  belongs_to :user

  mount_uploader :image, ImageUploader
  validates_presence_of :image
end
