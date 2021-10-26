import { Container, Sprite, utils } from 'pixi.js'
import resources from '../resources'

export class Cat extends Container {
  constructor() {
    super()
    const cat = new Sprite(utils.TextureCache[resources.catPng])
    // 改变位置
    cat.x = 96
    cat.y = 96
    // 改变锚点到中心
    cat.anchor.set(0.5, 0.5)
    // 旋转
    cat.rotation = Math.PI
    this.addChild(cat)
  }
}