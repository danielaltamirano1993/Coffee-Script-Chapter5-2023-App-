class Player extends Entity
  constructor: ->
    super
    @dir = "RIGHT"  
  update: ->
    xo = yo = 0

    if not @falling
      if keys.left
        xo -= @speed
        @dir = "LEFT"

      if keys.right
        xo += @speed
        @dir = "RIGHT"

    yo += @speed if keys.down and @onLadder
    yo -= @speed if keys.up and @onLadder and not @onTopOfLadder

