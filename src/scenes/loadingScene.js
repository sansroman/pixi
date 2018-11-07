import * as PIXI from 'pixi.js'
const VIDEO = 'VIDEO'
const FINISHED = 'FINISHED'

import videoScene from './videoScene'
import finishedScene from './finishedScene'

import {
  register,
  clear,
  load
} from '../manager/ScenesManager';

export default () => {
  const resources = PIXI.loader.resources
  const loadingScene = new PIXI.Container(),
    enterContainer = new PIXI.Container(),
    decorator = new PIXI.Sprite(resources.decorator.texture),
    enter = new PIXI.Sprite(resources.enter.texture),
    tip = new PIXI.Sprite(resources.tip.texture),
    bg = new PIXI.Sprite(resources.bg.texture),
    text = new PIXI.Text("..0%", {
      fontSize: 50,
      fill: '#e1b56e'
    }),
    explosion = new PIXI.extras.AnimatedSprite(resources.loading.spritesheet.animations.loading)

  enter.interactive = true;

  explosion.anchor.set(0.5, 0.5)
  explosion.position.set(app.width / 2, app.height / 2)
  explosion.scale.set(0.5, 0.5)
  explosion.animationSpeed = 0.3
  explosion.play()


  bg.width = app.width
  bg.height = app.height

  tip.tint = '0xe1b56e'
  tip.position.set(-text.width / 2, tip.height)
  text.position.set(tip.width - text.width / 2, tip.height)

  enter.x = (decorator.width - enter.width) / 2
  decorator.y = (enter.height - decorator.height - 40) / 2

  enterContainer.addChild(tip)
  enterContainer.addChild(text)

  enterContainer.scale.set(0.6, 0.6)
  enterContainer.position.set((app.width - enterContainer.width) / 2, app.height * 2 / 3)

  loadingScene.addChild(bg)
  loadingScene.addChild(enterContainer)
  loadingScene.addChild(explosion)

  __loadResources(PIXI.loader).on('progress', (loader, _) => {
    text.text = `..${loader.progress.toFixed(2)}%`
  }).load(() => {
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

  enter.on('pointerdown', () => {
    clear()
    load(VIDEO)
  })

  return () => loadingScene
}

function __loadResources(loader) {
  loader.add("modal-bg", require("../assets/kv-modal-bg.png"))
    .add("kv-bg", require("../assets/kv-bg.jpg"))
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
