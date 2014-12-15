window.Meisshi =
  Models: {}
  Collections: {}
  Views: {}
  Routers: {}
  initialize: ->
    new Meisshi.Routers.TemplateCards()
    Backbone.history.start()


$(document).ready ->
  Meisshi.initialize()
