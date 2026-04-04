# Documentación del Proyecto: Presentación de Diapositivas

## Descripción General
Este proyecto es una presentación interactiva tipo diapositivas diseñada para un cliente. Se desarrolla con un entorno moderno usando **Vite**, pero el objetivo del proceso de *build* es compilar todo en un **único archivo HTML autocontenido** (`index.html`) mediante un plugin, permitiendo al cliente abrirlo en cualquier navegador sin servidor local ni conexión a internet.

## Stack Tecnológico y Arquitectura
- **Desarrollo:** Vite + Vue 3 (Single-File Components `.vue`).
- **Framework:** Vue.js 3 utilizando estrictamente la **Options API** (ej. `data()`, `methods`, `mounted()`).
- **Estilos:** Tailwind CSS vía PostCSS (`@tailwindcss/postcss`). Todos los estilos deben aplicarse utilizando clases utilitarias de Tailwind directamente en el HTML de los templates.
- **Transiciones:** Se utilizan las clases integradas de Vue (`<transition>`) en `src/App.vue`.
- **Compilación:** Se utiliza `vite-plugin-singlefile` para inyectar todo el CSS y JS empaquetado directamente en el `dist/index.html` resultante cuando se ejecuta `npm run build`.

## Estructura de Archivos y Elementos del Proyecto
A continuación se detalla la estructura exacta del proyecto y la responsabilidad de cada archivo:

### Configuración y Raíz
- `package.json`: Define las dependencias (Vue, Vite, Tailwind, etc.) y los scripts (`dev`, `build`).
- `vite.config.js`: Configuración de Vite. Incluye el plugin `viteSingleFile()` para empaquetar todo en un solo HTML.
- `tailwind.config.js`: Configuración de Tailwind CSS (rutas de contenido y temas).
- `postcss.config.js`: Configuración de PostCSS, utiliza `@tailwindcss/postcss` y `autoprefixer`.
- `index.html`: Punto de entrada principal para Vite durante el desarrollo y plantilla para el build final.
- `agents.md`: Este archivo de documentación para agentes de IA.

### Código Fuente (`/src`)
- `src/main.js`: Archivo de entrada de JavaScript. Inicializa la aplicación Vue y la monta en `#app`.
- `src/style.css`: Archivo CSS global. Importa las directivas base de Tailwind y define las clases CSS puras para las animaciones de transición entre diapositivas (`.slide-fade-enter-active`, etc.).
- `src/App.vue`: **Componente Contenedor Principal**.
  - Gestiona el estado de la presentación (`currentSlide`).
  - Mantiene el registro (Array `slides`) del orden de los componentes a mostrar.
  - Implementa el renderizado dinámico (`<component :is="...">`) con `<transition>`.
  - Contiene la barra de navegación inferior (footer) y la lógica de eventos de teclado (flechas y espacio).

### Diapositivas (`/src/components`)
Cada diapositiva es un componente SFC (Single-File Component) independiente. Actualmente existen:
- `SlidePortada.vue`: Vista inicial con el título de la presentación.
- `SlideContenido.vue`: Vista de ejemplo con 3 columnas informativas (Pilares).
- `SlideCierre.vue`: Vista final con un llamado a la acción (Call to Action).

### Salida de Compilación (`/dist`)
- `dist/index.html`: **(Generado tras `npm run build`)** Es el entregable final para el cliente. Un archivo HTML que contiene todo el código CSS y JS minificado e incrustado (inline).

## Instrucciones para Agentes de Desarrollo
Si otro agente debe modificar o escalar este proyecto, debe seguir estrictamente estas reglas:
- **Flujo de desarrollo local:** Usa `npm run dev` para previsualizar y trabajar de forma interactiva.
- **Generación final:** Usa `npm run build` para generar el HTML final e independiente en la carpeta `/dist/`. **No entregues archivos de la carpeta `src` al cliente como producto final.**
- **Uso estricto de Options API:** **No usar la Composition API (`setup()`, `ref`, `reactive`)**. El proyecto está estandarizado con la Options API clásica de Vue.
- **Creación de Nuevas Diapositivas:**
    1. Crea un nuevo archivo `.vue` en `src/components/` (ej. `SlideNueva.vue`).
    2. Usa la estructura estándar: un `<template>` con HTML/Tailwind y un `<script>` que exporte un objeto de Options API definiendo al menos `name: 'SlideNueva'`.
    3. Importa el componente en `src/App.vue` (`import SlideNueva from './components/SlideNueva.vue';`).
    4. Regístralo en el objeto `components: { ... }` de `App.vue`.
    5. Añade el nombre exacto del componente en formato cadena de texto al array `slides` dentro de la función `data()` en `App.vue`.
- **Estilos:** Evita añadir etiquetas `<style>` en los componentes individuales a menos que sea estrictamente necesario para algo muy puntual que Tailwind no cubra. La UI debe construirse aplicando el ecosistema de utilidades de Tailwind en los templates.
