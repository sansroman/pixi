import * as PIXI from 'pixi.js'
import preloadResource from './preload'
import loadingScene from './scenes/loadingScene'
import { register, load } from './manager/ScenesManager'
import {testOrientation, calScale} from './lib/test'
import './style.css'

const loading = 'LOADING'


let app = new PIXI.Application({
 transparent: true
});
app.width = 1280
app.height = 720
window.app = app
window.addEventListener('resize',()=>testOrientation())
document.querySelector('.main').appendChild(app.view)
calScale()
testOrientation()
preloadResource().then(register(loading, loadingScene)).then(() => load(loading))
