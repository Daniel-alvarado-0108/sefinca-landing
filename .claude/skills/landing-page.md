---
name: sefin-landing-page
description: |
  Skill para construir la landing page institucional de SEFIN C.A. (empresa venezolana de seguridad y vigilancia privada, Valencia, Carabobo). Usar cuando se trabaje en el sitio sefinca.com: hero, secciones, formulario de reclutamiento, mapa, estilos, animaciones o cualquier componente de este proyecto. Contiene todo el contexto de cliente, decisiones de diseño aprobadas, paleta de marca, estructura de secciones y directrices de desarrollo. NO requiere preguntar al dev por contexto básico del proyecto; está todo aquí.
---

# SEFIN C.A. — Landing Page Skill

Actúa como el **frontend senior** a cargo de este proyecto. Conoces el cliente, el brief, las decisiones ya tomadas y los cambios solicitados. Cuando el dev pida código, componentes o cambios, aplica directamente este contexto sin volver a preguntar lo que ya está definido.

---

## 1. Contexto del cliente

| Campo | Valor |
|---|---|
| **Empresa** | SEFIN C.A. (Seguridad Forestal e Industrial, C.A.) |
| **Servicio** | Seguridad y vigilancia privada |
| **Cobertura** | Región central de Venezuela (Valencia y Puerto Cabello) |
| **Trayectoria** | ~30 años de operación continua |
| **Credenciales clave** | Resuelto Operacional MRI N°131-04 · RIF J-30522739-0 |
| **Contacto web** | sefinca@hotmail.com |
| **Teléfonos** | +58 242 361.5256 · +58 241 821.1657 |
| **WhatsApp CTA** | +58 414 346.7201 |
| **Sedes físicas** | Valencia (oficina principal) · Puerto Cabello (Rancho Grande, Calle 26) |
| **Dominio objetivo** | sefinca.com |

### Diferenciadores reales (lo que los distingue, según sus propias palabras en reunión)
- Empresa con **sede física propia**, estructura organizacional real con gerencia general, no "el señor en la moto con un laptop".
- Fundadores y directivos con trayectoria en **seguridad pública (policial/militar) y privada**.
- Resuelto Operacional del Estado → mismo nivel formal que la Dirección General de Servicios Policiales adscrita al Ministerio de Relaciones Interiores.
- Empresa **contribuyente especial** ante el Seniat: solidez administrativa y fiscal.
- **Clientes de peso históricos**: Shell (pendiente confirmación de permiso para publicar logo); se puede mencionar el tipo de cliente (industrias multinacionales, operaciones oil & gas) sin mencionar nombres hasta tener permiso.

### Público objetivo
**Primario:** Personal gerencial y ejecutivo de empresas medianas y grandes (industrias, comercios, corporaciones) de la región central venezolana. Edad media 40-60 años. Googlea la empresa después de una referencia o campaña; decide racionalmente por confianza y trayectoria.

**Secundario (reclutamiento):** Personas interesadas en trabajar como vigilantes/oficiales de seguridad. Edad 25-45 años. Accede mayoritariamente desde el teléfono celular.

---

## 2. Decisiones de diseño aprobadas por el cliente

### Concepto ganador
El cliente aprobó el **Concepto 3 — Heráldica Institucional** como dirección base, con los siguientes ajustes confirmados en feedback posterior:

1. **Fondo claro** en la mayoría de las secciones (blanco o azul muy claro, NO navy oscuro como fondo dominante). El navy oscuro se usa solo como acento o banda de cierre, no como fondo de toda la página.
2. **Hero con imagen fotográfica** de fondo translúcido: oficiales uniformados en formación o fachada de la sede. Usar imágenes de stock profesionales hasta recibir fotos reales de la empresa.
3. **Escudo/logo centrado y prominente** en el hero. El cliente valoró explícitamente la ubicación centrada del logo.
4. **Servicios NO en banda monocolor continua**: alternar secciones blancas/claras con fondos azul suave, para crear ritmo visual sin saturar.
5. Página con **"sustancia"**: imágenes reales, secciones claras de quiénes somos, clientes, servicios — referencia visual aprobada por el cliente: icsecurity.com (Inter-Con Security).

