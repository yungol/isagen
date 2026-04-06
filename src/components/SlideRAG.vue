<template>
  <div class="rag-slide w-full h-full flex flex-col items-center justify-center p-4 overflow-hidden">

    <!-- Header -->
    <div class="w-full max-w-5xl mb-3 text-center flex-shrink-0">
      <h2 class="text-2xl font-heading font-bold text-green-400 tracking-widest uppercase">
        RAG &amp; Búsqueda Semántica
      </h2>
      <p class="text-xs font-mono text-gray-400 mt-1">
        Retrieval-Augmented Generation · Bases de Datos Vectoriales
      </p>
      <div class="h-px w-32 bg-green-400 mx-auto mt-2 opacity-60"></div>
    </div>

    <!-- Tabs de pasos -->
    <div class="w-full max-w-5xl flex gap-2 mb-3 flex-shrink-0">
      <button
        class="rag-tab"
        :class="{ active: activeStep === 1 }"
        @click="goToStep(1)"
        :disabled="isRunning"
      >PASO 1 · Indexación</button>
      <button
        class="rag-tab"
        :class="{ active: activeStep === 2 }"
        @click="goToStep(2)"
        :disabled="isRunning || !step1Done"
      >PASO 2 · Búsqueda Semántica</button>
      <button
        class="rag-btn-primary ml-auto"
        @click="runStep"
        :disabled="isRunning || (activeStep === 2 && step2Done)"
      >
        {{ btnLabel }}
      </button>
      <button class="rag-btn-reset" @click="resetAll" :disabled="isRunning">↺ RESET</button>
    </div>

    <!-- Log -->
    <div class="rag-log w-full max-w-5xl mb-2 flex-shrink-0">{{ statusLog }}</div>

    <!-- =================== PASO 1 =================== -->
    <div v-if="activeStep === 1" class="w-full max-w-5xl flex gap-3 flex-1 min-h-0">

      <!-- Columna izquierda: documentos fuente -->
      <div class="rag-panel flex flex-col w-[30%]">
        <div class="rag-panel-header">Estatuto Tributario · Fragmentos</div>
        <div class="flex flex-col gap-2 p-2 overflow-y-auto flex-1">
          <div
            v-for="(chunk, i) in chunks"
            :key="i"
            class="rag-chunk"
            :class="{ highlighted: chunk.highlighted, done: chunk.done }"
          >
            <div class="chunk-art">Art. {{ chunk.art }}</div>
            <div class="chunk-text">{{ chunk.text }}</div>
          </div>
        </div>
      </div>

      <!-- Columna centro: pipeline -->
      <div class="flex flex-col items-center justify-center gap-3 w-[32%]">

        <!-- Chunking -->
        <div class="rag-pipeline-box" :class="{ active: pipelineStage === 'chunk' }">
          <div class="pb-label">① Chunking</div>
          <div class="pb-desc">Divide el documento en fragmentos</div>
        </div>

        <div class="rag-arrow">↓</div>

        <!-- Embedding -->
        <div class="rag-pipeline-box" :class="{ active: pipelineStage === 'embed' }">
          <div class="pb-label">② Modelo de Embedding</div>
          <div class="pb-desc">Convierte cada chunk en un vector numérico</div>
          <!-- Mini vector visual -->
          <div v-if="currentEmbedPixels.length" class="rag-mini-vec mt-2">
            <div
              v-for="(px, j) in currentEmbedPixels"
              :key="j"
              class="rag-mini-px"
              :style="{ backgroundColor: px }"
            ></div>
          </div>
        </div>

        <div class="rag-arrow">↓</div>

        <!-- DB Vectorial -->
        <div class="rag-pipeline-box" :class="{ active: pipelineStage === 'store' }">
          <div class="pb-label">③ Base de Datos Vectorial</div>
          <div class="pb-desc">Almacena vector + metadata del artículo</div>
        </div>
      </div>

      <!-- Columna derecha: base de datos vectorial -->
      <div class="rag-panel flex flex-col flex-1">
        <div class="rag-panel-header">Vector DB · Índice</div>
        <div class="flex flex-col gap-1.5 p-2 overflow-y-auto flex-1">
          <div
            v-for="(entry, i) in vectorDb"
            :key="i"
            class="rag-db-entry animate-rag-in"
          >
            <div class="db-art">Art. {{ entry.art }}</div>
            <div class="db-vec">
              <div
                v-for="(px, j) in entry.pixels"
                :key="j"
                class="rag-mini-px"
                :style="{ backgroundColor: px }"
              ></div>
            </div>
            <div class="db-snippet">{{ entry.snippet }}</div>
          </div>
          <div v-if="vectorDb.length === 0" class="text-gray-600 font-mono text-xs text-center mt-4">
            vacío — ejecuta el paso 1
          </div>
        </div>
      </div>
    </div>

    <!-- =================== PASO 2 =================== -->
    <div v-if="activeStep === 2" class="w-full max-w-5xl flex gap-3 flex-1 min-h-0">

      <!-- Columna izquierda: consulta del usuario -->
      <div class="flex flex-col w-[26%] gap-3">
        <!-- Selector de consulta -->
        <div class="rag-panel flex flex-col">
          <div class="rag-panel-header">Consulta del Usuario</div>
          <div class="flex flex-col gap-1.5 p-2">
            <button
              v-for="(q, i) in queries"
              :key="i"
              class="rag-query-btn"
              :class="{ active: selectedQuery === i }"
              @click="selectedQuery = i; step2Done = false; queryResult = []"
              :disabled="isRunning"
            >{{ q.text }}</button>
          </div>
        </div>

        <!-- Pipeline de consulta -->
        <div class="rag-panel flex flex-col">
          <div class="rag-panel-header">Pipeline</div>
          <div class="flex flex-col gap-2 p-2">
            <div class="rag-pipeline-box-sm" :class="{ active: queryStage === 'embed' }">
              <div class="pb-label text-xs">① Embedding de Consulta</div>
              <div v-if="queryPixels.length" class="rag-mini-vec mt-1">
                <div v-for="(px, j) in queryPixels" :key="j" class="rag-mini-px" :style="{ backgroundColor: px }"></div>
              </div>
            </div>
            <div class="rag-arrow text-sm">↓</div>
            <div class="rag-pipeline-box-sm" :class="{ active: queryStage === 'search' }">
              <div class="pb-label text-xs">② Búsqueda por Similitud</div>
              <div class="pb-desc text-xs">Cosine similarity vs. todos los vectores</div>
            </div>
            <div class="rag-arrow text-sm">↓</div>
            <div class="rag-pipeline-box-sm" :class="{ active: queryStage === 'rank' }">
              <div class="pb-label text-xs">③ Ranking de Candidatos</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Columna centro: base de datos vectorial con scores -->
      <div class="rag-panel flex flex-col flex-1">
        <div class="rag-panel-header">Vector DB · Comparación de Similitud</div>
        <div class="flex flex-col gap-2 p-2 overflow-y-auto flex-1">
          <div
            v-for="(entry, i) in vectorDbWithScore"
            :key="i"
            class="rag-db-scored"
            :class="{ scanning: entry.scanning, topResult: entry.topResult }"
          >
            <div class="scored-art">Art. {{ entry.art }}</div>
            <div class="scored-vec">
              <div v-for="(px, j) in entry.pixels" :key="j" class="rag-mini-px-sm" :style="{ backgroundColor: px }"></div>
            </div>
            <div class="scored-bar-wrap">
              <div class="scored-bar" :style="{ width: entry.scoreWidth }"></div>
            </div>
            <div class="scored-pct" :class="{ 'text-green-400': entry.topResult }">
              {{ entry.scoreLabel }}
            </div>
          </div>
          <div v-if="vectorDbWithScore.length === 0" class="text-gray-600 font-mono text-xs text-center mt-4">
            pulsa ▶ BUSCAR para comparar
          </div>
        </div>
      </div>

      <!-- Columna derecha: resultados -->
      <div class="rag-panel flex flex-col w-[30%]">
        <div class="rag-panel-header text-green-400">Candidatos Recuperados</div>
        <div class="flex flex-col gap-2 p-2 overflow-y-auto flex-1">
          <div
            v-for="(res, i) in queryResult"
            :key="i"
            class="rag-result animate-rag-in"
            :class="{ top: i === 0 }"
          >
            <div class="res-header">
              <span class="res-rank">#{{ i + 1 }}</span>
              <span class="res-art">Art. {{ res.art }}</span>
              <span class="res-score">{{ res.scoreLabel }}</span>
            </div>
            <div class="res-text">{{ res.text }}</div>
            <div class="res-bar-wrap">
              <div class="res-bar" :style="{ width: res.scoreWidth }"></div>
            </div>
          </div>
          <div v-if="queryResult.length === 0 && queryStage === 'idle'" class="text-gray-600 font-mono text-xs text-center mt-4">
            aquí aparecerán los artículos más relevantes
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
const CHUNKS = [
  { art: '19', text: 'Contribuyentes del impuesto sobre la renta y complementarios.', snippet: 'Contribuyentes renta...' },
  { art: '24', text: 'Ingresos de fuente nacional. Son ingresos de fuente nacional los provenientes de la explotación de bienes materiales e inmateriales en el país.', snippet: 'Ingresos fuente nac...' },
  { art: '107', text: 'Expensas necesarias. Son deducibles las expensas realizadas durante el año gravable en el desarrollo de cualquier actividad productora de renta.', snippet: 'Expensas deducibles...' },
  { art: '235-2', text: 'Rentas exentas. Están exentas del impuesto sobre la renta las rentas de empresas de servicios de Economía Naranja.', snippet: 'Rentas exentas EC...' },
  { art: '240', text: 'Tarifa general para personas jurídicas. La tarifa del impuesto sobre la renta aplicable a las sociedades nacionales es del 35%.', snippet: 'Tarifa 35% juridicas...' },
  { art: '254', text: 'Descuento por impuestos pagados en el exterior. Los contribuyentes nacionales que perciban rentas de fuente extranjera pueden descontar el impuesto pagado en el exterior.', snippet: 'Descuento impuesto ext...' },
];

