import { PerspectiveCamera, Scene } from "three";
import Experience from "./Experience";
import Sizes from "./utils/Sizes";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export default class Camera {
  experience: Experience;
  scene: Scene;
  canvas: HTMLCanvasElement;
  instance!: PerspectiveCamera;
  sizes: Sizes;
  controls!: OrbitControls;
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;
    this.sizes = this.experience.sizes;

    this.setInstance();
    this.setOrbitControls();
  }

  setInstance() {
    this.instance = new PerspectiveCamera(
      35,
      this.sizes.width / this.sizes.height,
      0.1,
      1000
    );
    this.instance.position.set(6, 4, 8);
    this.scene.add(this.instance);
  }

  setOrbitControls() {
    this.controls = new OrbitControls(this.instance, this.canvas);
    this.controls.enableDamping = true;
  }

  resize() {
    this.instance.aspect = this.sizes.width / this.sizes.height;
    this.instance.updateProjectionMatrix();
  }

  update() {
    this.controls.update();
  }
}
