# QA + CORRECCIONES — NORDICE (comparación build actual vs. referencia oficial)

> Pega este documento completo en Claude Code. Tienes en el proyecto/carpeta de referencia estas 5 imágenes, que son **recortes exactos y en alta fidelidad** de la landing original (cada una mide 1024px de ancho, y sus alturas SUMAN 1536px, es decir, son literalmente el diseño original cortado en 5 franjas):
>
> 1. `01-nordice-hero.png` → 1024 × **521px** (33.9% del alto total)
> 2. `02-nordice-nuestra-esencia.png` → 1024 × **226px** (14.7%)
> 3. `03-nordice-nuestro-proceso.png` → 1024 × **234px** (15.2%)
> 4. `04-nordice-eleva-cada-experiencia.png` → 1024 × **228px** (14.8%)
> 5. `05-nordice-nuestros-productos.png` → 1024 × **327px** (21.3%, incluye footer)
>
> También tienes una captura del **build actual** (`1788576118952_image.png`, 1600×4569px) que muestra el estado de avance real del sitio. Compara pixel a pixel cada sección del build actual contra su imagen de referencia correspondiente y corrige TODOS los puntos listados abajo. Son hallazgos confirmados tras análisis visual directo, no suposiciones.

---

## 🔴🔴 REGLA #0 — NO INVENTAR NADA GENÉRICO. USAR SIEMPRE LOS ASSETS ORIGINALES

Este es el problema raíz detrás de casi todos los bugs de este documento: en el build actual se **reemplazaron ilustraciones y íconos originales por versiones genéricas "inventadas"** (íconos de librería, formas simplificadas, estilos distintos) en vez de usar el arte real que aparece en las imágenes de referencia. Esto es lo que hace que el resultado se sienta "de plantilla" y no como el diseño aprobado.

**Para eliminar cualquier ambigüedad, ya extraje del propio diseño de referencia los recortes exactos, pixel por pixel, de cada ícono/ilustración original.** Estos archivos están en la carpeta `assets-originales/` y **deben usarse tal cual (como `<img>`/`background-image`) o vectorizarse trazando exactamente su silueta** — nunca sustituirse por un ícono "parecido" de una librería genérica (Font Awesome, Heroicons, Lucide, etc.) ni redibujarse "a criterio":

| Archivo | Uso exacto | Sección |
|---|---|---|
| `icon-pureza-montana.png` | Ícono "PUREZA" | Nuestra esencia |
| `icon-claridad-cubo.png` | Ícono "CLARIDAD" | Nuestra esencia |
| `icon-artesania-mano.png` | Ícono "ARTESANÍA" | Nuestra esencia |
| `icon-experiencia-vaso.png` | Ícono "EXPERIENCIA" | Nuestra esencia |
| `proceso-1-origen.png` | Ilustración "1. ORIGEN" (montañas + reflejo) | Nuestro proceso |
| `proceso-2-pureza.png` | Ilustración "2. PUREZA" (cascada) | Nuestro proceso |
| `proceso-3-congelacion.png` | Ilustración "3. CONGELACIÓN LENTA" (iceberg) | Nuestro proceso |
| `proceso-4-resultado.png` | Ilustración "4. RESULTADO" (vaso con cubos) | Nuestro proceso |
| `icon-bars-martini.png` | Ícono "BARS" | Eleva cada experiencia |
| `icon-restaurantes-cubiertos.png` | Ícono "RESTAURANTES" | Eleva cada experiencia |
| `icon-hoteles-campana.png` | Ícono "HOTELES" | Eleva cada experiencia |
| `icon-eventos-copas.png` | Ícono "EVENTOS" | Eleva cada experiencia |
| `producto-collins.png` | Render "COLLINS 4 × 1.25" | Nuestros productos |
| `producto-cubo2x2.png` | Render "CUBOS 2 × 2" | Nuestros productos |
| `producto-esfera.png` | Render "ESFERAS 2"" | Nuestros productos |
| `producto-cubo2x175.png` | Render "CUBOS 2 × 1.75" | Nuestros productos |

