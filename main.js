import * as THREE from "three";

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
camera.position.setZ(30);

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
const torus = new THREE.Mesh(geometry, material);

const pointLight = new THREE.PointLight(0xffffff);
const ambientLight = new THREE.AmbientLight(0xffffff);
pointLight.position.set(50, 50, 50);
scene.add(pointLight, ambientLight);

const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper);

scene.add(torus);
function animate() {
  requestAnimationFrame(animate);
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
  const hex_nums = "0123456789abcdef";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += hex_nums[Math.floor(Math.random() * 16)];
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

Array(200).fill().forEach(addStar);
