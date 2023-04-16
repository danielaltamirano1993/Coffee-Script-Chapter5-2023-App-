@game =
  init: ->
    if not gfx.init()
      alert "Sorry, no canvas"
      return
    gfx.load ->
      game.reset()
  stop: -> @running = false
  start: -> @running = true
  
