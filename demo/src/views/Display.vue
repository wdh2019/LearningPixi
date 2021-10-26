<template>
  <div class="app-wrap">
    <div id="stageContainer" ref="stageContainer"></div>
  </div>
</template>

<script lang="ts">
import { Component, Ref, Vue } from 'vue-property-decorator'
import { Stage } from '../game/Stage'
import { enablePIXIDevtools } from '../game/debug'

@Component({})
export default class Display extends Vue {
  @Ref('stageContainer')
  private stageContainer!: HTMLDivElement
  private application: Stage | null = null
  mounted() {
    if (!this.stageContainer) {
      return
    }
    const canvasWidth = this.stageContainer.clientWidth
    const canvasHeight = this.stageContainer.clientHeight
    // Stage类将 PIXI.application 封装起来
    const application = new Stage({
      width: canvasWidth,
      height: canvasHeight,
      backgroundAlpha: 1,
      // preserveDrawingBuffer: true,
      resolution: window.devicePixelRatio,
      antialias: false,
    })
    this.application = application
    // 一些配置
    const app = application.app
    app.view.style.display = 'block'
    app.view.style.width = '100%'
    app.view.style.height = 'auto'
    app.view.className = `gameStage`
    app.view.draggable = false
    enablePIXIDevtools(app)
    const context = app.view.getContext('2d')
    if (context) {
      context.imageSmoothingEnabled = false
    }
    // 将canvas添加到dom中
    this.stageContainer.appendChild(app.view)

    window.addEventListener('resize', this.onResize)
  }
  onResize() {
    const canvasWidth = this.stageContainer.clientWidth
    const canvasHeight = this.stageContainer.clientHeight
    if (this.application) {
      this.application.resize(canvasWidth, canvasHeight)
    }
  }
  beforeDestroy() {
    if (this.application) {
      this.stageContainer.removeChild(this.application.app.view)
      this.application.destroy()
    }
    window.removeEventListener('resize', this.onResize)
  }
}
</script>
<style scoped>
.app-wrap {
  width: 100%;
  height: 100%;
}
#stageContainer {
  width: 100%;
  height: 100%;  
}
</style>
