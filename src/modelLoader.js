import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { Reflector } from "three/examples/jsm/objects/Reflector.js";
import { getBaseCameraPosition, setMainModel } from "../main";
import { cameraBasedOnWidth } from "./cameraUtils";

const mediaSrcCon = {
  screen01: "/public/video/coding.mp4",
  screen02: "/public/video/jellyfish.mp4",
  image01: "/public/image/codingTimeLine.png",
  image02: "/public/image/eatSleepCodeRepeatDesign.png",
};

export function loadRoomModel(scene, camera, renderer) {
  const loader = new GLTFLoader();
  loader.load(
    "/models/myRoom.glb",
    (gltf) => {
      const model = gltf.scene;
      console.log("Model loaded:", model);

      const baseXYZ = cameraBasedOnWidth(getBaseCameraPosition());
      camera.position.set(baseXYZ.x, baseXYZ.y, baseXYZ.z);
      camera.lookAt(0, 0, 0);

      scene.add(model);
      console.log("Scene after model added:", scene);
      setMainModel(model);
      model.children.forEach((child) => {
        switch (child.name) {
          case "mirror":
            const mirrorGeometry = child.geometry.clone();
            const mirror = new Reflector(mirrorGeometry, {
              color: 0x888888,
              textureWidth: window.innerWidth,
              textureHeight: window.innerHeight,
              clipBias: 0.003,
              recursion: 1,
            });
            mirror.position.copy(child.position);
            mirror.rotation.copy(child.rotation);
            mirror.scale.copy(child.scale);
            scene.add(mirror);
            child.visible = false;
            break;
          default:
            break;
        }
      });
    },
    function (xhr) {
      console.log("Loading progress:", (xhr.loaded / xhr.total) * 100 + "%");
    },
    function (error) {
      console.error("Error loading model:", error);
    }
  );
}

export function loadScreens(model, scene) {
  model.children.forEach((child) => {
    switch (child.name) {
      case "screen01":
        loadMediaModel(child, scene, mediaSrcCon.screen01, true);
        break;
      case "screen02":
        loadMediaModel(child, scene, mediaSrcCon.screen02, true);
        break;
    }
  });
}

export function loadImages(model, scene) {
  model.children.forEach((child) => {
    switch (child.name) {
      case "picture1":
        loadMediaModel(child, scene, mediaSrcCon.image01, false);
        break;
      case "picture2":
        loadMediaModel(child, scene, mediaSrcCon.image02, false);
        break;
    }
  });
}

export function loadMediaModel(model, scene, mediaSrc, isVideo) {
  const screenUUID = model.uuid;
  const screenMesh = scene.getObjectByProperty("uuid", screenUUID);
  console.log("Screen Mesh:", screenMesh, screenUUID);

  let texture;
  if (isVideo) {
    // Video
    const video = document.createElement("video");
    video.src = mediaSrc;
    video.crossOrigin = "anonymous";
    video.loop = true;
    video.muted = true;
    video.play();

    texture = new THREE.VideoTexture(video);
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.format = THREE.RGBFormat;
    texture.center.set(0.5, 0.5);
    texture.repeat.set(2, 2);
    texture.rotation = -Math.PI / 2;
  } else {
    // Image
    texture = new THREE.TextureLoader().load(mediaSrc, (tex) => {
      tex.rotation = -Math.PI / 2;
      tex.offset.set(0, 0.5);
      texture.wrapS = texture.wrapT = THREE.MirroredRepeatWrapping;
      tex.repeat.set(4, 4);
    });
    // texture.minFilter = THREE.LinearFilter;
    // texture.magFilter = THREE.LinearFilter;
    // texture.format = THREE.RGBFormat;
  }

  const material = new THREE.MeshBasicMaterial({
    map: texture, // Apply the texture
    color: new THREE.Color(0.4, 0.4, 0.4),
    side: THREE.FrontSide,
  });

  screenMesh.material = material;
}
