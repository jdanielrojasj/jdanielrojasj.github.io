/*
 * Draco animado: <draco-perro></draco-perro>
 * Archivo único que une cuatro partes: colores, dibujo, estilos y comportamiento.
 */
/*
 * 1. COLORES
 * La paleta de Draco. Cambia un valor aquí y cambia en todo el dibujo.
 */
window.DracoPartes = window.DracoPartes || {};

DracoPartes.colores = {
    cuerpo: '#4f4943',
    oscuro: '#3d3833',
    claro: '#655e56',
    cabeza: '#47413b',
    ojeras: '#322e2a',
    oreja: '#2a2622',
    pierna: '#6a635a',
    piernaClara: '#8a8277',
    pata: '#a69d90',
    cejas: '#9f8b73',
    puente: '#5c564f',
    canas: '#bbb3a7',
    cola: '#39342f',
    colaSombra: '#29251f',
    colaBrillo: '#59524b',
    barba: '#8c7b69',
    barbaOscura: '#695c50',
    bigote: '#b2a592',
    brilloBarba: '#d6cdbf',
    pecho: '#e2dbcf',
    pechoSombra: '#c9c1b3',
    iris: '#8a5426',
    cuenca: '#1f1712',
    blancoOjo: '#f6f2ea',
    negro: '#1d1b1b',
    linea: '#3a2416',
    lengua: '#e58c95',
    pelitos: '#ebe5d9',
};

/*
 * 2. DIBUJO
 * El perro dibujado en SVG, por capas (de atrás hacia delante).
 * Las piezas que se animan llevan una clase: cola, perro, cabeza, ojo, mirada,
 * cejas, ojos-cerrados, boca-cerrada, boca-abierta, zzz y globo.
 * El lienzo mide 320 x 345 unidades (viewBox); todas las coordenadas van en esas unidades.
 */
window.DracoPartes = window.DracoPartes || {};

