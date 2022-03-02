import Experience from "../Experience"
import { EventEmitter } from "./EventEmitter"

export default class Sizes extends EventEmitter {
  experience: Experience
  width!: number
  height!: number
  pixelRatio!: number
  canvas: HTMLCanvasElement
  constructor() {
    super()
    this.experience = new Experience()
    this.canvas = this.experience.canvas
    
    this.width = this.canvas.offsetWidth
    this.height = this.canvas.offsetHeight
    
    this.pixelRatio = Math.min(window.devicePixelRatio, 2)

    window.addEventListener('resize', () => {
      this.width = this.canvas.offsetWidth
      this.height = this.canvas.offsetHeight
      this.pixelRatio = Math.min(window.devicePixelRatio, 2)

      this.trigger('resize')
    })
  }
}