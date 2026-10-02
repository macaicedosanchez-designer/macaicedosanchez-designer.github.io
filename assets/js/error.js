/* 404: el cubo se inclina hacia el mouse y, al tocarlo, gira y muestra una frase nueva. */
(function () {
  var cubo = document.querySelector('.error-cubo');
  var pista = document.getElementById('error-pista');
  var frases = Array.prototype.slice.call(document.querySelectorAll('.error-frases li'));
  if (!cubo || !pista || !frases.length) return;

  // Inclinación: el cubo mira hacia el cursor (solo con mouse)
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    window.addEventListener('pointermove', function (e) {
      var r = cubo.getBoundingClientRect();
      var x = (e.clientX - (r.left + r.width / 2)) / window.innerWidth;
      var y = (e.clientY - (r.top + r.height / 2)) / window.innerHeight;
      cubo.style.setProperty('--ry', (x * 40).toFixed(1) + 'deg');
      cubo.style.setProperty('--rx', (-y * 40).toFixed(1) + 'deg');
    }, { passive: true });
  }

  // Al tocarlo: gira y cambia la frase, sin repetir la anterior
  var i = -1;
  cubo.addEventListener('click', function () {
    cubo.classList.remove('gira'); void cubo.offsetWidth; cubo.classList.add('gira');
    i = (i + 1) % frases.length;
    pista.innerHTML = frases[i].innerHTML;
  });
})();
