import * as THREE from "three";
import { loadRoomModel } from "./src/modelLoader.js";
import { initMouseControls } from "./src/controls.js";
import { animate } from "./src/animation.js";
import { initResizeHandler } from "./src/controls.js";
import { initVirtualScrollSteps } from "./src/steps.js";
import { softLighting } from "./src/lighting.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

let baseXYZState = { x: 9, y: 9, z: 9 };
let mainModel = null;

export function setMainModel(model) {
  mainModel = model;
}

export function getMainModel() {
  return mainModel;
}

export function setBaseCameraPosition(x, y, z) {
  baseXYZState = { x, y, z };
}

export function getBaseCameraPosition() {
  return baseXYZState;
}

softLighting(scene);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x07000a); // Set a light gray background color
document.body.appendChild(renderer.domElement);

loadRoomModel(scene, camera, renderer);
initMouseControls();
initResizeHandler(camera, renderer);
initVirtualScrollSteps(camera, scene);

renderer.setAnimationLoop(() => animate(scene, camera, renderer, baseXYZState));