**Instrucción para Claude Code:**
1. Copia la carpeta `assets-originales/` completa a `public/icons/` (o la carpeta de assets estáticos del proyecto).
2. Reemplaza cada ícono/ilustración "inventado" en el código actual por el archivo real correspondiente de la tabla, usando `<img src="/icons/archivo.png" alt="...">` (o `background-image` con `background-size: contain`).
3. Si por performance o theming se prefiere SVG vectorizado en vez de PNG: **el SVG debe trazarse calcando exactamente el contorno de estos PNG de referencia** (usa la imagen como capa guía en Figma/Illustrator o una herramienta de vectorización tipo `potrace`), no crearse desde cero "a ojo" ni tomarse de una librería de íconos genérica.
4. Antes de dar por cerrada cada sección, pon el PNG original y el resultado en pantalla lado a lado y confirma que son **el mismo dibujo**, no una interpretación distinta.
5. Esta regla aplica también al monograma "N" del logo y a cualquier otro elemento gráfico del sitio que no sea texto: si existe una versión en las imágenes de referencia, esa es la única fuente válida — no se "mejora", no se "simplifica", no se sustituye por criterio propio.

---

## 🔴 BUGS CRÍTICOS (rompen la fidelidad visual — prioridad máxima)

### 1. Iconos de "Eleva cada experiencia" rotos (fuente de íconos no carga)
En el build actual, la fila BARS / RESTAURANTES / HOTELES / EVENTOS no muestra los íconos correctos: aparecen caracteres sueltos como **"7"**, **"11"**, un glifo irregular y **"77"** en lugar de los íconos de línea (copa martini, tenedor+cuchillo, campana de servicio, dos copas brindando). Esto pasa porque los iconos dependen de una **icon-font/ligature** que no está cargando o cuyo mapeo de códigos está mal referenciado.

**Fix obligatorio:** eliminar cualquier dependencia de icon-font para estos 4 íconos y reemplazarlos por **SVG inline** (`<svg>` embebido directo en el HTML/JSX), `stroke="currentColor"`, `stroke-width: 1`, `fill: none`, tamaño 28–32px, calcado del trazo fino visible en `04-nordice-eleva-cada-experiencia.png`:
- BARS → copa de martini (triángulo invertido + base + pie).
- RESTAURANTES → tenedor y cuchillo cruzados/paralelos.
- HOTELES → campana de servicio (cloche) sobre plato.
- EVENTOS → dos copas de vino brindando en ángulo.

Aplica el mismo criterio (SVG inline, nunca icon-font) a **todos** los demás íconos del sitio (montaña, cubo, mano tallando, vaso, iconos de producto) para blindarte de este bug en cualquier navegador/entorno.

### 2. Logo/badge roto en el footer
El ícono circular junto al copyright en el footer actual se renderiza como un cuadro vacío ("tofu"/glifo faltante) en vez del monograma "N". Reemplázalo por el mismo SVG del monograma usado en el header (no un carácter de fuente).

### 3. Elemento flotante "N" duplicado/fuera de lugar
En la captura aparece un badge circular con "N" en la esquina superior izquierda, repetido en distintos puntos del scroll (parece un elemento `position: fixed` que se está duplicando en capturas de página completa, o mal posicionado). Verifica: si es un botón flotante intencional (ej. volver arriba / contacto rápido), debe:
- Tener `position: fixed` real (uno solo en el DOM, nunca duplicado).
- Ubicarse esquina **inferior derecha** (patrón estándar, no interfiere con el nav).
- Usar el SVG del monograma, no una fuente que pueda romperse.
Si no es un elemento intencional del diseño original, **elimínalo por completo** — no aparece en ninguna de las 5 imágenes de referencia.

---

## 🟠 ESPACIADO — el problema más notorio del build actual

El build actual tiene **espacios vacíos enormes** entre secciones (300–500px de negro sin contenido entre "Nuestra esencia" → "Nuestro proceso" → "Eleva cada experiencia" → "Nuestros productos"). En la referencia real, las secciones son **compactas y rítmicas**, sin esos huecos. Esto es lo que más aleja el resultado del acabado "premium" — se ve descuidado, no lujoso.

