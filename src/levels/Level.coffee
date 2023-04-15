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
