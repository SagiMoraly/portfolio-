import * as THREE from "three";

import Sizes from "./Utils/Sizes.js";
import Time from "./Utils/Time.js";
import Resources from "./Utils/Resources.js";
import assets from "./Utils/assets.js";

import Camera from "./Camera.js";
import Theme from "./Theme.js";
import Renderer from "./Renderer.js";
import Preloader from "./Preloader.js";

import World from "./World/World.js";
import Controls from "./World/Controls.js";

console.log("1");

export default class Experience {
  static instance;
  constructor(canvas) {
    if (Experience.instance) {
      return Experience.instance;
    }
    console.log("2");
    Experience.instance = this;
    this.canvas = canvas;
    this.scene = new THREE.Scene();
    this.time = new Time();
    this.sizes = new Sizes();
    this.camera = new Camera();
    this.renderer = new Renderer();
    this.resources = new Resources(assets);
    this.theme = new Theme();
    this.world = new World();
    this.preloader = new Preloader();
    console.log("3");

    this.preloader.on("enablecontrols", () => {
      this.controls = new Controls();
    });
    console.log("4");

    this.sizes.on("resize", () => {
      this.resize();
    });
    this.time.on("update", () => {
      this.update();
    });
    console.log("5");
  }

  resize() {
    this.camera.resize();
    this.world.resize();
    this.renderer.resize();
    console.log("6");
  }

  update() {
    this.preloader.update();
    this.camera.update();
    this.world.update();
    this.renderer.update();
    // console.log("7");
    if (this.controls) {
      this.controls.update();
    }
  }
}