**Regla de proporción exacta (basada en las 5 imágenes de referencia, que sí sabemos que sumaban 1536px sin huecos):**

| Sección | % del alto total de la página | Regla práctica en desktop |
|---|---|---|
| Hero (con nav) | 33.9% | ~1 viewport completo (`min-height: 100vh` está bien SOLO aquí) |
| Nuestra esencia | 14.7% | `padding: 100px 0` aprox., contenido compacto, sin más |
| Nuestro proceso | 15.2% | `padding: 100px 0` aprox. |
| Eleva cada experiencia | 14.8% | `padding: 100px 0` aprox. (foto full-bleed a la derecha) |
| Nuestros productos + footer | 21.3% | `padding: 100px 0` para grid + footer compacto debajo |

**Acción concreta:** audita cada `<section>` en el CSS/componentes y elimina:
- Cualquier `min-height: 100vh` fuera del Hero.
- Márgenes/paddings acumulados por defecto de componentes anidados (ej. un `container` con padding + su `section` padre con padding + un wrapper extra con padding → esto se suma y crea los huecos).
- Divs vacíos usados como "spacers".

Usa como techo: **ninguna sección después del hero debería superar ~140px de padding vertical (top y bottom) en desktop**, y ~64px en mobile.

---

## 🟡 SECCIÓN POR SECCIÓN — diferencias puntuales

### HERO (`01-nordice-hero.png`)
- ❌ El build actual agrega un pequeño ícono/monograma "N" **arriba** del título "NORDICE". **En la referencia no existe ese ícono ahí** — el título "NORDICE" va directo, sin badge encima. Elimínalo de esa posición (o dejarlo únicamente en el header/nav si el diseño lo requiere ahí, pero no flotando sobre el título del hero).
- ❌ El espacio entre el título "NORDICE" y el tagline script ("Hielo nacido de la pureza del norte.") es mayor en el build actual que en la referencia. En la referencia el tagline está pegado casi inmediatamente debajo del título (gap ≈ 8–12px), con el trazo/flourish decorativo saliendo desde el extremo derecho del texto. Reduce el `margin-top` del tagline.
- ✅ Nav, botón "HACER PEDIDO", imagen de hielo y botón "DESCUBRE NUESTRO PROCESO" están correctos en posición y estilo — no tocar.

### NUESTRA ESENCIA (`02-nordice-nuestra-esencia.png`)
- ✅ Los 4 íconos (montaña / cubo / mano / vaso) y textos están bien logrados en estilo y contenido.
- ❌ Corrige el espaciado (ver tabla arriba): la sección actual tiene demasiado aire arriba y abajo.
- Detalle fino: en la referencia las líneas verticales divisorias entre columnas son más sutiles (opacidad ~15%) y más cortas (no ocupan todo el alto de la tarjeta, solo el alto del bloque ícono+texto). Ajusta `border-left` a `height: 100%` del contenido, no del section completo.

### NUESTRO PROCESO (`03-nordice-nuestro-proceso.png`)
- ❌ **El build actual agrega números "1 2 3 4" flotando arriba de cada ícono.** En la referencia oficial **no existen esos números sueltos** — el número va integrado en el label de texto ("1. ORIGEN", "2. PUREZA", etc.), no como elemento gráfico separado arriba del ícono. Elimina el `<span>`/elemento de número superior.
- ❌ **Estilo de ícono incorrecto:** en la referencia, esta sección usa **ilustraciones detalladas tipo grabado/línea fina con textura** (montañas con sombreado, cascada con líneas de agua, iceberg con reflejo, vaso con cubos tallados) — es un estilo **distinto y más elaborado** que los íconos simples de "Nuestra esencia". El build actual está usando los mismos íconos de línea simple/genéricos para ambas secciones, perdiendo esa diferenciación. Si no tienes los assets ilustrados originales, usa SVGs más detallados (con múltiples trazos, sombreado sutil con `stroke-opacity` variable) específicamente para estos 4 pasos, replicando la composición de `03-nordice-nuestro-proceso.png`.
- ✅ Las flechas `→` entre pasos y el layout horizontal de 4 columnas están correctos.

