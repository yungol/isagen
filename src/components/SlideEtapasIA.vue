<template>
  <div class="h-full w-full bg-white flex flex-col justify-center px-12 md:px-24">
    <div class="mb-12 border-l-8 border-isagen-green pl-6">
      <h2 class="text-3xl md:text-5xl font-heading font-extrabold text-isagen-dark mb-4 tracking-tight">
        Las Dos Caras de la IA Hoy
      </h2>
      <p class="text-xl md:text-2xl font-body text-gray-600 font-light">
        De predecir el futuro a crearlo
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
      <!-- Predictiva -->
      <div class="bg-gray-50 rounded-2xl p-8 shadow-md border-t-8 border-isagen-blue flex flex-col items-center text-center">
        <div class="w-20 h-20 bg-isagen-blue rounded-full flex items-center justify-center text-white mb-6 shadow-lg">
          <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"></path></svg>
        </div>
        <h3 class="text-3xl font-heading font-bold text-gray-800 mb-4">Modelos Predictivos</h3>
        <p class="text-lg text-gray-600 font-body mb-6">
          Analizan grandes cantidades de datos históricos para identificar patrones y prever resultados futuros con alta probabilidad.
        </p>
        <ul class="text-left w-full space-y-3 mt-auto">
          <li class="flex items-center text-gray-700 font-body">
            <span class="text-isagen-blue mr-3 text-xl">✓</span> Detección de fraudes
          </li>
          <li class="flex items-center text-gray-700 font-body">
            <span class="text-isagen-blue mr-3 text-xl">✓</span> Recomendaciones (Netflix/Amazon)
          </li>
          <li class="flex items-center text-gray-700 font-body">
            <span class="text-isagen-blue mr-3 text-xl">✓</span> Diagnóstico médico
          </li>
        </ul>
      </div>

      <!-- Generativa -->
      <div class="bg-gray-50 rounded-2xl p-8 shadow-md border-t-8 border-isagen-green flex flex-col items-center text-center">
        <div class="w-20 h-20 bg-isagen-green rounded-full flex items-center justify-center text-white mb-6 shadow-lg">
           <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
        </div>
        <h3 class="text-3xl font-heading font-bold text-gray-800 mb-4">Modelos Generativos</h3>
        <p class="text-lg text-gray-600 font-body mb-6">
          Usan el conocimiento probabilístico adquirido no solo para predecir, sino para <strong>crear contenido nuevo y original</strong> (texto, imágenes, código).
        </p>
        <ul class="text-left w-full space-y-3 mt-auto">
          <li class="flex items-center text-gray-700 font-body">
            <span class="text-isagen-green mr-3 text-xl">✓</span> ChatGPT / Claude (Texto)
          </li>
          <li class="flex items-center text-gray-700 font-body">
            <span class="text-isagen-green mr-3 text-xl">✓</span> Midjourney / DALL-E (Imágenes)
          </li>
          <li class="flex items-center text-gray-700 font-body">
            <span class="text-isagen-green mr-3 text-xl">✓</span> GitHub Copilot (Código)
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SlideEtapasIA'
}
</script>