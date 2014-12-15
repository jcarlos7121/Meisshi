class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  has_many :cards, dependent: :destroy

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  def self.new_guest
    new do |u|
      u.guest = true
      u.email = "guest_#{Time.now.to_i}#{rand(100)}@example.com"
      u.password = "dummypassword"
      u.password_confirmation = "dummypassword"
    end
  end

  def name
    guest ? "Guest" : username
  end
end
