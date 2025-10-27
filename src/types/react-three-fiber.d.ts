import { Object3DNode } from '@react-three/fiber'
import * as THREE from 'three'

declare module '@react-three/fiber' {
  interface ThreeElements {
    meshStandardMaterial: Object3DNode<THREE.MeshStandardMaterial, typeof THREE.MeshStandardMaterial>
    ambientLight: Object3DNode<THREE.AmbientLight, typeof THREE.AmbientLight>
    pointLight: Object3DNode<THREE.PointLight, typeof THREE.PointLight>
  }
}

export {}