### Paleta de colores — extraída del escudo corporativo

```css
:root {
  /* ── COLORES PRIMARIOS DEL ESCUDO ── */
  --sefin-navy:      #13047A;   /* azul profundo dominante del escudo */
  --sefin-gold:      #F1B52A;   /* dorado del borde y tipografía del escudo */
  --sefin-green:     #188031;   /* verde de los detalles del jaguar */
  --sefin-tan:       #C0AF85;   /* fondo interior del escudo (khaki/arena) */

  /* ── PALETA DE TRABAJO ── */
  --bg-primary:      #FFFFFF;   /* fondo principal de secciones */
  --bg-light:        #F4F6FB;   /* fondo alternativo claro (azul muy suave) */
  --bg-navy-band:    #0B0340;   /* bandas de cierre, footer, CTA final */
  --navy-mid:        #1A2580;   /* versión media del navy para gradientes */

  --text-primary:    #13152B;   /* texto principal (casi negro azulado) */
  --text-secondary:  #5A5E7A;   /* texto secundario, subtítulos */
  --text-on-dark:    #FFFFFF;   /* texto sobre fondos navy */
  --text-gold:       #F1B52A;   /* énfasis dorado sobre fondos oscuros */

  --border-light:    #E4E7F0;   /* bordes y separadores */
  --border-gold:     rgba(241,181,42,0.3); /* borde sutil dorado */

  --cta-whatsapp:    #188031;   /* botón WhatsApp — usa el verde del escudo */
  --cta-primary:     #13047A;   /* botón primario */
  --cta-primary-hover: #0B0340;
}
```

**Regla de oro de la paleta:** El fondo de la página es blanco o azul muy claro (`#F4F6FB`). El navy `#13047A` se usa en headers de sección, textos de énfasis, el navbar, y bandas de contraste — nunca como color de toda la página. El dorado `#F1B52A` es el acento de jerarquía máxima (credenciales, números clave, highlights). El verde `#188031` es exclusivo para el CTA de WhatsApp y badges de estado activo.

### Tipografía

```css
/* Google Fonts — una sola carga */
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap');

--font-display:  'Cormorant Garamond', Georgia, serif;   /* titulares hero y secciones */
--font-body:     'Inter', system-ui, sans-serif;         /* todo lo demás */

/* Escala tipográfica */
--text-xs:    0.75rem;   /* 12px — labels, badges, microcopy */
--text-sm:    0.875rem;  /* 14px — texto secundario, notas */
--text-base:  1rem;      /* 16px — cuerpo de texto */
--text-lg:    1.125rem;  /* 18px — descripción hero, párrafos destacados */
--text-xl:    1.25rem;   /* 20px — subtítulos de sección */
--text-2xl:   1.5rem;    /* 24px — títulos de cards */
--text-4xl:   2.25rem;   /* 36px — h2 de sección */
--text-6xl:   3.75rem;   /* 60px — headline hero desktop */
```

### Stack técnico

```
HTML5 semántico
CSS3 con variables CSS (no Tailwind por defecto — ver nota)
Vanilla JS para interactividad (scroll reveal, menú móvil, formulario)
Google Fonts (Cormorant Garamond + Inter)
Lucide Icons (vía CDN) para iconografía de servicios
Sin frameworks JS (React/Vue/etc.) — archivo único index.html desplegable en Vercel/Netlify
```

> **Nota sobre Tailwind:** Si el dev solicita explícitamente Tailwind, usarlo vía CDN Play CDN con las variables CSS mapeadas. Por defecto, usar CSS custom properties para mantener fidelidad total a la paleta de marca sin sobrescribir las clases de Tailwind.

---

## 3. Arquitectura de secciones (orden obligatorio)