### ELEVA CADA EXPERIENCIA (`04-nordice-eleva-cada-experiencia.png`)
- 🔴 Ver bug crítico #1 (íconos rotos) — es la corrección más urgente de esta sección.
- ✅ Layout de texto a la izquierda + foto full-bleed a la derecha está correcto.
- Verifica que el degradado de fusión entre la foto y el fondo negro (lado izquierdo de la imagen) esté presente; en la referencia la foto se funde suavemente con el negro, no corta en un borde duro.

### NUESTROS PRODUCTOS + FOOTER (`05-nordice-nuestros-productos.png`)
- ✅ Las 4 tarjetas de producto (Collins, Cubos 2×2, Esferas, Cubos 2×1.75) están correctas en estructura y textos.
- Mejora sugerida (no bloqueante): en la referencia, los íconos de producto tienen más volumen/sombreado (se ven como renders 3D simples de vidrio/hielo), mientras que el build actual usa contornos planos muy simples. Si el tiempo lo permite, añade un sutil `filter: drop-shadow()` o gradiente interno para dar sensación de profundidad de cristal.
- ❌ **Footer incompleto.** La referencia trae un footer de **4 columnas**:
  1. Logo NORDICE + tagline script pequeña.
  2. "NAVEGACIÓN": Inicio / Esencia / Proceso / Productos / Contacto.
  3. "CONTACTO": email, teléfono, ciudad (cada uno con su ícono).
  4. "SÍGUENOS": íconos redondos de Instagram + otra red social.
  El build actual solo muestra un logo pequeño (roto, ver bug #2) y el copyright, perdiendo las 3 columnas de navegación/contacto/social. Reconstruye el footer completo con esas 4 columnas antes de la línea de copyright.
- ℹ️ Nota sobre la sección "Solicitud de acceso" (formulario con WhatsApp) que agregaste en el build actual: **no existe en el diseño original de referencia**, pero si es un requerimiento nuevo del proyecto (parece un formulario de contacto real para el negocio), trátalo como una **sección adicional #6**, ubicada *antes* del footer de 4 columnas — no en reemplazo de él. Aplica el mismo criterio de espaciado compacto (no dejar los ~300px de hueco que tiene actualmente antes de esta sección) y la misma tipografía/paleta del resto del sitio para que no se sienta "pegada" o fuera de tono.

---

## ✅ CHECKLIST FINAL PARA CLAUDE CODE

0. [ ] Copiar `assets-originales/` al proyecto y reemplazar CADA ícono/ilustración "inventado" por el archivo original correspondiente (ver tabla de la Regla #0). Cero íconos de librerías genéricas.
1. [ ] Para los pocos íconos que si son genéricos por diseño (ninguno detectado en este análisis, pero si aparece alguno nuevo), usar SVG inline en vez de icon-font.
2. [ ] Quitar el badge/monograma flotante duplicado o mal ubicado; si es intencional, fijarlo una sola vez, abajo-derecha.
3. [ ] Quitar el ícono sobre el título "NORDICE" en el hero.
4. [ ] Reducir el `margin-top` entre título y tagline en el hero.
5. [ ] Auditar y reducir el padding vertical de TODAS las secciones post-hero (máx. ~140px desktop / ~64px mobile), eliminando spacers vacíos.
6. [ ] Quitar los números sueltos "1 2 3 4" en "Nuestro proceso".
7. [ ] Diferenciar visualmente los íconos de "Nuestro proceso" (ilustrados/detallados) de los de "Nuestra esencia" (línea simple).
8. [ ] Reconstruir el footer completo de 4 columnas (logo/tagline, navegación, contacto, síguenos).
9. [ ] Reubicar la sección "Solicitud de acceso" como sección adicional antes del footer, con el mismo espaciado compacto.
10. [ ] Verificar en Chrome/Safari/Firefox que ningún ícono se rompe (recargar sin caché, `Cmd+Shift+R`) antes de dar por cerrado el QA.

Después de aplicar cada corrección, vuelve a comparar visualmente sección por sección contra `01-…png` a `05-…png` y confirma explícitamente en tu respuesta cuáles puntos del checklist quedaron resueltos.
