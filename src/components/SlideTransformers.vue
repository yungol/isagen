<template>
  <div class="slide-transformers w-full h-full flex flex-col items-center justify-center p-4 overflow-hidden">
    <!-- Header -->
    <div class="w-full max-w-4xl mb-3 text-center">
      <h2 class="text-2xl font-heading font-bold text-green-400 tracking-widest uppercase">
        2017: El Cambio que lo Transformó Todo
      </h2>
      <p class="text-sm font-mono text-gray-400 mt-1">
        "Attention Is All You Need" — El paper que revolucionó la IA
      </p>
      <div class="h-px w-32 bg-green-400 mx-auto mt-2 opacity-60"></div>
    </div>

    <!-- Main container -->
    <div class="tr-container w-full max-w-4xl flex flex-col gap-3">
      <!-- Controls row -->
      <div class="flex items-center gap-3 flex-wrap">
        <div class="flex flex-col gap-1">
          <div class="flex gap-2">
            <button
              class="tr-tab"
              :class="{ active: mode === 'rnn' }"
              @click="setMode('rnn')"
              :disabled="isTraining"
            >PRE-TRANSFORMER (RNN)</button>
            <button
              class="tr-tab"
              :class="{ active: mode === 'transformer' }"
              @click="setMode('transformer')"
              :disabled="isTraining"
            >TRANSFORMER</button>
          </div>
          <p v-if="mode === 'rnn'" class="text-xs font-mono text-gray-500 leading-tight">
            RNN = <span class="text-gray-400">Recurrent Neural Network</span> — red neuronal recurrente que procesa el texto palabra por palabra, en secuencia.
          </p>
          <p v-else class="text-xs font-mono text-gray-500 leading-tight">
            Transformer — procesa todas las palabras <span class="text-gray-400">en paralelo</span> y cada una "atiende" al contexto completo simultáneamente.
          </p>
        </div>
        <button
          class="tr-btn-primary"
          @click="startTraining"
          :disabled="isTraining"
        >▶ INICIAR</button>
      </div>

      <!-- Status log -->
      <div class="tr-log">{{ statusLog }}</div>

      <!-- Link sutil al tokenizer -->
      <div class="text-right">
        <a
          href="https://platform.openai.com/tokenizer"
          target="_blank"
          rel="noopener noreferrer"
          class="text-xs font-mono text-gray-600 hover:text-green-400 transition-colors duration-200 underline underline-offset-2"
        >platform.openai.com/tokenizer ↗</a>
      </div>

      <!-- Visualization -->
      <div class="tr-vis" ref="visArea">
        <span class="tr-stage-title">{{ stageTitle }}</span>

        <!-- SVG Lines -->
        <svg ref="svgLines" class="tr-svg"></svg>

        <!-- Tokens -->
        <div class="tr-row" ref="tokensRow">
          <div
            v-for="(token, i) in visTokens"
            :key="'t-' + i"
            class="tr-token"
            :class="{ visible: token.visible }"
          >{{ token.text }}</div>
        </div>

        <!-- Vectors -->
        <div class="tr-row" ref="vectorsRow">
          <div
            v-for="(vec, i) in visVectors"
            :key="'v-' + i"
            class="tr-vector"
            :class="{ visible: vec.visible }"
          >
            <div
              v-for="(px, j) in vec.pixels"
              :key="j"
              class="tr-pixel"
              :style="{ backgroundColor: px }"
            ></div>
          </div>
        </div>

        <!-- Network nodes -->
        <div class="tr-row" ref="networkRow">
          <div
            v-for="(node, i) in visNodes"
            :key="'n-' + i"
            class="tr-node"
            :class="{ visible: node.visible, active: node.active }"
            :ref="'node-' + i"
          >{{ node.label }}</div>
        </div>

        <!-- Weights matrix -->
        <div class="text-center text-xs font-mono text-gray-500 tracking-widest uppercase">
          Matriz de Pesos (Conocimiento)
        </div>
        <div class="tr-weights-matrix" ref="weightsMatrix">
          <div
            v-for="(wp, i) in weightPixels"
            :key="i"
            class="tr-weight-pixel"
            :style="{ backgroundColor: wp }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SlideTransformers',
  data() {
    return {
      mode: 'rnn',
      isTraining: false,
      inputText: 'La IA aprende patrones',      statusLog: 'Selecciona un modo y pulsa ▶ INICIAR para simular el entrenamiento.',
      stageTitle: 'Arquitectura: RNN (Secuencial)',
      visTokens: [],
      visVectors: [],
      visNodes: [],
      weightPixels: Array(72).fill('#333'),
      svgPaths: [],
    };
  },
  methods: {
    sleep(ms) {
      return new Promise(r => setTimeout(r, ms));
    },
    randomColor() {
      const r = Math.floor(Math.random() * 200 + 55);
      const g = Math.floor(Math.random() * 200 + 55);
      const b = Math.floor(Math.random() * 200 + 55);
      return `rgb(${r},${g},${b})`;
    },
    createVectorPixels() {
      return Array.from({ length: 16 }, () => this.randomColor());
    },
    resetVis() {
      this.visTokens = [];
      this.visVectors = [];
      this.visNodes = [];
      this.weightPixels = Array(72).fill('#333');
      this.svgPaths = [];
      this.statusLog = 'Selecciona un modo y pulsa ▶ INICIAR para simular el entrenamiento.';
      if (this.$refs.svgLines) {
        this.$refs.svgLines.innerHTML = '';
      }
    },
    setMode(newMode) {
      if (this.isTraining) return;
      this.mode = newMode;
      this.stageTitle = newMode === 'rnn'
        ? 'Arquitectura: RNN (Secuencial)'
        : 'Arquitectura: Transformer (Paralelo + Atención)';
      this.resetVis();
    },
    updateWeightsRandomly(count) {
      const pixels = [...this.weightPixels];
      for (let i = 0; i < count; i++) {
        const idx = Math.floor(Math.random() * pixels.length);
        const alpha = Math.random();
        pixels[idx] = `rgba(74, 222, 128, ${alpha.toFixed(2)})`;
      }
      this.weightPixels = pixels;
    },
    drawLineBetween(el1, el2, curved = false) {
      const svg = this.$refs.svgLines;
      if (!svg || !el1 || !el2) return null;
      const svgRect = svg.getBoundingClientRect();
      const r1 = el1.getBoundingClientRect();
      const r2 = el2.getBoundingClientRect();
      const x1 = r1.left + r1.width / 2 - svgRect.left;
      const y1 = r1.top + r1.height / 2 - svgRect.top;
      const x2 = r2.left + r2.width / 2 - svgRect.left;
      const y2 = r2.top + r2.height / 2 - svgRect.top;
      let d = curved
        ? `M ${x1} ${y1} Q ${(x1 + x2) / 2} ${y1 - 40}, ${x2} ${y2}`
        : `M ${x1} ${y1} L ${x2} ${y2}`;
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', d);
      path.classList.add('tr-path');
      svg.appendChild(path);
      // Trigger active
      requestAnimationFrame(() => path.classList.add('active'));
      return path;
    },
    getTokenEl(i) {
      const row = this.$refs.tokensRow;
      return row ? row.children[i] : null;
    },
    getVectorEl(i) {
      const row = this.$refs.vectorsRow;
      return row ? row.children[i] : null;
    },
    getNodeEl(i) {
      const row = this.$refs.networkRow;
      return row ? row.children[i] : null;
    },
    async startTraining() {
      if (this.isTraining) return;
      this.isTraining = true;
      this.resetVis();
      await this.$nextTick();

      const words = this.inputText.trim().split(/\s+/).filter(w => w.length > 0);
      if (words.length === 0) {
        this.isTraining = false;
        return;
      }

      // Step 1: Tokenize
      this.statusLog = 'Paso 1: Tokenizando el texto...';
      for (let i = 0; i < words.length; i++) {
        this.visTokens.push({ text: words[i], visible: false });
        await this.sleep(150);
        await this.$nextTick();
        this.visTokens[i].visible = true;
        this.visTokens = [...this.visTokens];
      }
      await this.sleep(600);

      // Step 2: Embeddings
      this.statusLog = 'Paso 2: Convirtiendo tokens a vectores (Embeddings)...';
      for (let i = 0; i < words.length; i++) {
        this.visVectors.push({ pixels: this.createVectorPixels(), visible: false });
        await this.sleep(100);
        await this.$nextTick();
        this.visVectors[i].visible = true;
        this.visVectors = [...this.visVectors];
      }
      await this.sleep(600);

      // Step 3: Architecture
      if (this.mode === 'rnn') {
        await this.runRNN(words.length);
      } else {
        await this.runTransformer(words.length);
      }

      this.statusLog = '¡Completado! Los pesos del modelo han sido actualizados.';
      this.isTraining = false;
    },

    async runRNN(count) {
      // Single RNN node
      this.visNodes = [{ label: 'RNN', visible: false, active: false }];
      await this.sleep(300);
      await this.$nextTick();
      this.visNodes[0].visible = true;
      this.visNodes = [...this.visNodes];

      this.statusLog = 'Paso 3: Procesamiento Secuencial. El contexto es un cuello de botella.';
      await this.sleep(400);

      for (let i = 0; i < count; i++) {
        // Clear previous SVG lines
        if (this.$refs.svgLines) this.$refs.svgLines.innerHTML = '';

        await this.$nextTick();
        const vecEl = this.getVectorEl(i);
        const nodeEl = this.getNodeEl(0);
        if (vecEl && nodeEl) this.drawLineBetween(vecEl, nodeEl);

        // Activate node
        this.visNodes[0].active = true;
        this.visNodes = [...this.visNodes];
        this.statusLog = `Procesando token ${i + 1}/${count}... (Estado Oculto actualizado)`;

        await this.sleep(500);
        this.updateWeightsRandomly(5);

        this.visNodes[0].active = false;
        this.visNodes = [...this.visNodes];
        await this.sleep(400);
      }
    },

    async runTransformer(count) {      // One ATTN node per token
      this.visNodes = Array.from({ length: count }, () => ({ label: 'ATTN', visible: false, active: false }));
      await this.$nextTick();

      for (let i = 0; i < count; i++) {
        await this.sleep(80);
        this.visNodes[i].visible = true;
        this.visNodes = [...this.visNodes];
      }

      await this.sleep(500);
      this.statusLog = 'Paso 3: Auto-Atención. Todas las palabras se "miran" al mismo tiempo.';
      await this.$nextTick();

      // Lines from vectors to attn blocks
      for (let i = 0; i < count; i++) {
        const vecEl = this.getVectorEl(i);
        const nodeEl = this.getNodeEl(i);
        if (vecEl && nodeEl) this.drawLineBetween(vecEl, nodeEl);
      }
      await this.sleep(700);

      // Cross-attention lines
      for (let i = 0; i < count; i++) {
        for (let j = 0; j < count; j++) {
          if (i !== j) {
            const n1 = this.getNodeEl(i);
            const n2 = this.getNodeEl(j);
            if (n1 && n2) this.drawLineBetween(n1, n2, true);
          }
        }
      }

      // Activate all nodes simultaneously
      this.visNodes = this.visNodes.map(n => ({ ...n, active: true }));
      await this.sleep(1000);

      // Massive parallel weight update
      this.statusLog = 'Actualización masiva y paralela de pesos...';
      this.updateWeightsRandomly(count * 10);

      await this.sleep(600);
      this.visNodes = this.visNodes.map(n => ({ ...n, active: false }));
    },
  },
  mounted() {
    // Sin auto-run: el usuario elige el modo y pulsa INICIAR
  },
};
</script>

