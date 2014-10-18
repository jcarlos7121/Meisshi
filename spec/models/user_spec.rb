require 'rails_helper'

describe User do
  
  describe 'attributes' do
    it { should respond_to(:cards) }
  end

end
