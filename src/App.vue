<template>
  <div class="flex flex-col h-full w-full bg-gray-50 font-body">
    <!-- Contenedor Principal (Diapositivas) -->
    <main class="flex-grow relative overflow-hidden flex items-center justify-center">
      <transition name="slide-fade" mode="out-in">
        <component :is="slides[currentSlide]"></component>
      </transition>
    </main>

    <!-- Barra de Navegación Inferior (Tema ISAGEN) -->
    <footer class="bg-isagen-dark text-white p-5 flex justify-between items-center z-10 shadow-lg border-t-4 border-isagen-green">
      <div class="flex items-center space-x-4">
        <!-- Logo o marca pequeña opcional -->
        <span class="font-heading font-bold text-xl tracking-wider opacity-80 border-r border-gray-600 pr-4">ISAGEN<span class="text-isagen-green">.</span></span>
        
        <button
          @click="prevSlide"
          :disabled="currentSlide === 0"
          class="px-5 py-2.5 bg-isagen-blue font-heading font-semibold rounded disabled:opacity-30 disabled:cursor-not-allowed hover:bg-isagen-light-blue transition-all"
        >
          &larr; Ant
        </button>
      </div>
      
      <!-- Indicadores de progreso -->
      <div class="flex space-x-4 items-center bg-black bg-opacity-20 px-6 py-2 rounded-full">
        <button
          v-for="(slide, index) in slides"
          :key="index"
          @click="currentSlide = index"
          :class="[
            'w-3 h-3 rounded-full transition-all duration-300 shadow-sm border border-gray-600', 
            currentSlide === index ? 'bg-isagen-green border-isagen-green scale-150 ring-2 ring-isagen-green ring-opacity-30' : 'bg-transparent hover:bg-gray-500'
          ]"
          :aria-label="'Ir a diapositiva ' + (index + 1)"
        ></button>
      </div>

      <div class="flex items-center space-x-4">
        <div class="text-sm font-mono opacity-50 mr-2 hidden md:block">
          {{ currentSlide + 1 }} / {{ slides.length }}
        </div>
        <button
          @click="nextSlide"
          :disabled="currentSlide === slides.length - 1"
          class="px-5 py-2.5 bg-isagen-blue font-heading font-semibold rounded disabled:opacity-30 disabled:cursor-not-allowed hover:bg-isagen-light-blue transition-all"
        >
          Sig &rarr;
        </button>
      </div>
    </footer>
  </div>
</template>

<script>
// Importamos los componentes de las diapositivas
import SlidePortada from './components/SlidePortada.vue';
import SlideEquipo from './components/SlideEquipo.vue';
import SlideProblemaGato from './components/SlideProblemaGato.vue';
import SlideSolucionProbabilistica from './components/SlideSolucionProbabilistica.vue';
import SlideHistoriaIA from './components/SlideHistoriaIA.vue';
import SlideTransformers from './components/SlideTransformers.vue';
import SlideEtapasIA from './components/SlideEtapasIA.vue';
import SlideEstadoArte from './components/SlideEstadoArte.vue';
import SlideEstadoLLM from './components/SlideEstadoLLM.vue';
import SlideContextoLLM from './components/SlideContextoLLM.vue';
import SlideRAG from './components/SlideRAG.vue';
import SlideCierre from './components/SlideCierre.vue';

export default {
  name: 'App',
  components: {
    SlidePortada,
    SlideEquipo,
    SlideProblemaGato,
    SlideSolucionProbabilistica,
    SlideHistoriaIA,
    SlideTransformers,
    SlideEtapasIA,
    SlideEstadoArte,
    SlideEstadoLLM,
    SlideContextoLLM,
    SlideRAG,
    SlideCierre
  },
  data() {
    return {
      currentSlide: 0,
      // Nombres de los componentes registrados para renderizado dinámico (Orden Lógico de la Presentación)
      slides: [
        'SlidePortada', 
        'SlideEquipo', 
        'SlideProblemaGato', 
        'SlideSolucionProbabilistica', 
        'SlideHistoriaIA', 
        'SlideTransformers',
        'SlideContextoLLM',
        'SlideRAG',
        'SlideEtapasIA', 
        'SlideEstadoArte', 
        'SlideEstadoLLM',
        'SlideCierre'
      ]
    }
  },
  methods: {
    nextSlide() {
      if (this.currentSlide < this.slides.length - 1) {
        this.currentSlide++;
      }
    },
    prevSlide() {
      if (this.currentSlide > 0) {
        this.currentSlide--;
      }
    },
    handleKeydown(e) {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        this.nextSlide();
      } else if (e.key === 'ArrowLeft') {
        this.prevSlide();
      }
    }
  },
  mounted() {
    window.addEventListener('keydown', this.handleKeydown);
  },
  beforeUnmount() {
    window.removeEventListener('keydown', this.handleKeydown);
  }
}
</script>
