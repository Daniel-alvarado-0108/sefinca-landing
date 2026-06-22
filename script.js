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
          var delay = entry.target.closest('.services__grid, .industries') ? (i % 6) * 80 : 0;
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
        Autoplay infinito y fluido (con clones para
        un bucle sin saltos), que se pausa al
        interactuar. Controles: flechas, dots,
        arrastre (drag), swipe táctil y teclado.
     ───────────────────────────────────────────── */
  var galTrack = document.getElementById('galTrack');

  if (galTrack) {
    var galPrev = document.getElementById('galPrev');
    var galNext = document.getElementById('galNext');
    var galDots = document.getElementById('galDots');
    var galSection = document.getElementById('equipo');

    var AUTOPLAY_MS = 4000;            // cadencia del cambio automático
    var realCards = Array.prototype.slice.call(galTrack.querySelectorAll('.gallery-card'));
    var N = realCards.length;

    // ── Clonado para bucle infinito ──
    // Se anteponen y posponen copias del set completo. Como las clones usan
    // las MISMAS URLs, el navegador las sirve desde caché (sin coste de red).
    if (N > 1) {
      var headFrag = document.createDocumentFragment();
      realCards.forEach(function (card) {
        var clone = card.cloneNode(true);
        clone.classList.add('is-clone');
        clone.setAttribute('aria-hidden', 'true');
        headFrag.appendChild(clone);
      });
      galTrack.insertBefore(headFrag, realCards[0]);
      realCards.forEach(function (card) {
        var clone = card.cloneNode(true);
        clone.classList.add('is-clone');
        clone.setAttribute('aria-hidden', 'true');
        galTrack.appendChild(clone);
      });
    }
    var allCards = Array.prototype.slice.call(galTrack.querySelectorAll('.gallery-card'));
    var hasLoop = allCards.length > N; // true cuando hay clones

    function step() {
      return allCards.length > 1 ? (allCards[1].offsetLeft - allCards[0].offsetLeft) : galTrack.clientWidth;
    }
    function loopWidth() { return step() * N; }

    // Posición de scroll que centra la tarjeta i en el viewport del track
    function centerLeft(i) {
      var c = allCards[i];
      return c.offsetLeft - (galTrack.clientWidth - c.offsetWidth) / 2;
    }
    function goTo(i, smooth) {
      var behavior = (smooth && !prefersReduced) ? 'smooth' : 'auto';
      galTrack.scrollTo({ left: centerLeft(i), behavior: behavior });
    }

    // Tarjeta más cercana al centro (sobre el set completo, clones incluidos)
    function nearest() {
      var center = galTrack.scrollLeft + galTrack.clientWidth / 2;
      var best = 0, bestDist = Infinity;
      allCards.forEach(function (card, i) {
        var dist = Math.abs((card.offsetLeft + card.offsetWidth / 2) - center);
        if (dist < bestDist) { bestDist = dist; best = i; }
      });
      return best;
    }
    // Índice real (0..N-1) a partir de cualquier índice del set ampliado
    function toReal(i) { return ((i - N) % N + N) % N; }

    // ── Indicadores (dots) — uno por tarjeta real ──
    var dots = realCards.map(function (_, i) {
      var dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'gallery__dot';
      dot.setAttribute('role', 'tab');
      dot.setAttribute('aria-label', 'Ir a la foto ' + (i + 1));
      dot.addEventListener('click', function () {
        goTo(hasLoop ? N + i : i, true);
        restartAuto();
      });
      galDots.appendChild(dot);
      return dot;
    });

    function updateDots() {
      var active = hasLoop ? toReal(nearest()) : nearest();
      dots.forEach(function (dot, i) {
        var on = i === active;
        dot.classList.toggle('is-active', on);
        dot.setAttribute('aria-selected', String(on));
      });
    }

    // Reposiciona instantáneamente al volver a una clon → bucle sin salto visible
    function normalize() {
      if (!hasLoop) return;
      var idx = nearest();
      if (idx < N) { galTrack.scrollLeft += loopWidth(); }
      else if (idx >= 2 * N) { galTrack.scrollLeft -= loopWidth(); }
    }

    // ── Autoplay ──
    var autoTimer = null;
    function advance() { goTo(nearest() + 1, true); }
    function startAuto() {
      if (prefersReduced || !hasLoop || document.hidden) return;
      stopAuto();
      autoTimer = setInterval(advance, AUTOPLAY_MS);
    }
    function stopAuto() {
      if (autoTimer) { clearInterval(autoTimer); autoTimer = null; }
    }
    function restartAuto() { stopAuto(); startAuto(); }

    // Pausa al pasar el cursor SOLO en dispositivos con puntero real.
    // En táctiles, un 'mouseenter' sintético (sin 'mouseleave' que lo
    // acompañe) dejaba el autoplay detenido de forma permanente.
    var canHover = window.matchMedia('(hover: hover)').matches;
    if (canHover) {
      galSection.addEventListener('mouseenter', stopAuto);
      galSection.addEventListener('mouseleave', startAuto);
    }
    // Pausa al navegar por teclado dentro de la sección
    galSection.addEventListener('focusin', stopAuto);
    galSection.addEventListener('focusout', startAuto);
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) { stopAuto(); } else { startAuto(); }
    });

    // ── Flechas ──
    galPrev.addEventListener('click', function () { goTo(nearest() - 1, true); restartAuto(); });
    galNext.addEventListener('click', function () { goTo(nearest() + 1, true); restartAuto(); });

    // ── Teclado (con el track enfocado) ──
    galTrack.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { e.preventDefault(); goTo(nearest() + 1, true); restartAuto(); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); goTo(nearest() - 1, true); restartAuto(); }
    });

    // ── Arrastre con mouse (el swipe táctil ya es nativo del overflow) ──
    var isDown = false, startX = 0, startScroll = 0, moved = false;
    galTrack.addEventListener('pointerdown', function (e) {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      isDown = true; moved = false;
      startX = e.clientX;
      startScroll = galTrack.scrollLeft;
      stopAuto();
      if (e.pointerType === 'mouse') galTrack.classList.add('is-dragging');
    });
    galTrack.addEventListener('pointermove', function (e) {
      if (!isDown || e.pointerType !== 'mouse') return;
      var delta = e.clientX - startX;
      if (Math.abs(delta) > 4) moved = true;
      galTrack.scrollLeft = startScroll - delta;
    });
    function endDrag() {
      if (!isDown) return;
      isDown = false;
      galTrack.classList.remove('is-dragging');
      restartAuto();
    }
    galTrack.addEventListener('pointerup', endDrag);
    galTrack.addEventListener('pointercancel', endDrag);
    galTrack.addEventListener('pointerleave', endDrag);
    // Evita que un arrastre dispare un click accidental
    galTrack.addEventListener('click', function (e) {
      if (moved) { e.preventDefault(); e.stopPropagation(); }
    }, true);

    // ── Sincronización en cada scroll + normalización al asentarse ──
    var galRaf = null, settleTimer = null;
    galTrack.addEventListener('scroll', function () {
      if (!galRaf) {
        galRaf = requestAnimationFrame(function () { galRaf = null; updateDots(); });
      }
      if (settleTimer) clearTimeout(settleTimer);
      settleTimer = setTimeout(function () { if (!isDown) normalize(); }, 150);
    }, { passive: true });

    // Recentrar la tarjeta activa al cambiar el tamaño de ventana
    window.addEventListener('resize', function () {
      var real = hasLoop ? toReal(nearest()) : nearest();
      goTo(hasLoop ? N + real : real, false);
    }, { passive: true });

    // ── Arranque ──
    requestAnimationFrame(function () {
      if (hasLoop) goTo(N, false); // empezar en la primera tarjeta real
      updateDots();
      startAuto();
    });
  }

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
