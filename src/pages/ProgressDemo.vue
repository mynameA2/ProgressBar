<template>
  <div class="progress-page">
    <h1>Демо Кругового Прогресс Бара</h1>
    <CircularProgress v-model="value" :status="status" :dashboard="dashboard" />

    <div class="controls">
      <input type="range" min="0" max="100" v-model="value" />

      <select v-model="status">
        <option>in-progress</option>
        <option>success</option>
        <option>warning</option>
        <option>error</option>
      </select>

      <label>
        <input type="checkbox" v-model="dashboard" />
        Dashboard View
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CircularProgress from './CircularProgress.vue'

const value = ref(25)
const status = ref<'in-progress' | 'success' | 'warning' | 'error'>('in-progress')
const dashboard = ref(false)
</script>

<style scoped>
.progress-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.controls {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 300px;
  margin-top: 1rem;
}
</style>