Construir siempre en este orden. Cada sección tiene un `id` fijo para el scroll del navbar.

```
#inicio     → HERO
#nosotros   → QUIÉNES SOMOS
#servicios  → SERVICIOS
#clientes   → EMPRESAS QUE NOS HAN CONFIADO
#reclutamiento → ÚNETE AL EQUIPO
#contacto   → CONTACTO + MAPA
            → FOOTER
```

---

## 4. Especificación por sección

### 4.1 Navbar (fijo en scroll)

```
- Logo (escudo) a la izquierda + "SEFIN, C.A." en texto + subtítulo "Seguridad · Vigilancia Privada"
- Links de navegación: Nosotros · Servicios · Clientes · Únete · Contacto
- Botón CTA "Contáctanos" en dorado/navy al extremo derecho
- Fondo: blanco con sombra sutil al hacer scroll (transparent en top, white con shadow al bajar)
- Posición: sticky/fixed top-0, z-50
- Móvil: menú hamburguesa (☰) que despliega un panel lateral o dropdown con todos los links
  → El cliente preguntó específicamente por las pestañas en móvil; aclarar en el código que
    el menú hamburguesa CONTIENE todas las secciones, no las elimina.
```

### 4.2 Hero (`#inicio`)

**Objetivo:** Impactar en 3 segundos. El visitante debe entender inmediatamente: empresa seria, 30 años, resguarda lo que importa.

```
LAYOUT (desktop): 
  - Fondo: imagen fotográfica de stock de alta calidad (oficiales de seguridad uniformados 
    en formación, o fachada de sede corporativa) con overlay de gradiente navy translúcido 
    (rgba(19,4,122,0.72)) para que el texto sea perfectamente legible.
  - Escudo centrado sobre el overlay, con efecto drop-shadow suave.
  - Headline centrado debajo del escudo.
  - CTA row centrado.
  - Banda de credenciales en la parte inferior del hero.

CONTENIDO:
  Badge eyebrow:  "Más de 30 años protegiendo lo que importa"
  Headline:       "El resguardo que su empresa merece."
                  (Cormorant Garamond 60px, blanco, letter-spacing -1px)
  Subheadline:    "Seguridad y vigilancia privada con respaldo del Estado, estructura 
                   sólida y gente de trayectoria. Atendemos industrias, comercios y 
                   corporaciones en la región central."
                  (Inter 18px, rgba(255,255,255,0.85))
  CTA primario:   Botón verde WhatsApp → "Solicitar propuesta →"
  CTA secundario: Botón outline blanco → "Conozca SEFIN"

BANDA DE CREDENCIALES (barra oscura semi-transparente en bottom del hero):
  [Resuelto Operacional · MRI N°131-04] [RIF · J-30522739-0] [Fundada hace 30 años] [24h / 7 días]
  Estilo: fondo rgba(11,3,64,0.85), texto blanco/dorado, separadores | 

IMAGEN DE STOCK (placeholder hasta recibir fotos reales):
  Buscar imágenes con keywords: "security guards formation professional", 
  "private security officers uniform corporate", "seguridad privada empresa"
  Unsplash / Pexels: usar `object-fit: cover`, `object-position: center top`
  Alt text: "Personal de seguridad de SEFIN C.A. en formación"
```

### 4.3 Quiénes somos (`#nosotros`)

**Fondo: blanco `#FFFFFF`**

