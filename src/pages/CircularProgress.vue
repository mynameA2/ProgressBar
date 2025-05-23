<template>
  <div :class="['circular-progress', status, { dashboard }]">
    <svg :viewBox="'0 0 100 100'" class="progress-ring" :class="{ dashboard }">
      <circle
        v-if="!dashboard"
        class="track"
        :r="radius"
        :cx="50"
        :cy="50"
        fill="transparent"
        stroke-width="strokeWidth"
        :stroke-dasharray="circumference"
        :stroke-dashoffset="0"
      />
      <path
        class="progress"
        :d="arcPath"
        fill="none"
        :stroke="computedColor"
        :stroke-width="strokeWidth"
        stroke-linecap="round"
      />
    </svg>
    <div class="center-content">
      <span v-if="status === 'success'">✔</span>
      <span v-else-if="status === 'error'">✖</span>
      <span v-else-if="status === 'warning'">!</span>
      <span v-else>{{ modelValue }}%</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps < {
    modelValue: number,
    status?: 'in-progress' | 'success' | 'error' | 'warning',
    dashboard?: boolean
}>()

const strokeWidth = 6
const radius = 45
const circumference = 2 * Math.PI * radius

const dashRatio = props.dashboard ? 0.75 : 1
const dashGapRatio = props.dashboard ? 0.25 : 0

// Arc path for dashboard mode (semi-circle)
const arcPath = computed(() => {
  const percent = Math.min(Math.max(props.modelValue, 0), 100)
  const angle = props.dashboard ? 270 * (percent / 100) : 360 * (percent / 100)
  const startAngle = props.dashboard ? -135 : -90
  const endAngle = startAngle + angle

  const r = radius

  if (percent === 100 && !props.dashboard) {
    return `
      M ${50 + r} 50
      A ${r} ${r} 0 1 1 ${50 - r} 50
      A ${r} ${r} 0 1 1 ${50 + r} 50
    `
  }

  const start = {
    x: 50 + r * Math.cos((Math.PI / 180) * startAngle),
    y: 50 + r * Math.sin((Math.PI / 180) * startAngle),
  }
  const end = {
    x: 50 + r * Math.cos((Math.PI / 180) * endAngle),
    y: 50 + r * Math.sin((Math.PI / 180) * endAngle),
  }

  const largeArc = angle >= 180 ? 1 : 0
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 1 ${end.x} ${end.y}`
})

const statusColorMap = {
    'in-progress': '#0067ff',
    success: '#3ddd78',
    error: '#f7b13c',
    warning: '#f82a2a',
}

const computedColor = computed(() => {
    if (props.status === 'in-progress') {
      if (props.dashboard) {
        const percent = Math.min(Math.max(props.modelValue, 0), 100)
        const red = Math.round(255 * (1 - percent / 100))
        const green = Math.round(255 * (percent / 100))
        return `rgb(${red}, ${green}, 0)`
      }
      return '#0067ff'
    } 
    return statusColorMap[props.status || 'in-progress']
})
</script>

<style scoped>

.circular-progress {
    position: relative;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 120px;
    height: 120px;
}

.progress-ring {
    width: 100%;
    height: 100%;
    transform: rotate(-90deg);
}

.track {
    stroke: #d8d4d4;
}

.progress {
    transition: stroke-dashoffset 0.5s ease, stroke 0.5s ease;
}

.center-content {
    position: absolute;
    font-size: 1.2rem;
    font-weight: bold;
}

</style>