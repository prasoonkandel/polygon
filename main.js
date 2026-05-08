import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);

const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("bg"),
  antialias: true,
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.set(35, 25, 35);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.target.set(0, 0, 0);
controls.update();

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
const torus = new THREE.Mesh(geometry, material);

const pointLight = new THREE.PointLight(0xffffff);
const ambientLight = new THREE.AmbientLight(0xffffff);
pointLight.position.set(0, 0, 0);
pointLight.intensity = 100;
pointLight.distance = 500;
scene.add(pointLight, ambientLight);

const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper);

scene.add(torus);
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  torus.rotation.x += 0.05;
  torus.rotation.y += 0.0;
  torus.rotation.z += 0.0;
  renderer.render(scene, camera);
}

animate();

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

function randomPosition() {
  let x = THREE.MathUtils.randFloatSpread(100);
  let y = THREE.MathUtils.randFloatSpread(100);
  let z = THREE.MathUtils.randFloatSpread(100);
  return [x, y, z];
}
function randomColor() {
  const hex_nums = "0f";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += hex_nums[Math.floor(Math.random() * 2)];
  }
  return color;
}
function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 50, 50);
  const material = new THREE.MeshStandardMaterial({ color: randomColor() });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = randomPosition();
  star.position.set(x, y, z);
  scene.add(star);
}

Array(400).fill().forEach(addStar);

const logoTexture = new THREE.TextureLoader().load("./prynix.png");
const logo = new THREE.Mesh(
  new THREE.BoxGeometry(5, 5, 5),
  new THREE.MeshBasicMaterial({ map: logoTexture }),
);
logo.position.set(0, 0, 0);
scene.add(logo);
