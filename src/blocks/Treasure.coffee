class Treasure extends Block
  touchable: true
  collected: false
  constructor: -> @yOff = Math.random() * Math.PI
  touch: (entity) -> 
    @collected = true if entity.constructor is Player
