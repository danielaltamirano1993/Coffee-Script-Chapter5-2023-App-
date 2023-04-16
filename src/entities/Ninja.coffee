class Ninja extends Entity
  state: "CRUISING"
  subState: "IDLE"
  constructor: (level, x, y, @player) -> super level, x, y
  speed: 3
  time: 0
  render: (gfx) -> gfx.drawSprite 0, 1, @x, @y
  cruise: (px, py) ->
    x = y = 0
    
