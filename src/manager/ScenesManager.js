let scenes = new Map()

const hasScene  = scene => scenes.has(scene)
const clear = _ => app.stage.removeChildren()
const register = (name, scene) => _ => {scenes.set(name, scene())}


const load = scene => {
  console.log(scenes.has(scene))
  if(typeof scene === 'object') app.stage.addChild(scene)
  else if(hasScene(scene)) app.stage.addChild(scenes.get(scene)())
  else throw 'Illegal parameter'
}
const unload = name => {
  if(!hasScene(name)) return false
  scenes.delete(name)
  app.stage.removeChild(scenes.get(name))
  return true
}
export {register, hasScene, clear, load, unload}
