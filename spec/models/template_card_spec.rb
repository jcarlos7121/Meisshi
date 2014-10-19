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
  subject { create :template_card }

  describe 'attributes' do
    it { should respond_to(:name) }
    it { should respond_to(:image) }
  end

  context 'dropbox carrierwave' do
    it 'should be able to upload an image to dropbox' do
      template_card = TemplateCard.new
      template_card.image = File.open(File.join(Rails.root, '/spec/fixtures/images/16.jpg'))
      expect(template_card.save).to eq true
    end
  end

end
