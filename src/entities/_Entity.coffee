class Entity
  x: 0
  y: 0
  w: 18
  h: 24
  speed: 4
  dir: "LEFT"
  constructor: (@level, @x, @y) ->
    # Falling flags
    @falling = true
    @wasFalling = true
    
    # Ladder flags
    @onLadder = false
    @wasOnLadder = false
    @onTopOfLadder = false
  update: ->
