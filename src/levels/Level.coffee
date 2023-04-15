class Level
  w: 0
  h: 0
  treasures: 0
  ninjas: []
  
  constructor: (level, @game) -> @load level
  
  load: (level) ->
    # 1. Clear level items
    @ninjas = []
    @treasures = 0
    
    # 2. Parse the level string into a map
    asciiMap = (row.split "" for row in level.data.split "\n")

    # 3. Loop over the map and create the blocks
    @map = for row, y in asciiMap
      for col, x in row
        switch col
          when "@" then new Dirt()
          when "O" then new Rock()
          when "P"
            @addPlayer x, y
            new Block()
          when "X"
            @addNinja x, y
            new Block()
          when "*"
            @treasures++
            new Treasure()
          when "#" then new Ladder()
          when "-" then new Ladder true # Top of the ladder
          else new Block()
    
