<template>
  <div id="container3D" ref="container3D"></div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const props = defineProps({
  objToRender: {
    type: String,
    default: 'nike'
  },
  modelPath: {
    type: String,
    required: true
  },
  modelConfig: {
    type: Object,
    default: () => ({
      rotatable: true,
      cameraDistance: 500,
      lightIntensity: 1,
      initialRotation: { x: 0, y: 0, z: 0 },
      autoRotate: false,
      rotationSpeed: 0.01
    })
  }
});

const container3D = ref(null);
let scene, camera, renderer, object, controls;
let mouseX = 300;
let mouseY = 300;
let animationId = null;

const WIDTH = 600;
const HEIGHT = 600;

// ฟังก์ชั่นเพื่อรับค่า config ของแต่ละ model โดยอ้างอิงจาก default + override ด้วยค่าที่กำหนดเฉพาะ
const getModelConfig = () => {
  // ค่า config เริ่มต้นสำหรับ model ทั่วไป
  const defaultConfig = {
    rotatable: true,
    cameraDistance: 500,
    lightIntensity: 1,
    initialRotation: { x: 0, y: 0, z: 0 },
    autoRotate: false,
    rotationSpeed: 0.01
  };

  // ค่า config พิเศษสำหรับ model เฉพาะ
  const modelSpecificConfig = {
    nike: {
      rotatable: true,
      cameraDistance: 500,
      initialRotation: { x: -1.2, y: -3, z: 0 }
    },
    dino: {
      rotatable: true,
      cameraDistance: 25,
      lightIntensity: 5,
      initialRotation: { x: 0, y: 0, z: 0 },
      useOrbitControls: true
    }
    // เพิ่ม model อื่นๆ ได้ตามต้องการ
  };

  // ใช้ค่าจาก props ถ้ามี หรือใช้ค่าเฉพาะของ model หรือใช้ค่า default
  const specificConfig = modelSpecificConfig[props.objToRender] || {};
  
  // รวมค่า config ทั้งหมด โดยเรียงลำดับความสำคัญ: props > model specific > default
  return { 
    ...defaultConfig, 
    ...specificConfig,
    ...props.modelConfig 
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
  topLight.position.set(500, 500, 500);
  topLight.castShadow = true;
  scene.add(topLight);

  const ambientLight = new THREE.AmbientLight(0x333333, config.lightIntensity);
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
      
      scene.add(object);
    },
    function (xhr) {
      console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function (error) {
      console.error('Error loading model:', error);
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
      object.rotation.y = config.initialRotation.y + mouseX / WIDTH * 3;
      object.rotation.x = config.initialRotation.x + mouseY * 2.5 / HEIGHT;
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
watch(() => props.objToRender, (newModel, oldModel) => {
  if (newModel !== oldModel) {
    resetScene();
    initThreeJS();
  }
});

watch(() => props.modelPath, (newPath, oldPath) => {
  if (newPath !== oldPath) {
    resetScene();
    initThreeJS();
  }
});

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
  border: 2px solid #B7B7B7;
}
</style>