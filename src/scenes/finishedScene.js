import * as PIXI from 'pixi.js'
import { clear, load } from '../manager/ScenesManager';
const VIDEO = 'VIDEO'


export default _ => {
  const resources = PIXI.loader.resources
  const buttonContainer = new PIXI.Container()
  const modalContainer = new PIXI.Container()
  const totalContainer = new PIXI.Container()


  let concert = new PIXI.Sprite(resources["button-concert"].texture),
    enter = new PIXI.Sprite(resources["button-enter"].texture),
    replay = new PIXI.Sprite(resources["button-replay"].texture),
    present = new PIXI.Sprite(resources["present-tip"].texture),
    candle = new PIXI.Sprite(resources["candle-light"].texture),
    bg = new PIXI.Sprite(resources["modal-bg"].texture),
    close = new PIXI.Sprite(resources["modal-close"].texture)

  close.interactive = candle.interactive = concert.interactive = enter.interactive = replay.interactive = true

  concert.x = concert.width + 100
  enter.x = concert.x + enter.width + 100

  buttonContainer.addChild(concert)
  buttonContainer.addChild(enter)
  buttonContainer.addChild(replay)
  buttonContainer.scale.x = buttonContainer.scale.y = 0.5
  buttonContainer.x = (app.width - buttonContainer.width) / 2
  buttonContainer.y = app.height - buttonContainer.height * 1.5



  present.scale.x = present.scale.y = 0.35
  candle.scale.x = candle.scale.y = 0.05
  candle.x = app.width  / 2
  candle.y = app.height * 0.6
  const bounds = candle.getBounds();
  candle.pivot.set(bounds.width / 2 / candle.scale.x, bounds.height / 2 / candle.scale.y)
  present.x = app.width / 2 + 100
  present.y = candle.y - present.height / 2
  present.scale.x = present.scale.y = 0.35
  candle.scale.x = candle.scale.y = 0.05

  const animate = () => {

    if (candle.alpha > 0.4) {
      candle.alpha -= 0.01
      candle.scale.x = candle.scale.y += 0.01
    } else {
      candle.alpha = 1
      candle.scale.x = candle.scale.y = 0.05
    }
    requestAnimationFrame(animate)

  }
  animate()



  bg.width = app.width
  bg.height = app.height

  close.scale.x = close.scale.y = 0.6
  close.x = app.width - close.width * 3
  close.y = close.height

  modalContainer.addChild(bg)
  modalContainer.addChild(close)


  totalContainer.addChild(present)
  totalContainer.addChild(candle)
  totalContainer.addChild(buttonContainer)



  replay.on('pointerdown', () => {
    clear()
    load(VIDEO)
  })

  candle.on('pointerdown', () => {
   totalContainer.addChild(modalContainer)
  })
  close.on('pointerdown', () => {
    totalContainer.removeChild(modalContainer)
  })

  return _ => {
    const video = resources.loop.data
    video.loop = true
    document.querySelector('.main').replaceChild(video, document.querySelector('video'))
    video.play()
    return totalContainer
  }
}
