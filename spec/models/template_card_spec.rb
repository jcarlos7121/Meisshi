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

require 'rails_helper'

describe TemplateCard do

  describe 'attributes' do
    it { should respond_to(:name) }
    it { should respond_to(:image) }
  end

end
