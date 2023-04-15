class Gravel extends Block
  solid: true
  digTime: 100

  update: (x, y, level) ->
    if --@digTime < 0
      level.removeBlock x, y, @