<style scoped>
.slide-transformers {
  background-color: #121212;
  color: #e0e0e0;
}

.tr-container {
  background-color: #1e1e1e;
  border: 3px solid #333;
  padding: 14px;
}

.tr-tab {
  font-family: ui-monospace, monospace;
  background-color: #1e1e1e;
  color: #e0e0e0;
  border: 2px solid #444;
  padding: 6px 12px;
  font-size: 0.75rem;
  cursor: pointer;
  opacity: 0.5;
  text-transform: uppercase;
  transition: all 0.2s;
}
.tr-tab.active {
  opacity: 1;
  border-color: #4ade80;
}
.tr-tab:disabled {
  cursor: not-allowed;
}

.tr-btn-primary {
  font-family: ui-monospace, monospace;
  background-color: #4ade80;
  color: #111;
  border: 2px solid #111;
  padding: 6px 14px;
  font-size: 0.85rem;
  cursor: pointer;
  font-weight: bold;
  text-transform: uppercase;
  box-shadow: 3px 3px 0 #111;
  transition: all 0.15s;
  white-space: nowrap;
}
.tr-btn-primary:hover {
  transform: translate(1px, 1px);
  box-shadow: 1px 1px 0 #111;
}
.tr-btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

.tr-log {
  font-family: ui-monospace, monospace;
  font-size: 0.8rem;
  color: #4ade80;
  min-height: 1.2em;
  text-align: center;
}

