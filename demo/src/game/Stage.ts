import { Container, Loader, Sprite, utils } from 'pixi.js'
import { Application, IApplicationOptions } from 'pixi.js'

import resources from './resources'

// 第一层，读取资源loadResources 和 初始化容器initStage
export class Stage {
  public app: Application
  constructor(options: IApplicationOptions) {
    // 构建 PIXI.Application
    this.app = new Application(options)
    this.loadResources(resources).then(() => this.initStage())
  }
  // 预先读取资源
  loadResources(resources: Record<string, string>) {
    const loader = Loader.shared
    for (const resource of Object.values(resources)) {
      if (!loader.resources[resource]) {
        loader.add(resource, {
          crossOrigin: 'anonymous',
        })
      }
    }
    return new Promise((resolve, reject) => {
      loader.load(() => {
        // 此时资源加载完，你可以在此添加一些操作
        resolve(void 0)
      })
    })
  }
  initStage() {
    const cat = new Sprite(utils.TextureCache[resources.catPng])
    cat.x = 96
    cat.y = 96
    cat.anchor.set(0.5, 0.5)
    cat.rotation = Math.PI
    this.app.stage.addChild(cat)
  }
  // 调整窗口大小
  resize = (width: number, height: number) => {
    this.app.renderer.resize(width, height)
  }
  // 组件的销毁
  destroy() {
    this.app.destroy()
  }
}

