<template>
  <div class="scene" id="scene"></div>
</template>

<script setup>
import Base3d from './Base3d';
import { reactive,onMounted } from 'vue';
const data = reactive({
  base3d:{}
})
onMounted(()=>{
  data.base3d = new Base3d('#scene')
})
</script>

<style>
*{
  margin:0;
  padding: 0;
}
</style>
