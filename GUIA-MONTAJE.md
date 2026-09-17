# Guía de montaje desde cero

Esta guía te lleva de un computador con nada instalado a tu web publicada, con sus cuatro repositorios y la analítica funcionando. Está escrita para hacerse en orden, paso a paso, sin saber programar. Todo se hace desde el navegador; no hay que instalar nada.

Tiempo estimado: 2 a 3 horas la primera vez. Después, publicar un cambio toma un minuto.

---

## 0 · Qué vas a montar

Cuatro repositorios en tu cuenta de GitHub (`macaicedosanchez-designer`). Un repositorio es simplemente una carpeta guardada en GitHub que se publica como sitio web.

| Carpeta del paquete | Nombre del repositorio en GitHub | Dirección pública |
| --- | --- | --- |
| `macaicedosanchez-designer.github.io/` | `macaicedosanchez-designer.github.io` | `https://macaicedosanchez-designer.github.io/` |
| `media/` | `media` | `https://macaicedosanchez-designer.github.io/media/` |
| `docs/` | `docs` | `https://macaicedosanchez-designer.github.io/docs/` |
| `links/` | `links` | `https://macaicedosanchez-designer.github.io/links/` |

El primero es la web. Los otros tres son almacenes con dirección fija: imágenes, documentos y links de redirección. Los tres cuelgan de la misma dirección de tu web, así que cuando compres un dominio todo se mueve junto.

**Regla de oro:** los nombres de los repositorios `media`, `docs` y `links` tienen que ser exactamente esos, en minúsculas, porque la web los busca por ese nombre.

---

## 1 · Preparar la cuenta de GitHub

Ya tienes cuenta y un repositorio `macaicedosanchez-designer.github.io` con el código provisional. Vamos a reemplazarlo.

1. Entra a <https://github.com> e inicia sesión.
2. Ve a <https://github.com/macaicedosanchez-designer/macaicedosanchez-designer.github.io>.
3. Descarga tu `portafolio.pdf` actual (ábrelo en el repositorio, botón **Download raw file**) y guárdalo en tu computador: lo vas a subir al repositorio `docs`.
4. Borra los archivos viejos: en la página del repositorio, entra a cada archivo, clic en el ícono de la papelera (arriba a la derecha del archivo) → **Commit changes**. Repite hasta que el repositorio quede vacío. Si son muchos archivos, es más rápido el camino alternativo del paso 3.4.

> Si prefieres empezar limpio: **Settings** (pestaña del repositorio) → baja hasta **Danger Zone** → **Delete this repository** → escribe el nombre → confirma. Luego créalo de nuevo en el paso 3.1. Tu dirección pública será la misma.

---

## 2 · Crear los tres repositorios de almacén

Para cada uno de `media`, `docs` y `links`:

1. Arriba a la derecha en GitHub, clic en **+** → **New repository**.
2. **Repository name:** `media` (luego `docs`, luego `links`). Exactamente así.
3. **Public** (tiene que ser público para que GitHub lo publique gratis).
4. Marca **Add a README file**.
5. **Create repository**.

Ahora sube el contenido de la carpeta correspondiente del paquete:

6. En el repositorio recién creado: botón **Add file** → **Upload files**.
7. Abre en tu computador la carpeta del paquete (`media/`, `docs/` o `links/`), selecciona **todo lo que hay adentro** (no la carpeta, su contenido) y arrástralo a la ventana de GitHub. En Windows, para ver los archivos que empiezan por punto (`.nojekyll`) activa **Ver → Elementos ocultos**; en Mac, presiona `Cmd + Shift + .`.
8. Espera a que termine de cargar y clic en **Commit changes**.
9. Si te preguntó si reemplazas el `README.md`, di que sí.

Activa la publicación:

10. **Settings** → en el menú izquierdo, **Pages**.
11. En **Build and deployment → Source** deja **Deploy from a branch**. En **Branch** elige `main` y `/ (root)`. **Save**.
12. En uno o dos minutos aparece arriba un aviso verde: *Your site is live at …*.

Comprueba:

- `https://macaicedosanchez-designer.github.io/media/` debe mostrar "Banco de imágenes".
- `https://macaicedosanchez-designer.github.io/docs/` debe mostrar la lista de documentos.
- `https://macaicedosanchez-designer.github.io/links/web` debe llevarte a tu web (que aún no existe: verás un error 404 de GitHub; es normal por ahora).

### 2.1 · Subir las imágenes al repositorio media