const QUERIES = [
  { text: '¿Cuál es la tarifa del impuesto de renta para empresas?', relevantArts: ['240', '19', '235-2', '107', '254', '24'] },
  { text: '¿Qué gastos son deducibles?', relevantArts: ['107', '24', '254', '19', '240', '235-2'] },
  { text: '¿Qué son los ingresos de fuente nacional?', relevantArts: ['24', '19', '107', '254', '235-2', '240'] },
];

// Scores simulados por consulta (ordenados según CHUNKS array)
const SCORES = {
  '¿Cuál es la tarifa del impuesto de renta para empresas?': [18, 22, 30, 45, 97, 38],
  '¿Qué gastos son deducibles?': [20, 35, 96, 28, 32, 55],
  '¿Qué son los ingresos de fuente nacional?': [25, 95, 40, 20, 18, 42],
};

function randomColor() {
  const r = Math.floor(Math.random() * 180 + 55);
  const g = Math.floor(Math.random() * 180 + 55);
  const b = Math.floor(Math.random() * 180 + 55);
  return `rgb(${r},${g},${b})`;
}

function makePixels(n = 20) {
  return Array.from({ length: n }, () => randomColor());
}

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

export default {
  name: 'SlideRAG',
  data() {
    return {
      activeStep: 1,
      isRunning: false,
      step1Done: false,
      step2Done: false,
      statusLog: 'Pulsa ▶ INDEXAR para comenzar la indexación del Estatuto Tributario.',

      // Paso 1
      pipelineStage: 'idle', // idle | chunk | embed | store
      currentEmbedPixels: [],
      chunks: CHUNKS.map(c => ({ ...c, highlighted: false, done: false })),
      vectorDb: [],

      // Paso 2
      selectedQuery: 0,
      queries: QUERIES,
      queryStage: 'idle', // idle | embed | search | rank
      queryPixels: [],
      vectorDbWithScore: [],
      queryResult: [],
    };
  },
  computed: {
    btnLabel() {
      if (this.activeStep === 1) return this.step1Done ? '✓ INDEXADO' : '▶ INDEXAR';
      if (this.activeStep === 2) return this.step2Done ? '✓ COMPLETADO' : '▶ BUSCAR';
      return '▶ INICIAR';
    },
  },
  methods: {
    goToStep(n) {
      if (this.isRunning) return;
      this.activeStep = n;
      if (n === 1) {
        this.statusLog = this.step1Done
          ? 'Índice vectorial listo. Puedes ir al Paso 2.'
          : 'Pulsa ▶ INDEXAR para comenzar la indexación del Estatuto Tributario.';
      } else {
        this.statusLog = 'Selecciona una consulta y pulsa ▶ BUSCAR.';
      }
    },
    resetAll() {
      if (this.isRunning) return;
      this.step1Done = false;
      this.step2Done = false;
      this.pipelineStage = 'idle';
      this.currentEmbedPixels = [];
      this.chunks = CHUNKS.map(c => ({ ...c, highlighted: false, done: false }));
      this.vectorDb = [];
      this.queryStage = 'idle';
      this.queryPixels = [];
      this.vectorDbWithScore = [];
      this.queryResult = [];
      this.activeStep = 1;
      this.statusLog = 'Pulsa ▶ INDEXAR para comenzar la indexación del Estatuto Tributario.';
    },
    async runStep() {
      if (this.isRunning) return;
      if (this.activeStep === 1 && !this.step1Done) await this.runIndexing();
      else if (this.activeStep === 2 && !this.step2Done) await this.runSearch();
    },

    // ─── PASO 1: INDEXACIÓN ───────────────────────────────────────────────────
    async runIndexing() {
      this.isRunning = true;
      this.vectorDb = [];
      this.chunks = CHUNKS.map(c => ({ ...c, highlighted: false, done: false }));

      for (let i = 0; i < this.chunks.length; i++) {
        // Highlight chunk
        this.pipelineStage = 'chunk';
        this.chunks[i].highlighted = true;
        this.chunks = [...this.chunks];
        this.statusLog = `Chunking · fragmento ${i + 1}/${this.chunks.length}: Art. ${this.chunks[i].art}`;
        await sleep(500);

        // Embedding
        this.pipelineStage = 'embed';
        this.statusLog = `Embedding · Art. ${this.chunks[i].art} → vector de 1536 dimensiones`;
        this.currentEmbedPixels = makePixels(20);
        await sleep(600);

        // Store
        this.pipelineStage = 'store';
        this.statusLog = `Guardando vector de Art. ${this.chunks[i].art} en la base de datos vectorial...`;
        const pixels = makePixels(20);
        this.vectorDb = [...this.vectorDb, {
          art: this.chunks[i].art,
          pixels,
          snippet: this.chunks[i].snippet,
        }];
        this.chunks[i].done = true;
        this.chunks[i].highlighted = false;
        this.chunks = [...this.chunks];
        await sleep(400);
      }

      this.pipelineStage = 'idle';
      this.currentEmbedPixels = [];
      this.step1Done = true;
      this.statusLog = `¡Indexación completa! ${this.chunks.length} artículos almacenados en la Vector DB. Pasa al Paso 2.`;
      this.isRunning = false;
    },

    // ─── PASO 2: BÚSQUEDA SEMÁNTICA ───────────────────────────────────────────
    async runSearch() {
      this.isRunning = true;
      this.queryResult = [];
      this.queryPixels = [];
      this.vectorDbWithScore = this.vectorDb.map(e => ({
        ...e,
        scanning: false,
        topResult: false,
        scoreWidth: '0%',
        scoreLabel: '—',
        score: 0,
      }));

      const query = this.queries[this.selectedQuery];
      const rawScores = SCORES[query.text];

      // 1. Embed query
      this.queryStage = 'embed';
      this.statusLog = `Embedding de la consulta: "${query.text}"`;
      await sleep(300);
      this.queryPixels = makePixels(20);
      await sleep(700);

      // 2. Búsqueda por similitud (scan uno a uno)
      this.queryStage = 'search';
      this.statusLog = 'Calculando similitud coseno contra todos los vectores...';
      for (let i = 0; i < this.vectorDbWithScore.length; i++) {
        this.vectorDbWithScore[i].scanning = true;
        this.vectorDbWithScore = [...this.vectorDbWithScore];
        await sleep(320);
        const score = rawScores[i];
        this.vectorDbWithScore[i].scanning = false;
        this.vectorDbWithScore[i].score = score;
        this.vectorDbWithScore[i].scoreWidth = score + '%';
        this.vectorDbWithScore[i].scoreLabel = score + '%';
        this.vectorDbWithScore = [...this.vectorDbWithScore];
      }
      await sleep(400);

      // 3. Ranking
      this.queryStage = 'rank';
      this.statusLog = 'Ordenando candidatos por similitud...';
      await sleep(600);

      // Marcar top resultado
      const maxScore = Math.max(...rawScores);
      const topIdx = rawScores.indexOf(maxScore);
      this.vectorDbWithScore[topIdx].topResult = true;
      this.vectorDbWithScore = [...this.vectorDbWithScore];

      // Construir resultados ordenados (top 3)
      const sorted = this.vectorDbWithScore
        .map((e, i) => ({ ...e, chunkIdx: i }))
        .sort((a, b) => b.score - a.score)
        .slice(0, 3);

      for (let i = 0; i < sorted.length; i++) {
        await sleep(300);
        const chunkData = CHUNKS.find(c => c.art === sorted[i].art);
        this.queryResult = [...this.queryResult, {
          art: sorted[i].art,
          text: chunkData ? chunkData.text : sorted[i].snippet,
          score: sorted[i].score,
          scoreLabel: sorted[i].score + '%',
          scoreWidth: sorted[i].score + '%',
        }];
      }

      this.queryStage = 'idle';
      this.step2Done = true;
      this.statusLog = `¡Búsqueda completada! Art. ${sorted[0].art} es el más relevante con ${sorted[0].score}% de similitud.`;
      this.isRunning = false;
    },
  },
};
</script>

