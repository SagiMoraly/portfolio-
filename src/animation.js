import { getMouseXNorm } from "./controls.js";
import { cameraBasedOnWidth, moveCameraTo } from "./cameraUtils.js";
import { getEasedOntarget } from "./utils.js";
import { getBaseCameraPosition } from "../main.js";

const rotationCoef = Math.PI / 4;
let currentRotationY = 0;

export function animate(scene, camera, renderer, baseXYZState) {
  currentRotationY = getEasedOntarget(
    getMouseXNorm(),
    rotationCoef,
    currentRotationY
  );
  scene.rotation.y = currentRotationY;
  const camPis = moveCameraTo(camera, cameraBasedOnWidth(baseXYZState));

  camera.position.set(camPis.x, camPis.y, camPis.z);
  renderer.render(scene, camera);
}

// base holy dont touch and we have the target which is also the base?
//
