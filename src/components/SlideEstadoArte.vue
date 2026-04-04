<template>
  <div class="w-full max-w-6xl p-12">
    <div class="flex items-center space-x-4 mb-10 border-l-8 border-isagen-green pl-6">
      <h2 class="text-5xl font-heading font-extrabold text-isagen-dark">Estado del Arte</h2>
      <span class="bg-isagen-green text-white font-bold px-4 py-1 rounded-full text-xl animate-pulse">HOY: Abril 2026</span>
    </div>

    <!-- Grid principal de tendencias -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      
      <!-- Card 1 -->
      <div class="bg-white rounded-2xl p-8 border border-gray-100 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
        <div class="w-14 h-14 bg-blue-50 text-isagen-blue rounded-xl flex items-center justify-center mb-6">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
        </div>
        <h3 class="text-2xl font-heading font-bold text-gray-800 mb-3">Modelos Multimodales Nativos</h3>
        <p class="text-gray-600 font-body leading-relaxed">Sistemas (como GPT-4.5/5 y Gemini 3) que "entienden" y procesan texto, audio, video e imágenes simultáneamente en tiempo real. La interacción de voz es indistinguible de la humana.</p>
      </div>

      <!-- Card 2 -->
      <div class="bg-white rounded-2xl p-8 border border-gray-100 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
        <div class="w-14 h-14 bg-green-50 text-isagen-green rounded-xl flex items-center justify-center mb-6">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path></svg>
        </div>
        <h3 class="text-2xl font-heading font-bold text-gray-800 mb-3">Agentes Autónomos Empresariales</h3>
        <p class="text-gray-600 font-body leading-relaxed">Sistemas capaces de planificar tareas complejas en el tiempo, auto-corregirse y ejecutar procesos en ERPs o plataformas en la nube, optimizando el despacho y análisis energético de manera autónoma.</p>
      </div>

      <!-- Card 3 -->
      <div class="bg-white rounded-2xl p-8 border border-gray-100 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
        <div class="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-6">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
        </div>
        <h3 class="text-2xl font-heading font-bold text-gray-800 mb-3">Predicción y Digital Twins (Sector Energía)</h3>
        <p class="text-gray-600 font-body leading-relaxed">Gemelos digitales impulsados por IA predictiva hiper-precisa para el mantenimiento de plantas generadoras (hídricas, solares, térmicas), maximizando la disponibilidad con cero latencia.</p>
      </div>

      <!-- Card 4 -->
      <div class="bg-white rounded-2xl p-8 border border-gray-100 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
        <div class="w-14 h-14 bg-gray-50 text-gray-600 rounded-xl flex items-center justify-center mb-6">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8V7a4 4 0 00-8 0v4h8z"></path></svg>
        </div>
        <h3 class="text-2xl font-heading font-bold text-gray-800 mb-3">Modelos Locales y Privados (On-Premise)</h3>
        <p class="text-gray-600 font-body leading-relaxed">Adopción masiva de modelos de lenguaje de código abierto altamente eficientes (como Llama-4 u otros) que pueden correr en servidores privados de ISAGEN, asegurando total soberanía de los datos corporativos.</p>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'SlideEstadoArte'
}
</script>
