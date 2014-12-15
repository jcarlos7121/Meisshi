class Meisshi.Views.TemplateCardView extends Backbone.View
  className: 'template_card'

  template: JST['template_cards/template_card']

  render: ->
    @$el.html(@template(@model.toJSON()))
    return this