.tr-vis {
  border: 2px dashed #333;
  position: relative;
  padding: 24px 16px 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-height: 220px;
  overflow: hidden;
}

.tr-stage-title {
  position: absolute;
  top: 6px;
  left: 10px;
  color: #555;
  font-family: ui-monospace, monospace;
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.tr-svg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

/* SVG paths injected via JS */
:deep(.tr-path) {
  fill: none;
  stroke: #4ade80;
  stroke-width: 1.5;
  stroke-dasharray: 5;
  animation: dash 1s linear infinite;
  opacity: 0;
  transition: opacity 0.3s;
}
:deep(.tr-path.active) {
  opacity: 1;
}

@keyframes dash {
  to { stroke-dashoffset: -10; }
}

.tr-row {
  display: flex;
  justify-content: center;
  gap: 10px;
  min-height: 30px;
  position: relative;
  z-index: 2;
  flex-wrap: wrap;
}

.tr-token {
  background-color: #2d2d2d;
  border: 2px solid #444;
  padding: 4px 8px;
  font-family: ui-monospace, monospace;
  font-size: 0.8rem;
  opacity: 0;
  transform: translateY(-12px);
  transition: all 0.3s;
}
.tr-token.visible {
  opacity: 1;
  transform: translateY(0);
}

.tr-vector {
  display: grid;
  grid-template-columns: repeat(4, 8px);
  grid-template-rows: repeat(4, 8px);
  gap: 1px;
  opacity: 0;
  transition: opacity 0.4s;
}
.tr-vector.visible {
  opacity: 1;
}

.tr-pixel {
  transition: background-color 0.5s;
}

.tr-node {
  width: 48px;
  height: 48px;
  border: 3px solid #a855f7;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #121212;
  font-family: ui-monospace, monospace;
  font-size: 0.7rem;
  color: #e0e0e0;
  opacity: 0;
  transition: all 0.3s;
  position: relative;
  z-index: 3;
}
.tr-node.visible {
  opacity: 1;
}
.tr-node.active {
  border-color: #4ade80;
  background-color: rgba(74, 222, 128, 0.15);
  transform: scale(1.15);
}

.tr-weights-matrix {
  display: grid;
  grid-template-columns: repeat(12, 13px);
  grid-template-rows: repeat(6, 13px);
  gap: 2px;
  margin: 0 auto;
  padding: 8px;
  border: 2px solid #333;
  background-color: #000;
}

.tr-weight-pixel {
  transition: background-color 0.25s;
}
</style>
