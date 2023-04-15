gfx =
  tileW: 24
  tileH: 24
  init: ->
    canvas = document.querySelector "#game"
    @ctx = canvas?.getContext? "2d"
    return false if not @ctx
    @w = canvas.width
    @h = canvas.height
    true
  clear: -> @ctx.clearRect 0, 0, @w, @h
  load: (onload) ->
    @sprites = new Image()
    @sprites.src = "resources/sprites.png"
    @sprites.onload = -> onload()
