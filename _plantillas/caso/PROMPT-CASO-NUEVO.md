# New case study: what to gather + the LLM prompt

Two parts. **Part A** is the checklist of what you have to collect. **Part B** is the prompt you paste into an LLM together with that material. The LLM returns the two files the site needs. You (or Claude Code) then drop them into the repo and upload the images to `media`.

Folders starting with `_` are not published, so this file never appears on the website.

---

## PART A · What to gather

Put everything in one folder:

```
PORTFOLIO <AAMMDD>/<Project name>/
  01-ficha.md          ← the data sheet (A1), filled in
  02-contexto.md       ← the story (A2): text, bullet points or a voice-note transcript
  03-imagenes/         ← all images (A3), already named or with a list
  04-fuentes/          ← optional: original PDF / PPTX / Figma links / videos
```

### A1 · Data sheet (`01-ficha.md`)

Copy this block and fill in every line. If something doesn't apply, write `—`.

```yaml
id:            # short code, lowercase, no accents or spaces. E.g. "renobo", "comadreo". It's used in URLs and image names.
area:          # ONE of: direccion-creativa | productos-servicios | gestion-innovacion
secundarias:   # zero or more of the same three, e.g. [productos-servicios]
anio:          # 4 digits, year the project ended (it sorts the cards)
titulo_es:     # max 50 characters
titulo_en:     # max 50 characters
linea_es:      # card line, ONE sentence, max 90 characters
linea_en:      # same in English
bajada_es:     # hero subhead, 1–2 sentences, max 220 characters
bajada_en:
cliente:       # full legal / public name + what it is ("RenoBo, Bogotá Urban Renewal and Development Company")
rol:           # your title on the project ("Creative director", "Lead UX designer")
duracion:      # real time + stages ("2.5 months, in two stages")
equipo:        # roles, not names ("web designer, 2 journalists")
herramientas:  # software, comma-separated
etiquetas_es:  # 6–10 items: skills first, then tools
etiquetas_en:  # same items, same order
web:           # live URL if the result is a website / prototype (it gets embedded); otherwise —
confidencial:  # what must NOT appear (numbers, names, client logos, internal docs)
permiso:       # yes / no / partial: can you publish the client's material?
```

### A2 · Context (`02-contexto.md`)

Answer in any language, as rough as you like. Full sentences aren't needed, but **facts are**. The LLM is told never to invent them, so anything missing comes back as `[FALTA: …]`.

1. **Client in one line.** Who they are and what they do.
2. **Who started it, and why then.** Who asked for it, what had changed, what hurt.
3. **The pain point.** The concrete problem, in the client's words if you have them.
4. **Constraints.** What could not change (budget, brand rules, law, tech, time, politics).
5. **Goal.** What success looked like *before* you started.
6. **What you did, by stage.** For each stage: name · duration · what you did · what came out of it.
7. **Your decisions.** 2–4 key choices you made and *why*. (This is what makes a case senior.)
8. **Deliverables.** Every artifact you handed over: manual, kit, templates, prototype, report…
9. **Adoption / results.** Who uses it now, how, numbers if any (reach, time saved, users, % adoption), quotes from the client, awards, press.
10. **What still works without you.** Your signature closing: the system keeps running.
11. **One-sentence takeaway.** What this project says about how you work.
12. **Image captions.** For each image, 1–4 words saying what it is ("Outdoor", "Brand manual p. 12").

### A3 · Images (`03-imagenes/`)

**Naming (required):** `<id>_<kind>_<NN>_<description>.<ext>`
lowercase · no accents or ñ · words in the description joined with `-` · `NN` = 01, 02…
Example: `renobo_pieza_03_post-instagram.jpg`

| Kind (`kind`) | What it is | How many | Ratio / size | Format · max weight |
|---|---|---|---|---|
| `portada` | Hero across the full width + share image (LinkedIn/WhatsApp). The subject must survive a dark overlay at the bottom and cropping. | 1 (required) | Landscape 16:9 or 3:2, **≥ 2400 px** wide | JPG · ≤ 1.5 MB |
| `banco` | Square card on the Home page and area pages | 1 (required) | **1080 × 1080** | WebP (or JPG, it gets converted) · ≤ 350 KB |
| `destacada` / `final` | The finished work, the first thing visitors see | 3–6 | Same ratio for all, 3:2 or 16:9, ≥ 2000 px | JPG · ≤ 1 MB each |
| `proceso` | Sketches, research, workshops, wireframes, iterations | 2–8 | Free, ≥ 1600 px on the long side | JPG (photos) / PNG (screens) |
| `diagrama` | Flows, maps, journeys, architectures | 0–4 | Free, ≥ 1600 px | PNG on white or transparent |
| `manual` / `kitppt` / `deck` | Pages of a manual or presentation, shown as a slideshow | 4–12 | **16:9, 1920 × 1080** | JPG. Or just hand over the PDF/PPTX in `04-fuentes/` and it gets exported |
| `pieza` | Individual pieces (posts, posters, merch) shown in a grid | 4 or 8 | Same ratio for all (1:1 or 4:5) | JPG · ≤ 800 KB |
| `aplicacion` | The system in real use: photos in context, mockups | 3–6 | Same ratio for all, ≥ 1500 px | JPG |
| `secuencia` | Step-by-step, before → after (auto-rotates) | 2–5 | Identical size for all | PNG |
| `360` | Equirectangular panorama | optional | **2:1**, 4000 × 2000 | JPG/PNG |
| video | Process or result video | optional | YouTube / Vimeo URL, or MP4 ≤ 20 MB | — |

