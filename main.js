import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GUI } from 'dat.gui'

// SIZE STATE
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}



// INITAL OBJECTS
const canvas = document.querySelector('canvas.webgl')
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000)
camera.position.z = 30



// INTIAL RENDERER SETUP
const renderer = new THREE.WebGL1Renderer({canvas})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(window.devicePixelRatio)
renderer.render(scene, camera)



// RESIZE EVENT HANDELER
window.addEventListener('resize', () => {
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()
  renderer.setSize(sizes.width, sizes.height)
})



// ----- PLACE FOR NEW CODE -----

// PLACEHOLDER OBJ
const geometry = new THREE.TorusKnotGeometry(10, 3, 100, 10)
const material = new THREE.MeshBasicMaterial({
  wireframe: true,
  color: 0xffffff,
})
const placeholderKnot = new THREE.Mesh(geometry, material)
scene.add(placeholderKnot)



// ----- DEBUG SECTION  -----
const controls = new OrbitControls(camera, canvas)

const gui = new GUI()
const cameraFolder = gui.addFolder('Camera')
cameraFolder.add(camera.position, 'z', 0)



// EACH FRAME FUNCITON
const eachFrame = () => {
  renderer.render(scene, camera)

  placeholderKnot.rotation.x += 0.0025
  placeholderKnot.rotation.y += 0.01
  placeholderKnot.rotation.z += 0.0025
}

console.log(placeholderKnot.rotation)



// RENDER CALL FUNCTION
let clock = new THREE.Clock()
let delta = 0
let maxFramerate = 60
let interval = 1 / maxFramerate

const update = () => {

  requestAnimationFrame(update)
  controls.update()

  delta += clock.getDelta()

  if(delta > interval) {
    eachFrame()
    delta = delta % interval
  }
}
update()