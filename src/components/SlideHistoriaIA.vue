<template>
  <div class="w-full max-w-6xl p-6">
    <div class="text-center mb-6">
      <h2 class="text-3xl font-heading font-bold mb-2 text-isagen-blue">La Evolución del Aprendizaje</h2>
      <p class="text-base font-body text-gray-500">Cómo intentamos resolver el problema a través del tiempo</p>
      <div class="h-1 w-24 bg-isagen-green mx-auto rounded-full mt-4"></div>
    </div>
    
    <!-- Timeline de la historia de IA -->
    <div class="relative">
      <!-- Línea base del timeline -->
      <div class="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-isagen-blue bg-opacity-20 hidden md:block"></div>
      
      <!-- Contenedor general del Grid (para responsivo) -->
      <div class="space-y-4">
        <!-- Evento 1 -->
        <div class="flex flex-col md:flex-row items-center w-full relative z-10">
          <div class="w-full md:w-1/2 md:pr-8 text-center md:text-right mb-2 md:mb-0">
            <h3 class="text-xl font-heading font-bold text-isagen-blue mb-1">Años 50-80: Sistemas Expertos</h3>
            <p class="text-sm text-gray-600 font-body leading-snug">El intento de meter todo el conocimiento humano en reglas <code>if/else</code>. <br><strong>Resultado:</strong> Fracasó por ser demasiado rígido frente a la incertidumbre del mundo real.</p>
          </div>
          <div class="w-8 h-8 bg-white rounded-full border-4 border-isagen-green shadow-lg flex items-center justify-center relative hidden md:flex z-20">
            <span class="w-2 h-2 bg-isagen-blue rounded-full"></span>
          </div>
          <div class="w-full md:w-1/2 md:pl-8 hidden md:block"></div>
        </div>

        <!-- Evento 2 -->
        <div class="flex flex-col md:flex-row items-center w-full relative z-10">
          <div class="w-full md:w-1/2 md:pr-8 hidden md:block"></div>
          <div class="w-8 h-8 bg-white rounded-full border-4 border-isagen-green shadow-lg flex items-center justify-center relative hidden md:flex z-20">
            <span class="w-2 h-2 bg-isagen-blue rounded-full"></span>
          </div>
          <div class="w-full md:w-1/2 md:pl-8 text-center md:text-left mt-2 md:mt-0">
            <h3 class="text-xl font-heading font-bold text-isagen-blue mb-1">Años 90-2010: Machine Learning</h3>
            <p class="text-sm text-gray-600 font-body leading-snug">Empezamos a usar estadística para que la máquina aprenda sola. Sin embargo, todavía necesitábamos decirle manualmente qué "rasgos" (ej. formas, colores) debía buscar en los datos.</p>
          </div>
        </div>

        <!-- Evento 3 -->
        <div class="flex flex-col md:flex-row items-center w-full relative z-10">
          <div class="w-full md:w-1/2 md:pr-8 text-center md:text-right mb-2 md:mb-0">
            <h3 class="text-xl font-heading font-bold text-isagen-blue mb-1">2012-2017: Deep Learning</h3>
            <p class="text-sm text-gray-600 font-body leading-snug">La explosión de las redes neuronales donde la máquina <strong>identifica sus propios rasgos</strong>. Finalmente, el problema de identificar al "gato" (percepción compleja) fue conquistado.</p>
          </div>
          <div class="w-8 h-8 bg-white rounded-full border-4 border-isagen-green shadow-lg flex items-center justify-center relative hidden md:flex z-20">
            <span class="w-2 h-2 bg-isagen-blue rounded-full"></span>
          </div>
          <div class="w-full md:w-1/2 md:pl-8 hidden md:block"></div>
        </div>

        <!-- Evento 4 -->
        <div class="flex flex-col md:flex-row items-center w-full relative z-10">
          <div class="w-full md:w-1/2 md:pr-8 hidden md:block"></div>
          <div class="w-8 h-8 bg-white rounded-full border-4 border-isagen-green shadow-lg flex items-center justify-center relative hidden md:flex z-20">
            <span class="w-2 h-2 bg-isagen-blue rounded-full"></span>
          </div>
          <div class="w-full md:w-1/2 md:pl-8 text-center md:text-left mt-2 md:mt-0">
            <h3 class="text-xl font-heading font-bold text-isagen-blue mb-1">2017: Attention Is All You Need</h3>
            <p class="text-sm text-gray-600 font-body leading-snug">Se publica el paper fundacional introduciendo la arquitectura <strong>Transformer</strong>. El paradigma cambia hacia el procesamiento de secuencias prestando "atención" al contexto completo.</p>
          </div>
        </div>

        <!-- Evento 5 -->
        <div class="flex flex-col md:flex-row items-center w-full relative z-10">
          <div class="w-full md:w-1/2 md:pr-8 text-center md:text-right mb-2 md:mb-0 mt-2 md:mt-0">
            <h3 class="text-xl font-heading font-bold text-isagen-blue mb-1">2022-Hoy: ChatGPT y LLMs</h3>
            <p class="text-sm text-gray-600 font-body leading-snug">El auge de los Grandes Modelos de Lenguaje (LLMs) y la IA generativa interactiva. Los sistemas pasan de ser clasificadores a motores de razonamiento y generación de propósito general.</p>
          </div>
          <div class="w-8 h-8 bg-white rounded-full border-4 border-isagen-green shadow-lg flex items-center justify-center relative hidden md:flex z-20">
            <span class="w-2 h-2 bg-isagen-blue rounded-full"></span>
          </div>
          <div class="w-full md:w-1/2 md:pl-8 hidden md:block"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SlideHistoriaIA'
}
</script>