import * as THREE from "https://unpkg.com/three@0.159.0/build/three.module.js";
import { OrbitControls } from "https://unpkg.com/three@0.159.0/examples/jsm/controls/OrbitControls.js";

const RADIUS_SCALE = 0.00002;
const DISTANCE_SCALE = 40;
const ORBIT_SPEED_FACTOR = 0.0008;
const ROTATION_SPEED_FACTOR = 0.0002;

const TEXTURE_CDN = {
  sun: "https://upload.wikimedia.org/wikipedia/commons/4/4c/Sun_white.jpg",
  mercury: "https://planet-texture-maps.s3.eu-west-3.amazonaws.com/mercury.jpg",
  venus: "https://planet-texture-maps.s3.eu-west-3.amazonaws.com/venus.jpg",
  earth: "https://planet-texture-maps.s3.eu-west-3.amazonaws.com/earth_daymap.jpg",
  moon: "https://planet-texture-maps.s3.eu-west-3.amazonaws.com/moon.jpg",
  mars: "https://planet-texture-maps.s3.eu-west-3.amazonaws.com/mars.jpg",
  phobos: "https://planet-texture-maps.s3.eu-west-3.amazonaws.com/phobos.jpg",
  deimos: "https://planet-texture-maps.s3.eu-west-3.amazonaws.com/deimos.jpg",
  jupiter: "https://planet-texture-maps.s3.eu-west-3.amazonaws.com/jupiter.jpg",
  io: "https://planet-texture-maps.s3.eu-west-3.amazonaws.com/io.jpg",
  europa: "https://planet-texture-maps.s3.eu-west-3.amazonaws.com/europa.jpg",
  ganymede: "https://planet-texture-maps.s3.eu-west-3.amazonaws.com/ganymede.jpg",
  callisto: "https://planet-texture-maps.s3.eu-west-3.amazonaws.com/callisto.jpg",
  saturn: "https://planet-texture-maps.s3.eu-west-3.amazonaws.com/saturn.jpg",
  saturnRing: "https://planet-texture-maps.s3.eu-west-3.amazonaws.com/saturn_ring_alpha.png",
  mimas: "https://planet-texture-maps.s3.eu-west-3.amazonaws.com/mimas.jpg",
  enceladus: "https://planet-texture-maps.s3.eu-west-3.amazonaws.com/enceladus.jpg",
  tethys: "https://planet-texture-maps.s3.eu-west-3.amazonaws.com/tethys.jpg",
  dione: "https://planet-texture-maps.s3.eu-west-3.amazonaws.com/dione.jpg",
  rhea: "https://planet-texture-maps.s3.eu-west-3.amazonaws.com/rhea.jpg",
  titan: "https://planet-texture-maps.s3.eu-west-3.amazonaws.com/titan.jpg",
  iapetus: "https://planet-texture-maps.s3.eu-west-3.amazonaws.com/iapetus.jpg",
  uranus: "https://planet-texture-maps.s3.eu-west-3.amazonaws.com/uranus.jpg",
  miranda: "https://planet-texture-maps.s3.eu-west-3.amazonaws.com/miranda.jpg",
  ariel: "https://planet-texture-maps.s3.eu-west-3.amazonaws.com/ariel.jpg",
  umbriel: "https://planet-texture-maps.s3.eu-west-3.amazonaws.com/umbriel.jpg",
  titania: "https://planet-texture-maps.s3.eu-west-3.amazonaws.com/titania.jpg",
  oberon: "https://planet-texture-maps.s3.eu-west-3.amazonaws.com/oberon.jpg",
  neptune: "https://planet-texture-maps.s3.eu-west-3.amazonaws.com/neptune.jpg",
  triton: "https://planet-texture-maps.s3.eu-west-3.amazonaws.com/triton.jpg",
  proteus: "https://planet-texture-maps.s3.eu-west-3.amazonaws.com/proteus.jpg",
  nereid: "https://planet-texture-maps.s3.eu-west-3.amazonaws.com/nereid.jpg",
  pluto: "https://planet-texture-maps.s3.eu-west-3.amazonaws.com/pluto.jpg",
  charon: "https://planet-texture-maps.s3.eu-west-3.amazonaws.com/charon.jpg"
};