<style scoped>
.rag-slide {
  background-color: #0f1117;
  color: #e0e0e0;
}

/* ── Tabs ── */
.rag-tab {
  font-family: ui-monospace, monospace;
  background-color: #1e1e1e;
  color: #e0e0e0;
  border: 2px solid #333;
  padding: 5px 14px;
  font-size: 0.72rem;
  cursor: pointer;
  opacity: 0.5;
  text-transform: uppercase;
  transition: all 0.2s;
}
.rag-tab.active { opacity: 1; border-color: #4ade80; color: #4ade80; }
.rag-tab:disabled { cursor: not-allowed; }

/* ── Botones ── */
.rag-btn-primary {
  font-family: ui-monospace, monospace;
  background-color: #4ade80;
  color: #111;
  border: 2px solid #111;
  padding: 5px 14px;
  font-size: 0.78rem;
  cursor: pointer;
  font-weight: bold;
  text-transform: uppercase;
  box-shadow: 3px 3px 0 #111;
  transition: all 0.15s;
  white-space: nowrap;
}
.rag-btn-primary:hover { transform: translate(1px,1px); box-shadow: 1px 1px 0 #111; }
.rag-btn-primary:disabled { opacity: 0.45; cursor: not-allowed; transform: none; }

.rag-btn-reset {
  font-family: ui-monospace, monospace;
  background-color: #1e1e1e;
  color: #888;
  border: 2px solid #333;
  padding: 5px 12px;
  font-size: 0.72rem;
  cursor: pointer;
  text-transform: uppercase;
  transition: all 0.15s;
}
.rag-btn-reset:hover { color: #e0e0e0; border-color: #555; }
.rag-btn-reset:disabled { cursor: not-allowed; opacity: 0.4; }

/* ── Log ── */
.rag-log {
  font-family: ui-monospace, monospace;
  font-size: 0.75rem;
  color: #4ade80;
  min-height: 1.1em;
  text-align: center;
  padding: 2px 0;
}

/* ── Panel genérico ── */
.rag-panel {
  background-color: #1a1a2e;
  border: 2px solid #2a2a3e;
  overflow: hidden;
}
.rag-panel-header {
  background-color: #16213e;
  font-family: ui-monospace, monospace;
  font-size: 0.68rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #888;
  padding: 5px 10px;
  border-bottom: 1px solid #2a2a3e;
}

/* ── Chunks ── */
.rag-chunk {
  border: 1px solid #2a2a3e;
  background: #111;
  padding: 5px 8px;
  transition: all 0.3s;
}
.rag-chunk.highlighted { border-color: #4ade80; background: rgba(74,222,128,0.08); }
.rag-chunk.done { border-color: #334; opacity: 0.5; }
.chunk-art { font-family: ui-monospace, monospace; font-size: 0.62rem; color: #4ade80; }
.chunk-text { font-size: 0.65rem; color: #999; line-height: 1.3; margin-top: 2px; }

/* ── Pipeline boxes ── */
.rag-pipeline-box {
  border: 2px solid #2a2a3e;
  background: #111;
  padding: 8px 10px;
  text-align: center;
  transition: all 0.3s;
}
.rag-pipeline-box.active { border-color: #a855f7; background: rgba(168,85,247,0.1); }
.rag-pipeline-box-sm {
  border: 1px solid #2a2a3e;
  background: #111;
  padding: 6px 8px;
  transition: all 0.3s;
}
.rag-pipeline-box-sm.active { border-color: #a855f7; background: rgba(168,85,247,0.1); }
.pb-label { font-family: ui-monospace, monospace; font-size: 0.7rem; color: #a855f7; text-transform: uppercase; font-weight: bold; }
.pb-desc { font-size: 0.62rem; color: #666; margin-top: 2px; }

.rag-arrow { font-size: 1.1rem; color: #555; font-family: ui-monospace, monospace; text-align: center; }

/* ── Mini vectores ── */
.rag-mini-vec {
  display: flex;
  flex-wrap: wrap;
  gap: 1px;
  justify-content: center;
}
.rag-mini-px {
  width: 7px;
  height: 7px;
  transition: background-color 0.4s;
}
.rag-mini-px-sm {
  width: 5px;
  height: 5px;
}

/* ── Vector DB ── */
.rag-db-entry {
  display: flex;
  align-items: center;
  gap: 6px;
  background: #111;
  border: 1px solid #222;
  padding: 5px 7px;
}
.db-art { font-family: ui-monospace, monospace; font-size: 0.62rem; color: #4ade80; width: 40px; flex-shrink: 0; }
.db-vec { display: flex; flex-wrap: wrap; gap: 1px; width: 60px; flex-shrink: 0; }
.db-snippet { font-size: 0.6rem; color: #555; flex: 1; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; }

/* ── Paso 2: scoring ── */
.rag-db-scored {
  display: grid;
  grid-template-columns: 36px 50px 1fr 36px;
  align-items: center;
  gap: 5px;
  background: #111;
  border: 1px solid #222;
  padding: 4px 7px;
  transition: all 0.3s;
}
.rag-db-scored.scanning { border-color: #a855f7; background: rgba(168,85,247,0.08); }
.rag-db-scored.topResult { border-color: #4ade80 !important; background: rgba(74,222,128,0.08) !important; }
.scored-art { font-family: ui-monospace, monospace; font-size: 0.62rem; color: #888; }
.scored-vec { display: flex; flex-wrap: wrap; gap: 1px; }
.scored-bar-wrap { height: 6px; background: #222; overflow: hidden; }
.scored-bar { height: 100%; background: #4ade80; transition: width 0.5s ease; }
.scored-pct { font-family: ui-monospace, monospace; font-size: 0.65rem; color: #666; text-align: right; }

/* ── Resultados finales ── */
.rag-result {
  border: 1px solid #222;
  background: #111;
  padding: 7px 8px;
  transition: all 0.3s;
}
.rag-result.top { border-color: #4ade80; background: rgba(74,222,128,0.06); }
.res-header { display: flex; align-items: center; gap: 5px; margin-bottom: 4px; }
.res-rank { font-family: ui-monospace, monospace; font-size: 0.62rem; color: #555; }
.res-art { font-family: ui-monospace, monospace; font-size: 0.7rem; color: #4ade80; font-weight: bold; flex: 1; }
.res-score { font-family: ui-monospace, monospace; font-size: 0.7rem; color: #a855f7; font-weight: bold; }
.res-text { font-size: 0.62rem; color: #aaa; line-height: 1.3; margin-bottom: 5px; }
.res-bar-wrap { height: 4px; background: #222; overflow: hidden; }
.res-bar { height: 100%; background: linear-gradient(90deg, #4ade80, #a855f7); transition: width 0.6s ease; }

/* ── Query buttons ── */
.rag-query-btn {
  font-family: ui-monospace, monospace;
  font-size: 0.65rem;
  text-align: left;
  padding: 6px 8px;
  background: #111;
  border: 1px solid #333;
  color: #888;
  cursor: pointer;
  transition: all 0.2s;
  line-height: 1.3;
}
.rag-query-btn.active { border-color: #4ade80; color: #e0e0e0; background: rgba(74,222,128,0.07); }
.rag-query-btn:hover:not(:disabled) { border-color: #555; color: #ccc; }
.rag-query-btn:disabled { cursor: not-allowed; }

/* ── Animaciones ── */
@keyframes ragIn {
  from { opacity: 0; transform: translateX(12px); }
  to   { opacity: 1; transform: translateX(0); }
}
.animate-rag-in {
  animation: ragIn 0.35s ease-out forwards;
}
</style>
