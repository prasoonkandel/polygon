import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  50,
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
camera.position.set(0, 10, 60);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.target.set(0, 0, 0);
controls.update();

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0xffff00 });
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
let torusAlive = true;
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
  const color_codes = [
    "ff0000",
    "00ff00",
    "0000ff",
    "ffff00",
    "ff00ff",
    "00ffff",
  ];
  return "#" + color_codes[Math.floor(Math.random() * color_codes.length)];
}
function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 75, 75);
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

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;

  torus.position.z = t * 1;

  if (torus.position.z < -80) {
    torusAlive = false;
    scene.remove(torus);
    torus.position.z = -100;
  } else {
    torusAlive = true;
    scene.add(torus);
  }

  camera.position.z = t * -0.01 + 35;
  camera.position.x = t * -0.0002 + 35;
  camera.position.y = t * -0.0002 + 10;
}

document.body.onscroll = moveCamera;
moveCamera();