const SOLAR_SYSTEM_DATA = [
  {
    name: "Soleil",
    type: "star",
    radiusKm: 696340,
    texture: TEXTURE_CDN.sun,
    rotationPeriodHours: 648,
    orbitalPeriodDays: 0,
    distanceAu: 0,
    moons: []
  },
  {
    name: "Mercure",
    radiusKm: 2439.7,
    texture: TEXTURE_CDN.mercury,
    rotationPeriodHours: 1407.6,
    orbitalPeriodDays: 88,
    distanceAu: 0.39,
    moons: []
  },
  {
    name: "Vénus",
    radiusKm: 6051.8,
    texture: TEXTURE_CDN.venus,
    rotationPeriodHours: -5832.5,
    orbitalPeriodDays: 224.7,
    distanceAu: 0.72,
    moons: []
  },
  {
    name: "Terre",
    radiusKm: 6371,
    texture: TEXTURE_CDN.earth,
    rotationPeriodHours: 23.9,
    orbitalPeriodDays: 365.25,
    distanceAu: 1,
    moons: [
      {
        name: "Lune",
        radiusKm: 1737.4,
        distanceKm: 384400,
        orbitalPeriodDays: 27.3,
        texture: TEXTURE_CDN.moon
      }
    ]
  },
  {
    name: "Mars",
    radiusKm: 3389.5,
    texture: TEXTURE_CDN.mars,
    rotationPeriodHours: 24.6,
    orbitalPeriodDays: 687,
    distanceAu: 1.52,
    moons: [
      {
        name: "Phobos",
        radiusKm: 11.3,
        distanceKm: 9377,
        orbitalPeriodDays: 0.319,
        texture: TEXTURE_CDN.phobos
      },
      {
        name: "Deimos",
        radiusKm: 6.2,
        distanceKm: 23460,
        orbitalPeriodDays: 1.263,
        texture: TEXTURE_CDN.deimos
      }
    ]
  },
  {
    name: "Jupiter",
    radiusKm: 69911,
    texture: TEXTURE_CDN.jupiter,
    rotationPeriodHours: 9.9,
    orbitalPeriodDays: 4331,
    distanceAu: 5.2,
    moons: [
      {
        name: "Io",
        radiusKm: 1821.6,
        distanceKm: 421700,
        orbitalPeriodDays: 1.769,
        texture: TEXTURE_CDN.io
      },
      {
        name: "Europe",
        radiusKm: 1560.8,
        distanceKm: 670900,
        orbitalPeriodDays: 3.551,
        texture: TEXTURE_CDN.europa
      },
      {
        name: "Ganymède",
        radiusKm: 2634.1,
        distanceKm: 1070400,
        orbitalPeriodDays: 7.154,
        texture: TEXTURE_CDN.ganymede
      },
      {
        name: "Callisto",
        radiusKm: 2410.3,
        distanceKm: 1882700,
        orbitalPeriodDays: 16.689,
        texture: TEXTURE_CDN.callisto
      }
    ]
  },
  {
    name: "Saturne",
    radiusKm: 58232,
    texture: TEXTURE_CDN.saturn,
    rotationPeriodHours: 10.7,
    orbitalPeriodDays: 10747,
    distanceAu: 9.58,
    ringTexture: TEXTURE_CDN.saturnRing,
    moons: [
      { name: "Mimas", radiusKm: 198.2, distanceKm: 185520, orbitalPeriodDays: 0.942, texture: TEXTURE_CDN.mimas },
      { name: "Encelade", radiusKm: 252.1, distanceKm: 238020, orbitalPeriodDays: 1.37, texture: TEXTURE_CDN.enceladus },
      { name: "Téthys", radiusKm: 531.1, distanceKm: 294670, orbitalPeriodDays: 1.888, texture: TEXTURE_CDN.tethys },
      { name: "Dioné", radiusKm: 561.4, distanceKm: 377400, orbitalPeriodDays: 2.737, texture: TEXTURE_CDN.dione },
      { name: "Rhéa", radiusKm: 763.8, distanceKm: 527040, orbitalPeriodDays: 4.518, texture: TEXTURE_CDN.rhea },
      { name: "Titan", radiusKm: 2574.7, distanceKm: 1221870, orbitalPeriodDays: 15.945, texture: TEXTURE_CDN.titan },
      { name: "Japet", radiusKm: 734.5, distanceKm: 3560840, orbitalPeriodDays: 79.33, texture: TEXTURE_CDN.iapetus }
    ]
  },
  {
    name: "Uranus",
    radiusKm: 25362,
    texture: TEXTURE_CDN.uranus,
    rotationPeriodHours: -17.2,
    orbitalPeriodDays: 30589,
    distanceAu: 19.2,
    moons: [
      { name: "Miranda", radiusKm: 235.8, distanceKm: 129390, orbitalPeriodDays: 1.413, texture: TEXTURE_CDN.miranda },
      { name: "Ariel", radiusKm: 578.9, distanceKm: 191020, orbitalPeriodDays: 2.52, texture: TEXTURE_CDN.ariel },
      { name: "Umbriel", radiusKm: 584.7, distanceKm: 266000, orbitalPeriodDays: 4.144, texture: TEXTURE_CDN.umbriel },
      { name: "Titania", radiusKm: 788.9, distanceKm: 435840, orbitalPeriodDays: 8.706, texture: TEXTURE_CDN.titania },
      { name: "Obéron", radiusKm: 761.4, distanceKm: 583520, orbitalPeriodDays: 13.46, texture: TEXTURE_CDN.oberon }
    ]
  },
  {
    name: "Neptune",
    radiusKm: 24622,
    texture: TEXTURE_CDN.neptune,
    rotationPeriodHours: 16.1,
    orbitalPeriodDays: 59800,
    distanceAu: 30.05,
    moons: [
      { name: "Triton", radiusKm: 1353.4, distanceKm: 354760, orbitalPeriodDays: -5.877, texture: TEXTURE_CDN.triton },
      { name: "Protée", radiusKm: 210, distanceKm: 117647, orbitalPeriodDays: 1.122, texture: TEXTURE_CDN.proteus },
      { name: "Nérée", radiusKm: 170, distanceKm: 5513818, orbitalPeriodDays: 360.14, texture: TEXTURE_CDN.nereid }
    ]
  },
  {
    name: "Pluton",
    radiusKm: 1188.3,
    texture: TEXTURE_CDN.pluto,
    rotationPeriodHours: -153.3,
    orbitalPeriodDays: 90560,
    distanceAu: 39.48,
    moons: [
      { name: "Charon", radiusKm: 606, distanceKm: 19591, orbitalPeriodDays: 6.387, texture: TEXTURE_CDN.charon }
    ]
  }
];

