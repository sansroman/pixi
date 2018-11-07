import * as PIXI from 'pixi.js'
import {
  clear,
  load,
  unload
} from '../manager/ScenesManager';
const VIDEO = 'VIDEO'


export default () => {
  const resources = PIXI.loader.resources,
    buttonContainer = new PIXI.Container(),
    modalContainer = new PIXI.Container(),
    finishedScene = new PIXI.Container(),
    mask = new PIXI.Sprite(resources["kv-bg"].texture),
    concert = new PIXI.Sprite(resources["button-concert"].texture),
    enter = new PIXI.Sprite(resources["button-enter"].texture),
    replay = new PIXI.Sprite(resources["button-replay"].texture),
    present = new PIXI.Sprite(resources["present-tip"].texture),
    candle = new PIXI.Sprite(resources["candle-light"].texture),
    bg = new PIXI.Sprite(resources["modal-bg"].texture),
    close = new PIXI.Sprite(resources["modal-close"].texture),
    star = new PIXI.Sprite(resources["modal-light"].texture)

  let stars = new Array(100).fill({
    sprite: star,
    x: 0,
    y: 0,
    z: 0
  })




  close.interactive = candle.interactive = concert.interactive = enter.interactive = replay.interactive = true

  concert.x = concert.width + 100
  enter.x = concert.x + enter.width + 100

  buttonContainer.addChild(concert)
  buttonContainer.addChild(enter)
  buttonContainer.addChild(replay)
  buttonContainer.scale.set(0.7, 0.7)
  buttonContainer.position.set((app.width - buttonContainer.width) / 2, app.height - buttonContainer.height * 2)




  candle.scale.set(0.05, 0.05)
  candle.position.set(app.width / 2, app.height * 0.59)
  const bounds = candle.getBounds();
  candle.pivot.set(bounds.width / 2 / candle.scale.x, bounds.height / 2 / candle.scale.y)
  candle.scale.set(0.001, 0.001)

  present.scale.set(0.7, 0.7)
  present.position.set(app.width / 2 + 100, present.y = candle.y - present.height / 2)

  const animate = () => {
    if (candle.alpha > 0.5) {
      candle.alpha -= 0.005
      candle.scale.x = candle.scale.y += 0.005
    } else {
      candle.alpha = 1
      candle.scale.x = candle.scale.y = 0.001
    }
    requestAnimationFrame(animate)
  }
  animate()



  bg.scale.set(0.6, 0.6)
  bg.anchor.set(0.5, 0.5)
  bg.position.set(app.width / 2, app.height / 2)

  close.scale.set(0.6, 0.6)
  close.position.set(app.width - 180 , 40 - viewport.y)

  mask.height = app.height
  mask.width = app.width
  mask.tint = 0x000000;
  mask.alpha = 0.9

  modalContainer.addChild(mask)
  modalContainer.addChild(bg)
  modalContainer.addChild(close)
  // stars.forEach(star => {
  //   star.sprite.anchor.x = 0.5;
  //   star.sprite.anchor.y = 0.7;
  //   randomizeStar(star, true);
  //   modalContainer.addChild(star.sprite)
  // })

  finishedScene.addChild(present)
  finishedScene.addChild(candle)
  finishedScene.addChild(buttonContainer)

  replay.on('pointerdown', () => {
    clear()
    load(VIDEO)
  })

  candle.on('pointerdown', () => {
    finishedScene.addChild(modalContainer)
  })
  close.on('pointerdown', () => {
    finishedScene.removeChild(modalContainer)
  })

  return option => {
    const afterVideo = () => {
      unload(video)
      const video = resources.loop.data
      video.loop = true
      document.querySelector('.main').replaceChild(video, document.querySelector('video'))
      video.play()
    }
    if(option.skip) afterVideo()
    else document.querySelector('video').addEventListener('ended', afterVideo)
    resources.sound.sound.play({start:43})
    return finishedScene
  }
}

function randomizeStar(star, initial) {
  star.z = initial ? Math.random() * 2000 : cameraZ + Math.random() * 1000 + 2000;

  //Calculate star positions with radial random coordinate so no star hits the camera.
  var deg = Math.random() * Math.PI * 2;
  var distance = Math.random() * 50 + 1;
  star.x = Math.cos(deg) * distance;
  star.y = Math.sin(deg) * distance;
}
