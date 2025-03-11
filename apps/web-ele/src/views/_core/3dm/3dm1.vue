<script setup lang="ts">
import {Canvas} from '@react-three/fiber'
import {OrbitControls} from '@react-three/drei'
import {Suspense} from 'vue'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'

// 需要先将Baby.blend导出为GLTF格式
// 建议导出路径：public/models/Baby.glb
const loader = new GLTFLoader()
</script>

<template>
  <div class="model-container">
    <Canvas camera={{ position: [2, 2, 2], fov: 75 }}>
      <Suspense>
        <!-- 环境光 -->
        <ambientLight intensity={0.5}/>
        <!-- 平行光 -->
        <directionalLight position={[10, 10, 5]} intensity={1}/>

        <!-- 加载模型 -->
        <primitive
          :object="loader.load('./Baby.glb').scene"
          :scale="0.1"
        />

        <!-- 轨道控制器 -->
        <OrbitControls
          enableZoom={true}
          enablePan={true}
          enableRotate={true}
        />
      </Suspense>
    </Canvas>
  </div>
</template>

<style scoped>
.model-container {
  width: 100%;
  height: 600px;
  background: #f0f0f0;
  border-radius: 8px;
  overflow: hidden;
}
</style>
