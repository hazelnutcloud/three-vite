import { Mesh, Scene } from 'three'
import Camera from './Camera'
import Renderer from './Renderer'
import Resources from './utils/Resources'
import Sizes from './utils/Sizes'
import sources from './sources'
import Time from './utils/Time'
import World from './world/World'
import Debug from './utils/Debug'

let instance: Experience | null

export default class Experience {
  debug!: Debug
  canvas!: HTMLCanvasElement
  sizes!: Sizes
  time!: Time
  scene!: Scene
  resources!: Resources
  camera!: Camera
  renderer!: Renderer
  world!: World
  constructor(canvas?: HTMLCanvasElement) {
    if (instance) {
      return instance
    } else {
      instance = this
    }

    this.debug = new Debug()
    this.canvas = canvas!
    this.sizes = new Sizes()
    this.time = new Time()
    this.scene = new Scene()
    this.resources = new Resources(sources)
    this.world = new World()
    this.camera = new Camera()
    this.renderer = new Renderer()

    this.sizes.on('resize', () => this.resize())

    this.time.on('tick', () => this.update())
  }

  resize() {
    this.camera.resize()
    this.renderer.resize()
    console.log(this.sizes.width, this.sizes.height);
    
  }

  update() {
    this.camera.update()
    // this.world.update()
    this.renderer.update()
  }

  destroy() {
    this.sizes.off('resize')
    this.time.off('tick')

    this.scene.traverse(child => {
      if (child instanceof Mesh) {
        child.geometry.dispose()

        for (const key in child.material) {
          const value = child.material[key]
          if (value && typeof value.dispose === 'function') {
            value.dispose()
          }
        }

        this.camera.controls.dispose()
        this.renderer.instance.dispose()
        if(this.debug.active) {
          this.debug.ui.destroy()
        }
      }
    })
  }
}