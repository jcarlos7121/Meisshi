class TemplateCardsController < ApplicationController

  def index
    @template_cards = TemplateCard.all

    respond_to do |format|
      format.json  { render :json => @template_cards }
    end
  end

end
