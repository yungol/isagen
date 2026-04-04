<template>
  <div class="h-full w-full bg-white flex flex-col justify-center px-12 md:px-24">
    <!-- Título de la sección -->
    <div class="mb-12 border-l-8 border-isagen-blue pl-6">
      <h2 class="text-3xl md:text-5xl font-heading font-extrabold text-isagen-dark mb-4 tracking-tight">
        La Solución Probabilística
      </h2>
      <p class="text-xl md:text-2xl font-body text-gray-600 font-light">
        De las reglas estrictas a la estadística aplicada
      </p>
    </div>

    <!-- Contenido principal: El enfoque Probabilístico -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
      
      <!-- Bloque 1: No Instrucciones, Sino Ejemplos -->
      <div class="bg-gray-50 rounded-2xl p-8 shadow hover:shadow-lg transition-all border border-gray-100 relative group overflow-hidden">
        <div class="absolute inset-0 bg-isagen-blue opacity-0 group-hover:opacity-[0.03] transition-all duration-300"></div>
        <div class="text-isagen-blue text-5xl mb-6 font-bold flex justify-between items-center">
          <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
          <span class="text-6xl text-gray-200">01</span>
        </div>
        <h3 class="text-2xl font-heading font-bold text-gray-800 mb-3">Ejemplos en Lugar de Reglas</h3>
        <p class="text-lg text-gray-600 font-body leading-relaxed">
          Ya no intentamos escribir mil líneas de código para describir un gato. En su lugar, le damos a la máquina <strong>miles de ejemplos</strong> (imágenes de gatos, perros, autos).
        </p>
      </div>

      <!-- Bloque 2: Búsqueda de Correlaciones -->
      <div class="bg-gray-50 rounded-2xl p-8 shadow hover:shadow-lg transition-all border border-gray-100 relative group overflow-hidden">
         <div class="absolute inset-0 bg-isagen-green opacity-0 group-hover:opacity-[0.03] transition-all duration-300"></div>
        <div class="text-isagen-green text-5xl mb-6 font-bold flex justify-between items-center">
          <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
          <span class="text-6xl text-gray-200">02</span>
        </div>
        <h3 class="text-2xl font-heading font-bold text-gray-800 mb-3">Estadística Aplicada</h3>
        <p class="text-lg text-gray-600 font-body leading-relaxed">
          La IA no "sabe" qué es un gato con conciencia, sino que es capaz de encontrar patrones y correlaciones estadísticas de los píxeles (curvas, sombras) que un humano no podría mapear a mano.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SlideSolucionProbabilistica'
}
</script>
