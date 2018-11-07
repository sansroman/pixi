const factWidth =  Math.max(window.innerWidth, window.innerHeight)
const factHeight =  Math.min(window.innerWidth, window.innerHeight)

exports.testOrientation = () => {
  const scale = Math.max(factHeight / app.height, factWidth / app.width)
  app.view.height = innerHeight
  app.view.width = innerWidth
  window.viewport = window.viewport || {}
  if(innerHeight > innerWidth){
    app.stage.rotation = Math.PI * 2 * 0.25
    app.stage.position.set(app.view.width + (app.height * scale - factHeight) / 2,(factWidth -  app.width * scale ) / 2)
  }else{
    app.stage.rotation = 0
    app.stage.position.set((app.width * scale - factWidth) / 2, (factHeight - app.height * scale) / 2)
  }
  window.viewport.x = (app.width * scale - factWidth) / 2
  window.viewport.y = (factHeight - app.height * scale) / 2
  app.renderer.resize(app.view.width, app.view.height)

}
exports.calScale = () => {
  const scale = Math.max(factHeight / app.height, factWidth / app.width)
  app.stage.scale.set(scale, scale)
  app.renderer.resize(app.view.width, app.view.height)
}
