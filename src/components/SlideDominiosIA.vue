<template>
  <div class="w-full h-full flex flex-col justify-center px-10 md:px-16 py-8 bg-white">
    <!-- Header -->
    <div class="mb-5 border-l-8 border-isagen-green pl-6 shrink-0">
      <h2 class="text-3xl md:text-4xl font-heading font-extrabold text-isagen-dark tracking-tight">
        Niveles de Dominio de la IA
      </h2>
      <p class="text-lg font-body text-gray-500 mt-1">
        Del uso básico a la creación de modelos propios — un camino de madurez progresiva
      </p>
    </div>

    <!-- Pirámide -->
    <div class="flex flex-col items-center gap-1.5 flex-1 justify-center">

      <!-- Nivel 5 (cima) -->
      <div class="w-[28%] bg-isagen-dark rounded-xl px-4 py-2.5 border-b-4 border-yellow-400 shadow-md flex flex-col items-center text-center">
        <div class="flex items-center gap-2 mb-0.5">
          <div class="w-6 h-6 rounded-full bg-yellow-400 text-isagen-dark flex items-center justify-center font-heading font-bold text-xs shrink-0">5</div>
          <span class="font-heading font-bold text-white text-sm leading-tight">Fine-Tuning de Modelos</span>
        </div>
        <p class="text-gray-400 font-body text-xs leading-snug mb-1.5">
          Adapta o entrena un modelo base con datos propios. El modelo incorpora el conocimiento y vocabulario de tu organización.
        </p>
        <div class="bg-yellow-400 rounded-lg px-2 py-1 text-xs font-body text-isagen-dark font-semibold">
          Hugging Face · LoRA · Ollama · Unsloth
        </div>
      </div>

      <!-- Nivel 4 -->
      <div class="w-[46%] bg-gray-50 rounded-xl px-5 py-2.5 border-b-4 border-isagen-green shadow-sm flex flex-col items-center text-center">
        <div class="flex items-center gap-2 mb-0.5">
          <div class="w-6 h-6 rounded-full bg-isagen-green text-white flex items-center justify-center font-heading font-bold text-xs shrink-0">4</div>
          <span class="font-heading font-bold text-gray-800 text-sm leading-tight">Agentes e IA Agéntica</span>
        </div>
        <p class="text-gray-500 font-body text-xs leading-snug mb-1.5">
          La IA trabaja de forma autónoma en tareas repetitivas o complejas bajo <span class="font-semibold text-gray-700">supervisión humana</span>. Automatizaciones simples o sistemas multi-agente con checkpoints estratégicos.
        </p>
        <div class="bg-green-50 rounded-lg px-2 py-1 text-xs font-body text-isagen-green font-semibold">
          n8n · Zapier · Make · LangGraph · Claude Code
        </div>
      </div>

      <!-- Nivel 3 -->
      <div class="w-[62%] bg-gray-50 rounded-xl px-5 py-2.5 border-b-4 border-isagen-light-blue shadow-sm flex flex-col items-center text-center">
        <div class="flex items-center gap-2 mb-0.5">
          <div class="w-6 h-6 rounded-full bg-isagen-light-blue text-white flex items-center justify-center font-heading font-bold text-xs shrink-0">3</div>
          <span class="font-heading font-bold text-gray-800 text-sm leading-tight">Herramientas Especializadas</span>
        </div>
        <p class="text-gray-500 font-body text-xs leading-snug mb-1.5">
          Aplicaciones diseñadas para una sola tarea específica, que la hacen mejor que un chat generalista. Ideal para analizar grandes volúmenes de documentos.
        </p>
        <div class="bg-sky-50 rounded-lg px-2 py-1 text-xs font-body text-isagen-light-blue font-semibold">
          NotebookLM · Perplexity
        </div>
      </div>

      <!-- Nivel 2 -->
      <div class="w-[78%] bg-gray-50 rounded-xl px-5 py-2.5 border-b-4 border-isagen-blue shadow-sm flex flex-col items-center text-center">
        <div class="flex items-center gap-2 mb-0.5">
          <div class="w-6 h-6 rounded-full bg-isagen-blue text-white flex items-center justify-center font-heading font-bold text-xs shrink-0">2</div>
          <span class="font-heading font-bold text-gray-800 text-sm leading-tight">Asistentes Personalizados</span>
        </div>
        <p class="text-gray-500 font-body text-xs leading-snug mb-1.5">
          Creas tus propios asistentes con tu información, contexto y memoria específica. La IA ya te conoce y no repites el contexto en cada sesión.
        </p>
        <div class="bg-blue-50 rounded-lg px-2 py-1 text-xs font-body text-isagen-blue font-semibold">
          GPTs · Projects · Gems
        </div>
      </div>

      <!-- Nivel 1 (base) -->
      <div class="w-[94%] bg-gray-50 rounded-xl px-5 py-2.5 border-b-4 border-isagen-blue shadow-sm flex flex-col items-center text-center">
        <div class="flex items-center gap-2 mb-0.5">
          <div class="w-6 h-6 rounded-full bg-isagen-blue text-white flex items-center justify-center font-heading font-bold text-xs shrink-0">1</div>
          <span class="font-heading font-bold text-gray-800 text-sm leading-tight">Asistentes Conversacionales</span>
        </div>
        <p class="text-gray-500 font-body text-xs leading-snug mb-1.5">
          Uso manual de <span class="font-semibold text-gray-700">ChatGPT, Claude o Gemini</span> para hacer preguntas y obtener respuestas. Las respuestas son genéricas porque la IA no tiene contexto sobre ti.
        </p>
        <div class="bg-blue-50 rounded-lg px-2 py-1 text-xs font-body text-isagen-blue font-semibold">
          ChatGPT · Claude · Gemini
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
