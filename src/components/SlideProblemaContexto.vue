<template>
  <div class="w-full h-full flex flex-col items-center justify-center bg-gray-50 p-5 overflow-hidden relative">

    <!-- Título -->
    <div class="text-center mb-4 z-10">
      <h1 class="text-3xl md:text-4xl font-heading font-bold text-isagen-dark mb-1">
        El <span class="text-red-500">Problema</span> del Contexto Enorme
      </h1>
      <p class="text-sm text-gray-500 max-w-2xl mx-auto">
        Más contexto no siempre es mejor — la precisión cae cuando el modelo tiene demasiado que procesar
      </p>
    </div>

    <!-- Panel comparativo principal -->
    <div class="flex w-full max-w-5xl gap-4 items-stretch flex-grow min-h-0">

      <!-- Columna izquierda: Contexto Enorme -->
      <div class="flex flex-col w-1/2 bg-white rounded-2xl shadow-md border border-red-100 overflow-hidden">
        <div class="bg-red-600 text-white px-4 py-2.5 font-heading font-bold text-sm flex items-center gap-2">
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/></svg>
          Contexto Enorme
          <span class="ml-auto text-xs font-normal bg-red-800 bg-opacity-50 px-2 py-0.5 rounded-full">Modelo GPT-5</span>
        </div>

        <div class="flex flex-col flex-grow p-4 gap-3">
          <!-- Barra de precisión -->
          <div>
            <div class="flex justify-between text-xs text-gray-500 mb-1">
              <span>Precisión de respuesta</span>
              <span :class="['font-bold transition-all duration-700', bigContextPrecision < 50 ? 'text-red-500' : 'text-yellow-500']">{{ bigContextPrecision }}%</span>
            </div>
            <div class="w-full h-4 bg-gray-100 rounded-full overflow-hidden border border-gray-200">
              <div
                class="h-full rounded-full transition-all duration-700"
                :style="{ width: bigContextPrecision + '%', backgroundColor: precisionColor(bigContextPrecision) }"
              ></div>
            </div>
          </div>

          <!-- Visualizador de contexto (tokens como bloques) -->
          <div class="flex-grow bg-gray-50 rounded-xl border border-gray-200 p-2 relative overflow-hidden">
            <div class="text-xs text-gray-400 mb-1.5 font-mono">tokens en contexto: {{ bigTokenCount.toLocaleString() }}</div>
            <div class="flex flex-wrap gap-0.5 overflow-hidden" style="max-height: 110px;">
              <div
                v-for="(block, i) in bigContextBlocks"
                :key="i"
                :class="['w-2.5 h-2.5 rounded-sm transition-all duration-300', block.isSignal ? 'bg-isagen-blue' : 'bg-gray-200']"
                :style="{ opacity: block.isSignal ? 1 : 0.5 + Math.random() * 0.3 }"
              ></div>
            </div>
            <!-- Overlay "buscando aguja en pajar" -->
            <div v-if="phase >= 1" class="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 rounded-xl animate-fadeIn">
              <div class="text-center px-3">
                <div class="text-3xl mb-1">🔍</div>
                <p class="text-xs text-red-500 font-bold">Buscando la aguja...</p>
                <p class="text-xs text-gray-400 mt-0.5">{{ bigTokenCount.toLocaleString() }} tokens para revisar</p>
              </div>
            </div>
          </div>

          <!-- Síntoma -->
          <div class="bg-red-50 border border-red-200 rounded-xl p-3">
            <p class="text-xs font-bold text-red-700 mb-1">Lo que ocurre:</p>
            <ul class="text-xs text-red-600 space-y-1">
              <li class="flex items-start gap-1.5"><span class="mt-0.5 flex-shrink-0">⚠️</span> La respuesta relevante se "diluye" entre miles de tokens irrelevantes</li>
              <li class="flex items-start gap-1.5"><span class="mt-0.5 flex-shrink-0">⚠️</span> El modelo "pierde el hilo" incluso siendo muy inteligente</li>
              <li class="flex items-start gap-1.5"><span class="mt-0.5 flex-shrink-0">⚠️</span> Mayor costo y mayor latencia por token</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Columna derecha: Contexto Acotado -->
      <div class="flex flex-col w-1/2 bg-white rounded-2xl shadow-md border border-green-100 overflow-hidden">
        <div class="bg-isagen-green text-white px-4 py-2.5 font-heading font-bold text-sm flex items-center gap-2">
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg>
          Contexto Acotado
          <span class="ml-auto text-xs font-normal bg-green-700 bg-opacity-50 px-2 py-0.5 rounded-full">Modelo GPT-4 mini</span>
        </div>

        <div class="flex flex-col flex-grow p-4 gap-3">
          <!-- Barra de precisión -->
          <div>
            <div class="flex justify-between text-xs text-gray-500 mb-1">
              <span>Precisión de respuesta</span>
              <span :class="['font-bold transition-all duration-700', smallContextPrecision >= 85 ? 'text-isagen-green' : 'text-yellow-500']">{{ smallContextPrecision }}%</span>
            </div>
            <div class="w-full h-4 bg-gray-100 rounded-full overflow-hidden border border-gray-200">
              <div
                class="h-full rounded-full transition-all duration-700"
                :style="{ width: smallContextPrecision + '%', backgroundColor: precisionColor(smallContextPrecision) }"
              ></div>
            </div>
          </div>

          <!-- Visualizador de contexto acotado -->
          <div class="flex-grow bg-gray-50 rounded-xl border border-gray-200 p-2 relative overflow-hidden">
            <div class="text-xs text-gray-400 mb-1.5 font-mono">tokens en contexto: {{ smallTokenCount.toLocaleString() }}</div>
            <div class="flex flex-wrap gap-0.5 overflow-hidden" style="max-height: 110px;">
              <div
                v-for="(block, i) in smallContextBlocks"
                :key="i"
                :class="['w-2.5 h-2.5 rounded-sm transition-all duration-300', block.isSignal ? 'bg-isagen-green' : 'bg-gray-200']"
              ></div>
            </div>
            <!-- Overlay "respuesta directa" -->
            <div v-if="phase >= 1" class="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 rounded-xl animate-fadeIn">
              <div class="text-center px-3">
                <div class="text-3xl mb-1">🎯</div>
                <p class="text-xs text-isagen-green font-bold">Solo lo relevante</p>
                <p class="text-xs text-gray-400 mt-0.5">{{ smallTokenCount.toLocaleString() }} tokens precisos</p>
              </div>
            </div>
          </div>

          <!-- Ventajas -->
          <div class="bg-green-50 border border-green-200 rounded-xl p-3">
            <p class="text-xs font-bold text-green-700 mb-1">Lo que ocurre:</p>
            <ul class="text-xs text-green-700 space-y-1">
              <li class="flex items-start gap-1.5"><span class="mt-0.5 flex-shrink-0">✅</span> El modelo recibe solo la información exactamente relevante</li>
              <li class="flex items-start gap-1.5"><span class="mt-0.5 flex-shrink-0">✅</span> Respuestas más precisas, rápidas y baratas</li>
              <li class="flex items-start gap-1.5"><span class="mt-0.5 flex-shrink-0">✅</span> Un modelo menor <strong>supera</strong> a uno mayor con contexto enorme</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- Conclusión + Control -->
    <div class="mt-3 w-full max-w-5xl flex items-center justify-between gap-4 z-10">
      <div
        v-if="phase >= 2"
        class="flex-grow bg-isagen-dark text-white rounded-xl px-5 py-3 flex items-center gap-3 animate-fadeIn"
      >
        <svg class="w-5 h-5 text-isagen-green flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.996.416-1.807 1-2.388V8a1 1 0 10-2 0v3.612C11.584 12.193 11.985 13.004 12 14h-1v-1.612A2 2 0 1010 14h-1a3 3 0 116 0h-1c.015-.996-.985-1-.985-1S12 14 12 14z"/></svg>
        <span class="text-sm">
          <strong class="text-isagen-green">Clave:</strong>
          La inteligencia del modelo <span class="line-through opacity-50">no basta</span> — la <strong class="text-isagen-green">gestión del contexto</strong> define la calidad de la respuesta. RAG resuelve exactamente esto.
        </span>
      </div>

      <button
        @click="advance"
        :disabled="phase >= 2"
        class="flex-shrink-0 px-5 py-2.5 bg-isagen-blue text-white text-sm font-bold rounded-xl disabled:opacity-40 disabled:cursor-not-allowed hover:bg-isagen-light-blue transition-colors"
      >
        {{ phase === 0 ? 'Comparar →' : phase === 1 ? 'Ver conclusión →' : 'Completado ✓' }}
      </button>
    </div>

  </div>
