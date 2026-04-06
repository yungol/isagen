<template>
  <div class="w-full h-full flex flex-col justify-center px-10 md:px-16 py-8 bg-white">

    <!-- Header -->
    <div class="mb-6 border-l-8 border-isagen-green pl-6 shrink-0">
      <h2 class="text-3xl md:text-4xl font-heading font-extrabold text-isagen-dark tracking-tight">
        El Ecosistema de Herramientas Hoy
      </h2>
      <p class="text-lg font-body text-gray-500 mt-1">
        Abril 2026 — el momento de empezar es ahora
      </p>
    </div>

    <!-- Grid de herramientas: 3 categorías -->
    <div class="grid grid-cols-3 gap-4 mb-5">

      <!-- Categoría 1: Asistentes de Chat -->
      <div class="bg-gray-50 rounded-2xl p-5 border-t-4 border-isagen-blue flex flex-col shadow-sm">
        <div class="flex items-center space-x-2 mb-3">
          <div class="w-8 h-8 bg-isagen-blue rounded-lg flex items-center justify-center shrink-0">
            <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
            </svg>
          </div>
          <h3 class="font-heading font-bold text-gray-800 text-sm uppercase tracking-wide">Asistentes IA</h3>
        </div>
        <div class="space-y-2 flex-1">
          <div class="flex items-center space-x-2 bg-white rounded-xl px-3 py-2 shadow-sm border border-gray-100">
            <span class="text-lg">🤖</span>
            <div>
              <p class="font-heading font-bold text-gray-800 text-sm leading-none">ChatGPT</p>
              <p class="text-gray-400 font-body text-xs">OpenAI · GPT-4o</p>
            </div>
          </div>
          <div class="flex items-center space-x-2 bg-white rounded-xl px-3 py-2 shadow-sm border border-gray-100">
            <span class="text-lg">🟠</span>
            <div>
              <p class="font-heading font-bold text-gray-800 text-sm leading-none">Claude</p>
              <p class="text-gray-400 font-body text-xs">Anthropic · Claude 3.7</p>
            </div>
          </div>
          <div class="flex items-center space-x-2 bg-white rounded-xl px-3 py-2 shadow-sm border border-gray-100">
            <span class="text-lg">🔷</span>
            <div>
              <p class="font-heading font-bold text-gray-800 text-sm leading-none">Copilot</p>
              <p class="text-gray-400 font-body text-xs">Microsoft · integrado en M365</p>
            </div>
          </div>
          <div class="flex items-center space-x-2 bg-white rounded-xl px-3 py-2 shadow-sm border border-gray-100">
            <span class="text-lg">💎</span>
            <div>
              <p class="font-heading font-bold text-gray-800 text-sm leading-none">Gemini</p>
              <p class="text-gray-400 font-body text-xs">Google · integrado en Workspace</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Categoría 2: Investigación y Conocimiento -->
      <div class="bg-gray-50 rounded-2xl p-5 border-t-4 border-isagen-light-blue flex flex-col shadow-sm">
        <div class="flex items-center space-x-2 mb-3">
          <div class="w-8 h-8 bg-isagen-light-blue rounded-lg flex items-center justify-center shrink-0">
            <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
            </svg>
          </div>
          <h3 class="font-heading font-bold text-gray-800 text-sm uppercase tracking-wide">Investigación</h3>
        </div>
        <div class="space-y-2 flex-1">
          <div class="flex items-center space-x-2 bg-white rounded-xl px-3 py-2 shadow-sm border border-gray-100">
            <span class="text-lg">📓</span>
            <div>
              <p class="font-heading font-bold text-gray-800 text-sm leading-none">NotebookLM</p>
              <p class="text-gray-400 font-body text-xs">Google · análisis de documentos</p>
            </div>
          </div>
          <div class="flex items-center space-x-2 bg-white rounded-xl px-3 py-2 shadow-sm border border-gray-100">
            <span class="text-lg">🔍</span>
            <div>
              <p class="font-heading font-bold text-gray-800 text-sm leading-none">Perplexity</p>
              <p class="text-gray-400 font-body text-xs">Búsqueda aumentada con IA</p>
            </div>
          </div>
          <div class="flex items-center space-x-2 bg-white rounded-xl px-3 py-2 shadow-sm border border-gray-100">
            <span class="text-lg">🌐</span>
            <div>
              <p class="font-heading font-bold text-gray-800 text-sm leading-none">Grok</p>
              <p class="text-gray-400 font-body text-xs">xAI · datos en tiempo real</p>
            </div>
          </div>
          <div class="flex items-center space-x-2 bg-white rounded-xl px-3 py-2 shadow-sm border border-gray-100">
            <span class="text-lg">📊</span>
            <div>
              <p class="font-heading font-bold text-gray-800 text-sm leading-none">Deep Research</p>
              <p class="text-gray-400 font-body text-xs">OpenAI / Gemini · reportes autónomos</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Categoría 3: Desarrollo y Código -->
      <div class="bg-gray-50 rounded-2xl p-5 border-t-4 border-isagen-green flex flex-col shadow-sm">
        <div class="flex items-center space-x-2 mb-3">
          <div class="w-8 h-8 bg-isagen-green rounded-lg flex items-center justify-center shrink-0">
            <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
            </svg>
          </div>
          <h3 class="font-heading font-bold text-gray-800 text-sm uppercase tracking-wide">Desarrollo</h3>
        </div>
        <div class="space-y-2 flex-1">
          <div class="flex items-center space-x-2 bg-white rounded-xl px-3 py-2 shadow-sm border border-gray-100">
            <span class="text-lg">🖥️</span>
            <div>
              <p class="font-heading font-bold text-gray-800 text-sm leading-none">VS Code + Copilot</p>
              <p class="text-gray-400 font-body text-xs">Microsoft · autocompletado IA</p>
            </div>
          </div>
          <div class="flex items-center space-x-2 bg-white rounded-xl px-3 py-2 shadow-sm border border-gray-100">
            <span class="text-lg">🖱️</span>
            <div>
              <p class="font-heading font-bold text-gray-800 text-sm leading-none">Cursor</p>
              <p class="text-gray-400 font-body text-xs">Editor IA-first, fork de VS Code</p>
            </div>
          </div>
          <div class="flex items-center space-x-2 bg-white rounded-xl px-3 py-2 shadow-sm border border-gray-100">
            <span class="text-lg">🦾</span>
            <div>
              <p class="font-heading font-bold text-gray-800 text-sm leading-none">Claude Code</p>
              <p class="text-gray-400 font-body text-xs">Anthropic · agente en terminal</p>
            </div>
          </div>
          <div class="flex items-center space-x-2 bg-white rounded-xl px-3 py-2 shadow-sm border border-gray-100">
            <span class="text-lg">⚡</span>
            <div>
              <p class="font-heading font-bold text-gray-800 text-sm leading-none">OpenCode</p>
              <p class="text-gray-400 font-body text-xs">Open source · esta presentación</p>
            </div>
          </div>
        </div>
      </div>

    </div>

    <!-- Mensaje de cierre -->
    <div class="bg-isagen-dark rounded-2xl px-8 py-4 flex items-center justify-between shrink-0">
      <div class="flex items-center space-x-4">
        <div class="w-10 h-10 bg-isagen-green rounded-full flex items-center justify-center shrink-0">
          <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
          </svg>
        </div>
        <p class="text-white font-body text-base leading-snug">
          Las herramientas ya existen y son accesibles hoy. La ventaja competitiva no es <em>qué</em> herramienta usas,<br/>
          sino <strong class="text-isagen-green">con qué profundidad la integras</strong> en los procesos reales de tu organización.
        </p>
      </div>
      <div class="text-right ml-8 shrink-0">
        <p class="font-heading font-extrabold text-isagen-green text-xl tracking-tight">ISAGEN<span class="text-white">.</span></p>
        <p class="text-gray-400 font-body text-xs">El futuro es ahora</p>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'SlideCierre'
}
</script>
