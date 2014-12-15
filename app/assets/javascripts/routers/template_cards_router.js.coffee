class Meisshi.Routers.TemplateCards extends Backbone.Router

  initialize: (options) ->
    @template_cards = new Meisshi.Collections.TemplateCards()

  routes:
    "index" : "index"
    
  index: ->
    @view = new Meisshi.Views.TemplateCardsIndex({collection: @template_cards})
    $('.editor-main-area').html(@view.render().el)
    @template_cards.fetch()