```
LAYOUT: 2 columnas desktop (texto izquierda, imagen/stats derecha)

CONTENIDO TEXTO:
  Eyebrow label: "Quiénes somos"  (verde, letra espaciada)
  Título h2:     "Una estructura seria detrás de cada guardia."
  Párrafo 1:     "SEFIN C.A. no es un servicio improvisado. Somos una empresa con 
                  gerencia general, estructura administrativa y operativa propia, 
                  dirigida por personal con trayectoria comprobada en seguridad pública 
                  —policial y militar— y en el ámbito privado. Conocemos las dos caras 
                  del oficio."
  Párrafo 2:     "Contamos con el Resuelto Operacional que otorga el Estado venezolano 
                  para ejercer funciones de seguridad privada, adscrito al Ministerio 
                  competente al mismo nivel formal que las grandes direcciones de 
                  seguridad del país. Eso nos distingue de quienes improvisan en 
                  este oficio."
  Firma/atribución: "— Dirección General, SEFIN C.A."  (itálica, muted)

COLUMNA DERECHA — Grid de stats (4 cifras):
  [30+]   Años de operación continua
  [2]     Sedes: Valencia y Puerto Cabello
  [24/7]  Cobertura permanente
  [100%]  Personal de trayectoria comprobada

  Estilo stats: número en Cormorant Garamond grande color navy, label en Inter pequeño muted.
  Fondo del bloque stats: --bg-light (#F4F6FB), border-radius 16px, padding generoso.
```

### 4.4 Servicios (`#servicios`)

**Fondo: alternado — título en `#F4F6FB` (azul claro), grid de cards en `#FFFFFF`**

```
Eyebrow: "Servicios"
Título:  "Protección integral, sin fisuras."
Subtítulo: "Cobertura diseñada para el nivel de exigencia de industrias y corporaciones."

GRID: 3 columnas desktop, 2 tablet, 1 móvil
Cada card: fondo blanco, borde 1px --border-light, border-radius 14px, hover sutil.

SERVICIOS (6 cards):
  1. Custodia de instalaciones y control de acceso
     Ícono: Building2 (Lucide)
     Desc: "Resguardo permanente de sus instalaciones y gestión de entradas y salidas 
            con control de personal y visitantes."

  2. Control de pérdidas — Auditorías
     Ícono: ClipboardCheck (Lucide)
     Desc: "Prevención de mermas, detección de irregularidades y auditorías de seguridad 
            sobre sus procesos operativos."

  3. Prevención y respuesta ante incidentes
     Ícono: ShieldCheck (Lucide)
     Desc: "Protocolos documentados y personal entrenado para respuesta inmediata ante 
            cualquier incidente en sus instalaciones."

  4. Formación y capacitación especializada
     Ícono: BookOpen (Lucide)
     Desc: "Programas de entrenamiento continuo para el personal de seguridad, 
            bajo estándares profesionales del sector."

  5. Seguridad electrónica
     Ícono: Camera (Lucide)
     Desc: "Instalación y monitoreo de sistemas CCTV, alarmas e integración de 
            tecnología de vigilancia."

  6. Guardias 24 horas / 7 días
     Ícono: Clock (Lucide)
     Desc: "Cobertura ininterrumpida durante los 365 días del año, sin excepciones 
            ni huecos en el servicio."

ICONO STYLE: fondo circle/square navy con ícono en dorado, o ícono navy sobre fondo 
             dorado suave — decidir al codificar y mantener consistente.
```

### 4.5 Clientes / Confianza (`#clientes`)

**Fondo: `#0B0340` (navy profundo) — esta es la banda oscura de contraste**

```
OBJETIVO: Demostrar peso y seriedad mediante clientes históricos y tipo de industria.

Eyebrow: "Empresas que nos han confiado su seguridad"  (dorado, letra espaciada)
Título:  "Más de tres décadas al servicio de quienes más lo exigen."  (blanco)
Párrafo: "Hemos protegido operaciones de industrias de primer nivel en la región central.
          Clientes del sector petrolero, manufactura y servicios corporativos han confiado 
          en SEFIN como su aliado de seguridad."

LOGOS / NOMBRES: 
  → Usar SHELL como referencia si el cliente autoriza (confirmar antes de deploy en producción).
  → Mientras tanto: placeholders de "Cliente Oil & Gas", "Industria Manufacturera", etc.
  → Estilo: logos en grayscale/blancos, fila centrada, opacity 0.65

INDUSTRIAS QUE ATENDEMOS (iconos en fila o grid 3x2):
  Industrias · Comercios · Servicios corporativos · Sector petrolero · Manufactura · 
  Oficinas y sedes
```

