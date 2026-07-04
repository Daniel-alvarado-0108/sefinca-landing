/* ═══════════════════════════════════════════════════════════
   SEFIN C.A. — Interactividad
   Vanilla JS · sin dependencias de build.
   ═══════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  /* ── Número de WhatsApp destino del formulario de reclutamiento ──
     TODO: Verificar con el cliente (+58 414 346.7201) */
  var WHATSAPP_NUMBER = '584143467201';

  /* ─────────────────────────────────────────────
     1. Iconos Lucide
     ───────────────────────────────────────────── */
  function renderIcons() {
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }
  }
  // Lucide se carga con defer; reintenta hasta que esté disponible.
  if (window.lucide) {
    renderIcons();
  } else {
    var tries = 0;
    var iconTimer = setInterval(function () {
      if (window.lucide || tries++ > 40) {
        clearInterval(iconTimer);
        renderIcons();
      }
    }, 100);
  }

  /* ─────────────────────────────────────────────
     2. Navbar: fondo al hacer scroll
     ───────────────────────────────────────────── */
  var navbar = document.getElementById('navbar');
  function onScroll() {
    if (window.scrollY > 80) {
      navbar.classList.add('is-scrolled');
    } else {
      navbar.classList.remove('is-scrolled');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ─────────────────────────────────────────────
     3. Menú hamburguesa móvil
     ───────────────────────────────────────────── */
  var navToggle = document.getElementById('navToggle');
  var navLinks = document.getElementById('navLinks');

  function closeMenu() {
    navLinks.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  }

  navToggle.addEventListener('click', function () {
    var isOpen = navLinks.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Cerrar el menú al tocar cualquier link (incluye todas las secciones)
  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  // Cerrar con tecla Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });

  /* ─────────────────────────────────────────────
     4. Scroll reveal (IntersectionObserver)
     ───────────────────────────────────────────── */
  var reveals = document.querySelectorAll('.reveal');
  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReduced || !('IntersectionObserver' in window)) {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
  } else {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry, i) {
        if (entry.isIntersecting) {
          // Delay escalonado para grupos de cards
          var delay = entry.target.closest('.services__grid, .clients__marquee') ? (i % 6) * 80 : 0;
          setTimeout(function () { entry.target.classList.add('is-visible'); }, delay);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    reveals.forEach(function (el) { observer.observe(el); });
  }

  /* ─────────────────────────────────────────────
     5. Formulario de reclutamiento → WhatsApp
     ───────────────────────────────────────────── */
  var form = document.getElementById('recruitForm');
  var successMsg = document.getElementById('formSuccess');

  function markInvalid(field, invalid) {
    field.classList.toggle('is-invalid', invalid);
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var nombre = form.nombre;
    var telefono = form.telefono;
    var ciudad = form.ciudad;
    var required = [nombre, telefono, ciudad];
    var valid = true;

    required.forEach(function (field) {
      var empty = !field.value.trim();
      markInvalid(field, empty);
      if (empty) valid = false;
    });

    if (!valid) {
      var firstInvalid = form.querySelector('.is-invalid');
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    // Construir mensaje pre-llenado para WhatsApp
    var experiencia = (form.querySelector('input[name="experiencia"]:checked') || {}).value || 'No indicado';
    var lines = [
      'NUEVA SOLICITUD DE EMPLEO — SEFIN C.A.',
      '',
      'Nombre: ' + nombre.value.trim(),
      'Teléfono: ' + telefono.value.trim(),
      form.email.value.trim() ? 'Correo: ' + form.email.value.trim() : null,
      form.edad.value ? 'Edad: ' + form.edad.value : null,
      'Ciudad: ' + ciudad.value.trim(),
      'Experiencia previa: ' + experiencia,
      form.mensaje.value.trim() ? 'Mensaje: ' + form.mensaje.value.trim() : null,
      '',
      'Adjunto mi síntesis curricular en este chat. 📎'
    ].filter(Boolean);

    var url = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(lines.join('\n'));
    window.open(url, '_blank', 'noopener');

    // Feedback inline sin recargar
    successMsg.hidden = false;
    form.reset();
    successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });

  // Quitar estado inválido al corregir
  form.querySelectorAll('input[required]').forEach(function (field) {
    field.addEventListener('input', function () { markInvalid(field, false); });
  });

  /* ─────────────────────────────────────────────
     6. Galería / carrusel de equipo (#equipo)
        Ahora es un carrusel infinito 100% CSS
        (marquee con doble set + desvanecido lateral),
        que se pausa al pasar el cursor. Sin JavaScript.
     ───────────────────────────────────────────── */

  /* ─────────────────────────────────────────────
     7. Modal del folleto / brochure (#servicios)
        Lightbox accesible: abre la imagen del flyer,
        bloquea el scroll de fondo, cierra con backdrop,
        botón o tecla Escape, y devuelve el foco.
     ───────────────────────────────────────────── */
  var brochureModal = document.getElementById('brochureModal');
  var brochureOpen = document.getElementById('brochureOpen');

  if (brochureModal && brochureOpen) {
    var brochureClose = document.getElementById('brochureClose');
    var lastFocused = null;

    function openBrochure() {
      lastFocused = document.activeElement;
      brochureModal.hidden = false;
      document.body.style.overflow = 'hidden';
      renderIcons();
      if (brochureClose) brochureClose.focus();
    }

    function closeBrochure() {
      brochureModal.hidden = true;
      document.body.style.overflow = '';
      if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
    }

    brochureOpen.addEventListener('click', openBrochure);

    // Cualquier elemento marcado con data-brochure-close cierra el modal
    brochureModal.querySelectorAll('[data-brochure-close]').forEach(function (el) {
      el.addEventListener('click', closeBrochure);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !brochureModal.hidden) closeBrochure();
    });
  }
})();
