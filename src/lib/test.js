exports.testOrientation = _ => {

  if(innerHeight > innerWidth){
    [app.view.width, app.view.height] = [app.height, app.width]
    app.stage.rotation = Math.PI * 2 * 0.25
    app.stage.x = app.view.width
  }else{
    [app.view.width, app.view.height] = [app.width, app.height]
    app.stage.rotation = 0
    app.stage.x = 0
  }
  app.renderer.resize(app.view.width, app.view.height)

}
