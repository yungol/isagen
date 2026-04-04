<template>
  <div class="h-full w-full bg-white flex flex-col justify-center px-12 md:px-24">
    <!-- Título de la sección -->
    <div class="mb-12 border-l-8 border-isagen-green pl-6">
      <h2 class="text-3xl md:text-5xl font-heading font-extrabold text-isagen-dark mb-4 tracking-tight">
        El Límite de la Lógica
      </h2>
      <p class="text-xl md:text-2xl font-body text-gray-600 font-light">
        Programación Determinística vs. Probabilística (IA)
      </p>
    </div>

    <div class="flex flex-col lg:flex-row gap-8 items-stretch min-h-[550px]">
      <!-- Izquierda: Concepto -->
      <div class="w-full lg:w-1/3 flex flex-col gap-6">
        <div class="bg-gray-100 rounded-xl p-6 shadow-md border border-gray-200 flex-1">
          <h3 class="text-xl font-heading font-bold text-isagen-blue mb-3">
            1. Enfoque Determinístico
          </h3>
          <p class="text-sm text-gray-700 mb-4 font-body">
            Reglas fijas (if/else). Si la figura no cumple exactamente las condiciones, el sistema falla.
          </p>
          <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-xs shadow-inner mb-4">
            <span class="text-pink-500">if</span> (orejas_puntiagudas <span class="text-pink-500">&&</span> bigotes) {<br>
            &nbsp;&nbsp;<span class="text-blue-300">es_gato</span> = <span class="text-purple-400">true</span>;<br>
            } <span class="text-pink-500">else</span> {<br>
            &nbsp;&nbsp;<span class="text-blue-300">error</span>();<br>
            }
          </div>
          
          <h3 class="text-xl font-heading font-bold text-isagen-green mb-3 mt-6">
            2. Enfoque Probabilístico (IA)
          </h3>
          <p class="text-sm text-gray-700 font-body">
            No hay reglas estrictas. Cada ejemplo construye un "peso" o probabilidad estadística de las características que definen el concepto de forma vectorial.
          </p>
        </div>
      </div>

      <!-- Derecha: Interactivo -->
      <div class="w-full lg:w-2/3 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 flex flex-col relative shadow-inner">
        
        <!-- Pestañas -->
        <div class="flex border-b border-gray-200 bg-white rounded-t-xl overflow-hidden">
          <button @click="setMode('deterministic')" 
                  :class="['flex-1 py-4 font-bold text-lg transition-colors', mode === 'deterministic' ? 'bg-isagen-blue text-white' : 'text-gray-500 hover:bg-gray-100']">
            Enfoque Determinístico
          </button>
          <button @click="setMode('probabilistic')" 
                  :class="['flex-1 py-4 font-bold text-lg transition-colors', mode === 'probabilistic' ? 'bg-isagen-green text-white' : 'text-gray-500 hover:bg-gray-100']">
            Enfoque Probabilístico (IA)
          </button>
        </div>

        <!-- Contenido Interactivo -->
        <div class="flex-1 p-6 pb-20 flex flex-col relative justify-between">
          
          <!-- CONTENEDOR DE GATOS ANIMADOS -->
          <div class="h-64 flex justify-center items-center relative mt-4">
            <transition name="slide-fade" mode="out-in">
              <div :key="currentCatIndex" class="relative">
                <svg width="250" height="250" viewBox="0 0 300 300" class="drop-shadow-xl transform transition-transform duration-500">
                  <g :fill="currentCat.color">
                    <!-- Cuerpo común -->
                    <path d="M 100 250 C 100 150, 200 150, 200 250 Z" />
                    <!-- Cola -->
                    <path v-if="currentCat.hasTail" d="M 200 230 Q 250 240, 260 180" fill="none" :stroke="currentCat.color" stroke-width="15" stroke-linecap="round" />
                    <!-- Cabeza -->
                    <circle cx="150" cy="140" r="50" />
                    
                    <!-- Orejas -->
                    <g v-if="currentCat.ears === 'pointy'">
                      <polygon points="110,105 100,40 145,95" />
                      <polygon points="190,105 200,40 155,95" />
                    </g>
                    <g v-else-if="currentCat.ears === 'folded'">
                      <!-- Orejas caídas -->
                      <path d="M 110 105 Q 90 100 105 130" stroke="none" />
                      <path d="M 190 105 Q 210 100 195 130" stroke="none" />
                      <circle cx="110" cy="115" r="15" />
                      <circle cx="190" cy="115" r="15" />
                    </g>
                    
                    <!-- Cara interna orejas (solo puntiagudas) -->
                    <g v-if="currentCat.ears === 'pointy'" fill="#F9A8D4">
                      <polygon points="114,95 108,55 138,90" />
                      <polygon points="186,95 192,55 162,90" />
                    </g>
                  </g>
                  
                  <!-- Ojos -->
                  <circle cx="130" cy="135" r="8" fill="#FCD34D" />
                  <circle cx="170" cy="135" r="8" fill="#FCD34D" />
                  <ellipse cx="130" cy="135" rx="2" ry="6" fill="#000" />
                  <ellipse cx="170" cy="135" rx="2" ry="6" fill="#000" />
                  <!-- Nariz -->
                  <polygon points="145,150 155,150 150,158" fill="#F9A8D4" />
                  <!-- Boca -->
                  <path d="M 140 160 Q 150 165, 150 160 Q 150 165, 160 160" fill="none" stroke="#000" stroke-width="2" />
                  
                  <!-- Bigotes -->
                  <g v-if="currentCat.hasWhiskers" stroke="#000" stroke-width="2">
                    <line x1="120" y1="145" x2="80" y2="140" />
                    <line x1="120" y1="155" x2="80" y2="160" />
                    <line x1="180" y1="145" x2="220" y2="140" />
                    <line x1="180" y1="155" x2="220" y2="160" />
                  </g>
                  
                  <!-- Escáner Determinístico (Línea roja) -->
                  <line v-if="mode === 'deterministic' && isScanning" x1="0" :y1="scannerY" x2="300" :y2="scannerY" stroke="#EF4444" stroke-width="4" class="opacity-80 drop-shadow-md" />
                  
                  <!-- Nodos de Extracción IA -->
                  <g v-if="mode === 'probabilistic' && isExtracting">
                    <!-- Nodos sobre características clave que envían datos -->
                    <circle cx="150" cy="70" r="50" fill="none" stroke="#10B981" stroke-width="3" stroke-dasharray="8 4" class="animate-spin-slow" />
                    <circle cx="150" cy="150" r="40" fill="none" stroke="#10B981" stroke-width="3" stroke-dasharray="8 4" class="animate-spin-slow" />
                  </g>
                </svg>
              </div>
            </transition>
          </div>

          <!-- PANEL INFERIOR DE RESULTADOS -->
          <div class="mt-4 bg-white rounded-lg p-4 shadow border border-gray-100 h-[150px]">
            
            <!-- MODO DETERMINÍSTICO -->
            <div v-if="mode === 'deterministic'" class="flex flex-col h-full justify-center">
              <div v-if="!isScanning && !scanResult" class="text-center text-gray-400 font-bold text-lg">
                <span class="block mb-2 text-3xl">👉</span>
                Presiona "Siguiente Sujeto" para escanear
              </div>
              <div v-else-if="isScanning" class="text-center text-blue-500 font-mono font-bold animate-pulse text-lg">
                > Ejecutando if/else (reglas estrictas)...
              </div>
              <div v-else class="flex items-center justify-between px-8">
                <div class="font-mono text-sm space-y-3 bg-gray-50 p-3 rounded border border-gray-200 flex-1 mr-6">
                  <div :class="currentCat.ears === 'pointy' ? 'text-green-600 font-bold' : 'text-red-500 line-through'">1. Orejas Puntiagudas == true</div>
                  <div :class="currentCat.hasWhiskers ? 'text-green-600 font-bold' : 'text-red-500 line-through'">2. Bigotes == true</div>
                </div>
                <div class="text-4xl font-extrabold flex flex-col items-center w-48 text-center">
                  <span v-if="scanResult === 'success'" class="text-green-500 bg-green-50 px-4 py-2 rounded-lg border-2 border-green-200">✅ ES GATO</span>
                  <span v-else class="text-red-500 bg-red-50 px-4 py-2 rounded-lg border-2 border-red-200 text-2xl">❌ ERROR</span>
                  <span v-if="scanResult === 'error'" class="text-xs text-red-500 mt-2 font-mono bg-red-100 px-2 py-1 rounded">Excepción: Objeto Desconocido</span>
                </div>
              </div>
            </div>

            <!-- MODO PROBABILÍSTICO -->
            <div v-if="mode === 'probabilistic'" class="flex flex-col h-full justify-between px-4">
              <div class="text-center font-bold text-gray-700 mb-2 text-sm uppercase tracking-wider flex items-center justify-center gap-2">
                <span class="w-3 h-3 bg-isagen-green rounded-full inline-block animate-pulse"></span>
                Concepto Vectorial Formado
              </div>
              <!-- Barras de peso -->
              <div class="space-y-3">
                <div class="flex items-center text-sm">
                  <span class="w-24 font-bold text-gray-600">Orejas</span>
                  <div class="flex-1 h-3 bg-gray-200 rounded-full mx-3 overflow-hidden">
                    <div class="h-full bg-isagen-green transition-all duration-1000 ease-out" :style="{ width: `${weights.ears}%` }"></div>
                  </div>
                  <span class="w-12 text-right font-mono font-bold text-isagen-green">{{ Math.round(weights.ears) }}%</span>
                </div>
                <div class="flex items-center text-sm">
                  <span class="w-24 font-bold text-gray-600">Bigotes</span>
                  <div class="flex-1 h-3 bg-gray-200 rounded-full mx-3 overflow-hidden">
                    <div class="h-full bg-isagen-green transition-all duration-1000 ease-out" :style="{ width: `${weights.whiskers}%` }"></div>
                  </div>
                  <span class="w-12 text-right font-mono font-bold text-isagen-green">{{ Math.round(weights.whiskers) }}%</span>
                </div>
                <div class="flex items-center text-sm">
                  <span class="w-24 font-bold text-gray-600">Cuerpo/Forma</span>
                  <div class="flex-1 h-3 bg-gray-200 rounded-full mx-3 overflow-hidden">
                    <div class="h-full bg-isagen-green transition-all duration-1000 ease-out" :style="{ width: `${weights.body}%` }"></div>
                  </div>
                  <span class="w-12 text-right font-mono font-bold text-isagen-green">{{ Math.round(weights.body) }}%</span>
                </div>
              </div>
              <div class="text-center text-xs mt-3 font-mono" :class="isExtracting ? 'text-isagen-green font-bold animate-pulse' : 'text-gray-500'">
                {{ isExtracting ? "> Procesando pesos estadísticos y actualizando vector..." : "> Modelo ajustado a la variabilidad. Concepto generalizado con éxito." }}
              </div>
            </div>

          </div>

          <!-- Controles Inferiores -->
          <div class="absolute -bottom-6 left-0 right-0 flex justify-center">
            <button @click="nextCat" :disabled="isScanning || isExtracting"
                    class="bg-gray-800 text-white px-8 py-3 rounded-full font-bold hover:bg-gray-700 transition-colors disabled:opacity-50 flex items-center gap-3 text-lg shadow-xl border-4 border-white">
              Siguiente Sujeto <span>⏭️</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SlideProblemaGato',
  data() {
    return {
      mode: 'deterministic', // 'deterministic' | 'probabilistic'
      cats: [
        { id: 1, color: '#4B5563', ears: 'pointy', hasWhiskers: true, hasTail: true, type: 'Estándar' },
        { id: 2, color: '#D97706', ears: 'folded', hasWhiskers: true, hasTail: true, type: 'Orejas Caídas' },
        { id: 3, color: '#9CA3AF', ears: 'pointy', hasWhiskers: false, hasTail: true, type: 'Sin Bigotes' },
        { id: 4, color: '#1F2937', ears: 'folded', hasWhiskers: false, hasTail: false, type: 'Atípico' }
      ],
      currentCatIndex: 0,
      
      // Estado Determinístico
      isScanning: false,
      scannerY: 0,
      scanResult: null,
      
      // Estado Probabilístico
      isExtracting: false,
      weights: {
        ears: 0,
        whiskers: 0,
        body: 0
      },
      targetWeights: {
        ears: 0,
        whiskers: 0,
        body: 0
      },
      catsProcessed: 0,
      scannerInterval: null
    }
  },
  computed: {
    currentCat() {
      return this.cats[this.currentCatIndex];
    }
  },
  methods: {
    setMode(newMode) {
      this.mode = newMode;
      this.currentCatIndex = 0;
      this.scanResult = null;
      this.catsProcessed = 0;
      this.weights = { ears: 0, whiskers: 0, body: 0 };
      if (this.scannerInterval) clearInterval(this.scannerInterval);
      this.isScanning = false;
      this.isExtracting = false;
    },
    nextCat() {
      this.currentCatIndex = (this.currentCatIndex + 1) % this.cats.length;
      this.scanResult = null;
      
      if (this.mode === 'deterministic') {
        this.runDeterministicScan();
      } else {
        this.processProbabilistic();
      }
    },
    runDeterministicScan() {
      this.isScanning = true;
      this.scannerY = 0;
      
      // Animar línea de escáner
      let pos = 0;
      this.scannerInterval = setInterval(() => {
        pos += 15;
        this.scannerY = pos;
        if (pos >= 300) {
          clearInterval(this.scannerInterval);
          this.isScanning = false;
          this.evaluateDeterministic();
        }
      }, 30);
    },
    evaluateDeterministic() {
      const cat = this.currentCat;
      if (cat.ears === 'pointy' && cat.hasWhiskers) {
        this.scanResult = 'success';
      } else {
        this.scanResult = 'error';
      }
    },
    processProbabilistic() {
      this.isExtracting = true;
      this.catsProcessed++;
      
      // Calcular nuevos pesos ideales basados en historial
      let newEars = 0, newWhiskers = 0, newBody = 0;
      
      // Acumular
      for(let i=1; i <= this.catsProcessed; i++) {
        let catIndex = i % this.cats.length;
        // Para que el primer gato (index 0) no se salte al procesar el primer click:
        let cat = this.cats[(this.currentCatIndex - this.catsProcessed + i + this.cats.length) % this.cats.length];
        
        if(cat.ears === 'pointy') newEars += 1;
        else newEars += 0.5; // Orejas existen pero diferentes
        
        if(cat.hasWhiskers) newWhiskers += 1;
        else newWhiskers += 0.2; // Ocurrencia rara
        
        if(cat.hasTail) newBody += 1;
        else newBody += 0.7; // Cuerpo existe aunque no tenga cola
      }
      
      // Promedio ponderado (normalizado a 100)
      this.targetWeights.ears = Math.min((newEars / this.catsProcessed) * 95, 95); 
      this.targetWeights.whiskers = Math.min((newWhiskers / this.catsProcessed) * 98, 98);
      this.targetWeights.body = Math.min((newBody / this.catsProcessed) * 99, 99);

      setTimeout(() => {
        // Animar barras
        this.weights.ears = this.targetWeights.ears;
        this.weights.whiskers = this.targetWeights.whiskers;
        this.weights.body = this.targetWeights.body;
        
        setTimeout(() => {
          this.isExtracting = false;
        }, 1200);
      }, 600);
    }
  },
  mounted() {
    // Estado inicial visual
  },
  beforeUnmount() {
    if (this.scannerInterval) clearInterval(this.scannerInterval);
  }
}
</script>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.5s ease-out;
}
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(30px);
  opacity: 0;
}
.animate-spin-slow {
  animation: spin 3s linear infinite;
  transform-origin: center;
}
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>