DracoPartes.dibujo = C => {
  // Dibuja una pieza y su reflejo (lado derecho del perro)
  const espejo = trazo => `${trazo}<g transform="matrix(-1 0 0 1 320 0)">${trazo}</g>`;

  // Espiral centrada en (cx, cy): es el ojo "mareado". Solo se ve en el estado mareado.
  const espiral = (cx, cy) => {
    let d = '';
    for (let i = 0; i <= 60; i++) {
      const angulo = (i / 60) * 2.5 * 2 * Math.PI;   // 2,5 vueltas
      const radio = (i / 60) * 8;                    // de 0 a 8 unidades
      d += `${i ? 'L' : 'M'}${(cx + radio * Math.cos(angulo)).toFixed(1)} ${(cy + radio * Math.sin(angulo)).toFixed(1)}`;
    }
    return `<path class="espiral" style="transform-origin: ${cx}px ${cy}px" d="${d}"
          stroke="${C.negro}" stroke-width="1.8" stroke-linecap="round" fill="none"/>`;
  };

  return `
<button type="button" aria-label="Draco está dormido. Pulsa para despertarlo">
<svg class="durmiendo" viewBox="0 0 320 345" aria-hidden="true">
  <ellipse cx="172" cy="326" rx="114" ry="10" fill="#000" opacity=".08"/>

  <g class="perro">
  <!-- cola: hacia arriba, con pelo áspero -->
  <g class="cola">
    <!-- cola baja: sale por detrás de la pata trasera, va hacia el lado y se enrosca hacia arriba -->
    <path d="M214 318 Q224 326 232 320 Q242 328 250 320 Q260 326 266 316 Q278 318 278 306 Q290 302 286 290 Q294 280 286 272 Q284 262 274 262 Q268 260 264 266 C272 268 276 276 273 286 C268 296 254 299 236 297 C226 296 218 295 212 295 Z" fill="${C.cola}"/>
    <path d="M220 316 Q230 322 238 318 Q248 324 256 317 Q266 320 270 312 Q281 310 280 300" stroke="${C.colaSombra}" stroke-width="3" stroke-linecap="round" fill="none" opacity=".8"/>
    <path d="M222 307 C240 310 258 308 268 298 C276 292 278 282 274 274" stroke="${C.colaSombra}" stroke-width="2.2" stroke-linecap="round" fill="none" opacity=".7"/>
    <path d="M230 302 C246 303 258 300 266 292 C270 290 272 284 271 279" stroke="${C.colaBrillo}" stroke-width="2" stroke-linecap="round" fill="none" opacity=".75"/>
    <path d="M265 266 C259 268 257 275 262 279" stroke="${C.cola}" stroke-width="3" stroke-linecap="round" fill="none"/>
    <!-- mechones que siguen la curva -->
    <path d="M220 314 C236 318 254 316 268 306 C278 298 282 288 280 278 M226 301 C240 303 254 301 264 293 M276 283 C278 275 276 269 270 266 M244 309 C254 309 262 305 268 299"
          stroke="${C.colaSombra}" stroke-width="1.8" stroke-linecap="round" fill="none" opacity=".75"/>
    <path d="M224 310 C240 313 256 311 268 302 C274 296 278 288 277 280 M236 299 C248 299 258 295 266 287 M281 290 C284 284 285 278 283 272"
          stroke="${C.colaBrillo}" stroke-width="1.6" stroke-linecap="round" fill="none" opacity=".85"/>
    <path d="M232 315 C244 317 256 315 264 309 M270 296 C274 290 276 284 275 278 M250 304 C256 303 261 300 265 296"
          stroke="${C.pelitos}" stroke-width="1" stroke-linecap="round" fill="none" opacity=".5"/>
  </g>

  <!-- patas traseras (sentado) -->
  <path d="M90 322 Q78 314 84 302 Q76 290 86 280 Q84 266 98 260 Q104 252 116 252 L204 252 Q216 252 222 260 Q236 266 234 280 Q244 290 236 302 Q242 314 230 322 Z" fill="${C.oscuro}"/>
  ${espejo(`<ellipse cx="104" cy="320" rx="17" ry="8" fill="${C.piernaClara}"/>`)}

  <!-- cuerpo -->
  <path d="M126 170 C114 200 108 232 108 262 Q102 270 108 278 Q102 288 109 296 Q106 308 114 318 L206 318 Q214 308 211 296 Q218 288 212 278 Q218 270 212 262 C212 232 206 200 194 170 Z" fill="${C.cuerpo}"/>
  <path d="M182 176 C196 206 202 238 204 268 L206 318 L190 318 C194 270 192 220 182 176 Z" fill="${C.oscuro}" opacity=".6"/>
  <path d="M136 204 q4 10 2 20 M184 204 q-4 10 -2 20 M124 236 q3 9 1 18 M196 236 q-3 9 -1 18" stroke="${C.claro}" stroke-width="2" stroke-linecap="round" fill="none" opacity=".6"/>

  <!-- patas delanteras -->
  ${espejo(`<g transform="translate(-8 0)">
    <path d="M124 230 Q122 218 136 216 L142 216 Q154 218 154 230 Q158 242 153 252 Q159 264 154 276 Q159 290 155 304 L119 304 Q115 290 121 276 Q115 264 121 252 Q116 242 124 230 Z" fill="${C.pierna}"/>
    <path d="M119 304 Q116 294 121 287 Q128 280 134 287 Q140 280 146 287 Q152 281 156 289 Q158 296 155 304 Z" fill="${C.piernaClara}"/>
    <path d="M114 312 Q114 300 126 300 L148 300 Q160 300 160 312 Q160 324 148 324 L126 324 Q114 324 114 312 Z" fill="${C.pata}"/>
    <path d="M130 315 v7 M144 315 v7" stroke="${C.pierna}" stroke-width="2.2" stroke-linecap="round"/>
    <path d="M118 303 Q124 312 130 305 Q137 313 143 305 Q150 312 156 303 Z" fill="${C.piernaClara}"/>
    <path d="M130 232 q4 9 2 18 M146 246 q-3 9 -1 17 M128 262 q3 8 1 15" stroke="${C.claro}" stroke-width="2" stroke-linecap="round" fill="none" opacity=".7"/>
  </g>`)}

  <!-- mancha blanca del pecho: ancha arriba, se estrecha en punta entre las patas -->
  <g>
    <path d="M146 196 Q152 192 160 195 Q168 192 174 196 Q182 200 184 208 Q194 212 196 222 Q188 226 186 234 Q180 240 178 248 Q176 258 172 264 Q170 276 160 290 Q150 276 148 264 Q144 258 142 248 Q140 240 134 234 Q132 226 124 222 Q126 212 136 208 Q138 200 146 196 Z" fill="${C.pecho}"/>
    <path d="M150 210 q6 6 2 14 M168 206 q-5 8 0 16 M158 228 q6 8 0 18 M166 246 q-5 8 -1 16 M154 250 q4 8 1 14 M178 218 q-4 6 0 12 M140 218 q4 6 0 12 M160 266 q3 6 0 12"
          stroke="${C.pechoSombra}" stroke-width="1.8" stroke-linecap="round" fill="none"/>
  </g>

  <!-- cabeza -->
  <g class="cabeza">
    <!-- orejas caídas -->
    ${espejo(`
      <path d="M112 72 C94 66 79 80 79 100 C79 122 87 141 98 151 Q106 155 110 146 C116 128 120 104 124 84 Z" fill="${C.oreja}"/>
      <path d="M112 74 C100 73 90 80 86 92 C96 85 108 83 120 86 Z" fill="${C.claro}" opacity=".7"/>
      <path d="M88 112 q2 14 9 25 M97 104 q0 15 6 28" stroke="${C.cuerpo}" stroke-width="1.6" stroke-linecap="round" fill="none" opacity=".8"/>
    `)}

    <path d="M134 60 Q138 46 148 54 Q154 42 162 52 Q170 42 176 54 Q184 48 188 62 Q160 50 134 60 Z" fill="${C.cabeza}"/>
    <path d="M160 50 C128 50 104 70 102 100 C100 116 102 130 108 142 C112 150 110 156 116 160 L204 160 C210 156 208 150 212 142 C218 130 220 116 218 100 C216 70 192 50 160 50 Z" fill="${C.cabeza}"/>
    <path d="M198 64 C212 76 218 90 218 102 C220 118 216 134 210 146 C210 120 208 90 198 64 Z" fill="${C.ojeras}" opacity=".6"/>
    <path d="M152 56 Q160 52 168 56 Q166 80 160 96 Q154 80 152 56 Z" fill="${C.claro}" opacity=".8"/>

    <ellipse cx="138" cy="105" rx="14" ry="13" fill="${C.ojeras}" opacity=".55"/>
    <ellipse cx="182" cy="105" rx="14" ry="13" fill="${C.ojeras}" opacity=".55"/>
    <path d="M148 108 Q160 102 172 108 L176 128 L144 128 Z" fill="${C.puente}"/>

    <g class="ojo">
      <circle cx="138" cy="104" r="10.5" fill="${C.blancoOjo}" stroke="${C.cuenca}" stroke-width="1.6"/>
      <g class="mirada" data-x="138" data-y="104">
        <circle cx="138" cy="104" r="7.5" fill="${C.iris}"/>
        <circle cx="138" cy="104" r="4.6" fill="${C.negro}"/>
        <circle cx="140.8" cy="101" r="2.6" fill="#fff"/>
        <circle cx="135.6" cy="106.6" r="1.1" fill="#fff" opacity=".8"/>
      </g>
      ${espiral(138, 104)}
    </g>
    <g class="ojo">
      <circle cx="182" cy="104" r="10.5" fill="${C.blancoOjo}" stroke="${C.cuenca}" stroke-width="1.6"/>
      <g class="mirada" data-x="182" data-y="104">
        <circle cx="182" cy="104" r="7.5" fill="${C.iris}"/>
        <circle cx="182" cy="104" r="4.6" fill="${C.negro}"/>
        <circle cx="184.8" cy="101" r="2.6" fill="#fff"/>
        <circle cx="179.6" cy="106.6" r="1.1" fill="#fff" opacity=".8"/>
      </g>
      ${espiral(182, 104)}
    </g>
    <path class="ojos-cerrados" d="M128 105 Q138 113 148 105 M172 105 Q182 113 192 105"
          stroke="${C.cuenca}" stroke-width="3.5" stroke-linecap="round" fill="none"/>

    <!-- cejas pobladas -->
    <g class="cejas">${espejo(`<path d="M152 95 Q144 80 128 83 Q118 86 114 98 Q119 93 124 94 Q121 99 123 104 Q130 93 140 92 Q147 92 152 95 Z" fill="${C.cejas}"/>`)}</g>

    <!-- barba y bigote: anchos, caen hacia los lados -->
    <path d="M108 128 Q100 150 112 168 Q118 182 132 186 Q140 196 150 192 Q160 200 170 192 Q180 196 188 186 Q202 182 208 168 Q220 150 212 128 Q190 120 160 122 Q130 120 108 128 Z" fill="${C.barbaOscura}"/>
    <path d="M146 170 Q150 190 160 196 Q170 190 174 170 Q160 178 146 170 Z" fill="${C.barba}"/>
    ${espejo(`
      <path d="M160 130 C146 126 124 130 114 142 Q106 154 114 166 Q118 176 128 176 Q136 184 146 178 Q154 172 158 160 Q161 146 160 130 Z" fill="${C.barba}"/>
      <path d="M158 134 C146 132 130 136 124 146 Q120 156 128 164 Q136 168 144 164 Q152 156 158 146 Z" fill="${C.bigote}"/>
      <path d="M150 142 Q136 146 126 160 M152 150 Q142 156 136 172 M156 158 Q151 168 149 182" stroke="${C.barbaOscura}" stroke-width="2" stroke-linecap="round" fill="none" opacity=".6"/>
      <path d="M148 137 Q134 139 123 151" stroke="${C.brilloBarba}" stroke-width="2" stroke-linecap="round" fill="none" opacity=".6"/>
      <path d="M146 145 Q134 151 129 163 M154 154 Q147 163 145 175 M117 152 Q113 160 116 168" stroke="${C.pelitos}" stroke-width="1.2" stroke-linecap="round" fill="none" opacity=".6"/>
    `)}
    <ellipse cx="160" cy="138" rx="13" ry="8" fill="${C.canas}" opacity=".6"/>

    <g class="boca-cerrada">
      <ellipse cx="160" cy="159" rx="4.5" ry="2.8" fill="${C.lengua}"/>
      <path d="M160 147 V153 M150 156 Q155 160 160 153 Q165 160 170 156"
            stroke="${C.linea}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    </g>
    <g class="boca-abierta">
      <path d="M148 153 Q160 149 172 153 Q172 170 160 172 Q148 170 148 153 Z" fill="#2a1410"/>
      <ellipse cx="160" cy="166" rx="7.5" ry="4.5" fill="${C.lengua}"/>
    </g>

    <path d="M144 126 Q160 116 176 126 Q180 138 168 144 Q160 148 152 144 Q140 138 144 126 Z" fill="${C.negro}"/>
    <ellipse cx="153" cy="125" rx="5" ry="2.2" fill="#fff" opacity=".3"/>
  </g>
  </g>

  <g class="zzz" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-weight="800" fill="#7d8494">
    <text x="214" y="60" font-size="16">z</text>
    <text x="227" y="44" font-size="20">z</text>
    <text x="242" y="26" font-size="25">Z</text>
  </g>

  <!-- globo de texto -->
  <g class="globo">
    <path d="M228 6 H290 A22 22 0 0 1 290 50 H236 L214 66 L222 50 H228 A22 22 0 0 1 228 6 Z"
          fill="#fff" stroke="#2b2d33" stroke-width="3" stroke-linejoin="round"/>
    <text class="texto-globo" x="259" y="28" dominant-baseline="central" text-anchor="middle" font-size="21" font-weight="800" fill="#2b2d33"
          font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif">¡Guau!</text>
  </g>
</svg>
</button>
<span class="sr" aria-live="polite"></span>`;
};

