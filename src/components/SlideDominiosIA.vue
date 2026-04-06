<template>
  <div class="w-full h-full flex flex-col justify-center px-10 md:px-16 py-8 bg-white">
    <!-- Header -->
    <div class="mb-6 border-l-8 border-isagen-green pl-6 shrink-0">
      <h2 class="text-3xl md:text-4xl font-heading font-extrabold text-isagen-dark tracking-tight">
        Niveles de Dominio de la IA
      </h2>
      <p class="text-lg font-body text-gray-500 mt-1">
        Del uso básico a la creación de modelos propios — un camino de madurez progresiva
      </p>
    </div>

    <!-- Fila 1: niveles 1, 2, 3 -->
    <div class="grid grid-cols-3 gap-4 mb-4">

      <!-- Nivel 1: Asistentes Conversacionales -->
      <div class="bg-gray-50 rounded-2xl p-5 border-t-4 border-isagen-blue flex flex-col shadow-sm hover:shadow-md transition-shadow duration-200">
        <div class="flex items-center space-x-3 mb-3">
          <div class="w-9 h-9 rounded-full bg-isagen-blue text-white flex items-center justify-center font-heading font-bold text-sm shrink-0">1</div>
          <h3 class="font-heading font-bold text-gray-800 text-base leading-tight">Asistentes Conversacionales</h3>
        </div>
        <p class="text-gray-500 font-body text-sm leading-relaxed mb-3 flex-1">
          Uso manual de <span class="font-semibold text-gray-700">ChatGPT, Claude o Gemini</span> para hacer preguntas y obtener respuestas. Las respuestas son genéricas porque la IA no tiene contexto sobre ti.
        </p>
        <div class="bg-blue-50 rounded-xl px-3 py-2 text-xs font-body text-isagen-blue font-semibold">
          ChatGPT · Claude · Gemini
        </div>
      </div>

      <!-- Nivel 2: Asistentes Personalizados -->
      <div class="bg-gray-50 rounded-2xl p-5 border-t-4 border-isagen-blue flex flex-col shadow-sm hover:shadow-md transition-shadow duration-200">
        <div class="flex items-center space-x-3 mb-3">
          <div class="w-9 h-9 rounded-full bg-isagen-blue text-white flex items-center justify-center font-heading font-bold text-sm shrink-0">2</div>
          <h3 class="font-heading font-bold text-gray-800 text-base leading-tight">Asistentes Personalizados</h3>
        </div>
        <p class="text-gray-500 font-body text-sm leading-relaxed mb-3 flex-1">
          Creas tus propios asistentes con tu información, contexto y memoria específica. La IA ya te conoce y no repites el contexto en cada sesión.
        </p>
        <div class="bg-blue-50 rounded-xl px-3 py-2 text-xs font-body text-isagen-blue font-semibold">
          GPTs · Projects · Gems
        </div>
      </div>

      <!-- Nivel 3: Herramientas Especializadas -->
      <div class="bg-gray-50 rounded-2xl p-5 border-t-4 border-isagen-light-blue flex flex-col shadow-sm hover:shadow-md transition-shadow duration-200">
        <div class="flex items-center space-x-3 mb-3">
          <div class="w-9 h-9 rounded-full bg-isagen-light-blue text-white flex items-center justify-center font-heading font-bold text-sm shrink-0">3</div>
          <h3 class="font-heading font-bold text-gray-800 text-base leading-tight">Herramientas Especializadas</h3>
        </div>
        <p class="text-gray-500 font-body text-sm leading-relaxed mb-3 flex-1">
          Aplicaciones diseñadas para una sola tarea específica, que la hacen mejor que un chat generalista. Ideal para analizar grandes volúmenes de documentos.
        </p>
        <div class="bg-sky-50 rounded-xl px-3 py-2 text-xs font-body text-isagen-light-blue font-semibold">
          NotebookLM · Perplexity
        </div>
      </div>

    </div>

    <!-- Fila 2: niveles 4 y 5 (más anchos) -->
    <div class="grid grid-cols-2 gap-4 flex-1 min-h-0">

      <!-- Nivel 4: Agentes e IA Agéntica -->
      <div class="bg-gray-50 rounded-2xl p-5 border-t-4 border-isagen-green flex flex-col shadow-sm hover:shadow-md transition-shadow duration-200">
        <div class="flex items-center space-x-3 mb-3">
          <div class="w-9 h-9 rounded-full bg-isagen-green text-white flex items-center justify-center font-heading font-bold text-sm shrink-0">4</div>
          <h3 class="font-heading font-bold text-gray-800 text-base leading-tight">Agentes e IA Agéntica</h3>
        </div>
        <p class="text-gray-500 font-body text-sm leading-relaxed mb-3 flex-1">
          La IA trabaja de forma autónoma en tareas repetitivas o complejas <span class="font-semibold text-gray-700">bajo supervisión humana</span>. Desde automatizaciones simples (clasificar correos, redactar borradores) hasta sistemas multi-agente donde múltiples procesos coordinados comparten datos con <span class="font-semibold text-gray-700">checkpoints humanos</span> estratégicos.
        </p>
        <div class="bg-green-50 rounded-xl px-3 py-2 text-xs font-body text-isagen-green font-semibold">
          n8n · Zapier · Make · CrewAI · AutoGen · LangGraph · <span class="font-bold">Claude Code · OpenCode</span>
        </div>
      </div>

      <!-- Nivel 5: Fine-Tuning de Modelos -->
      <div class="bg-isagen-dark rounded-2xl p-5 border-t-4 border-yellow-400 flex flex-col shadow-md hover:shadow-lg transition-shadow duration-200">
        <div class="flex items-center space-x-3 mb-3">
          <div class="w-9 h-9 rounded-full bg-yellow-400 text-isagen-dark flex items-center justify-center font-heading font-bold text-sm shrink-0">5</div>
          <h3 class="font-heading font-bold text-white text-base leading-tight">Fine-Tuning de Modelos</h3>
        </div>
        <p class="text-gray-300 font-body text-sm leading-relaxed mb-3 flex-1">
          Nivel más avanzado: se adapta o entrena un modelo base con datos propios para un dominio específico. El modelo resultante incorpora el conocimiento, vocabulario y estilo de tu organización, y puede ejecutarse en infraestructura propia.
        </p>
        <div class="bg-yellow-400 bg-opacity-10 rounded-xl px-3 py-2 text-xs font-body text-yellow-300 font-semibold flex items-center space-x-2">
          <span class="text-yellow-400">★</span>
          <span>Hugging Face · LoRA · Ollama · Unsloth</span>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'SlideDominiosIA'
}
</script>
