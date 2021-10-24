# Pixi 教程

根据 github 仓库 [kittykatattack/learningPixi](https://github.com/kittykatattack/learningPixi) 改编。专注于在 **Vue框架** 上实现该教程。

这个教程会一步步介绍如何用用 [Pixi](https://github.com/pixijs/pixi.js) 制作游戏或交互式媒体。该教程用的是（此时）的最新版本 **[Pixi v6.1.3](https://github.com/pixijs/pixijs/releases/tag/v6.1.3)**。

### 目录：

1. [安装](#settingup)
   1. [安装 Pixi](#installingpixi)
2. [创建舞台（stage）和画布（renderer）](#application)
3. [Pixi精灵](#sprite)
   1. [将图片加载到纹理缓存中](loadimage)
   2. [显示精灵](#showsprite)
4. 







## <a id="settingup">安装</a>

首先，要创建一个 Vue 项目。你可以用 [Vue-cli](https://cli.vuejs.org/zh/guide/) 或 [Vite](https://vitejs.cn/guide/) 来快速搭建一个 Vue 项目。本教程使用了 Vite 来构建项目。

示例项目采用了 Vue3 + TypeScript。

而在教程中，我会尽量先用 JavaScript 代码阐释概念，再说明在 Vue3 中要特别注意的地方。

使用 Vite 生成项目： 

```bash
npm init @vitejs/app my-vue-app
```

选择vue，再选择vue

```bash
cd my-vue-app
npm install
npm run dev
```

这样就跑起来了一个 Vue 项目了。

### <a id="installingpixi">安装pixi</a>

进入你的项目，打开终端，输入如下命令：

```bash
npm install pixi.js --save
```

等待其完成。



## <a id="application">创建Pixi应用和舞台</a>

Pixi应用：它是pixi一切的基础。它会自动创建一个``<canvas>``HTML标签并计算出怎么让你的图片在其中显示。

舞台：PIXI.Application实例有一个`stage`属性。它是一个容器对象，也可以说是根容器。它“海纳百川”，最终所有的容器和精灵都会被添加到它身上。

以下代码创建了一个Pixi应用：

```javascript
// Create a Pixi Application
const app = new PIXI.Application({ width: 256, height: 256 })

// Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view)
```

这是一份最基本的代码，其效果是一个宽高都为256像素的黑色canvas标签。效果如下：

 ![](./screenshots/01.png)

一个应用可以有更多的初始化选项，如下：

```javascript
const app = new PIXI.Application({
	width: 256,                          // default: 800
	height: 256,                         // default: 600
	antialias: true,                     // default: false
	transparent: false,                  // default: false
	resolution: window.devicePixelRatio, // default: 1
})
```



## <a id="sprite">Pixi精灵</a>

先向你介绍 Pixi 精灵，既调动起你的兴趣，又不至于在介绍后续内容时束手束脚。

Pixi 精灵：一种特殊图像对象。你可以控制它们的位置、大小等属性来产生交互和动画。你可以把它们添加进 Pixi 容器对象。（当然可以是``app.stage``，因为它是根容器）

有3种主要的方式来创建一只精灵：

- 用一个**单图像**文件创建。
- 用一个**雪碧图**创建。雪碧图是一个放入了你游戏所需的多个图像的大图。
- 从一个纹理贴图集中创建。（纹理贴图集就是用 JSON 定义了图像大小和位置的雪碧图）

在学习精灵之前，你要学习如何用 Pixi 显示图片。



### 将图片加载到纹理缓存中

首先，你需要将图片加载进来。Pixi 的 loader 对象可以加载任何你需要种类的图像资源。

例如，如果你有一个从``"./asstes/images/cat.png"``加载的图像，想把它加载进来：

```javascript
PIXI.loader.add('./assets/images/cat.png').load(setup)

function setup() {
	...
}
```

加载多个图片时，可以链式调用 add 方法：

```javascript
PIXI.loader
  .add('./assets/images/1.png')
  .add('./assets/images/2.png')
  .add('./assets/images/3.png')
```

也可以给 add 方法传入一个数组：

```javascript
PIXI.loader.add([
  './assets/images/1.png',
  './assets/images/2.png',
  './assets/images/3.png',
])
```

其次，需要将图片转化成 WebGL 纹理。可以被GPU处理的图像被称作 **纹理** 。为了效率，Pixi 使用 **纹理缓存** 来存储和引用纹理。纹理的名称字符串就是图像的地址。

你可以在纹理缓存中这样找到你加载的“猫咪”图片：

```javascript
const texture = PIXI.utils.TextureCache['images/cat.png']
```

最后用纹理来创建一个精灵示例：

```javascript
const cat = new PIXI.Sprite(texture)
```

另一种写法，连接 loader 的 resources 对象：

```javascript
const cat = new PIXI.Sprite(
  PIXI.loader.resources['./assets/images/cat.png']
)
```

**注意**：在 Vue 项目中，因为使用 webpack 进行打包，所以用 es6 导入图片资源

```typescript
import catPng from './assets/images/cat.png'

PIXI.loader.add(catPng).load(setup)

function setup() {
	const texture = PIXI.utils.TextureCache[catPng]
    const cat = new Sprite(texture)
}
```



### 显示精灵

创建完精灵以后，别忘了把它加到容器中去。如：

```typescript
app.stage.addChild(cat)
```

如果想移走这个精灵：

```typescript
app.stage.removeChild(cat)
```

但通常，我们设置精灵的 visible 属性，来控制其可见/不可见：

```typescript
cat.visible = false
```

