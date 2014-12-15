class Meisshi.Views.TemplateCardsIndex extends Backbone.View

  className: 'template_cards'
  tagName: 'section'

  initialize: ->
    @collection.on('add', @addone, @)
    @collection.on('reset', @addall, @)

  addall: ->
    @collection.foreach(@addone, @)

  addone: (model) ->
    @view = new Meisshi.Views.TemplateCardView({model: model})
    @$el.append @view.render().el

  render: ->
    @addall
    @
