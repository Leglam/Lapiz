<template>
  <div id="container3D" ref="container3D"></div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const props = defineProps({
  objToRender: {
    type: String,
    default: "",
  },
  modelPath: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["model:error"]);

const container3D = ref(null);
let scene, camera, renderer, object, controls;
let mouseX = 300;
let mouseY = 300;
let animationId = null;

const WIDTH = 600;
const HEIGHT = 600;

// กำหนดค่า config เฉพาะของแต่ละโมเดล
const modelConfigs = {
  "100001": {
    initialRotation: { x: 0, y: 0.3, z: 0 },
  },
  "100002": {
    initialRotation: { x: 0, y: -1.5, z: 0 },
    initialPosition: { x: 0, y: -0.06, z: 0 },
  },
  "100005": {
    initialRotation: { x: 0, y: 3.1, z: 0 },
    initialPosition: { x: 0, y: -0.06, z: 0 },
  },
  "100006": {
    initialRotation: { x: 0, y: 1.5, z: 0 },
  },
  "100008": {
    initialRotation: { x: 0, y: 3.2, z: 0 },
    initialPosition: { x: 0, y: -0.06, z: 0 },
  },
  "100010": {
    cameraDistance: -2,
  },
  "100013":{
    initialRotation: { x: 0, y: 0, z: 0 },
    initialPosition: { x: 0, y: -6, z: 0 },
    cameraDistance: -30,
  },
  "100015": {
    initialRotation: { x: 0, y: 0, z: 0 },
    initialPosition: { x: 0, y: -6, z: 0 },
    cameraDistance: -30,
  },
  "100016": {
    initialRotation: { x: 0, y: 0, z: 0 },
    initialPosition: { x: 0, y: -6, z: 0 },
    lightIntensity: 0.5,
    cameraDistance: -30,
  },
};

// ฟังก์ชั่นรับค่า config ของแต่ละ model โดยอ้างอิงจาก default + override ด้วยค่าที่กำหนดเฉพาะ
const getModelConfig = () => {
  // ค่า config เริ่มต้นสำหรับ model ทั่วไป
  const defaultConfig = {
    rotatable: true,
    cameraDistance: 0.3,
    lightIntensity: 2,
    initialRotation: { x: 0, y: 1.5, z: 0 },
    autoRotate: false,
    rotationSpeed: 0.01,
    useOrbitControls: true,
  };

  // ใช้ modelPath หรือ objToRender เป็น key ในการดึงค่าคอนฟิกเฉพาะ
  const specificConfig = modelConfigs[props.objToRender] || {};

  // รวมค่า config ทั้งหมด โดยเรียงลำดับความสำคัญ: props > model specific > default
  return {
    ...defaultConfig, // เริ่มต้นจากค่าดีฟอลต์
    ...specificConfig, // นำค่าของโมเดลนั้นมาทับ default ถ้ามี
  };
};

const initThreeJS = () => {
  const config = getModelConfig();

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, WIDTH / HEIGHT, 0.1, 1000);
  camera.position.z = config.cameraDistance;

  renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(WIDTH, HEIGHT);
  container3D.value.appendChild(renderer.domElement);

  const topLight = new THREE.DirectionalLight(0xffffff, 1);
  topLight.position.set(100, 100, 500);
  topLight.castShadow = false;
  scene.add(topLight);

  const backLight = new THREE.DirectionalLight(0xffffff, 1);
  backLight.position.set(-100, 100, -500);
  backLight.castShadow = false;
  scene.add(backLight);

  const ambientLight = new THREE.AmbientLight(0xffffff, config.lightIntensity);
  scene.add(ambientLight);

  const loader = new GLTFLoader();
  loader.load(
    props.modelPath,
    function (gltf) {
      object = gltf.scene;

      // ตั้งค่าการหมุนเริ่มต้น
      if (config.initialRotation) {
        object.rotation.x = config.initialRotation.x;
        object.rotation.y = config.initialRotation.y;
        object.rotation.z = config.initialRotation.z;
      }

      // ตั้งค่าตน.เริ่มต้น
      if (config.initialPosition) {
        object.position.set(
          config.initialPosition.x,
          config.initialPosition.y,
          config.initialPosition.z
        );
      }

      scene.add(object);
    },
    function (xhr) {
      console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
    },
    function (error) {
      console.error("Error loading model:", error);
      emit("model:error");
    }
  );

  // ใช้ OrbitControls ถ้า config กำหนด
  if (config.useOrbitControls) {
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
  }

  animate(config);

  // เพิ่ม event listener สำหรับ mouse move ถ้า model สามารถหมุนได้
  if (config.rotatable && !config.useOrbitControls) {
    container3D.value.addEventListener("mousemove", handleMouseMove);
  }
};

const animate = (config) => {
  animationId = requestAnimationFrame(() => animate(config));

  if (object) {
    // จัดการการหมุนตาม mouse ถ้า rotatable แต่ไม่ใช้ OrbitControls
    if (config.rotatable && !config.useOrbitControls) {
      object.rotation.y = config.initialRotation.y + (mouseX / WIDTH) * 3;
      object.rotation.x = config.initialRotation.x + (mouseY * 2.5) / HEIGHT;
    }

    // หมุนอัตโนมัติถ้า config กำหนด
    if (config.autoRotate) {
      object.rotation.y += config.rotationSpeed;
    }
  }

  // อัพเดท OrbitControls ถ้ามี
  if (controls) {
    controls.update();
  }

  renderer.render(scene, camera);
};

const handleMouseMove = (e) => {
  const rect = container3D.value.getBoundingClientRect();
  mouseX = e.clientX - rect.left;
  mouseY = e.clientY - rect.top;
};

// Watch สำหรับการเปลี่ยน props
watch(
  () => props.objToRender,
  (newModel, oldModel) => {
    if (newModel !== oldModel) {
      resetScene();
      initThreeJS();
    }
  }
);

watch(
  () => props.modelPath,
  (newPath, oldPath) => {
    if (newPath !== oldPath) {
      resetScene();
      initThreeJS();
    }
  }
);

const resetScene = () => {
  if (animationId !== null) {
    cancelAnimationFrame(animationId);
  }

  if (container3D.value) {
    container3D.value.removeEventListener("mousemove", handleMouseMove);
  }

  if (renderer) {
    renderer.dispose();
    if (container3D.value && container3D.value.contains(renderer.domElement)) {
      container3D.value.removeChild(renderer.domElement);
    }
  }

  if (scene) {
    scene.clear();
  }

  if (controls) {
    controls.dispose();
    controls = null;
  }
};

onMounted(() => {
  console.log(props.modelPath);

  initThreeJS();
});

onBeforeUnmount(() => {
  resetScene();
});
</script>

<style scoped>
#container3D {
  width: 600px;
  height: 600px;
  display: block;
  border: 2px solid #b7b7b7;
}
</style>
