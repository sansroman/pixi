import * as PIXI from 'pixi.js'
import 'pixi-sound'
import { load, clear } from '../manager/ScenesManager';

const finishedScene = 'FINISHED'
PIXI.sound.utils.extensions.splice(PIXI.sound.utils.extensions.indexOf('mp4'), 1)
PIXI.loaders.Resource.setExtensionXhrType('mp4', undefined)
PIXI.loaders.Resource.setExtensionLoadType('mp4', PIXI.loaders.Resource.LOAD_TYPE.VIDEO)

export default () => {
  const resources = PIXI.loader.resources
  const videoScene = new PIXI.Container()
  let skip = new PIXI.Sprite(resources['video-skip'].texture)
  let video = PIXI.loader.resources.video.data
  skip.scale.set(0.6, 0.6)
  skip.position.set(app.width - skip.width * 2, 50  - viewport.y)
  skip.interactive = true

  const afterVideo = (skip) => () => {
    clear()
    load(finishedScene, {skip})
  }
  const cb = (e) => {
      if(e.timeStamp >= 43 * 1000){
        afterVideo()()
        e.currentTarget.removeEventListener(e.type,cb)
      }
  }
  skip.on('pointerdown', afterVideo(true))
  video.addEventListener('timeupdate', cb)
  videoScene.addChild(skip)

  return () => {
    if (document.querySelector('video')) document.querySelector('.main').replaceChild(video, document.querySelector('video'))
    else  video = document.querySelector('.main').appendChild(video)
    console.log(resources.sound.sound)
    resources.sound.sound.play()
    video.muted = true
    video.load()
    video.play()
    return videoScene
  }

}
