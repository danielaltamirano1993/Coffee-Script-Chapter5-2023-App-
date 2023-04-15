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