Checklist before handing over:
- [ ] No client confidential data visible (numbers, names, internal emails).
- [ ] Third-party photos: source + license noted next to the file.
- [ ] Screenshots at 2× (retina), with no browser UI unless that's intended.
- [ ] Mockups match each other (same device / angle / light).
- [ ] Every image appears in the A2 caption list.

---

## PART B · The prompt (copy everything below the line)

Attach: `01-ficha.md`, `02-contexto.md`, the list of image file names (or the images), **and two reference files from the repo**: `_plantillas/caso/index.html` (the template) and `direccion-creativa/renobo/index.html` (the finished reference case).

---

```text
You are a senior portfolio editor and front-end writer. You will turn my raw project material into a finished, bilingual (Spanish / English) case study for my Jekyll portfolio. You write the copy AND the HTML.

## Who I am
Martín Caicedo Sánchez, a digital-solutions designer from Bogotá working across three areas: Creative Direction, Products & Services (UX), and Innovation Management. My positioning line: "I step into a context, find the pain point, solve it and leave it running."

## Inputs (attached)
1. 01-ficha.md: the project data sheet.
2. 02-contexto.md: raw context, possibly messy or mixed-language.
3. Image file list, already named <id>_<kind>_<NN>_<desc>.<ext>.
4. TEMPLATE: _plantillas/caso/index.html, the only components you may use.
5. REFERENCE: direccion-creativa/renobo/index.html. Match its structure, tone and length.

## Non-negotiable rules
- NEVER invent facts, numbers, clients, results or quotes. If something needed is missing, write [FALTA: what is missing] inside the text and list it at the end.
- Every visible text exists twice: <span lang="es">…</span><span lang="en">…</span> for inline text, <div lang="es">…</div><div lang="en">…</div> for paragraphs. Same meaning, natural phrasing in each language: not a literal translation.
- Use ONLY the HTML classes and data-bloque blocks that appear in the template and reference: caso-hero, caso-final, caso-imagenes (.uno/.tres/.cuatro), caso-web iframe, ficha, caso-bloque, h2/h3, cuerpo, etapas (.tres), secuencia, diapositivas, banda, galeria, caso-frase. Don't add CSS, JS, tabs, carousels, buttons or new classes.
- Images: src="{{ m }}/<file name>". Only the FIRST image of a "diapositivas" block uses src; the rest use data-src. All images except the hero get loading="lazy". Use only file names from my list; if a section needs an image I don't have, write the tag anyway with the name it should have and flag it in the missing list.
- Front matter: same fields as the template (layout: caso, proyecto, area, titulo_es, titulo_en, descripcion_es, imagen).

## Voice
- First person singular, active verbs: "Definí", "Diseñé", "Coordiné" / "I defined", "I designed".
- Short sentences, plain words, no buzzwords ("sinergia", "disruptivo", "innovative solutions", "leveraging"). No emojis, no exclamation marks.
- Concrete over abstract: say what was made, for whom, and what changed.
- Spanish: neutral Latin American, "tú" never needed (it's not addressed to the reader). English: plain, natural, US spelling.
- Each paragraph 1–3 sentences. Whole case 450–750 words per language.

## Page structure (in this order)
1. HERO: meta "Área · Año", h1 = titulo, bajada = 1–2 sentences that state what I did and the main constraint.
2. VERSIÓN FINAL: the finished work first (destacada/final images in a banda or caso-imagenes; or the caso-web iframe if there's a live URL).
3. FICHA: Cliente, Año, Mi rol, Duración, Equipo, Herramientas.
4. "El reto / The challenge": who the client is → who started the project and why → the pain point → constraints → a paragraph starting with <strong>Objetivo.</strong> / <strong>Goal.</strong>
5. "El sistema / The system" or "El proceso / The process" (pick the one that fits): an .etapas block with one card per stage (Etapa N · duración / name / one sentence), then a paragraph on deliverables and the decisions behind them.
6. One h3 sub-section per deliverable type that has images (Manual, Kit, Piezas, Prototipo, En uso…), each with 1–2 short paragraphs and its image block. Choose the block by kind: manual/kitppt/deck → diapositivas; pieza → caso-imagenes cuatro; aplicacion → banda tira-media; proceso/diagrama → caso-imagenes (.uno for wide diagrams); secuencia → secuencia.
7. CLOSING: caso-frase with one sentence about the result that still works (≤ 10 words), then 2–3 short paragraphs on adoption/results, ending with the takeaway about how I work.

## Output: exactly these four blocks, in this order, nothing else
### 1 · _data/proyectos.yml block
A YAML block in the same shape as the existing entries: id, url (/<area>/<id>/), area, secundarias, anio, banco (<id>_banco_01_cuadrada.webp), publicado: false, titulo {es,en}, linea {es,en}, etiquetas {es: [...], en: [...]}. Quote titles that contain ":".

### 2 · <area>/<id>/index.html
The complete file, from the front matter to the last </div>. Start with an HTML comment header like the reference ("CASO N, <ID>").

### 3 · Image check
A table: file name | used in section | OK / MISSING / UNUSED.

### 4 · Missing / questions
A numbered list of every [FALTA: …] and anything you had to assume. Max 10 items, most important first.
```
