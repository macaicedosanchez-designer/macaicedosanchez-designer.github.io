/* ═══════════════════════════════════════════════════════════════
   BLOQUES — comportamientos reutilizables.
   Cada bloque se activa poniendo data-bloque="nombre" en el HTML.
   No hace falta escribir JavaScript para agregar un caso nuevo:
   basta con copiar el HTML de _plantillas/caso/index.html.

   Bloques disponibles:
   revelar · palabras · lineas · contador · carrusel · pestanas ·
   libro · mosaico · carrete · fijo-scroll · giro · zoom · secuencia ·
   iframe-diferido · barras · linea-tiempo · salas · parallax ·
   palabras-grandes · rotacion · filtros · 360
   ═══════════════════════════════════════════════════════════════ */
(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reducido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Observador general: agrega .visto cuando el elemento entra en pantalla */
  var obs = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('visto'); e.target.dispatchEvent(new CustomEvent('visto')); obs.unobserve(e.target); }
    });
  }, { threshold: 0.25 });

  /* ── revelar: aparece al llegar ── */
  $$('.revelar, [data-bloque="revelar"]').forEach(function (el) { el.classList.add('revelar'); obs.observe(el); });

  /* ── palabras: frase palabra por palabra ── */
  $$('[data-bloque="palabras"]').forEach(function (el) {
    $$('[lang], :scope > span:not([lang])', el).forEach(function (bloque) {
      if (bloque.querySelector('.w')) return;
      bloque.innerHTML = bloque.textContent.trim().split(/\s+/).map(function (w, i) {
        return '<span class="w" style="transition-delay:' + (i * 0.12) + 's">' + w + '</span>';
      }).join(' ');
    });
    if (!el.querySelector('[lang]')) {
      el.innerHTML = el.textContent.trim().split(/\s+/).map(function (w, i) {
        return '<span class="w" style="transition-delay:' + (i * 0.12) + 's">' + w + '</span>';
      }).join(' ');
    }
    el.classList.add('palabras'); obs.observe(el);
  });

  /* ── lineas: frase línea por línea (cada <br> o <span class="l">) ── */
  $$('[data-bloque="lineas"]').forEach(function (el) {
    $$('.l', el).forEach(function (l, i) { l.style.transitionDelay = (i * 0.35) + 's'; });
    el.classList.add('lineas'); obs.observe(el);
  });

  /* ── contador: número que cuenta desde cero ── */
  $$('[data-bloque="contador"]').forEach(function (el) {
    var fin = parseFloat(el.dataset.valor || el.textContent), sufijo = el.dataset.sufijo || '';
    el.textContent = '0' + sufijo;
    el.addEventListener('visto', function () {
      if (reducido) { el.textContent = fin + sufijo; return; }
      var t0 = null, dur = 1400;
      function paso(t) {
        if (!t0) t0 = t;
        var p = Math.min((t - t0) / dur, 1), e = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(fin * e) + sufijo;
        if (p < 1) requestAnimationFrame(paso);
      }
      requestAnimationFrame(paso);
    });
    obs.observe(el);
  });

  /* ── carrusel: una imagen a la vez, flechas, contador, puntos, autoplay ── */
  $$('[data-bloque="carrusel"]').forEach(function (el) {
    var pista = $('.pista', el), items = $$(':scope > *', pista), n = items.length, i = 0, timer = null;
    var auto = parseInt(el.dataset.auto || '0', 10);
    var ctrl = document.createElement('div'); ctrl.className = 'controles';
    var cont = document.createElement('div'); cont.className = 'contador';
    var flechas = document.createElement('div'); flechas.className = 'flechas';
    var prev = document.createElement('button'); prev.className = 'btn'; prev.textContent = '←'; prev.setAttribute('aria-label', 'Anterior');
    var next = document.createElement('button'); next.className = 'btn'; next.textContent = '→'; next.setAttribute('aria-label', 'Siguiente');
    flechas.appendChild(prev); flechas.appendChild(next);
    if (auto) { var pausa = document.createElement('button'); pausa.className = 'btn'; pausa.textContent = '❚❚'; pausa.setAttribute('aria-label', 'Pausar'); flechas.appendChild(pausa); }
    ctrl.appendChild(cont); ctrl.appendChild(flechas); el.appendChild(ctrl);
    var rot = $('.rotulo', el);
    function ir(k) {
      i = (k + n) % n; pista.style.transform = 'translateX(' + (-100 * i) + '%)';
      cont.textContent = (i + 1) + ' / ' + n;
      if (rot) { var r = items[i].dataset.rotulo; if (r) rot.innerHTML = r; }
      items.forEach(function (it, j) { it.setAttribute('aria-hidden', j !== i); });
    }
    prev.addEventListener('click', function () { ir(i - 1); reiniciar(); });
    next.addEventListener('click', function () { ir(i + 1); reiniciar(); });
    function reiniciar() { if (!auto || reducido) return; clearInterval(timer); timer = setInterval(function () { ir(i + 1); }, auto * 1000); }
    if (auto) {
      pausa.addEventListener('click', function () {
        if (timer) { clearInterval(timer); timer = null; pausa.textContent = '▶'; }
        else { reiniciar(); pausa.textContent = '❚❚'; }
      });
    }
    // deslizar con el dedo
    var x0 = null;
    el.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    el.addEventListener('touchend', function (e) {
      if (x0 === null) return; var dx = e.changedTouches[0].clientX - x0; x0 = null;
      if (Math.abs(dx) > 40) { ir(dx < 0 ? i + 1 : i - 1); reiniciar(); }
    });
    ir(0); reiniciar();
  });

  /* ── pestanas ── */
  $$('[data-bloque="pestanas"]').forEach(function (el) {
    var tabs = $$('[role="tab"]', el), paneles = tabs.map(function (t) { return document.getElementById(t.getAttribute('aria-controls')); });
    function activar(k) {
      tabs.forEach(function (t, j) { t.setAttribute('aria-selected', j === k); });
      paneles.forEach(function (p, j) { if (p) p.hidden = j !== k; });
      // Resaltadores opcionales: cualquier [data-fase="N"] de la misma sección se enciende con la pestaña N
      var sec = el.closest('section') || document;
      $$('[data-fase]', sec).forEach(function (r) { r.classList.toggle('activo', parseInt(r.dataset.fase, 10) === k + 1); });
      el.dispatchEvent(new CustomEvent('pestana', { detail: k }));
    }
    tabs.forEach(function (t, k) { t.addEventListener('click', function () { activar(k); }); });
    activar(0);
  });

  /* ── libro: carrusel tipo libro con miniaturas ── */
  $$('[data-bloque="libro"]').forEach(function (el) {
    var paginas = $$('.pagina', el), n = paginas.length, i = 0;
    var barra = document.createElement('div'); barra.className = 'barra';
    var prev = document.createElement('button'); prev.className = 'btn'; prev.textContent = '← Anterior';
    var cont = document.createElement('span'); cont.className = 'contador';
    var next = document.createElement('button'); next.className = 'btn'; next.textContent = 'Siguiente →';
    barra.appendChild(prev); barra.appendChild(cont); barra.appendChild(next);
    $('.paginas', el).after(barra);
    var minis = null;
    if (el.dataset.miniaturas !== 'no') {
      minis = document.createElement('div'); minis.className = 'miniaturas';
      paginas.forEach(function (p, k) {
        var b = document.createElement('button'); var im = document.createElement('img');
        im.src = $('img', p).src; im.alt = ''; im.loading = 'lazy'; b.appendChild(im);
        b.addEventListener('click', function () { ir(k); }); minis.appendChild(b);
      });
      barra.after(minis);
    }
    function ir(k) {
      var prevI = i; i = (k + n) % n;
      paginas.forEach(function (p, j) { p.classList.remove('saliendo'); p.setAttribute('aria-current', j === i); });
      if (prevI !== i) { paginas[prevI].classList.add('saliendo'); setTimeout(function () { paginas[prevI].classList.remove('saliendo'); }, 600); }
      cont.textContent = (i + 1) + ' / ' + n;
      if (minis) $$('button', minis).forEach(function (b, j) { b.setAttribute('aria-current', j === i); if (j === i) b.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' }); });
    }
    prev.addEventListener('click', function () { ir(i - 1); });
    next.addEventListener('click', function () { ir(i + 1); });
    var x0 = null;
    el.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    el.addEventListener('touchend', function (e) { if (x0 === null) return; var dx = e.changedTouches[0].clientX - x0; x0 = null; if (Math.abs(dx) > 40) ir(dx < 0 ? i + 1 : i - 1); });
    ir(0);
  });

  /* ── mosaico: clic amplía dentro del mismo mosaico ── */
  $$('[data-bloque="mosaico"]').forEach(function (el) {
    $$('figure', el).forEach(function (f) {
      f.addEventListener('click', function () {
        var estaba = f.classList.contains('ampliada');
        $$('figure', el).forEach(function (g) { g.classList.remove('ampliada'); });
        if (!estaba) { f.classList.add('ampliada'); f.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); }
      });
    });
  });

  /* ── carrete: scroll vertical mueve las imágenes en horizontal ── */
  $$('[data-bloque="carrete"]').forEach(function (el) {
    var tira = $('.tira', el), n = $$('figure', tira).length;
    var cont = document.createElement('div'); cont.className = 'contador'; $('.ventana', el).appendChild(cont);
    function mover() {
      if (window.innerWidth <= 720) return;
      var r = el.getBoundingClientRect(), total = el.offsetHeight - window.innerHeight;
      var p = Math.min(Math.max(-r.top / total, 0), 1);
      tira.style.transform = 'translateX(' + (-p * (n - 1) * 100) + 'vw)';
      cont.textContent = (Math.min(Math.round(p * (n - 1)) + 1, n)) + ' / ' + n;
    }
    window.addEventListener('scroll', mover, { passive: true }); window.addEventListener('resize', mover); mover();
  });

  /* ── fijo-scroll: imagen fija, texto por tramos, la imagen cambia según el tramo ── */
  $$('[data-bloque="fijo-scroll"]').forEach(function (el) {
    var imgs = $$('.ancla img', el), tramos = $$('.tramos > *', el);
    var o = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        tramos.forEach(function (t) { t.classList.toggle('activo', t === e.target); });
        var k = e.target.dataset.imagen;
        if (k !== undefined) imgs.forEach(function (im, j) { var g = im.dataset.grupo !== undefined ? im.dataset.grupo : String(j); im.setAttribute('aria-current', g === String(k)); });
      });
    }, { rootMargin: '-40% 0px -40% 0px' });
    tramos.forEach(function (t) { o.observe(t); });
    imgs.forEach(function (im, j) { var g = im.dataset.grupo !== undefined ? im.dataset.grupo : String(j); im.setAttribute('aria-current', g === '0'); });
  });

  /* ── giro: tarjetas que giran al hacer clic ── */
  $$('[data-bloque="giro"]').forEach(function (t) {
    t.addEventListener('click', function () { t.classList.toggle('girada'); });
    t.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); t.classList.toggle('girada'); } });
    t.setAttribute('tabindex', '0');
  });

  /* ── zoom: ampliar y arrastrar dentro de la sección, con puntos que despliegan notas ── */
  $$('[data-bloque="zoom"]').forEach(function (el) {
    var lienzo = $('.lienzo', el), s = 1, tx = 0, ty = 0, arr = false, px = 0, py = 0;
    var c = document.createElement('div'); c.className = 'controles';
    ['+', '−', '⟲'].forEach(function (t) { var b = document.createElement('button'); b.className = 'btn'; b.textContent = t; c.appendChild(b); });
    el.appendChild(c);
    function aplicar() { lienzo.style.transform = 'translate(' + tx + 'px,' + ty + 'px) scale(' + s + ')'; }
    var bs = $$('button', c);
    bs[0].addEventListener('click', function () { s = Math.min(s * 1.4, 5); aplicar(); });
    bs[1].addEventListener('click', function () { s = Math.max(s / 1.4, 1); if (s === 1) { tx = ty = 0; } aplicar(); });
    bs[2].addEventListener('click', function () { s = 1; tx = ty = 0; aplicar(); });
    el.addEventListener('pointerdown', function (e) { if (e.target.closest('button, .punto, .nota')) return; arr = true; px = e.clientX - tx; py = e.clientY - ty; el.classList.add('arrastrando'); el.setPointerCapture(e.pointerId); });
    el.addEventListener('pointermove', function (e) { if (!arr) return; tx = e.clientX - px; ty = e.clientY - py; aplicar(); });
    el.addEventListener('pointerup', function () { arr = false; el.classList.remove('arrastrando'); });
    el.addEventListener('wheel', function (e) { if (!e.ctrlKey) return; e.preventDefault(); s = Math.min(Math.max(s * (e.deltaY < 0 ? 1.1 : 0.9), 1), 5); aplicar(); }, { passive: false });
    $$('.punto', el).forEach(function (p) {
      var nota = document.getElementById(p.getAttribute('aria-controls'));
      p.addEventListener('click', function () {
        var abierto = p.getAttribute('aria-expanded') === 'true';
        $$('.punto', el).forEach(function (q) { q.setAttribute('aria-expanded', 'false'); });
        $$('.nota', el).forEach(function (q) { q.hidden = true; });
        if (!abierto && nota) { p.setAttribute('aria-expanded', 'true'); nota.hidden = false; nota.style.left = p.style.left; nota.style.top = p.style.top; }
      });
    });
  });

  /* ── secuencia: visor animado con barra de progreso, pausa y rótulos ── */
  $$('[data-bloque="secuencia"]').forEach(function (el) {
    var imgs = $$('img', el), n = imgs.length, i = 0, dur = (parseFloat(el.dataset.segundos || '7')) * 1000, t0 = 0, raf = null, activo = true;
    var prog = document.createElement('div'); prog.className = 'progreso'; el.appendChild(prog);
    var rot = document.createElement('div'); rot.className = 'rotulos';
    imgs.forEach(function (im, k) { var b = document.createElement('button'); b.innerHTML = im.dataset.rotulo || (k + 1); b.addEventListener('click', function () { ir(k); }); rot.appendChild(b); });
    el.appendChild(rot);
    var pausa = document.createElement('button'); pausa.className = 'btn pausar'; pausa.textContent = '❚❚'; el.appendChild(pausa);
    var botones = $$('button', rot);
    function ir(k) { i = (k + n) % n; imgs.forEach(function (im, j) { im.setAttribute('aria-current', j === i); }); botones.forEach(function (b, j) { b.setAttribute('aria-current', j === i); }); t0 = performance.now(); }
    function tick(t) {
      if (activo && !reducido) { var p = (t - t0) / dur; prog.style.width = Math.min(p, 1) * 100 + '%'; if (p >= 1) ir(i + 1); }
      raf = requestAnimationFrame(tick);
    }
    pausa.addEventListener('click', function () { activo = !activo; pausa.textContent = activo ? '❚❚' : '▶'; if (activo) t0 = performance.now(); });
    ir(0); raf = requestAnimationFrame(tick);
  });

  /* ── iframe-diferido: carga la web al tocar o al llegar (data-al-llegar) ── */
  $$('[data-bloque="iframe-diferido"]').forEach(function (el) {
    var src = el.dataset.src, cargado = false;
    function cargar() {
      if (cargado) return; cargado = true;
      var f = document.createElement('iframe'); f.src = src; f.allow = 'fullscreen; accelerometer; gyroscope'; f.loading = 'lazy'; f.title = el.dataset.titulo || '';
      el.appendChild(f); $$('img, .btn-pildora', el).forEach(function (x) { x.remove(); });
    }
    $$('.btn-pildora', el).forEach(function (b) { b.addEventListener('click', cargar); });
    if (el.dataset.alLlegar !== undefined && window.innerWidth > 720) {
      var o = new IntersectionObserver(function (es) { if (es[0].isIntersecting) { cargar(); o.disconnect(); } }, { rootMargin: '200px' }); o.observe(el);
    }
  });

  /* ── barras: crecen al aparecer ── */
  $$('[data-bloque="barras"]').forEach(function (el) {
    var max = Math.max.apply(null, $$('.fila', el).map(function (f) { return parseFloat(f.dataset.valor); }));
    $$('.fila', el).forEach(function (f) { $('.barra span', f).style.setProperty('--w', (parseFloat(f.dataset.valor) / max * 100) + '%'); });
    el.classList.add('barras'); obs.observe(el);
  });

  /* ── linea-tiempo: bloques proporcionales; clic muestra el detalle ── */
  $$('[data-bloque="linea-tiempo"]').forEach(function (el) {
    var bs = $$('.linea-tiempo button', el), det = $$('.linea-tiempo-detalle > *', el);
    bs.forEach(function (b, k) {
      b.style.setProperty('--min', b.dataset.min);
      b.addEventListener('click', function () {
        var abierto = b.getAttribute('aria-expanded') === 'true';
        bs.forEach(function (x) { x.setAttribute('aria-expanded', 'false'); }); det.forEach(function (d) { d.classList.remove('activo'); });
        if (!abierto) { b.setAttribute('aria-expanded', 'true'); if (det[k]) det[k].classList.add('activo'); }
      });
    });
    if (bs[0]) bs[0].click();
  });

  /* ── salas: barra fija que resalta la sección visible y marca las visitadas ── */
  $$('[data-bloque="salas"]').forEach(function (el) {
    var links = $$('a[href^="#"]', el);
    var secs = links.map(function (a) { return document.getElementById(a.getAttribute('href').slice(1)); });
    var o = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        var k = secs.indexOf(e.target); if (k < 0) return;
        if (e.isIntersecting) { links.forEach(function (a, j) { a.setAttribute('aria-current', j === k); }); links[k].classList.add('visitada'); }
      });
    }, { rootMargin: '-35% 0px -55% 0px' });
    secs.forEach(function (s) { if (s) o.observe(s); });
    links.forEach(function (a) {
      a.addEventListener('click', function (e) {
        var s = document.getElementById(a.getAttribute('href').slice(1)); if (!s) return; e.preventDefault();
        var top = s.getBoundingClientRect().top + window.scrollY - el.offsetHeight - (parseInt(getComputedStyle(document.documentElement).getPropertyValue('--alto-header')) || 80);
        window.scrollTo({ top: top, behavior: reducido ? 'auto' : 'smooth' });
      });
    });
  });

  /* ── parallax: la imagen se mueve más lento que el scroll ── */
  if (!reducido) {
    var pars = $$('[data-bloque="parallax"]');
    function parallax() {
      pars.forEach(function (im) {
        var r = im.parentElement.getBoundingClientRect();
        if (r.bottom < 0 || r.top > window.innerHeight) return;
        var f = parseFloat(im.dataset.factor || '0.15');
        im.style.transform = 'translateY(' + ((r.top + r.height / 2 - window.innerHeight / 2) * f) + 'px)';
      });
    }
    if (pars.length) { window.addEventListener('scroll', parallax, { passive: true }); parallax(); }
  }

  /* ── palabras-grandes: se encienden una a una con el scroll ── */
  $$('[data-bloque="palabras-grandes"]').forEach(function (el) {
    var ws = $$(':scope > span', el);
    function marcar() {
      var r = el.getBoundingClientRect(), p = (window.innerHeight / 2 - r.top) / r.height;
      var k = Math.floor(p * ws.length);
      ws.forEach(function (w, j) { w.classList.toggle('activa', j <= k); });
    }
    window.addEventListener('scroll', marcar, { passive: true }); marcar();
  });

  /* ── rotacion: imagen que cambia cada N segundos con fundido (botones del Home) ── */
  $$('[data-bloque="rotacion"]').forEach(function (el) {
    var imgs = $$('img', el), n = imgs.length, i = 0, seg = parseFloat(el.dataset.segundos || '5');
    if (n < 2 || reducido) return;
    setInterval(function () { i = (i + 1) % n; imgs.forEach(function (im, j) { im.classList.toggle('activa', j === i); }); }, seg * 1000);
  });

  /* ── filtros: etiquetas sobre la grilla + botón "Ver más" ── */
  $$('[data-bloque="filtros"]').forEach(function (el) {
    var grilla = document.getElementById(el.dataset.grilla), tarjetas = $$('.tarjeta-proyecto', grilla), botones = $$('.filtro', el);
    var verMas = $('[data-ver-mas]'), limite = parseInt(el.dataset.limite || '9', 10), mostrar = limite, activo = '';
    function pintar() {
      var visibles = 0;
      tarjetas.forEach(function (t) {
        var ok = !activo || (t.dataset.etiquetas || '').split('|').indexOf(activo) >= 0;
        var ver = ok && visibles < mostrar; if (ok) visibles++;
        t.classList.toggle('oculto', !ver);
      });
      if (verMas) verMas.hidden = visibles <= mostrar;
    }
    botones.forEach(function (b) {
      b.addEventListener('click', function () {
        activo = (b.getAttribute('aria-pressed') === 'true') ? '' : b.dataset.etiqueta;
        botones.forEach(function (x) { x.setAttribute('aria-pressed', x.dataset.etiqueta === activo); });
        mostrar = limite; pintar();
      });
    });
    if (verMas) verMas.addEventListener('click', function () { mostrar += limite; pintar(); });
    pintar();
  });

  /* ── 360: visor equirectangular arrastrable (pannellum) ── */
  var visores = $$('[data-bloque="360"]');
  if (visores.length) {
    function iniciar360() {
      visores.forEach(function (el) {
        if (el.dataset.listo) return; el.dataset.listo = '1';
        var caja = document.createElement('div'); el.prepend(caja);
        window.pannellum.viewer(caja, { type: 'equirectangular', panorama: el.dataset.src, autoLoad: true, autoRotate: -2, showControls: false, compass: false, mouseZoom: false, hfov: 100 });
      });
    }
    if (window.pannellum) iniciar360(); else {
      var css = document.createElement('link'); css.rel = 'stylesheet'; css.href = 'https://cdnjs.cloudflare.com/ajax/libs/pannellum/2.5.6/pannellum.min.css'; document.head.appendChild(css);
      var js = document.createElement('script'); js.src = 'https://cdnjs.cloudflare.com/ajax/libs/pannellum/2.5.6/pannellum.min.js'; js.onload = iniciar360; document.head.appendChild(js);
    }
  }
})();