</template>

<script>
export default {
  name: 'SlideProblemaContexto',
  data() {
    return {
      phase: 0,
      bigContextPrecision: 72,
      smallContextPrecision: 72,
      bigTokenCount: 128000,
      smallTokenCount: 2400,
    };
  },
  computed: {
    bigContextBlocks() {
      // Muchos bloques, muy pocos relevantes (señal débil en mucho ruido)
      const total = 220;
      const signalCount = this.phase >= 1 ? 4 : 8;
      return Array.from({ length: total }, (_, i) => ({
        isSignal: i < signalCount,
      })).sort(() => Math.random() - 0.5);
    },
    smallContextBlocks() {
      // Pocos bloques, alta proporción relevante
      const total = 40;
      const signalCount = this.phase >= 1 ? 28 : 20;
      return Array.from({ length: total }, (_, i) => ({
        isSignal: i < signalCount,
      })).sort(() => Math.random() - 0.5);
    },
  },
  methods: {
    advance() {
      if (this.phase === 0) {
        // Mostrar la comparación visual: precisión baja vs alta
        this.phase = 1;
        // Animar las barras de precisión
        setTimeout(() => {
          this.bigContextPrecision = 38;
          this.smallContextPrecision = 92;
        }, 300);
      } else if (this.phase === 1) {
        this.phase = 2;
      }
    },
    precisionColor(value) {
      if (value >= 80) return '#22c55e';
      if (value >= 60) return '#eab308';
      if (value >= 40) return '#f97316';
      return '#ef4444';
    },
    reset() {
      this.phase = 0;
      this.bigContextPrecision = 72;
      this.smallContextPrecision = 72;
    }
  }
}
</script>

<style scoped>
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(6px); }
  to   { opacity: 1; transform: translateY(0); }
}
.animate-fadeIn {
  animation: fadeIn 0.4s ease-out forwards;
}
</style>
