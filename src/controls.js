// Handles mouse movement and normalized X value
let mouseXNorm = 0.5;
export function initMouseControls() {
  window.addEventListener("mousemove", (event) => {
    mouseXNorm = event.clientX / window.innerWidth;
  });
}
export function getMouseXNorm() {
  return mouseXNorm;
}

export function initResizeHandler(camera, renderer) {
  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}
