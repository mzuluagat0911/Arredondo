# Landing Arredondo

Single-page estática para el grupo gastronómico **Arredondo** (Belgrano / Colegiales, CABA). HTML, CSS y JavaScript sin frameworks.

## Cómo correr el proyecto localmente

No hace falta build ni dependencias de npm.

**Recomendado** (soporta range requests para el video del hero en mobile):

```bash
cd /ruta/al/proyecto
node server.js
```

Abrí **http://localhost:3031**

**Alternativa** (sin video optimizado en algunos móviles):

```bash
python3 -m http.server 8080
```

Abrí `http://localhost:8080`

## Variables y textos a reemplazar cuando lleguen datos finales del cliente

- **Dominio canónico y OG**: en `index.html`, reemplazá `https://www.arredondo.ba/` en `canonical`, `og:url` y en los `@id` del JSON-LD si el dominio final es otro.
- **WhatsApp**: número `5491134202562` y mensajes precargados en los `wa.me` del hero y la sección Pedir.
- **Email**: `arredondo2562@gmail.com`.
- **Enlaces de delivery**: Tucán y Rappi (URLs ya cargadas; validar que sigan vigentes).
- **Carta PDF / Drive**: carpeta de la carta en Google Drive.
- **Copyright**: año en el footer (`© 2026` o el que corresponda).
- **Crédito agencia**: línea “Picante — pimenton.io” si el slug o la URL cambian.
- **Horarios de Le Blé**: en la card y en el JSON-LD (`openingHoursSpecification`). Actualizar si cambian.
- **Schema `aggregateRating`**: valores tomados del brief (Google). Actualizar si cambian en Maps.
- **Linktree / YouTube**: el footer enlaza a Linktree como hub (“YouTube y más”). Cuando tengan URL directa de YouTube, podés reemplazar o duplicar el enlace.

## Fotos en `assets/` (nombres canónicos)

Las capturas de Instagram se renombraron a archivos sin espacios raros. `index.html` apunta a:

| Archivo | Uso en la página |
| --- | --- |
| `logo.jpg` | Logo oficial: barra de navegación, pie de página, favicon; también referenciado en OG/Twitter y JSON-LD (URL absoluta al publicar). |
| `hero-fachada.png` | Poster del hero + celda de galería |
| `hero-video.mp4` | Video de fondo del hero (usar `node server.js` para reproducir bien) |
| `galeria-01.png` | Card espacio — Arredondo (hamburguesa) |
| `galeria-02.png` | Galería — primera celda |
| `galeria-03.png`, `galeria-04.png` | Galería “La cuadra” |
| `cafe.png` | Card 02 — Le Blé |
| `pastas.png` | (Opcional) no se usa en la landing |
| `espacio-arredondo.png` | Sección “La casa” + galería (ambiente deck) |
| `casa.png` | Galería “La cuadra” |

Reemplazá cualquier archivo conservando el mismo nombre si querés actualizar la foto sin tocar código.

El directorio `assets/` acepta PNG / JPEG / WebP (si cambiás extensión, actualizá los `src` en `index.html`).

## Google Maps embebido (sin API key)

El iframe usa el formato indicado en el brief:

`https://maps.google.com/maps?q=Virrey+Arredondo+2562+Buenos+Aires&output=embed`

### Opcional: embed con API key

Si más adelante querés un mapa con estilo personalizado, límites o capas:

1. Creá un proyecto en [Google Cloud Console](https://console.cloud.google.com/).
2. Habilitá “Maps Embed API”.
3. Creá una API key restringida (HTTP referrers) a tu dominio de producción.
4. Usá la URL de embed de la documentación oficial de Google Maps Platform, por ejemplo el formato `https://www.google.com/maps/embed/v1/place?key=TU_KEY&q=...` según el producto que elijas.

Reemplazá el `src` del iframe en la sección **Cómo llegar** de `index.html`.

## Estructura de archivos

```
/index.html
/server.js
/styles/reset.css
/styles/main.css
/scripts/main.js
/assets/     (fotos y video, ver tabla arriba)
/README.md
```