const sceneContainer = document.getElementById("sceneContainer");
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000011);

const camera = new THREE.PerspectiveCamera(60, sceneContainer.clientWidth / sceneContainer.clientHeight, 0.1, 5000);
camera.position.set(-120, 80, 120);

const renderer = new THREE.WebGLRenderer({ antialias: true, logarithmicDepthBuffer: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(sceneContainer.clientWidth, sceneContainer.clientHeight);
sceneContainer.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.maxDistance = 1200;
controls.minDistance = 20;
controls.zoomSpeed = 0.5;

const ambientLight = new THREE.AmbientLight(0xffffff, 0.35);
scene.add(ambientLight);

const sunLight = new THREE.PointLight(0xffffff, 2.2, 0, 2);
scene.add(sunLight);

const textureLoader = new THREE.TextureLoader();

const orbitLines = [];
const animatedBodies = [];

const starsGeometry = new THREE.BufferGeometry();
const starCount = 2000;
const starPositions = new Float32Array(starCount * 3);
for (let i = 0; i < starCount; i++) {
  const radius = THREE.MathUtils.randFloat(400, 1500);
  const phi = THREE.MathUtils.randFloat(0, Math.PI * 2);
  const theta = THREE.MathUtils.randFloat(0, Math.PI);
  starPositions[i * 3] = radius * Math.sin(theta) * Math.cos(phi);
  starPositions[i * 3 + 1] = radius * Math.cos(theta);
  starPositions[i * 3 + 2] = radius * Math.sin(theta) * Math.sin(phi);
}
starsGeometry.setAttribute("position", new THREE.Float32BufferAttribute(starPositions, 3));
const starsMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 1, sizeAttenuation: true });
const stars = new THREE.Points(starsGeometry, starsMaterial);
scene.add(stars);

function createOrbit(distance, segments = 256) {
  const geometry = new THREE.BufferGeometry();
  const vertices = [];
  for (let i = 0; i <= segments; i++) {
    const angle = (i / segments) * Math.PI * 2;
    vertices.push(Math.cos(angle) * distance, 0, Math.sin(angle) * distance);
  }
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
  const material = new THREE.LineBasicMaterial({ color: 0x7f85ff, transparent: true, opacity: 0.45 });
  return new THREE.LineLoop(geometry, material);
}

function createRing(textureUrl, innerRadius, outerRadius) {
  const ringGeometry = new THREE.RingGeometry(innerRadius, outerRadius, 128);
  const ringTexture = textureLoader.load(textureUrl);
  const ringMaterial = new THREE.MeshPhongMaterial({
    map: ringTexture,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.9
  });
  const ring = new THREE.Mesh(ringGeometry, ringMaterial);
  ring.rotation.x = Math.PI / 2;
  return ring;
}

