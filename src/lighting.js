import * as THREE from "three";
import { getMainModel } from "../main";

export function softLighting(scene) {
  const ambientLight = new THREE.AmbientLight(0xf2e8ff, 0.02);
  scene.add(ambientLight);
}

export function setupRoomLighting(scene) {
  //   // Directional light simulating sunlight, with shadows
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.9);
  directionalLight.position.set(5, 10, 7.5);
  directionalLight.castShadow = true;
  directionalLight.shadow.mapSize.width = 124;
  directionalLight.shadow.mapSize.height = 124;
  directionalLight.shadow.camera.near = 0.5;
  directionalLight.shadow.camera.far = 50;
  scene.add(directionalLight);

  //   // Point light for extra realism, simulating a lamp or light bulb
  //   const pointLight = new THREE.PointLight(0xfff2cc, 0.7, 10);
  //   pointLight.position.set(0, 2, 2);
  //   scene.add(pointLight);
}

export function turnOnScreenLight(scene) {
  const screens = [];

  getMainModel().children.forEach((child) => {
    switch (child.name) {
      case "screen01":
      case "screen02":
        screens.push(child);
        break;
    }
  });
  screens.forEach((screen) => {
    console.log(scene);

    const width = 0.45;
    const height = 0.2;

    // Create the rectangular area light
    const screenLight = new THREE.RectAreaLight(0xf2e8ff, 9, width, height);
    screenLight.position.copy(screen.position);
    screenLight.rotation.copy(screen.rotation);
    const normal = new THREE.Vector3(0.2, 0, 0); // Default front direction
    normal.applyQuaternion(screen.quaternion); // Rotate to match screen
    screenLight.position.add(normal.clone().multiplyScalar(0.11)); // Move slightly in front
    screenLight.lookAt(screen.position.clone().add(normal)); // Ensure facing outward
    scene.add(screenLight);

    // // Create a red box outline around the light
    // const boxGeometry = new THREE.BoxGeometry(width, height, 0.01); // Thin box to match light dimensions
    // const edges = new THREE.EdgesGeometry(boxGeometry); // Create edges for wireframe
    // const boxMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 }); // Red color
    // const boxOutline = new THREE.LineSegments(edges, boxMaterial);

    // // Position and orient the box to match the light
    // boxOutline.position.copy(screenLight.position);
    // boxOutline.rotation.copy(screenLight.rotation);
    // scene.add(boxOutline);
  });
}
