import * as PIXI from 'pixi.js'
import preloadResource from './preload'
import loadingScene from './scenes/loadingScene'
import { register, load } from './manager/ScenesManager'
import {testOrientation} from './lib/test'
import './style.css'

const loading = 'LOADING'


let app = new PIXI.Application({
 transparent: true
});
app.width = 1500
app.height = 750
window.app = app
window.addEventListener('resize',()=>testOrientation())
document.querySelector('.main').appendChild(app.view)
testOrientation()
preloadResource().then(register(loading, loadingScene)).then(_ => load(loading))
