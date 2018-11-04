import * as PIXI from 'pixi.js'
const __loader = PIXI.loader
export default _ => new Promise((resolve, _) => __preloadResources().load(()=>resolve()))

function __preloadResources(loader = __loader) {
  loader.add("decorator", require("./assets/loading-decorator.png"))
    .add("enter", require("./assets/loading-enter.png"))
    .add("tip", require("./assets/loading-tip.png"))
    .add("bg", require("./assets/loading-bg.jpg"))
    .add("loading", require("./assets/loading.json"))
  return loader
}