### 4.6 Formulario de Reclutamiento (`#reclutamiento`)

**Fondo: `#F4F6FB` (azul muy claro)**

Esta sección es clave y fue solicitada explícitamente por el cliente en reunión. Permite a vigilantes y aspirantes dejar sus datos directamente desde la web.

```
Eyebrow: "Únete al equipo"
Título:  "¿Quieres trabajar con nosotros?"
Párrafo: "Buscamos personas comprometidas, con o sin experiencia previa, para integrarse 
          a nuestro equipo de oficiales. Deja tus datos y nos ponemos en contacto contigo."

FORMULARIO — campos:
  [Nombre completo]            → input text, requerido
  [Número de teléfono]         → input tel, requerido
  [Correo electrónico]         → input email, opcional
  [Rango de edad]              → select: "18-25 años" | "26-35 años" | "36-45 años" | "46+ años"
  [¿Tienes experiencia previa en seguridad?] → radio: Sí / No
  [Ciudad/Municipio donde resides]  → input text, requerido
  [Adjuntar síntesis curricular]    → file input, accept=".pdf,.doc,.docx,.jpg,.png", opcional
  [Mensaje / información adicional] → textarea, opcional

SUBMIT:
  Botón: "Enviar mi solicitud →"  (fondo navy, hover navy-deep)
  Microcopy bajo el botón: "Revisamos todas las solicitudes y nos comunicamos por WhatsApp."

DESTINO DEL FORMULARIO:
  Por defecto: action via Formspree (https://formspree.io) — el dev reemplaza el endpoint.
  Alternativa preferida según la reunión: enviar datos a WhatsApp vía URL encode + window.open:
    → Construir string con los datos del formulario y abrir:
       `https://wa.me/584143467201?text=NUEVA%20SOLICITUD%3A%20...`
    → Incluir ambas opciones (Formspree + WhatsApp) y que el dev elija / active una.

LAYOUT desktop: formulario centrado, max-width 720px, 2 columnas para campos cortos.
LAYOUT móvil: 1 columna, campos a full width.

VALIDACIÓN JS:
  - Campos requeridos marcados con * rojo si se intenta enviar vacíos
  - Mensaje de éxito inline (no reload): "¡Recibimos tu solicitud! Te contactaremos pronto."
  - Mensaje de error si falla el envío.
```

### 4.7 Contacto + Mapa (`#contacto`)

**Fondo: `#FFFFFF`**

```
LAYOUT: 2 columnas desktop — info de contacto izquierda, mapa derecha.

COLUMNA IZQUIERDA:
  Eyebrow: "Contacto"
  Título:  "Hablemos de la seguridad de su empresa."
  
  CTA WhatsApp (botón grande, verde):
    "+58 414 346.7201 — Escribir por WhatsApp"
    → href: "https://wa.me/584143467201?text=Hola%2C%20deseo%20información%20sobre%20los%20servicios%20de%20SEFIN%20C.A."
  
  Teléfonos:
    +58 242 361.5256 (ícono Phone)
    +58 241 821.1657 (ícono Phone)
  
  Correo:
    sefinca@hotmail.com (ícono Mail)
  
  Sedes:
    📍 Valencia, Carabobo (oficina principal)
    📍 Puerto Cabello — Rancho Grande, Calle 26
  
  Credenciales de cierre:
    RIF: J-30522739-0
    Resuelto Operacional: MRI N°131-04

COLUMNA DERECHA — Mapa:
  → Usar Google Maps embed o leaflet.js con coordenadas directas.
  → Coordenadas Valencia (placeholder hasta recibir coordenadas exactas del cliente):
    12.1005° N, 68.0074° W (Valencia, Carabobo)
  → Coordenadas Puerto Cabello:
    10.4756° N, 68.0075° W (Puerto Cabello — actualizar con la calle exacta cuando el cliente 
    pase el pin de Google Maps o el link de coordenadas)
  → NOTA: el cliente acordó pasar sus propias coordenadas/pin de Google Maps. 
    Incluir un iframe de Google Maps con coordenadas provisionales y comentario en el código:
    <!-- TODO: Reemplazar con coordenadas exactas de SEFIN. Ver coordenadas de Puerto Cabello: 
    Rancho Grande, Calle 26. El cliente debe confirmar el pin. -->
  → Alternativamente: botón "Cómo llegar →" que abre Google Maps con las coordenadas.
```

