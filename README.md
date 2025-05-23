# circular-progress-demo

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

# Тестовое задание: Круговой прогресс-бар и круговая диаграмма на Vue 3

## Задача 1 — Круговой прогресс-бар (SVG)

- Реализован на **Vue 3** (Composition API) без сторонних UI-библиотек.
- Прогресс-бар выполнен через **SVG** (основная реализация) и продублирован через **Canvas** (для расширения).
- 4 состояния: **in progress**, **success**, **warning**, **error**.
- Анимация плавная при изменении значения и статуса.
- Цвет заполненного сектора меняется **от красного к зелёному** в зависимости от значения.
- Режим "dashboard" (дуга вместо полного круга) поддерживается, переключается через пропсы.
- Компонент полностью универсальный и легко интегрируется в любой проект.
- Отдельная страница-демонстрация со всеми настройками и примерами.

**Примеры:**

![circle](https://paper-attachments.dropboxusercontent.com/s_356B145618ED7D0C787C02E500462811E8310465EF5F720477688A144E025E5C_1730277283597_PixelSnap+2024-10-30+at+11.34.392x.png)
![dashboard](https://paper-attachments.dropboxusercontent.com/s_356B145618ED7D0C787C02E500462811E8310465EF5F720477688A144E025E5C_1730278320639_PixelSnap+2024-10-30+at+11.51.182x.png)

---

## Задача 2 — Круговая диаграмма (Pie Chart)

- Реализована на **Vue 3** (Composition API) в отдельной странице.
- Используется библиотека **Chart.js** (через vue-chartjs).
- Есть форма для добавления и редактирования элементов:
  - **Наименование**  
  - **Значение**
  - **Цвет** (выбор через сторонний color picker: [vue3-colorpicker](https://www.npmjs.com/package/vue3-colorpicker))
- Элементы можно **добавлять, удалять, редактировать**.
- Цвет сектора всегда соответствует выбранному цвету.
- Оформление и UI адаптированы под [макет Figma](https://www.figma.com/design/wlwVRFgUH1BYsAOKgylnzY/Untitled?node-id=0-1&t=a2W3WL18kEtD7ZI3-1).
- Адаптивная вёрстка — корректно отображается на десктопе и мобильных.
- **Color picker** — дизайн может отличаться от макета, главное: свободный выбор цвета.

---

## Как запустить проект

1. **Клонируйте репозиторий:**
   ```
   git clone https://github.com/https://github.com/mynameA2/ProgressBar.git
   ```

2. **Установите зависимости:**
   ```
   npm install
   ```

3. **Запустите dev-сервер:**
   ```
   npm run dev
   ```

4. **Откройте в браузере:**  
   http://localhost:5173 (или порт, который выдал Vite)

---

## Навигация по проекту

- `/` — демо-страница кругового прогресс-бара
- `/pie` — круговая диаграмма (PieChart) с формой и возможностью редактирования

---

## Технологии

- Vue 3 + Composition API
- SVG, Canvas (опционально для расширения)
- [vue-chartjs](https://vue-chartjs.org/) + Chart.js
- [vue3-colorpicker](https://www.npmjs.com/package/vue3-colorpicker)
- Адаптивная вёрстка (CSS/SCSS)

---

## Требования к сдаче

- **Публичный репозиторий на GitHub**  
- Кроссбраузерность (актуальные версии Chrome/Firefox/Safari)
- Код с комментариями и структурой, удобной для ревью
