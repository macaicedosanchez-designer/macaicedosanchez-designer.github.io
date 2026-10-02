/* ═══════════════════════════════════════════════════════════════
   HOME: en el índice del portafolio, la imagen del área sigue al cursor.
   Solo con mouse; en el celular cada fila muestra su miniatura fija (CSS).
   ═══════════════════════════════════════════════════════════════ */
(function () {
  'use strict';
  var vista = document.querySelector('.vista-flotante');
  if (!vista || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  document.querySelectorAll('.fila[data-vista]').forEach(function (fila) {
    fila.addEventListener('pointerenter', function () {
      if (vista.getAttribute('src') !== fila.dataset.vista) vista.src = fila.dataset.vista;
      vista.classList.add('visible');
    });
    fila.addEventListener('pointerleave', function () { vista.classList.remove('visible'); });
    fila.addEventListener('pointermove', function (e) {
      vista.style.setProperty('--x', e.clientX + 'px');
      vista.style.setProperty('--y', e.clientY + 'px');
    });
  });
})();