1. En el repositorio `media` → **Add file → Upload files**.
2. Arrastra todas tus imágenes ya renombradas. El archivo `LISTA-DE-IMAGENES.md` dentro de `media/` tiene los nombres exactos que la web espera; compáralo con lo que subes.
3. **Commit changes**. Si son muchas o pesan más de 25 MB en total, súbelas en varias tandas.
4. Prueba una: `https://macaicedosanchez-designer.github.io/media/renobo_portada_01_panel-comercial.jpg` debe abrir la imagen.

Ese es también el link que usarás para publicar imágenes en redes o donde necesites: cada imagen tiene dirección fija.

### 2.2 · Subir los documentos

En el repositorio `docs`, sube `hv-es.pdf`, `cv-en.pdf` y `portafolio.pdf` (el que descargaste en el paso 1.3). Con esos nombres exactos.

### 2.3 · Revisar los links

En el repositorio `links`, abre `linkedin/index.html` y verifica que la URL de tu perfil sea correcta. Para editar un archivo en GitHub: ábrelo, clic en el lápiz ✏️ arriba a la derecha, cambia lo que necesites y **Commit changes**.

---

## 3 · Publicar la web

1. Si borraste el repositorio en el paso 1, créalo de nuevo: **+ → New repository → Repository name:** `macaicedosanchez-designer.github.io` → Public → **Create repository** (sin README esta vez).
2. **Add file → Upload files**.
3. Arrastra **todo el contenido** de la carpeta `macaicedosanchez-designer.github.io/` del paquete: las carpetas `_data`, `_includes`, `_layouts`, `_plantillas`, `assets`, `home`, `direccion-creativa`, `productos-servicios`, `gestion-innovacion` y los archivos sueltos (`_config.yml`, `404.html`, etc.). GitHub conserva la estructura de carpetas al arrastrarlas.
4. Si el repositorio tenía archivos viejos, el paso 3 los reemplaza cuando se llaman igual; los que se llamen distinto (por ejemplo tu `index.html` viejo) hay que borrarlos a mano: ábrelos → papelera → Commit. **Importante:** no puede quedar un `index.html` viejo en la raíz, porque el Home nuevo se genera desde `home/index.html`.
5. **Commit changes**.
6. **Settings → Pages → Source: Deploy from a branch → Branch: main / (root) → Save**.
7. En la pestaña **Actions** del repositorio ves cómo GitHub construye la web (un círculo amarillo → un chulo verde). Tarda de uno a tres minutos.
8. Abre `https://macaicedosanchez-designer.github.io/`.

Si el chulo sale rojo (✗), entra al proceso fallido y lee el mensaje: casi siempre es un archivo `.yml` con un error de escritura (un `:` de más, comillas sin cerrar). Ver la sección 9, *Problemas frecuentes*.

---

## 4 · Cómo está organizada la web

```
macaicedosanchez-designer.github.io/
│
├── _config.yml            ← dirección de la web, correo, códigos de analítica
├── _data/
│   ├── areas.yml          ← las tres áreas (nombre y descripción en ES y EN)
│   ├── proyectos.yml      ← REGISTRO DE PROYECTOS: aquí se agregan los proyectos
│   └── links.yml          ← a qué link del repositorio "links" apunta cada botón
│
├── _includes/             ← piezas que se repiten en todas las páginas
│   ├── banda-superior.html    (nombre, ES/EN, LinkedIn, HV)
│   ├── pie.html               (banda negra, cubo, Hablemos, privacidad)
│   ├── head.html              (título, fuentes, favicon)
│   ├── analitica.html         (Google Analytics y Clarity)
│   ├── tarjeta-proyecto.html  (la tarjeta cuadrada de cada proyecto)
│   ├── selector-areas.html    (los tres botones de área)
│   └── cierre-caso.html       (siguiente proyecto + volver)
│
├── _layouts/              ← esqueletos de página
│   ├── base.html              (todas las páginas)
│   ├── repositorio.html       (las páginas de área)
│   └── caso.html              (los casos de estudio)
│
├── _plantillas/           ← para copiar cuando agregues algo
│   ├── caso/                  (un caso nuevo con todos los bloques de ejemplo)
│   └── area/                  (un área nueva)
│
├── assets/
│   ├── css/tokens.css         ← EL ATLAS: colores, fuentes, espacios
│   ├── css/base.css           ← header, pie, botones, idiomas
│   ├── css/componentes.css    ← carruseles, pestañas, libro, mosaico…
│   ├── css/repositorio.css
│   ├── js/idioma.js           ← cambio ES/EN
│   └── js/bloques.js          ← todas las interacciones
│
├── home/
│   ├── index.html         ← EL HOME (textos de presentación)
│   └── home.css
│
├── direccion-creativa/
│   ├── index.html         ← repositorio del área (se arma solo)
│   └── renobo/            ← CASO RENOBO
│       ├── index.html
│       └── caso.css
├── productos-servicios/
│   ├── index.html
│   └── comadreo/          ← CASO CO-MADREO
├── gestion-innovacion/
│   ├── index.html
│   └── kickoff/           ← CASO KICK OFF
│
├── 404.html · favicon.svg · manifest.webmanifest · robots.txt · sitemap.xml
└── GUIA-MONTAJE.md · README.md
```

