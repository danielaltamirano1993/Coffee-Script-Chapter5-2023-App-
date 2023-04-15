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
  render: (gfx) -> gfx.ctx.fillText "?", @x, @y
  move: (x, y) ->
    # Add falling speed
    y += @speed * 2 if @falling
    @wasFalling = @falling
    
    # 1. Determine the intended position we'll move to
    xo = x
    yo = y
    xv = @x + xo
    yv = @y + yo
    
    # 2. Check possible block collisions due to vertical movement
    [tl, bl, tr, br] = @level.getBlocks(
      [@x, yv],
      [@x, yv + (@h - 1)],
      [@x + (@w - 1), yv],
      [@x + (@w - 1), yv + (@h - 1)])
    
