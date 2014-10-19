FactoryGirl.define do
  factory :template_card do
    sequence(:name) { |n| "name #{n}" }
    image File.open(File.join(Rails.root, '/spec/fixtures/images/16.jpg'))
  end
end