### 4.8 Footer

**Fondo: `#08022E` (navy muy profundo)**

```
LAYOUT: 3 columnas desktop, stack en móvil

Col 1: Logo + "En SEFINCA cuidamos sus intereses." + íconos sociales (si aplica)
Col 2: Links de navegación repetidos (mismos del navbar)
Col 3: Contacto rápido — WhatsApp, teléfono, email, sedes

Bottom bar: 
  "© 2025 SEFIN C.A. · RIF J-30522739-0 · Todos los derechos reservados."
  Derecha: "Desarrollado por AInova" (con link opcional a ainovaproject.com)
```

---

## 5. Comportamiento y animaciones

```
FILOSOFÍA: Animaciones funcionales, no decorativas. El cliente de edad media no 
           debe sentir la página "rara". Sutil y profesional.

IMPLEMENTAR:
  1. Scroll reveal suave: secciones aparecen con fade-in + translateY(20px → 0) 
     al entrar en viewport. Usar Intersection Observer API (vanilla JS, sin librería).
     Delay escalonado en cards del grid de servicios.
  
  2. Navbar: transición de transparent → white/shadow al pasar los primeros 80px de scroll.
  
  3. Menú hamburguesa móvil: slide-down o panel lateral con transition CSS.
  
  4. Botón WhatsApp flotante: icono de WhatsApp fijo bottom-right en móvil, 
     visible en toda la página, z-50. Pulso suave de atención cada 4s.
  
  5. Hover en cards de servicios: translateY(-4px) + box-shadow más pronunciada.
     Transition: 0.2s ease.
  
  6. RESPETAR prefers-reduced-motion: envolver todas las animaciones en:
     @media (prefers-reduced-motion: no-preference) { ... }

NO IMPLEMENTAR:
  - Parallax agresivo
  - Loaders de pantalla completa
  - Auto-sliders sin control del usuario
  - Animaciones de texto letra por letra
```

---

## 6. Responsividad — breakpoints y comportamiento

```
Diseño mobile-first. Ampliar hacia desktop.

BREAKPOINTS:
  sm:  640px  — tablet pequeña
  md:  768px  — tablet
  lg:  1024px — desktop
  xl:  1280px — desktop ancho

COMPORTAMIENTO CLAVE POR SECCIÓN:

Navbar:
  Móvil (<768px): logo + hamburguesa ☰. Al tocar ☰ → panel con todos los links.
                  EL CLIENTE PREGUNTÓ ESPECÍFICAMENTE: confirmar que el menú hamburguesa 
                  CONTIENE los links de "Quiénes somos", "Servicios", "Contacto", etc.
  Desktop: barra horizontal completa con todos los links.

Hero:
  Móvil: escudo más pequeño (120px), headline 36px, CTAs en columna, 
         imagen de fondo con overlay más oscuro (mejor legibilidad en pantalla pequeña).
  Desktop: escudo 180px, headline 60px, CTAs en fila.

Grid de servicios:
  Móvil: 1 columna, cards full-width
  Tablet: 2 columnas
  Desktop: 3 columnas

Formulario de reclutamiento:
  Móvil: 1 columna, inputs full-width
  Desktop: 2 columnas para campos cortos (nombre, teléfono en la misma fila)

Sección de contacto:
  Móvil: info arriba, mapa abajo (stack)
  Desktop: 2 columnas 50/50
```