/*
 * 3. ESTILOS
 * El CSS del componente: tamaños, puntos de giro (transform-origin) y los estados
 * "durmiendo" y "ladrando", que muestran u ocultan piezas del dibujo.
 * Va dentro de un texto porque se inyecta en el Shadow DOM del componente,
 * así no se mezcla con el CSS de la página.
 */
window.DracoPartes = window.DracoPartes || {};

DracoPartes.estilos = `
  :host { display: inline-block; width: 260px; max-width: 100%; -webkit-tap-highlight-color: transparent; }
  button { all: unset; display: block; width: 100%; cursor: pointer; border-radius: 16px; }
  button:focus-visible { outline: 3px solid #4a90d9; outline-offset: 4px; }
  svg { display: block; width: 100%; height: auto; overflow: visible; }
  .cola    { transform-box: view-box; transform-origin: 216px 308px; }
  .perro   { transform-box: view-box; transform-origin: 160px 322px; }
  .cabeza  { transform-box: view-box; transform-origin: 160px 180px; transition: transform .6s ease; }
  .ojo     { transform-box: fill-box; transform-origin: center; }
  .ojos-cerrados, .zzz { display: none; }
  .durmiendo .ojo { display: none; }
  .durmiendo .ojos-cerrados, .durmiendo .zzz { display: inline; }
  .durmiendo .cabeza { transform: translateY(7px) rotate(5deg); }
  .durmiendo .perro { animation: respirar 3.4s ease-in-out infinite; }
  .zzz text { transform-box: fill-box; animation: flotar 2.4s ease-in-out infinite; opacity: 0; }
  .zzz text:nth-child(2) { animation-delay: .8s; }
  .zzz text:nth-child(3) { animation-delay: 1.6s; }
  @keyframes respirar { 50% { transform: scaleY(1.018); } }
  @keyframes flotar {
    0%   { opacity: 0; transform: translate(-6px, 8px); }
    30%  { opacity: 1; }
    100% { opacity: 0; transform: translate(6px, -8px); }
  }
  .globo   { transform-box: view-box; transform-origin: 214px 66px; transform: scale(0); opacity: 0;
             transition: transform .22s cubic-bezier(.34,1.56,.64,1), opacity .12s; pointer-events: none; }
  .globo.visible { transform: scale(1); opacity: 1; }
  .espiral { display: none; transform-box: view-box; }
  .mareado .mirada { display: none; }
  .mareado .espiral { display: inline; animation: girar .7s linear infinite; }
  @keyframes girar { to { transform: rotate(360deg); } }
  .boca-abierta { opacity: 0; }
  .ladrando .boca-abierta { opacity: 1; }
  .ladrando .boca-cerrada { opacity: 0; }
  .sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
  @media (prefers-reduced-motion: reduce) {
    .globo { transition: opacity .12s; }
    .cabeza { transition: none; }
    .durmiendo .perro { animation: none; }
    .zzz text { animation: none; opacity: 1; }
    .mareado .espiral { animation: none; }
  }
`;

