/* DISEÑO DE PRESENTACIONES: filtro de la galería (Todas · Para clientes · Investigación).
   El visor, las destacadas y la banda azul los maneja /hi-huge-team/huge.js. */
(function () {
  var botones = document.querySelectorAll('.filtro [data-filtro]');
  var items = document.querySelectorAll('.huge-galeria .grilla li');
  botones.forEach(function (b) {
    b.addEventListener('click', function () {
      var f = b.dataset.filtro;
      botones.forEach(function (x) {
        var on = x === b;
        x.setAttribute('aria-pressed', on);
        x.classList.toggle('inactivo', !on);
      });
      items.forEach(function (li) {
        var ver = f === 'todas' || li.dataset.tipo === f;
        li.hidden = !ver;
        li.classList.remove('aparece');
        if (ver) { void li.offsetWidth; li.classList.add('aparece'); }
      });
    });
  });
})();