Las carpetas que empiezan por `_` son "de cocina": GitHub las usa para armar las páginas pero no se publican como direcciones. Todo lo demás se publica tal cual: `home/index.html` es `/`, `direccion-creativa/renobo/index.html` es `/direccion-creativa/renobo/`.

### Cómo funciona el idioma

Cada página tiene los dos textos en el mismo archivo. Todo lo que está dentro de `<span lang="es">` o `<div lang="es">` se ve en español; lo que está en `lang="en"`, en inglés. El selector del menú muestra uno u oculta el otro sin recargar. Cuando edites un texto, edita las dos versiones, que siempre están una junto a la otra.

```html
<p><span lang="es">Hola</span><span lang="en">Hello</span></p>
```

### Dónde están los colores y las fuentes

Todo está en `assets/css/tokens.css`. Cambiar `--ultramar: #2B1BE8;` cambia el azul de toda la web. Las fuentes son Archivo y JetBrains Mono (Google Fonts), tal como fija el atlas.

---

## 5 · Editar un texto

1. En GitHub, abre el archivo (por ejemplo `home/index.html`).
2. Clic en el lápiz ✏️.
3. Usa `Ctrl + F` para encontrar la frase que quieres cambiar.
4. Cambia el texto en español y también el que está en el `<span lang="en">` de al lado.
5. **Commit changes** (botón verde arriba a la derecha) → **Commit changes** otra vez en la ventana.
6. En uno o dos minutos el cambio está en la web. Recarga con `Ctrl + Shift + R` para saltarte la memoria del navegador.

No toques lo que está entre `<` y `>` a menos que sepas qué es: son las etiquetas que arman la página.

---

## 6 · Agregar un proyecto nuevo

Supongamos que quieres agregar "Obras por impuestos" (`obrasxi`) al área Gestión de Innovación.

**A. Registrarlo.** Abre `_data/proyectos.yml` → ✏️ → copia el último bloque completo (desde `- id:` hasta la última línea de `etiquetas`) y pégalo al final. Cambia:

```yaml
- id: obrasxi
  url: /gestion-innovacion/obrasxi/
  area: gestion-innovacion
  secundarias: [productos-servicios]
  anio: 2024
  banco: obrasxi_banco_01_cuadrada.webp
  publicado: false            # ← déjalo en false mientras lo terminas
  titulo:
    es: Obras por impuestos
    en: Works for Taxes
  linea:
    es: Una frase de una línea.
    en: A one-line sentence.
  etiquetas:
    es: [Etiqueta uno, Etiqueta dos]
    en: [Tag one, Tag two]
```

Cuidado con la sangría: cada nivel lleva dos espacios, exactamente como el bloque que copiaste. Si un texto tiene dos puntos `:` o empieza con un símbolo, ponlo entre comillas dobles.

**B. Crear su página.** Ve a `_plantillas/caso/index.html`, ábrelo, selecciona todo el contenido (`Ctrl + A`, `Ctrl + C`). Luego, en la raíz del repositorio: **Add file → Create new file**. En el nombre escribe `gestion-innovacion/obrasxi/index.html` (al escribir `/`, GitHub crea las carpetas). Pega. Cambia las primeras líneas (`proyecto: obrasxi`, `area`, títulos, `imagen`, `css`) y borra los bloques de ejemplo que no uses. **Commit**.

Repite con `_plantillas/caso/caso.css` → `gestion-innovacion/obrasxi/caso.css` (puede quedar casi vacío).

**C. Subir sus imágenes** al repositorio `media` con la nomenclatura `obrasxi_tipo_número_descripción`.

**D. Publicar:** cuando esté listo, cambia `publicado: false` por `publicado: true` en `proyectos.yml`.

