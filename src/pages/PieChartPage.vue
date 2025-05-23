<template>
  <div class="pie-page">
    <h1>Круговая диаграмма</h1>
    <div class="content">
      <div class="list">
        <button class="add-button" @click="showForm = true">Добавить сектор</button>
        <div class="row" v-for="(item, index) in data" :key="index">
          <span>{{ item.name }}</span>
          <span>{{ item.value }}%</span>
          <span class="dot" :style="{ backgroundColor: item.color }"></span>
          <span class="actions">
            <button class="icon" @click="editItem(index)">✏</button>
            <button class="icon" @click="removeItem(index)">🗑</button>
          </span>
        </div>
      </div>
      <div class="chart-container">
        <Pie :data="chartData" :options="chartOptions" :key="JSON.stringify(chartData)" />
      </div>
    </div>

    <Teleport to="body">
      <div v-if="showForm" class="modal-overlay">
        <form @submit.prevent="addItem" class="modal">
          <h2>Добавление сектора</h2>
          <input v-model="form.name" placeholder="Наименование" required />
          <input
            v-model.number="form.value"
            type="number"
            placeholder="Значение"
            required
          />
          <div class="color-picker-wrapper" style="display:flex; align-items:center; gap:1rem;">
            <label for="colorinput" style="font-weight:600;">Цвет сектора:</label>
            <ColorPicker v-model:pureColor="color" format="hex" pickerType="chrome" style="--cpc-width:230px; --cpc-border-radius:16px;" />
          </div>
          <div style="margin-top: 10px; color: #222;">
            <b>Выбранный цвет:</b> {{ color }}
          </div>
          <button type="submit" class="submit">
            {{ editIndex !== null ? "Сохранить" : "Добавить сектор" }}
          </button>
        </form>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { Pie } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
} from "chart.js";
import { ColorPicker } from "vue3-colorpicker";
import "vue3-colorpicker/style.css";

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

const form = ref({ name: "", value: 0, color: "#3b82f6" });
const color = ref("#3b82f6");
watch(color, (val) => {
  console.log("watch color:", val);
});
const data = ref<{ name: string; value: number; color: string }[]>([]);
const showForm = ref(false);

const editIndex = ref<number | null>(null);
const editItem = (index: number) => {
  const item = data.value[index];
  form.value = { ...item };
  color.value = item.color || "#3b82f6";
  editIndex.value = index;
  showForm.value = true;
};

const addItem = () => {
  console.log('form:', JSON.stringify(form.value), 'color.value:', color.value);
  let pickedColor = color.value;
  if (typeof pickedColor === 'object' && pickedColor !== null && pickedColor.hex) {
    pickedColor = pickedColor.hex;
  }
  if (typeof pickedColor !== 'string') {
    pickedColor = '#3b82f6';
  }
  const itemToSave = {
    name: form.value.name,
    value: form.value.value,
    color: pickedColor
  };
  if (editIndex.value !== null) {
    data.value[editIndex.value] = itemToSave;
    editIndex.value = null;
  } else {
    data.value.push(itemToSave);
  }
  console.log('data.value:', JSON.stringify(data.value));
  form.value = { name: "", value: 0, color: "#3b82f6" };
  color.value = "#3b82f6";
  showForm.value = false;
};

const removeItem = (index: number) => {
  data.value.splice(index, 1);
};

const chartData = computed(() => {
  const labels = [...data.value.map((item) => item.name)];
  const values = [...data.value.map((item) => item.value)];
  const backgroundColors = [...data.value.map((item) => {
    if (typeof item.color === 'object' && item.color !== null && item.color.hex) {
      return item.color.hex;
    }
    if (typeof item.color === 'string') {
      return item.color;
    }
    return '#3b82f6';
  })];
  console.log('chartData:', { labels, values, backgroundColors });
  return {
    labels,
    datasets: [
      {
        data: [...values],
        backgroundColor: [...backgroundColors],
      },
    ],
  };
});

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom" as const,
    },
  },
};

</script>

<style scoped>
.pie-page {
  max-width: 1200px;
  margin: auto;
  padding: 2rem;
  font-family: "Segoe UI", sans-serif;
  background-color: #f9fafb;
}

.pie-page h1 {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: #1e293b;
  border-bottom: 1px solid #e2e8f0;
  padding-bottom: 1rem;
}

.content {
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  align-items: flex-start;
}

.chart-container {
  flex: 1;
  height: 480px;
  background: #fff;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.04);
}

.list {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  background: #f1f5f9;
  border-radius: 12px;
  padding: 0.5rem;
}

.row {
  background: white;
  border: 1px solid #e2e8f0;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-left: 0.5rem;
  align-self: center;
}

.icon {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  opacity: 0.6;
}
.icon:hover {
  opacity: 1;
}

.actions {
  display: flex;
  gap: 0.5rem;
}

.add-button {
  width: 100%;
  padding: 1rem;
  background: #4f7cf4;
  color: white;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 500;
  font-size: 1.1rem;
  margin-top: 1.2rem;
}

.add-button:disabled {
  opacity: 0.65;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
}

.modal {
  background: #fff;
  border-radius: 16px;
  padding: 2rem;
  width: 350px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.modal h2 {
  margin: 0 0 1rem 0;
  font-size: 1.6rem;
  font-weight: 700;
  color: #232946;
  letter-spacing: 0.02em;
}

.modal input {
  margin-bottom: 0.7rem;
  font-size: 1.05rem;
  padding: 0.95rem;
  background: #f8fafc;
  border: 1px solid #cbd5e1;
  border-radius: 10px;
}

.modal .submit {
  width: 100%;
  background: #4f7cf4;
  color: white;
  font-weight: 500;
  padding: 1rem;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  margin-top: 1.2rem;
}

.modal .submit:disabled {
  opacity: 0.65;
}

/* Цветовой дропдаун в модальном окне */
.color-picker-wrapper {
  border: none;
  border-radius: 0;
  padding: 0;
  position: relative;
  z-index: 20;
}

.color-hex-label {
  text-align: center;
  margin: 0.4rem 0 0.2rem 0;
  color: #9ca3af;
  font-size: 1rem;
  letter-spacing: 0.04em;
}

.shade-bar { display: flex; justify-content: space-between; margin-top: 0.5rem; gap: 4px;
} .shade { flex: 1; height: 20px; border-radius: 4px; cursor: pointer; border: 1px solid
#e2e8f0; }

@media (max-width: 768px) {
  .content {
    flex-direction: column;
    gap: 1rem;
  }
  .chart-container .list {
    width: 100%;
    min-width: 0;
  }
  .modal {
    width: 95vw;
    min-width: unset;
    max-width: 370px;
    padding: 1rem;;
  }
}
</style>
