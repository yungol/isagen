<template>
  <div class="w-full max-w-6xl p-12">
    <div class="flex items-center space-x-4 mb-10 border-l-8 border-isagen-green pl-6">
      <h2 class="text-5xl font-heading font-extrabold text-isagen-dark">Estado del Arte</h2>
      <span class="bg-isagen-green text-white font-bold px-4 py-1 rounded-full text-xl animate-pulse">HOY: Abril 2026</span>
    </div>

    <!-- Introducción -->
    <p class="text-gray-500 font-body text-lg mb-8">El uso de IA en las organizaciones se articula en <span class="font-bold text-isagen-dark">dos grandes vertientes</span> según el enfoque técnico adoptado.</p>

    <!-- Dos vertientes principales -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">

      <!-- Vertiente 1: APIs y RAG -->
      <div class="bg-white rounded-2xl p-8 border-2 border-isagen-blue shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
        <div class="flex items-center space-x-4 mb-5">
          <div class="w-14 h-14 bg-blue-50 text-isagen-blue rounded-xl flex items-center justify-center shrink-0">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
          </div>
          <div>
            <p class="text-xs font-bold uppercase tracking-widest text-isagen-blue mb-0.5">Vertiente 1</p>
            <h3 class="text-2xl font-heading font-bold text-gray-800 leading-tight">APIs y Modelos con RAG</h3>
          </div>
        </div>
        <p class="text-gray-600 font-body leading-relaxed mb-6">Consumo de modelos de lenguaje de gran escala (GPT, Gemini, Claude…) a través de APIs. La técnica <strong>RAG</strong> (<em>Retrieval-Augmented Generation</em>) enriquece las respuestas con documentos y datos propios de la organización.</p>
        <div class="mt-auto space-y-3">
          <div class="flex items-start space-x-3 bg-blue-50 rounded-xl p-3">
            <svg class="w-5 h-5 text-isagen-blue mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
            <span class="text-gray-700 font-body text-sm"><strong>Chats corporativos</strong> sobre documentación interna, normativas y procesos.</span>
          </div>
          <div class="flex items-start space-x-3 bg-blue-50 rounded-xl p-3">
            <svg class="w-5 h-5 text-isagen-blue mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
            <span class="text-gray-700 font-body text-sm"><strong>Automatizaciones</strong> de flujos de trabajo y agentes conectados a sistemas empresariales.</span>
          </div>
        </div>
      </div>

      <!-- Vertiente 2: Machine Learning / Fine-tuning -->
      <div class="bg-white rounded-2xl p-8 border-2 border-isagen-green shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
        <div class="flex items-center space-x-4 mb-5">
          <div class="w-14 h-14 bg-green-50 text-isagen-green rounded-xl flex items-center justify-center shrink-0">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H4a2 2 0 01-2-2V5a2 2 0 012-2h16a2 2 0 012 2v10a2 2 0 01-2 2h-1m-6 0h-4"></path></svg>
          </div>
          <div>
            <p class="text-xs font-bold uppercase tracking-widest text-isagen-green mb-0.5">Vertiente 2</p>
            <h3 class="text-2xl font-heading font-bold text-gray-800 leading-tight">Machine Learning y Fine-Tuning</h3>
          </div>
        </div>
        <p class="text-gray-600 font-body leading-relaxed mb-6">Entrenamiento y ajuste fino (<strong>fine-tuning</strong>) de modelos más pequeños y eficientes que pueden ejecutarse <strong>en local</strong>, sobre infraestructura propia, sin depender de servicios externos.</p>
        <div class="mt-auto space-y-3">
          <div class="flex items-start space-x-3 bg-green-50 rounded-xl p-3">
            <svg class="w-5 h-5 text-isagen-green mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
            <span class="text-gray-700 font-body text-sm"><strong>Soberanía del dato</strong>: los modelos y la información permanecen dentro de la organización.</span>
          </div>
          <div class="flex items-start space-x-3 bg-green-50 rounded-xl p-3">
            <svg class="w-5 h-5 text-isagen-green mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
            <span class="text-gray-700 font-body text-sm"><strong>Modelos especializados</strong> en dominios concretos del negocio (predicción, clasificación, etc.).</span>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'SlideEstadoArte'
}
</script>