Con eso, sin tocar nada más, el proyecto aparece en la grilla de su área, su imagen `banco` entra en la rotación del botón del Home y queda como "Siguiente proyecto" al final del caso anterior. También aparece en las áreas que pusiste en `secundarias`.

### Los bloques disponibles para armar un caso

Todos están de ejemplo en `_plantillas/caso/index.html`. Cada bloque es un pedazo de HTML que se copia y se pega; se activa con `data-bloque="…"`:

| Bloque | Qué hace |
| --- | --- |
| `hero-lleno` / `hero-dividido` | Portada a pantalla completa o partida, con parallax |
| `ficha-banda` / `acordeon` | Ficha técnica en banda o desplegable |
| `carrusel` | Una imagen a la vez, flechas, contador, avance automático opcional |
| `pestanas` | Pestañas que cambian de contenido sin recargar |
| `libro` | Se hojea como un libro, con miniaturas |
| `mosaico` | Grilla irregular; clic amplía en su lugar |
| `carrete` | La página se detiene y las imágenes pasan de lado |
| `fijo-scroll` | Imagen anclada mientras el texto avanza |
| `pausa` | Una palabra a pantalla completa |
| `giro` | Tarjetas que giran |
| `zoom` | Ampliar y arrastrar, con puntos que despliegan notas |
| `secuencia` | Visor animado con barra de progreso |
| `iframe-diferido` | Otra web incrustada, que carga al tocar |
| `barras` | Gráfico de barras que crece al aparecer |
| `linea-tiempo` | Bloques proporcionales a su duración, con detalle al clic |
| `salas` | Barra fija que salta a cada sección y resalta la visible |
| `360` | Visor 360° arrastrable |
| `contador` / `palabras` / `lineas` | Números que cuentan, frases que aparecen palabra por palabra o línea por línea |

---

## 7 · Activar la analítica

Sin esto la web funciona igual; la analítica solo empieza cuando pegas dos códigos en `_config.yml`.

### Google Analytics 4 (visitas, país y ciudad, dispositivo, tiempo, origen)

1. Entra a <https://analytics.google.com> con tu cuenta de Google → **Empezar a medir**.
2. Nombre de la cuenta: tu nombre. Nombre de la propiedad: `Portafolio`. Zona horaria: Colombia. Moneda: COP.
3. Plataforma: **Web**. URL: `macaicedosanchez-designer.github.io`. Nombre del flujo: `Web`.
4. Al crear el flujo aparece el **ID de medición**, con forma `G-XXXXXXXXXX`. Cópialo.
5. En GitHub, abre `_config.yml` → ✏️ → en la línea `ga4: ""` pega el ID entre las comillas: `ga4: "G-XXXXXXXXXX"` → Commit.

Qué vas a ver, en **Informes**: usuarios por día, país y ciudad (por la conexión, no exacta), dispositivo y navegador, qué páginas visitan y cuánto tiempo, de dónde llegan (LinkedIn, Google, link directo). En **Informes → Interacción → Eventos** aparecen además los clics en Hablemos, LinkedIn, HV/CV, cada botón de área y cada proyecto, y los cambios de idioma. Los datos empiezan a aparecer a las 24 horas.

### Microsoft Clarity (grabaciones anónimas, mapas de calor, hasta dónde bajan)

1. Entra a <https://clarity.microsoft.com> → **Sign up** con tu cuenta de Google o Microsoft.
2. **Add new project**: nombre `Portafolio`, sitio `macaicedosanchez-designer.github.io`, categoría *Portfolio*.
3. Ve a **Settings → Setup → Install tracking code manually**. En el código verás una cadena corta entre comillas, algo como `"k1abcd2efg"`. Ese es el ID.
4. En `_config.yml`, `clarity: "k1abcd2efg"` → Commit.

Qué vas a ver: grabaciones de cada sesión (sin datos personales, el cursor y el scroll), mapas de calor de dónde hacen clic, porcentaje de la página que leen, y los "rage clicks" (donde la gente hace clic y no pasa nada: pistas de qué mejorar).

### Lo que no te da ningún sistema

Nombres, correos ni identidad de quien visita. La ubicación es aproximada (ciudad). Y por ley (Ley 1581 de 2012 en Colombia; GDPR en Europa) hay que informar que se mide: por eso el pie tiene la línea "Privacidad", discreta y suficiente. No la quites.

---

## 8 · Tareas frecuentes

**Cambiar el correo de Hablemos:** `_config.yml` → `email:`.

**Cambiar la HV o el CV:** sube el PDF nuevo al repositorio `docs` con el mismo nombre. Nada más.

