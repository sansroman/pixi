let scenes = new Map()

const hasScene  = scene => scenes.has(scene)
const clear = () => app.stage.removeChildren()
const register = (name, scene) => () => scenes.set(name, scene())


const load = (name, option = {}) => {
  if(typeof name === 'object') app.stage.addChild(name)
  else if(hasScene(name)) app.stage.addChild(scenes.get(name)(option))
  else throw 'Illegal parameter'
}
const unload = name => {
  if(!hasScene(name)) return false
  scenes.delete(name)
  app.stage.removeChild(scenes.get(name)())
  return true
}
export {register, hasScene, clear, load, unload}