---

## 7. SEO y meta tags (incluir en `<head>`)

```html
<!-- Meta base -->
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>SEFIN C.A. — Seguridad y Vigilancia Privada | Valencia, Venezuela</title>
<meta name="description" content="Empresa venezolana de seguridad y vigilancia privada con más de 30 años de trayectoria. Custodia, control de acceso, seguridad electrónica y guardias 24/7. Servicio en la región central. Resuelto Operacional MRI N°131-04.">
<meta name="keywords" content="seguridad privada Venezuela, vigilancia privada Valencia Carabobo, empresa seguridad industrial, guardias seguridad 24 horas, SEFIN seguridad">
<link rel="canonical" href="https://sefinca.com/">

<!-- Open Graph -->
<meta property="og:type" content="website">
<meta property="og:url" content="https://sefinca.com/">
<meta property="og:title" content="SEFIN C.A. — Seguridad y Vigilancia Privada">
<meta property="og:description" content="Más de 30 años protegiendo industrias y corporaciones en Venezuela. Resuelto Operacional del Estado. Valencia y Puerto Cabello.">
<meta property="og:image" content="https://sefinca.com/assets/og-image.jpg"> <!-- 1200x630 -->
<meta property="og:locale" content="es_VE">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="SEFIN C.A. — Seguridad y Vigilancia Privada">
<meta name="twitter:description" content="30 años resguardando lo que importa. Valencia y Puerto Cabello, Venezuela.">

<!-- Favicon (usar escudo como base) -->
<link rel="icon" type="image/png" href="/assets/favicon.png">

<!-- Preconnect fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">

<!-- Lucide Icons CDN -->
<script src="https://unpkg.com/lucide@latest"></script>

<!-- Analytics (activar en producción) -->
<!-- <script defer data-domain="sefinca.com" src="https://plausible.io/js/script.js"></script> -->
```

---

## 8. Assets y recursos

### Logo/Escudo
- Archivo: `sefinca_1__LOGO.pdf` (vectorial, fondo blanco)
- Exportar como PNG transparente 400×420px mínimo para web
- Usar versión transparente sobre fondos oscuros del hero
- Para favicon: recortar al escudo sin márgenes, exportar 32×32 y 180×180 (Apple touch)

### Imágenes de stock (hasta recibir fotos reales)
Usar imágenes de Unsplash/Pexels con licencia libre:
- **Hero background:** oficiales de seguridad uniformados en formación, vista exterior de edificio corporativo, o guardia de seguridad en puesto. Palabras clave: "security guards professional", "corporate security team", "private security Venezuela".
- **Sección Nosotros:** oficina corporativa profesional, sala de operaciones/control.
- Optimizar: WebP, máx 800KB por imagen, lazy loading (`loading="lazy"`).
- **Cuando el cliente entregue fotos reales:** sustituir los placeholders 1:1. Los aspectos ratios de los contenedores ya están definidos en el CSS.

### Imágenes de la fachada
El cliente mencionó explícitamente querer la **foto de la fachada de la sede** en la web. Pendiente de que el cliente la entregue. Lugar probable en el diseño: sección "Quiénes somos" (columna derecha) o fondo alternativo del hero.

---

## 9. Entregable esperado

Cuando el dev pida "construye la landing" o "codifica la sección X", entregar:

- **Un solo archivo `index.html`** (HTML + `<style>` + `<script>` inline o con `<link>` a archivos separados si el dev lo especifica)
- **Sin dependencias de build** (Vite/Webpack/NPM): desplegable directamente en Vercel/Netlify arrastrando la carpeta
- **Sin lorem ipsum** en ningún sitio: usar copy real basado en el contexto de este skill
- **Comentarios en el código** para los placeholders que el cliente debe completar:
  ```html
  <!-- TODO: Reemplazar con foto real de la sede cuando el cliente la entregue -->
  <!-- TODO: Confirmar coordenadas exactas de Puerto Cabello con el cliente -->
  <!-- TODO: Activar endpoint Formspree / WhatsApp cuando el cliente confirme -->
  <!-- TODO: Confirmar logos de clientes (Shell, etc.) cuando el cliente autorice -->
  ```
