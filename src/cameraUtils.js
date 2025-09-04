import { getBaseCameraPosition, setBaseCameraPosition } from "../main.js";
import { getEasedOntarget } from "./utils.js";

// Responsive camera position based on window width
export function cameraBasedOnWidth({ x, y, z }) {
  const width = window.innerWidth;
  let addValue;
  if (width <= 550) {
    addValue = 2;
  } else if (width >= 900) {
    addValue = 0;
  } else {
    addValue = 2 - (width - 550) * (2 / 350);
  }

  return { x: x + addValue, y: y + addValue, z: z + addValue };
}

// Move the main camera to a given x, y, z location with easing

export function moveCameraTo(camera, { x, y, z }, ease = 0.01) {
  const cur = {
    x: camera.position.x,
    y: camera.position.y,
    z: camera.position.z,
  };
  return {
    x: getEasedOntarget(x, Math.PI / 4, cur.x, ease),
    y: getEasedOntarget(y, Math.PI / 4, cur.y, ease),
    z: getEasedOntarget(z, Math.PI / 4, cur.z, ease),
  };
}