function createPlanetMesh({ radiusKm, texture, emissive = 0x000000 }) {
  const radius = Math.max(radiusKm * RADIUS_SCALE, 0.15);
  const geometry = new THREE.SphereGeometry(radius, 64, 64);
  const map = textureLoader.load(texture);
  const material = new THREE.MeshStandardMaterial({ map, emissive: new THREE.Color(emissive), emissiveIntensity: emissive ? 1.5 : 0 });
  return new THREE.Mesh(geometry, material);
}

function buildSolarSystem() {
  const root = new THREE.Group();
  scene.add(root);

  SOLAR_SYSTEM_DATA.forEach((body) => {
    const pivot = new THREE.Group();
    root.add(pivot);

    const mesh = createPlanetMesh({
      radiusKm: body.radiusKm,
      texture: body.texture,
      emissive: body.type === "star" ? 0xffddaa : 0x000000
    });

    mesh.name = body.name;
    mesh.position.x = body.distanceAu * DISTANCE_SCALE;
    pivot.add(mesh);

    if (body.type === "star") {
      sunLight.position.copy(mesh.position);
    }

    if (body.ringTexture) {
      const ringInner = mesh.geometry.parameters.radius * 1.9;
      const ringOuter = mesh.geometry.parameters.radius * 3.5;
      const rings = createRing(body.ringTexture, ringInner, ringOuter);
      mesh.add(rings);
    }

    if (body.distanceAu > 0) {
      const orbit = createOrbit(body.distanceAu * DISTANCE_SCALE);
      root.add(orbit);
      orbitLines.push(orbit);
    }

    animatedBodies.push({
      mesh,
      pivot,
      rotationSpeed: ROTATION_SPEED_FACTOR / (body.rotationPeriodHours || 24),
      orbitSpeed: body.orbitalPeriodDays ? ORBIT_SPEED_FACTOR / body.orbitalPeriodDays : 0
    });

    if (body.moons && body.moons.length > 0) {
      const moonRoot = new THREE.Group();
      mesh.add(moonRoot);

      body.moons.forEach((moon) => {
        const moonPivot = new THREE.Group();
        moonRoot.add(moonPivot);

        const moonMesh = createPlanetMesh({ radiusKm: moon.radiusKm, texture: moon.texture });
        moonMesh.position.x = (moon.distanceKm / 1000) * 0.04;
        moonPivot.add(moonMesh);

        const moonOrbit = createOrbit(moonMesh.position.x, 128);
        moonOrbit.rotation.x = Math.PI / 2;
        moonPivot.add(moonOrbit);
        orbitLines.push(moonOrbit);

        animatedBodies.push({
          mesh: moonMesh,
          pivot: moonPivot,
          rotationSpeed: ROTATION_SPEED_FACTOR * 8 / Math.max(Math.sqrt(moon.radiusKm || 10), 1),
          orbitSpeed: moon.orbitalPeriodDays ? ORBIT_SPEED_FACTOR * 4 / moon.orbitalPeriodDays : 0
        });
      });
    }
  });
}

buildSolarSystem();

const backgroundPicker = document.getElementById("backgroundColor");
backgroundPicker.addEventListener("input", (event) => {
  const color = new THREE.Color(event.target.value);
  scene.background = color;
});

const orbitToggle = document.getElementById("orbitToggle");
orbitToggle.addEventListener("change", (event) => {
  const visible = event.target.checked;
  orbitLines.forEach((orbit) => {
    orbit.visible = visible;
  });
});

const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);
  const delta = clock.getDelta();

  animatedBodies.forEach(({ mesh, pivot, rotationSpeed, orbitSpeed }) => {
    if (rotationSpeed && mesh) {
      mesh.rotation.y += rotationSpeed * delta * 60;
    }
    if (orbitSpeed && pivot) {
      pivot.rotation.y += orbitSpeed * delta * 60;
    }
  });

  controls.update();
  renderer.render(scene, camera);
}

animate();

function onResize() {
  const { clientWidth, clientHeight } = sceneContainer;
  camera.aspect = clientWidth / clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(clientWidth, clientHeight);
}

const resizeObserver = new ResizeObserver(onResize);
resizeObserver.observe(sceneContainer);
window.addEventListener("orientationchange", () => setTimeout(onResize, 250));
