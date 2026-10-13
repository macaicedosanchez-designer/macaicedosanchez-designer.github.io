/* ═══════════════════════════════════════════════════════════════
   PÁGINA HUGE: visor oscuro de la galería.
   Cada tarjeta trae data-id y data-paginas; las imágenes se llaman
   <id>_deck_NN_pagina.jpg en el repositorio media.
   Pasar: flechas, teclado, deslizar o clic en la lámina.
   Agrandar: pantalla completa. Salir: ✕, Esc o clic en el fondo.
   ═══════════════════════════════════════════════════════════════ */
(function () {
  // Banda superior azul mientras está encima del saludo
  var saludo = document.querySelector('.huge-saludo');
  if (saludo) {
    var marcar = function () { document.body.classList.toggle('sobre-azul', saludo.getBoundingClientRect().bottom > 64); };
    addEventListener('scroll', marcar, { passive: true }); marcar();
  }

  var visor = document.querySelector('.visor-deck');
  if (!visor) return;
  var media = visor.dataset.media, img = visor.querySelector('.lamina img');
  var nombre = visor.querySelector('.nombre'), cont = visor.querySelector('.contador');
  var id = '', n = 0, i = 0, origen = null;

  function url(k) { return media + '/' + id + '_deck_' + (k < 9 ? '0' : '') + (k + 1) + '_pagina.jpg'; }
  function precargar(k) { if (k >= 0 && k < n) { var p = new Image(); p.src = url(k); } }
  function ir(k) {
    i = (k + n) % n;
    img.src = url(i);
    cont.textContent = (i + 1) + ' / ' + n;
    precargar(i + 1); precargar(i - 1);
  }

  function abrir(t) {
    origen = t; id = t.dataset.id; n = +t.dataset.paginas;
    var idioma = document.documentElement.getAttribute('data-lang') === 'en' ? 'En' : 'Es';
    nombre.textContent = t.dataset['titulo' + idioma];
    visor.hidden = false; document.body.classList.add('visor-abierto');
    ir(0);
    visor.querySelector('.v-cerrar').focus();
  }
  function cerrar() {
    if (document.fullscreenElement) document.exitFullscreen();
    visor.hidden = true; document.body.classList.remove('visor-abierto');
    img.removeAttribute('src');
    if (origen) origen.focus();
  }

  document.querySelectorAll('.huge-galeria .tarjeta').forEach(function (t) {
    t.addEventListener('click', function () { abrir(t); });
  });
  visor.querySelector('.v-prev').addEventListener('click', function () { ir(i - 1); });
  visor.querySelector('.v-next').addEventListener('click', function () { ir(i + 1); });
  visor.querySelector('.v-cerrar').addEventListener('click', cerrar);
  visor.querySelector('.lamina').addEventListener('click', function (e) {
    if (e.target === img) ir(i + 1); else cerrar();   // clic en la lámina avanza; en el fondo, cierra
  });
  var grande = visor.querySelector('.v-grande');
  if (!visor.requestFullscreen) grande.hidden = true;
  grande.addEventListener('click', function () {
    if (document.fullscreenElement) document.exitFullscreen(); else visor.requestFullscreen();
  });

  document.addEventListener('keydown', function (e) {
    if (visor.hidden) return;
    if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') { e.preventDefault(); ir(i + 1); }
    else if (e.key === 'ArrowLeft' || e.key === 'PageUp') { e.preventDefault(); ir(i - 1); }
    else if (e.key === 'Home') { e.preventDefault(); ir(0); }
    else if (e.key === 'End') { e.preventDefault(); ir(n - 1); }
    else if (e.key === 'Escape' && !document.fullscreenElement) cerrar();
    else if (e.key === 'Tab') {   // el foco no sale del visor
      var b = Array.prototype.filter.call(visor.querySelectorAll('button'), function (x) { return !x.hidden; });
      var a = b.indexOf(document.activeElement);
      if (e.shiftKey && a <= 0) { e.preventDefault(); b[b.length - 1].focus(); }
      else if (!e.shiftKey && a === b.length - 1) { e.preventDefault(); b[0].focus(); }
    }
  });

  var x0 = null;
  visor.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
  visor.addEventListener('touchend', function (e) {
    if (x0 === null) return;
    var dx = e.changedTouches[0].clientX - x0; x0 = null;
    if (Math.abs(dx) > 40) ir(dx < 0 ? i + 1 : i - 1);
  });
})();