**Cambiar el link de LinkedIn:** repositorio `links` → `linkedin/index.html` → cambia la URL en las dos líneas indicadas.

**Agregar un link nuevo (por ejemplo Behance):** repositorio `links` → copia `_plantilla/` como `behance/` y edita la URL. Queda en `…/links/behance`. Para agregarlo al menú de la web, edita `_includes/banda-superior.html`.

**Cambiar el favicon (el cubo de la pestaña):** exporta desde `home_icono_01_cubo.png` los archivos `favicon.ico` (32 × 32), `favicon.svg`, `apple-touch-icon.png` (180 × 180) e `icon-512.png` (512 × 512) y súbelos a la raíz del repositorio de la web. A 32 px el cubo pierde detalle: engrosa las líneas. Mientras tanto hay un cubo provisional en `favicon.svg`.

**Ocultar un proyecto sin borrarlo:** `publicado: false` en `proyectos.yml`.

**Cambiar el orden de los proyectos:** se ordenan por `anio`, del más reciente al más antiguo. Primero los del área, después los que la tienen como secundaria.

**Agregar un área nueva:** `_data/areas.yml` (copia un bloque) + copia `_plantillas/area/` a `/nueva-area/`. Aparece sola en el Home y en el selector.

**Publicar una imagen en redes:** súbela al repositorio `media` (por ejemplo en `redes/`) y usa `https://macaicedosanchez-designer.github.io/media/redes/nombre.jpg`.

**Cuando compres el dominio:** en el repositorio de la web, **Settings → Pages → Custom domain** escribe tu dominio y sigue las instrucciones de GitHub para el DNS (dos registros que configuras donde compraste el dominio). Luego cambia las cuatro líneas de `url`, `media_url`, `docs_url` y `links_url` en `_config.yml`. Los repositorios `media`, `docs` y `links` siguen funcionando en la dirección de github.io; si también los quieres bajo tu dominio, cada uno acepta su propio subdominio (`media.tudominio.com`) en su **Settings → Pages**.

---

## 9 · Problemas frecuentes

**La web muestra el README o una página en blanco.** El `index.html` viejo sigue en la raíz, o el repositorio no tiene la carpeta `home/`. Revisa el paso 3.4.

**Actions tiene un ✗ rojo.** Casi siempre es un `.yml` mal escrito. Abre el error: dice el archivo y la línea. Revisa sangrías (dos espacios), comillas y dos puntos. Puedes pegar el contenido del archivo en <https://www.yamllint.com> para encontrar el error.

**Cambié algo y no se ve.** Espera dos minutos y recarga con `Ctrl + Shift + R`. Revisa en **Actions** que el proceso terminó en verde.

**Una imagen no carga (recuadro gris).** El nombre en el HTML no coincide exactamente con el del repositorio `media`. Mayúsculas, tildes o espacios rompen el link. Abre la dirección de la imagen directamente en el navegador para comprobar.

**La web oficial de CO-MADREO no carga dentro de la página.** Ese sitio decidió no permitir que lo incrusten. La pestaña "Salas en imágenes" queda como respaldo y el link "Abrir en una pestaña nueva" sigue funcionando.

**El inglés muestra un texto en español.** Falta el `<span lang="en">` de ese texto. Búscalo en el archivo y agrégalo junto al español.

**Quiero ver los cambios antes de publicarlos.** Opción sencilla: crea una copia del repositorio con otro nombre (por ejemplo `pruebas`), actívale Pages y quedará en `…/pruebas/`; ahí experimentas y cuando algo te guste lo copias al repositorio real. Opción avanzada: instalar Ruby y Jekyll en tu computador (hay un `Gemfile` listo) y correr `bundle exec jekyll serve` en la carpeta.

---

## 10 · Checklist de salida

- [ ] Los cuatro repositorios existen y tienen Pages activado.
- [ ] Las imágenes de `LISTA-DE-IMAGENES.md` están en `media` con esos nombres.
- [ ] `hv-es.pdf`, `cv-en.pdf` y `portafolio.pdf` están en `docs`.
- [ ] La URL de LinkedIn en `links/linkedin/index.html` es la correcta.
- [ ] La web abre en `https://macaicedosanchez-designer.github.io/` y el selector English funciona.
- [ ] Los tres botones del Home llevan a su área, y cada área abre su caso.
- [ ] Hablemos abre tu correo.
- [ ] `_config.yml` tiene los códigos de GA4 y Clarity.
- [ ] Reemplazaste el favicon provisional por el cubo real.
