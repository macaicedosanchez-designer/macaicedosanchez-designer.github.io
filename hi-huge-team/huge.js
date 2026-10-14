/* ═══════════════════════════════════════════════════════════════
   PÁGINA HUGE
   1. Banda superior azul mientras está encima del saludo.
   2. Presentaciones: un mismo "escenario" sirve para las destacadas
      (dentro de la página) y para el visor oscuro (galería y botón ampliar).
      Cada presentación trae sus datos en atributos (ver _includes/huge-deck.html):
      imágenes <id>_deck_NN_pagina.jpg, o una lista en data-archivos;
      las diapositivas de data-videos se ven como <id>_deck_NN_animacion.mp4.
   Pasar: flechas, teclado, deslizar o clic en la diapositiva.
   Visor: ⛶ pantalla completa, ✕ o Esc para salir.
   ═══════════════════════════════════════════════════════════════ */
(function () {
  var html = document.documentElement;
  function idioma() { return html.getAttribute('data-lang') === 'en' ? 'En' : 'Es'; }

  // ── 1 · Banda superior azul sobre el saludo ──
  var saludo = document.querySelector('.huge-saludo');
  if (saludo) {
    var marcar = function () { document.body.classList.toggle('sobre-azul', saludo.getBoundingClientRect().bottom > 64); };
    addEventListener('scroll', marcar, { passive: true }); marcar();
  }

  // ── 2 · Lista de diapositivas de una presentación ──
  function diapositivas(el) {
    var base = el.dataset.base + '/';
    if (el.dataset.archivos) return el.dataset.archivos.split(',').map(function (f) { return { img: base + f }; });
    var vids = (el.dataset.videos || '').split(',').map(Number), lista = [];
    for (var k = 1; k <= +el.dataset.paginas; k++) {
      var nn = (k < 10 ? '0' : '') + k, raiz = base + el.dataset.id + '_deck_' + nn;
      lista.push({ img: raiz + '_pagina.jpg', video: vids.indexOf(k) > -1 ? raiz + '_animacion.mp4' : null });
    }
    return lista;
  }

  // Un escenario: imagen + video encima. La imagen se ve mientras el video carga.
  function escenario(caja, alCambiar) {
    caja.classList.add('escena');
    var img = document.createElement('img'); img.alt = ''; img.decoding = 'async'; img.draggable = false;
    var vid = document.createElement('video'); vid.muted = true; vid.loop = true; vid.playsInline = true; vid.preload = 'none';
    vid.setAttribute('muted', ''); vid.setAttribute('playsinline', ''); vid.hidden = true;
    caja.append(img, vid);
    vid.addEventListener('playing', function () { vid.classList.add('listo'); });
    var e = { lista: [], i: 0 };
    e.ir = function (k) {
      var n = e.lista.length; if (!n) return;
      e.i = (k + n) % n;
      var d = e.lista[e.i];
      img.src = d.img;
      vid.classList.remove('listo'); vid.pause();
      if (d.video) { vid.hidden = false; vid.poster = d.img; vid.src = d.video; var p = vid.play(); if (p && p.catch) p.catch(function () {}); }
      else if (!vid.hidden) { vid.hidden = true; vid.removeAttribute('src'); vid.load(); }
      var sig = e.lista[(e.i + 1) % n]; if (sig) (new Image()).src = sig.img;
      if (alCambiar) alCambiar(e.i, n);
    };
    e.cargar = function (lista, k) { e.lista = lista; e.ir(k || 0); };
    e.parar = function () { vid.pause(); vid.hidden = true; vid.removeAttribute('src'); vid.load(); img.removeAttribute('src'); };
    return e;
  }

  // Deslizar con el dedo
  function deslizar(el, fn) {
    var x0 = null;
    el.addEventListener('touchstart', function (ev) { x0 = ev.touches[0].clientX; }, { passive: true });
    el.addEventListener('touchend', function (ev) {
      if (x0 === null) return;
      var dx = ev.changedTouches[0].clientX - x0; x0 = null;
      if (Math.abs(dx) > 40) fn(dx < 0 ? 1 : -1);
    });
  }
  function boton(padre, clase, texto, etiqueta) {
    var b = document.createElement('button'); b.type = 'button'; b.className = 'btn ' + clase;
    b.textContent = texto; b.setAttribute('aria-label', etiqueta); padre.appendChild(b); return b;
  }

  // ── 3 · Visor oscuro (uno para toda la página) ──
  var visor = document.querySelector('.visor-deck'), vEsc = null, vNombre = null, origen = null, alCerrar = null;
  if (visor) {
    vNombre = visor.querySelector('.nombre');
    var vCont = visor.querySelector('.contador');
    vEsc = escenario(visor.querySelector('.escenario'), function (i, n) { vCont.textContent = (i + 1) + ' / ' + n; });
    var cerrar = function () {
      if (document.fullscreenElement) document.exitFullscreen();
      visor.hidden = true; document.body.classList.remove('visor-abierto');
      if (alCerrar) { alCerrar(vEsc.i); alCerrar = null; }
      vEsc.parar();
      if (origen) origen.focus();
    };
    visor.querySelector('.v-prev').addEventListener('click', function () { vEsc.ir(vEsc.i - 1); });
    visor.querySelector('.v-next').addEventListener('click', function () { vEsc.ir(vEsc.i + 1); });
    visor.querySelector('.v-cerrar').addEventListener('click', cerrar);
    visor.querySelector('.escenario').addEventListener('click', function () { vEsc.ir(vEsc.i + 1); });
    var grande = visor.querySelector('.v-grande');
    if (!visor.requestFullscreen) grande.hidden = true;
    grande.addEventListener('click', function () {
      if (document.fullscreenElement) document.exitFullscreen(); else visor.requestFullscreen();
    });
    deslizar(visor, function (d) { vEsc.ir(vEsc.i + d); });
    document.addEventListener('keydown', function (ev) {
      if (visor.hidden) return;
      var k = ev.key;
      if (k === 'ArrowRight' || k === 'PageDown' || k === ' ') { ev.preventDefault(); vEsc.ir(vEsc.i + 1); }
      else if (k === 'ArrowLeft' || k === 'PageUp') { ev.preventDefault(); vEsc.ir(vEsc.i - 1); }
      else if (k === 'Home') { ev.preventDefault(); vEsc.ir(0); }
      else if (k === 'End') { ev.preventDefault(); vEsc.ir(vEsc.lista.length - 1); }
      else if (k === 'Escape' && !document.fullscreenElement) cerrar();
      else if (k === 'Tab') {   // el foco no sale del visor
        var b = Array.prototype.filter.call(visor.querySelectorAll('button'), function (x) { return !x.hidden; });
        var a = b.indexOf(document.activeElement);
        if (ev.shiftKey && a <= 0) { ev.preventDefault(); b[b.length - 1].focus(); }
        else if (!ev.shiftKey && a === b.length - 1) { ev.preventDefault(); b[0].focus(); }
      }
    });
  }
  function abrirVisor(el, k, desde) {
    if (!visor) return;
    origen = desde || null;
    vNombre.textContent = el.dataset['titulo' + idioma()];
    visor.hidden = false; document.body.classList.add('visor-abierto');
    vEsc.cargar(diapositivas(el), k);
    visor.querySelector('.v-cerrar').focus();
  }

  // ── 4 · Destacadas: presentación dentro de la página ──
  document.querySelectorAll('.deck').forEach(function (el) {
    // La diapositiva arriba; los mandos en una barra debajo (contador · ← → ⛶), nunca encima de la imagen
    var caja = document.createElement('div'); el.appendChild(caja);
    var prog = document.createElement('div'); prog.className = 'deck-progreso';
    var barra = document.createElement('div'); barra.className = 'deck-barra'; el.appendChild(barra);
    var cont = document.createElement('div'); cont.className = 'deck-contador'; barra.appendChild(cont);
    var e = escenario(caja, function (i, n) { cont.textContent = (i + 1) + ' / ' + n; prog.style.width = ((i + 1) / n * 100) + '%'; });
    caja.appendChild(prog);
    var prev = boton(barra, 'deck-flecha deck-prev', '←', 'Anterior / Previous');
    var next = boton(barra, 'deck-flecha deck-next', '→', 'Siguiente / Next');
    var amp = boton(barra, 'deck-ampliar', '', 'Ampliar / Enlarge');
    amp.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg>';
    prev.addEventListener('click', function () { e.ir(e.i - 1); });
    next.addEventListener('click', function () { e.ir(e.i + 1); });
    caja.addEventListener('click', function () { e.ir(e.i + 1); });
    amp.addEventListener('click', function () {
      e.parar(); abrirVisor(el, e.i, amp);
      alCerrar = function (k) { e.ir(k); };   // al salir, la destacada sigue en la misma diapositiva
    });
    deslizar(el, function (d) { e.ir(e.i + d); });
    el.tabIndex = 0;
    el.addEventListener('keydown', function (ev) {
      if (ev.target !== el) return;
      if (ev.key === 'ArrowRight') { ev.preventDefault(); e.ir(e.i + 1); }
      else if (ev.key === 'ArrowLeft') { ev.preventDefault(); e.ir(e.i - 1); }
    });
    // Solo carga cuando se acerca a la pantalla
    var lista = diapositivas(el);
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (es) { if (es[0].isIntersecting) { e.cargar(lista, 0); io.disconnect(); } }, { rootMargin: '300px' });
      io.observe(el);
    } else e.cargar(lista, 0);
  });

  // ── 5 · Fotos "en uso" de las destacadas: cada una abre el visor en esa foto ──
  document.querySelectorAll('.en-uso').forEach(function (g) {
    g.querySelectorAll('.en-uso-foto').forEach(function (b, k) {
      b.addEventListener('click', function () { abrirVisor(g, k, b); });
    });
  });

  // ── 6 · Galería ──
  document.querySelectorAll('.huge-galeria .tarjeta').forEach(function (t) {
    t.addEventListener('click', function () { abrirVisor(t, 0, t); });
  });
})();
