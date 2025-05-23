<template>
  <div id="app">
    <header>
      <nav>
        <RouterLink to="/pie">Перейти к диаграмме</RouterLink>
        <RouterLink to="/">Демо Кругового Прогресс Бара</RouterLink>
      </nav>
    </header>
    <router-view />
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
body {
  margin: 0;
  padding: 0;
  background-color: #f9fafb;
  font-family: 'Segoe UI', sans-serif;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background-color: #f9fafb;
}

header {
  width: 100%;
  padding: 1rem 2rem;
  background-color: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  margin-bottom: 2rem;
}

nav {
  display: flex;
  gap: 2rem;
  justify-content: center;
}

nav a {
  font-size: 1.2rem;
  font-weight: 600;
  color: #3b82f6;
  text-decoration: none;
  transition: color 0.2s ease;
}

nav a:hover {
  color: #1d4ed8;
}
</style>