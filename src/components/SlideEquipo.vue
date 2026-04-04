<template>
  <div class="flex items-center justify-center min-h-screen w-full bg-gray-50 p-6">
    <div class="max-w-7xl w-full mx-auto">
      
      <div class="text-center mb-12">
        <h2 class="text-4xl md:text-5xl font-bold text-gray-800 mb-4 tracking-tight">El equipo detrás de la solución</h2>
        <div class="w-24 h-1 bg-green-500 mx-auto rounded"></div>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
        <!-- Tarjeta Yuly -->
        <div class="bg-white rounded-2xl shadow-xl p-8 transform transition duration-500 hover:-translate-y-2 flex flex-col items-center text-center border-t-4 border-green-500 relative overflow-hidden group">
          <div class="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-bl-full -z-10 opacity-50 group-hover:scale-110 transition-transform"></div>
          
          <img src="../assets/yuly.jpeg" alt="Yuly" class="w-40 h-40 rounded-full object-cover border-4 border-white shadow-lg mb-6 z-10" />
          
          <h3 class="text-3xl font-bold text-gray-800 mb-1">Yuly</h3>
          <p class="text-sm font-bold text-green-600 uppercase tracking-widest mb-6">Consultora GRC & Emprendedora</p>
          
          <p class="text-gray-600 leading-relaxed text-base md:text-lg px-2">
            Con <strong>+16 años de experiencia</strong>, ayuda a los negocios a nacer y crecer de forma escalable, ética y sostenible. Especialista en <span class="text-gray-800 font-semibold">Gobierno Corporativo, Gestión de Riesgos, Cumplimiento y Control Interno</span>, integrando innovación para maximizar el valor económico y el impacto social y ambiental.
          </p>
        </div>
        
        <!-- Tarjeta Juan -->
        <div class="bg-white rounded-2xl shadow-xl p-8 transform transition duration-500 hover:-translate-y-2 flex flex-col items-center text-center border-t-4 border-blue-600 relative overflow-hidden group">
          <div class="absolute top-0 left-0 w-32 h-32 bg-blue-50 rounded-br-full -z-10 opacity-50 group-hover:scale-110 transition-transform"></div>
          
          <img src="../assets/juan.png" alt="Juan" class="w-40 h-40 rounded-full object-top object-cover border-4 border-white shadow-lg mb-6 z-10" />
          
          <h3 class="text-3xl font-bold text-gray-800 mb-1">Juan</h3>
          <p class="text-sm font-bold text-blue-600 uppercase tracking-widest mb-6">Consultor Senior Automatización & IA</p>
          
          <p class="text-gray-600 leading-relaxed text-base md:text-lg px-2">
            Contador Público con <strong>+15 años</strong> resolviendo problemas operativos costosos mediante software a medida e IA aplicada. Transforma operaciones manuales de alto riesgo en soluciones tecnológicas estables, seguras y eficientes con <span class="text-gray-800 font-semibold">trazabilidad completa y automatización escalable</span>.
          </p>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script>
export default {
  name: 'SlideEquipo'
}
</script>

<style scoped>
/* Estilos específicos si son necesarios, pero usamos Tailwind para casi todo */
</style>
