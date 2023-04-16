class Ninja extends Entity
  state: "CRUISING"
  subState: "IDLE"
  constructor: (level, x, y, @player) -> super level, x, y
  speed: 3
  time: 0
  render: (gfx) -> gfx.drawSprite 0, 1, @x, @y
  cruise: (px, py) ->
    x = y = 0
    
    # Do cruising logic
    switch @subState
      when "RIGHT"
        x += @speed
        @dir = "RIGHT"
      when "LEFT"
        x -= @speed
        @dir = "LEFT"
        
    if --@time < 0
      newMove = utils.rand 5 
      @time = utils.rand 20, 40;
      @subState = switch newMove
        when 0, 1 then "LEFT"
        when 2, 3 then "RIGHT"
        else "IDLE"
        
    # Just touched a ladder
    if @onLadder and not @wasOnLadder
      @state = "HUNTING" if Math.random() < 0.5
        
