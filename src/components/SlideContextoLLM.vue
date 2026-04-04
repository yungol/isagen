<template>
  <div class="w-full h-full flex flex-col items-center justify-center p-6 bg-gray-50 overflow-hidden relative">

    <!-- Título -->
    <div class="text-center mb-4 z-10">
      <h1 class="text-3xl md:text-4xl font-heading font-bold text-isagen-dark mb-1">
        ¿Cómo "recuerda" la IA? El <span class="text-isagen-green">Contexto</span>
      </h1>
      <p class="text-base text-gray-500 max-w-2xl mx-auto">
        No hay memoria real. Cada vez que respondes, la IA recibe <strong class="text-isagen-blue">toda la conversación desde cero</strong> y calcula de nuevo.
      </p>
    </div>

    <!-- Área principal -->
    <div class="flex w-full max-w-5xl gap-5 items-stretch flex-grow min-h-0">

      <!-- Panel izquierdo: chat visible -->
      <div class="flex flex-col w-[38%] bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
        <div class="bg-isagen-dark text-white px-4 py-2.5 font-heading font-bold text-sm flex items-center gap-2">
          <svg class="w-4 h-4 text-isagen-green" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-3 3-3-3z"/></svg>
          Lo que <span class="text-isagen-green ml-1">tú ves</span>
        </div>
        <div class="flex flex-col gap-2 p-3 overflow-y-auto flex-grow">
          <div
            v-for="(msg, i) in visibleMessages"
            :key="i"
            :class="['flex gap-2 items-end', msg.role === 'user' ? 'justify-end' : 'justify-start', 'animate-fadeIn']"
          >
            <div v-if="msg.role === 'ai'" class="w-7 h-7 rounded-full bg-isagen-green flex items-center justify-center flex-shrink-0 mb-0.5">
              <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
            </div>
            <div :class="['rounded-2xl px-3 py-2 text-sm max-w-[80%] shadow-sm leading-snug', msg.role === 'user' ? 'bg-isagen-blue text-white rounded-br-sm' : 'bg-gray-100 text-gray-800 rounded-bl-sm border border-gray-200']">
              {{ msg.text }}
            </div>
            <div v-if="msg.role === 'user'" class="w-7 h-7 rounded-full bg-isagen-blue flex items-center justify-center flex-shrink-0 mb-0.5">
              <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/></svg>
            </div>
          </div>
          <!-- Typing dots -->
          <div v-if="phase === 'sending'" class="flex gap-2 items-end justify-start animate-fadeIn">
            <div class="w-7 h-7 rounded-full bg-isagen-green flex items-center justify-center flex-shrink-0">
              <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
            </div>
            <div class="bg-gray-100 rounded-2xl rounded-bl-sm px-4 py-3 border border-gray-200 flex gap-1 items-center">
              <span class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay:0ms"></span>
              <span class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay:150ms"></span>
              <span class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay:300ms"></span>
            </div>
          </div>
          <!-- Placeholder vacío -->
          <div v-if="visibleMessages.length === 0 && phase === 'idle'" class="flex items-center justify-center h-full text-gray-300 text-sm text-center">
            <div>
              <svg class="w-10 h-10 mx-auto mb-2 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
              Pulsa el botón para<br/>iniciar la conversación
            </div>
          </div>
        </div>
        <!-- Botones -->
        <div class="p-3 border-t border-gray-100 flex gap-2">
          <button
            @click="sendNext"
            :disabled="currentStep >= conversation.length || phase !== 'idle'"
            class="flex-1 py-2 bg-isagen-blue text-white text-xs font-bold rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:bg-isagen-light-blue transition-colors"
          >
            {{ currentStep === 0 ? 'Iniciar conversación' : currentStep >= conversation.length ? 'Conversación completa' : 'Enviar siguiente mensaje' }}
          </button>
          <button @click="reset" class="px-3 py-2 bg-gray-100 text-gray-600 text-xs font-bold rounded-lg hover:bg-gray-200 transition-colors">
            Reset
          </button>
        </div>
      </div>

      <!-- Flecha central -->
      <div class="flex flex-col items-center justify-center gap-1 flex-shrink-0 self-center">
        <div class="text-xs text-gray-400 font-mono text-center mb-1">se envía</div>
        <svg class="w-8 h-8 text-isagen-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 5l7 7-7 7M5 5l7 7-7 7"/>
        </svg>
      </div>

      <!-- Panel derecho: payload real -->
      <div class="flex flex-col flex-1 bg-gray-900 rounded-2xl shadow-md overflow-hidden border border-gray-700">
        <div class="bg-gray-800 text-gray-200 px-4 py-2.5 font-mono text-xs flex items-center gap-2 border-b border-gray-700">
          <span class="w-3 h-3 rounded-full bg-red-500 inline-block"></span>
          <span class="w-3 h-3 rounded-full bg-yellow-400 inline-block"></span>
          <span class="w-3 h-3 rounded-full bg-green-400 inline-block"></span>
          <span class="ml-2 text-gray-400">Lo que la IA <span class="text-yellow-300 font-bold">realmente recibe</span></span>
        </div>

        <div class="flex-grow overflow-y-auto p-4 font-mono text-xs leading-relaxed">

          <!-- Estado inicial vacío -->
          <div v-if="phase === 'idle' && currentStep === 0" class="text-gray-600 flex items-center justify-center h-full text-center">
            <div>
              <div class="text-2xl mb-2">_</div>
              <div>esperando primer mensaje...</div>
            </div>
          </div>

          <!-- Bloque de mensajes acumulados -->
          <div v-if="phase !== 'idle' || currentStep > 0">

            <!-- Línea de apertura -->
            <div class="text-gray-500 mb-2">mensajes enviados a la IA:</div>
            <div class="text-gray-500 mb-1">[</div>

            <!-- Mensajes del contexto -->
            <div
              v-for="(msg, idx) in contextToShow"
              :key="idx"
              :class="['ml-3 mb-2 animate-fadeIn', msg.isNew ? 'text-yellow-300' : 'text-gray-400']"
            >
              <span class="text-gray-600">{</span>
              <br/>
              <span class="ml-3">
                <span :class="msg.role === 'user' ? 'text-blue-400' : 'text-green-400'">
                  {{ msg.role === 'user' ? 'tú' : ' ia' }}
                </span>
                <span class="text-gray-500">: </span>
                <span :class="msg.isNew ? 'text-yellow-300' : 'text-gray-300'">"{{ msg.text }}"</span>
                <span v-if="msg.isNew" class="ml-2 text-yellow-400 text-xs font-bold">← NUEVO</span>
              </span>
              <br/>
              <span class="text-gray-600">}</span><span v-if="idx < contextToShow.length - 1" class="text-gray-600">,</span>
            </div>

            <!-- Cierre del array -->
            <div v-if="contextToShow.length > 0" class="text-gray-500 mb-3">]</div>

            <!-- Separador + estado calculando -->
            <div v-if="phase === 'calculating' || phase === 'sending'" class="mt-2 border-t border-gray-700 pt-3">
              <div class="flex items-center gap-2 text-yellow-400">
                <svg class="w-3.5 h-3.5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
                <span class="animate-pulse">calculando respuesta...</span>
              </div>
            </div>

            <!-- Resultado -->
            <div v-if="phase === 'done' && lastAiResponse" class="mt-2 border-t border-gray-700 pt-3 animate-fadeIn">
              <div class="text-gray-500 mb-1">respuesta generada:</div>
              <div class="text-green-300">"{{ lastAiResponse }}"</div>
              <!-- Resumen visual del turno -->
              <div class="mt-3 pt-2 border-t border-gray-800 text-gray-600 text-xs">
                <span class="text-gray-500">total mensajes procesados: </span>
                <span class="text-white font-bold">{{ contextToShow.length }}</span>
                <span class="text-gray-600 ml-2">
                  ({{ contextToShow.filter(m => !m.isNew).length > 0 ? contextToShow.filter(m => !m.isNew).length + ' anteriores + ' : '' }}1 nuevo)
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>

    <!-- Leyenda inferior -->
    <div class="mt-3 flex flex-wrap gap-3 justify-center items-center text-xs text-gray-500 z-10">
      <div class="flex items-center gap-1.5">
        <span class="w-2.5 h-2.5 rounded-sm bg-gray-400 inline-block"></span>
        Mensajes del historial (re-enviados)
      </div>
      <div class="flex items-center gap-1.5">
        <span class="w-2.5 h-2.5 rounded-sm bg-yellow-300 inline-block"></span>
        Mensaje nuevo del turno actual
      </div>
      <div class="flex items-center gap-1.5 bg-amber-50 border border-amber-200 rounded-full px-3 py-1 text-amber-700">
        <svg class="w-3.5 h-3.5 text-amber-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/></svg>
        Cada turno es un cálculo completamente nuevo — la IA no recuerda nada por sí sola
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'SlideContextoLLM',
  data() {
    return {
      currentStep: 0,
      phase: 'idle', // idle | sending | calculating | done
      visibleMessages: [],
      contextToShow: [],
      lastAiResponse: '',
      conversation: [
        {
          userMsg: { role: 'user', text: '¿Cuál es la capital de Francia?' },
          aiMsg:  { role: 'ai',   text: 'La capital de Francia es París.' }
        },
        {
          userMsg: { role: 'user', text: '¿Y cuántos habitantes tiene?' },
          aiMsg:  { role: 'ai',   text: 'París tiene unos 2.1 millones de habitantes.' }
        },
        {
          userMsg: { role: 'user', text: '¿Es más grande que Madrid?' },
          aiMsg:  { role: 'ai',   text: 'Sí, la región de París supera a Madrid en población.' }
        }
      ]
    };
  },
  methods: {
    sendNext() {
      if (this.currentStep >= this.conversation.length || this.phase !== 'idle') return;

      const turn = this.conversation[this.currentStep];

      // 1. Mostrar mensaje del usuario en el chat
      this.visibleMessages.push(turn.userMsg);

      // 2. Construir el contexto completo que se envía (todos los anteriores + el nuevo)
      const fullContext = this.buildContext(this.currentStep);
      this.contextToShow = fullContext;
      this.lastAiResponse = '';

      // 3. Fase: enviando (muestra el payload inmediatamente + typing en el chat)
      this.phase = 'sending';

      // 4. Después de un momento, pasar a "calculando"
      setTimeout(() => {
        this.phase = 'calculating';
      }, 800);

      // 5. Mostrar respuesta
      setTimeout(() => {
        this.phase = 'done';
        this.lastAiResponse = turn.aiMsg.text;
        this.visibleMessages.push(turn.aiMsg);
        this.currentStep++;
      }, 2200);

      // 6. Volver a idle
      setTimeout(() => {
        if (this.currentStep < this.conversation.length) {
          this.phase = 'idle';
        }
      }, 2400);
    },

    buildContext(turnIndex) {
      // Construye el array de mensajes para ese turno:
      // todos los pares anteriores completos + el mensaje usuario nuevo
      const result = [];
      for (let i = 0; i < turnIndex; i++) {
        result.push({ ...this.conversation[i].userMsg, isNew: false });
        result.push({ ...this.conversation[i].aiMsg,  isNew: false });
      }
      // El mensaje nuevo del turno actual
      result.push({ ...this.conversation[turnIndex].userMsg, isNew: true });
      return result;
    },

    reset() {
      this.currentStep = 0;
      this.phase = 'idle';
      this.visibleMessages = [];
      this.contextToShow = [];
      this.lastAiResponse = '';
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
  animation: fadeIn 0.35s ease-out forwards;
}
</style>