- **Responsive testado** en 375px (iPhone SE), 768px (iPad), 1280px (desktop)
- **Botón WhatsApp flotante** activo en toda la página desde el inicio

---

## 10. Checklist pre-entrega

- [ ] Headline del hero promete confianza y trayectoria sin ser genérico
- [ ] Escudo centrado y prominente en el hero
- [ ] Hero tiene imagen fotográfica de fondo (stock o real), NO fondo unicolor oscuro
- [ ] Fondo principal de la página es blanco o azul muy claro, NO navy como fondo dominante
- [ ] Secciones alternan entre `#FFFFFF` y `#F4F6FB` (nunca 3 fondos oscuros seguidos)
- [ ] Una sola banda navy oscura (`#0B0340`): clientes/confianza o footer. Máximo dos.
- [ ] Credenciales clave visibles: MRI N°131-04, RIF J-30522739-0, 30+ años
- [ ] Navbar funciona en móvil con menú hamburguesa que CONTIENE todos los links
- [ ] Sección de reclutamiento con formulario funcional (Formspree o WhatsApp redirect)
- [ ] Botón WhatsApp flotante visible en toda la página
- [ ] Mapa con coordenadas provisionales y comentario TODO
- [ ] Placeholder para foto de fachada con comentario TODO
- [ ] `loading="lazy"` en todas las imágenes excepto el hero
- [ ] Meta tags OG completos
- [ ] Sin console.log activos en producción
- [ ] Validar HTML en validator.w3.org antes de entregar

---

## 11. Historial de decisiones / notas de proyecto

| Fecha | Decisión | Contexto |
|---|---|---|
| Mayo 2025 | Se realizaron 4 maquetas de concepto | PDF de handoff entregado al cliente |
| Mayo 2025 | Cliente eligió Concepto 3 (Heráldica / Escudo) | Lo más solemne e institucional |
| Jun 2025 | Feedback: fondo muy oscuro, pedir imágenes | Ajustar a fondo claro + foto hero |
| Jun 2025 | Referencia visual aprobada: icsecurity.com | Estilo con fotos, secciones claras |
| Jun 2025 | Reclutamiento: formulario → WhatsApp preferido | Más accesible para el público objetivo |
| Pendiente | Foto real de la sede (cliente debe entregar) | Hero y sección Nosotros |
| Pendiente | Coordenadas exactas ambas sedes | Sección de mapa |
| Pendiente | Autorización para publicar logos de clientes | Sección de confianza/clientes |
| Pendiente | Primer pago → inicio de codificación | Condición acordada en reunión |

---

## 12. Contexto adicional para el modelo

- **Developer:** Daniel Alvarado (CEO, AInova — ainovaproject.com)
- **Stack preferido de AInova:** Node.js/TypeScript, Supabase, Vercel para deploy
- **Paleta del cliente extraída desde el escudo SVG del logo**, no inventada
- **El cliente tiene perfil conservador** (empresa de ~30 años, directivos senior): evitar diseños demasiado atrevidos o "jóvenes". Profesional, limpio, con peso institucional.
- **El cliente no quiere un sitio informativo estándar** con menú/pestañas/columnas de datos; quiere impacto visual inmediato y contacto directo. Pero sí quiere "sustancia": fotos, secciones de quiénes somos, clientes. El equilibrio está en impacto visual primero, información organizada después.
- **WhatsApp es el CTA real**: en Venezuela, el cierre comercial ocurre por WhatsApp, no por formulario de contacto. El botón flotante de WA debe estar siempre visible y ser el elemento más accesible de la página.
- **Contrato firmado: $180 todo incluido** (hosting + dominio + desarrollo). Proyecto con alcance definido. No scope creep sin aprobación.