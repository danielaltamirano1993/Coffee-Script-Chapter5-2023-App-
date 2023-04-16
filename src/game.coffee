@game =
  init: ->
    if not gfx.init()
      alert "Sorry, no canvas"
      return
    gfx.load ->
      game.reset()
  stop: -> @running = false
  start: -> @running = true
  
  reset: ->
    @player = new Player
    @level = new Level levels[0], @
    keys.reset()
    if not @running
      @start()
      @tick()
    
  setPlayer: (x, y, level) ->
    @player.level = level
    @player.x = x
    @player.y = y 

