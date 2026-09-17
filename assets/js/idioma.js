/* ═══════════════════════════════════════════════════════════════
   IDIOMA — una sola página, dos textos.
   Todo lo que tenga lang="es" se ve en español; lang="en" en inglés.
   El idioma elegido se guarda en el navegador y viaja en la URL (?lang=en)
   para que los links compartidos abran en el idioma correcto.
   ═══════════════════════════════════════════════════════════════ */
(function () {
  var html = document.documentElement;

  function leerIdioma() {
    var url = new URLSearchParams(location.search).get('lang');
    if (url === 'es' || url === 'en') return url;
    try { var g = localStorage.getItem('idioma'); if (g === 'es' || g === 'en') return g; } catch (e) {}
    return 'es';
  }

  function aplicar(idioma, guardar) {
    html.setAttribute('data-lang', idioma);
    html.setAttribute('lang', idioma);
    if (guardar) {
      try { localStorage.setItem('idioma', idioma); } catch (e) {}
      var u = new URL(location.href);
      if (idioma === 'es') u.searchParams.delete('lang'); else u.searchParams.set('lang', idioma);
      history.replaceState(null, '', u);
    }
    // Título de la pestaña
    var t = document.querySelector('title');
    if (t && t.dataset[idioma]) document.title = t.dataset[idioma];
    // Atributos alt / aria-label con data-es / data-en
    document.querySelectorAll('[data-alt-es]').forEach(function (el) { el.alt = el.dataset['alt' + (idioma === 'es' ? 'Es' : 'En')] || el.alt; });
    document.querySelectorAll('[data-label-es]').forEach(function (el) { el.setAttribute('aria-label', el.dataset['label' + (idioma === 'es' ? 'Es' : 'En')]); });
    // Botones del selector
    document.querySelectorAll('.selector-idioma button').forEach(function (b) {
      b.setAttribute('aria-pressed', b.dataset.idioma === idioma ? 'true' : 'false');
    });
    // Links internos: conservar ?lang=en al navegar
    document.querySelectorAll('a[href^="/"], a[href^="./"], a[href^="../"]').forEach(function (a) {
      try {
        var u = new URL(a.getAttribute('href'), location.href);
        if (u.origin !== location.origin) return;
        if (idioma === 'en') u.searchParams.set('lang', 'en'); else u.searchParams.delete('lang');
        a.setAttribute('href', u.pathname + u.search + u.hash);
      } catch (e) {}
    });
    document.dispatchEvent(new CustomEvent('idioma', { detail: idioma }));
  }

  // Aplicar antes de que se vea la página (evita el parpadeo)
  aplicar(leerIdioma(), false);

  document.addEventListener('DOMContentLoaded', function () {
    aplicar(html.getAttribute('data-lang'), false);
    document.querySelectorAll('.selector-idioma button').forEach(function (b) {
      b.addEventListener('click', function () { aplicar(b.dataset.idioma, true); });
    });
  });
})();
