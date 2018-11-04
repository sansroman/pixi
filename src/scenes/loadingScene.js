import * as PIXI from 'pixi.js'
const VIDEO = 'VIDEO'
const FINISHED = 'FINISHED'

import videoScene from './videoScene'
import finishedScene from './finishedScene'

import { register, clear, load } from '../manager/ScenesManager';

export default _ => {
  const resources = PIXI.loader.resources
  const totalContainer = new PIXI.Container()
  const enterContainer = new PIXI.Container()

  let decorator = new PIXI.Sprite(resources.decorator.texture)

  let enter = new PIXI.Sprite(resources.enter.texture)

  let tip = new PIXI.Sprite(resources.tip.texture)

  let bg = new PIXI.Sprite(resources.bg.texture)

  let text = new PIXI.Text("..0%", {
    fontSize: 50,
    fill: '#e1b56e'
  })

  const explosion = new PIXI.extras.AnimatedSprite(resources.loading.data.animations.loading)
  explosion.scale.x = explosion.scale.y = 0.5
  explosion.animationSpeed = 0.5

  explosion.play()

  enter.interactive = true;

  bg.width = app.width
  bg.height = app.height

  tip.tint = '0xe1b56e'
  tip.x = -text.width / 2
  text.x = tip.width - text.width / 2
  text.y = tip.y = tip.height

  enter.x = (decorator.width - enter.width) / 2
  decorator.y = (enter.height - decorator.height - 40) / 2


  enterContainer.addChild(tip)
  enterContainer.addChild(text)
  // enterContainer.addChild(explosion)
  enterContainer.scale.x = enterContainer.scale.y = 0.6

  enterContainer.x = (app.width - enterContainer.width) / 2
  enterContainer.y = app.height * 2 / 3

  totalContainer.addChild(bg)
  totalContainer.addChild(enterContainer)

  __loadResources(PIXI.loader).on('progress', (loader, _) => {
      text.text = `..${loader.progress.toFixed(2)}%`
    }).load( _ => {
      register(VIDEO, videoScene)()
      register(FINISHED, finishedScene)()
      const animate = () => {
        if (enterContainer.alpha > 0) {
          enterContainer.alpha -= 0.1
          requestAnimationFrame(animate)
        } else {
          enterContainer.removeChild(tip)
          enterContainer.removeChild(text)
          enterContainer.addChild(enter)
          enterContainer.addChild(decorator)
          enterContainer.x = (app.width - enterContainer.width) / 2
          enterContainer.alpha = 1
        }
      }
      animate()
    })

  enter.on('pointerdown', _ =>{
    clear()
    load(VIDEO)
  })

  return _ => totalContainer

}












function __loadResources(loader) {
  loader.add("modal-bg", require("../assets/kv-modal-bg.png"))
    .add("modal-close", require("../assets/kv-modal-close.png"))
    .add("modal-light", require("../assets/kv-modal-light.png"))
    .add("button-concert", require("../assets/kv-button-concert.png"))
    .add("button-enter", require("../assets/kv-button-enter-game.png"))
    .add("button-replay", require("../assets/kv-button-replay.png"))
    .add("candle-light", require("../assets/kv-candle-light.png"))
    .add("present-tip", require("../assets/kv-present-tip.png"))
    .add("sound", require("../assets/sound.mp3"))
    .add("video-skip", require("../assets/video-skip.png"))
    .add("video", require("../assets/video.mp4"))
    .add("loop", require("../assets/loop.mp4"))
  return loader
}
