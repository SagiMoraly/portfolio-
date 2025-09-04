import { getMainModel, setBaseCameraPosition } from "../main";
import { setupRoomLighting, turnOnScreenLight } from "./lighting";
import { loadImages, loadScreens } from "./modelLoader";

// Handles virtual scroll-based steps for interactive actions
let lastStepIndex = -1;
let steps = [];
let virtualScroll = 0; // 0 to 1
const stepCount = 100; // Number of scroll increments for full range
let screenAndLightAdded = false;
let imagesAndLightAdded = false;

export function initVirtualScrollSteps(camera, scene) {
  const steps = [
    {
      position: 0.01,
      action: () => {
        console.log("Step 0 activated");
        setBaseCameraPosition(9, 9, 9);
      },
    },
    {
      position: 0.3,
      action: () => {
        console.log("Step 1 activated");
        setBaseCameraPosition(3, 3, 6);
        if (!screenAndLightAdded) {
          screenAndLightAdded = true;
          turnOnScreenLight(scene);
          loadScreens(getMainModel(), scene);
        }
      },
    },
    {
      position: 0.5,
      action: () => {
        console.log("Step 2 activated");
        setBaseCameraPosition(4, 5, 3);
        if (!imagesAndLightAdded) {
          imagesAndLightAdded = true;
          setupRoomLighting(scene);
          loadImages(getMainModel(), scene);
        }
      },
    },
    {
      position: 0.8,
      action: () => {
        console.log("Step 3 activated");
        setBaseCameraPosition(9, 9, 9);
      },
    },
  ];

  window.addEventListener(
    "wheel",
    (event) => {
      virtualScroll += event.deltaY / 4000; // Adjust sensitivity as needed
      virtualScroll = Math.max(0, Math.min(1, virtualScroll));
      let stepIndex = -1;
      for (let i = 0; i < steps.length; i++) {
        if (virtualScroll >= steps[i].position) stepIndex = i;
      }
      if (stepIndex !== lastStepIndex) {
        lastStepIndex = stepIndex;
        if (stepIndex >= 0 && steps[stepIndex].action) {
          steps[stepIndex].action();
        }
      }
    },
    { passive: false }
  );
}

export function getVirtualScroll() {
  return virtualScroll;
}
