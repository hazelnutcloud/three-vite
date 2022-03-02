import { AmbientLight, BoxGeometry, DirectionalLight, Mesh, MeshStandardMaterial, Scene } from "three";
import Experience from "../Experience";
import Resources from "../utils/Resources";

export default class World {
  experience: Experience
  scene: Scene
  resources: Resources
  constructor() {
    this.experience = new Experience()
    
    this.scene = this.experience.scene
    this.resources = this.experience.resources

    if (this.resources.toLoad === this.resources.loaded) {
      this.setWorld()
    } else {
      this.resources.on('loaded', () => {
        this.setWorld()
      })
    }
  }

  setWorld() {
    this.scene.add(
      new Mesh(
        new BoxGeometry(1, 1, 1),
        new MeshStandardMaterial()
      ),
      new AmbientLight("#ffffff", 0.4)
    )
    const directionalLight = new DirectionalLight("#ffffff", 0.6)
    directionalLight.position.set(3, 4, 5)
    this.scene.add(directionalLight)
  }
}