/*
 * 4. COMPORTAMIENTO
 * Define la etiqueta <draco-perro>: une colores + dibujo + estilos y añade la lógica
 * (despertar, ladrar, parpadear, menear la cola y seguir el ratón con los ojos).
 *
 * Opciones (atributos de la etiqueta):
 *   <draco-perro sin-seguimiento>        los ojos no siguen al ratón
 *   <draco-perro texto="¡Hola!">         lo que dice el globo (varias frases: "¡Guau!|¡Hola!")
 *   <draco-perro mareo>                  si agitas mucho el ratón, se marea
 */
(() => {
  if (customElements.get('draco-perro')) return;

  const { colores, dibujo, estilos } = window.DracoPartes;
  const PLANTILLA = `<style>${estilos}</style>${dibujo(colores)}`;

  const azar = (min, max) => min + Math.random() * (max - min);
  const MAX_MIRADA = 3; // cuánto se mueve el iris dentro del ojo (unidades del dibujo)
  const UMBRAL_MAREO = 1500;  // cuánta agitación del ratón hace falta para marearlo (más alto = más difícil)
  const DURACION_MAREO = 2500; // milisegundos que dura mareado

  class DracoPerro extends HTMLElement {
    // Si se pone o se quita el atributo sin-seguimiento, los ojos vuelven a mirar al frente.
    static get observedAttributes() { return ['sin-seguimiento']; }
    attributeChangedCallback() { if (this._miradas) this._mirarAlFrente(); }

    connectedCallback() {
      if (!this.shadowRoot) {
        const raiz = this.attachShadow({ mode: 'open' });
        raiz.innerHTML = PLANTILLA;
        this._svg = raiz.querySelector('svg');
        this._boton = raiz.querySelector('button');
        this._cola = raiz.querySelector('.cola');
        this._cabeza = raiz.querySelector('.cabeza');
        this._ojos = raiz.querySelectorAll('.ojo');
        this._miradas = [...raiz.querySelectorAll('.mirada')].map(el => ({
          el, x: +el.dataset.x, y: +el.dataset.y, dx: 0, dy: 0, ox: 0, oy: 0,
        }));
        this._cejas = raiz.querySelector('.cejas');
        this._globo = raiz.querySelector('.globo');
        this._textoGlobo = raiz.querySelector('.texto-globo');
        this._aviso = raiz.querySelector('.sr');
        this._boton.addEventListener('click', () => (this._despierto ? this.ladrar() : this.despertar()));
        this._despierto = false;
      }
      this._calma = matchMedia('(prefers-reduced-motion: reduce)').matches;
      this._timers = {};
      this._alMover = e => { this._medirAgitacion(e); this._mirarA(e.clientX, e.clientY); };
      this._alSalir = e => { if (!e.relatedTarget) this._mirarAlFrente(); };
      addEventListener('pointermove', this._alMover, { passive: true });
      addEventListener('pointerdown', this._alMover, { passive: true });
      document.addEventListener('pointerout', this._alSalir);
      if (this._despierto) this._rutinaDespierto();
    }

    disconnectedCallback() {
      Object.values(this._timers).forEach(clearTimeout);
      cancelAnimationFrame(this._raf);
      this._raf = 0;
      removeEventListener('pointermove', this._alMover);
      removeEventListener('pointerdown', this._alMover);
      document.removeEventListener('pointerout', this._alSalir);
    }

    _repetir(nombre, min, max, accion) {
      this._timers[nombre] = setTimeout(() => {
        accion();
        this._repetir(nombre, min, max, accion);
      }, azar(min, max));
    }

    _rutinaDespierto() {
      this._repetir('parpadeo', 2500, 6000, () => this.parpadear());
      if (!this._calma) this._repetir('cola', 3000, 9000, () => this.menearCola());
    }

    despertar() {
      if (this._despierto) return;
      this._despierto = true;
      this._svg.classList.remove('durmiendo');
      this._boton.setAttribute('aria-label', 'Draco. Pulsa para que ladre');
      if (this._raton) this._mirarA(...this._raton);
      this._rutinaDespierto();
      this._timers.saludo = setTimeout(() => this.ladrar(), this._calma ? 0 : 450);
    }

    // --- los ojos siguen al ratón ---
    _mirarA(mx, my) {
      this._raton = [mx, my];
      if (!this._despierto || this.hasAttribute('sin-seguimiento')) return;
      const r = this._svg.getBoundingClientRect();
      if (!r.width) return;
      const escala = r.width / 320;
      for (const m of this._miradas) {
        const dx = mx - (r.left + m.x * escala);
        const dy = my - (r.top + m.y * escala);
        const d = Math.hypot(dx, dy) || 1;
        // cerca del ojo se mueve poco; a partir de ~120 unidades mira del todo hacia ese lado
        const k = (MAX_MIRADA * Math.min(1, d / (120 * escala))) / d;
        m.dx = dx * k;
        m.dy = dy * k;
      }
      this._animarMirada();
    }

    _mirarAlFrente() {
      this._miradas.forEach(m => { m.dx = 0; m.dy = 0; });
      this._animarMirada();
    }

    _animarMirada() {
      if (this._raf) return;
      const paso = () => {
        let quieto = true;
        const f = this._calma ? 1 : 0.25;
        for (const m of this._miradas) {
          m.ox += (m.dx - m.ox) * f;
          m.oy += (m.dy - m.oy) * f;
          if (Math.abs(m.dx - m.ox) > 0.01 || Math.abs(m.dy - m.oy) > 0.01) quieto = false;
          m.el.setAttribute('transform', `translate(${m.ox.toFixed(2)} ${m.oy.toFixed(2)})`);
        }
        // las cejas acompañan a los ojos, pero menos
        const [i, d] = this._miradas;
        const cx = ((i.ox + d.ox) / 2) * 0.6;
        const cy = ((i.oy + d.oy) / 2) * 0.85;
        this._cejas.setAttribute('transform', `translate(${cx.toFixed(2)} ${cy.toFixed(2)})`);
        this._raf = quieto ? 0 : requestAnimationFrame(paso);
      };
      this._raf = requestAnimationFrame(paso);
    }

    // --- mareo: si el ratón se agita mucho en poco tiempo ---
    _medirAgitacion(e) {
      if (!this._despierto || this._mareado || this._calma || !this.hasAttribute('mareo')) {
        this._ultimo = null;
        return;
      }
      const ahora = performance.now();
      if (this._ultimo) {
        const recorrido = Math.hypot(e.clientX - this._ultimo.x, e.clientY - this._ultimo.y);
        // la agitación acumulada se va "olvidando" sola: a los 0,5 s queda algo más de un tercio
        const olvido = Math.exp(-(ahora - this._ultimo.t) / 500);
        this._agitacion = (this._agitacion || 0) * olvido + recorrido;
        if (this._agitacion > UMBRAL_MAREO) this.marear();
      }
      this._ultimo = { x: e.clientX, y: e.clientY, t: ahora };
    }

    marear() {
      if (!this._despierto || this._mareado) return;
      this._mareado = true;
      this._agitacion = 0;
      this._svg.classList.add('mareado');
      if (!this._calma) {
        this._cabeza.animate(
          [0, 4, -4, 3, -3, 2, 0].map(g => ({ transform: `rotate(${g}deg)` })),
          { duration: DURACION_MAREO, easing: 'ease-in-out' }
        );
      }
      this._timers.mareo = setTimeout(() => {
        this._mareado = false;
        this._svg.classList.remove('mareado');
      }, DURACION_MAREO);
    }

    parpadear() {
      const veces = Math.random() < 0.2 ? 2 : 1; // a veces parpadea dos veces seguidas
      this._ojos.forEach(ojo => ojo.animate(
        [{ transform: 'scaleY(1)' }, { transform: 'scaleY(.1)' }, { transform: 'scaleY(1)' }],
        { duration: 180, iterations: veces, easing: 'ease-in-out' }
      ));
    }

    menearCola() {
      this._cola.animate(
        [0, -12, 3, -12, 3, -8, 0].map(g => ({ transform: `rotate(${g}deg)` })),
        { duration: 1100, easing: 'ease-in-out' }
      );
    }

    ladrar() {
      this._svg.classList.add('ladrando');
      clearTimeout(this._timers.boca);
      this._timers.boca = setTimeout(() => this._svg.classList.remove('ladrando'), 350);

      if (!this._calma) {
        this._cabeza.animate(
          [{ transform: 'none' }, { transform: 'translateY(-5px) rotate(-3deg)', offset: 0.3 }, { transform: 'none' }],
          { duration: 380, easing: 'ease-out' }
        );
        this.menearCola();
      }

      // texto del globo: atributo texto="...", con varias frases separadas por |
      const frases = (this.getAttribute('texto') || '¡Guau!').split('|').map(f => f.trim()).filter(Boolean);
      const frase = frases[Math.floor(Math.random() * frases.length)] || '¡Guau!';
      this._textoGlobo.textContent = frase;
      // la letra se encoge si la frase es larga, para que quepa en el globo
      this._textoGlobo.setAttribute('font-size', Math.max(10, Math.min(21, 150 / frase.length)).toFixed(1));

      this._globo.classList.add('visible');
      clearTimeout(this._timers.globo);
      this._timers.globo = setTimeout(() => this._globo.classList.remove('visible'), 1600);

      this._aviso.textContent = '';
      requestAnimationFrame(() => { this._aviso.textContent = frase; });
    }
  }

  customElements.define('draco-perro', DracoPerro);
})();
