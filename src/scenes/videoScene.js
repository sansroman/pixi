import * as PIXI from 'pixi.js'
import 'pixi-sound'
import { load } from '../manager/ScenesManager';

const finishedScene = 'FINISHED'
PIXI.sound.utils.extensions.splice(PIXI.sound.utils.extensions.indexOf('mp4'), 1)
PIXI.loaders.Resource.setExtensionXhrType('mp4', undefined)
PIXI.loaders.Resource.setExtensionLoadType('mp4', PIXI.loaders.Resource.LOAD_TYPE.VIDEO)

export default _ => {
  const resources = PIXI.loader.resources
  let skip = new PIXI.Sprite(resources['video-skip'].texture)
  let video = PIXI.loader.resources.video.data
  skip.scale.x = skip.scale.y = 0.6
  skip.x = app.width - skip.width * 2
  skip.y = skip.height
  skip.interactive = true


  skip.on('pointerdown', () => {
    app.stage.removeChildren()
    PIXI.loader.resources.sound.sound.stop()
    load(finishedScene)

  })
  video.addEventListener('ended', () => {
    app.stage.removeChildren()
    PIXI.loader.resources.sound.sound.stop()
    load(finishedScene)
  })

  return _ => {
    if (document.querySelector('video')) document.querySelector('.main').replaceChild(video, document.querySelector('video'))
    else  video = document.querySelector('.main').appendChild(video)
    resources.sound.sound.play()
    video.muted = true
    video.load()
    video.play()
    return skip
  }

}
