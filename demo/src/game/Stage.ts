import { Loader, utils, Application, IApplicationOptions, Spritesheet } from 'pixi.js'
import resources from './resources'
import treasureJson from '@/assets/resources/treasure.json'
import { Cat } from './components/Cat'
import { Person } from './components/Person'

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
    const TextureCache = utils.TextureCache
    // 直接用图片创建Sprite, 可爱的小猫咪
    const cat = new Cat()
    this.app.stage.addChild(cat)
    // 利用雪碧图创建Sprite，探险者
    const personSpritesheet = new Spritesheet(TextureCache[resources.treasurePng], treasureJson)
    personSpritesheet.parse(() => {
      const person = new Person(personSpritesheet)
      person.position.set(300, 300) // 容器也可视作精灵，改变其位置
      this.app.stage.addChild(person)
    })
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

