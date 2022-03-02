import { EventEmitter } from "./EventEmitter";
import { ISources } from "../sources";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { CubeTextureLoader, TextureLoader } from "three";

interface ILoaders {
  gltfLoader: GLTFLoader
  textureLoader: TextureLoader
  cubeTextureLoader: CubeTextureLoader
}

export default class Resources extends EventEmitter {
  sources: ISources[]
  items: any
  toLoad: number
  loaded: number
  loaders!: ILoaders
  constructor(sources: ISources[]) {
    super()
    this.sources = sources

    this.items = {}
    this.toLoad = this.sources.length
    this.loaded = 0

    this.setLoaders()
    this.startLoading()
  }

  setLoaders() {
    this.loaders = {
      gltfLoader: new GLTFLoader(),
      textureLoader: new TextureLoader(),
      cubeTextureLoader: new CubeTextureLoader()
    }
  }

  startLoading() {
    if (this.loaded === this.toLoad) {
      console.log('empty');
      
      this.trigger('loaded')
    }
    for (const source of this.sources) {
      if (source.type === "gltfModel") {
        this.loaders.gltfLoader.load(source.path, (file) => {
          this.sourceLoaded(source, file);
        });
      } else if (source.type === "texture") {
        this.loaders.textureLoader.load(source.path, (file) => {
          this.sourceLoaded(source, file);
        });
      } else if (source.type === "cubeTexture") {
        this.loaders.cubeTextureLoader.load(source.path, (file) => {
          this.sourceLoaded(source, file);
        });
      }
    }
  }

  sourceLoaded(source: ISources, file: any) {
    this.items[source.name] = file
    this.loaded++
    if (this.loaded === this.toLoad) {
      this.trigger('loaded')
    }
  }
}