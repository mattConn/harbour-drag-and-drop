# Harbour Drag and Drop :dragon:
---
Drag and drop PDF annotation.

Live demo: https://harbour-drag-and-drop.pages.dev/

To run, run `npm start`. This will start a local Python server and serve the `public` directory. A local server is needed for loading PDFs.

When deploying, serve `public`. There are no build steps, all libraries are loaded from a CDN.

## Libraries Used
---
- **Bulma** for styling.
- **Vue 2** for reactive components.
- **VueDraggable** (Vue bindings for Sortable) for drag and drop functionality.
- **PDF.js** for PDF reading and rendering

## File Structure
---
Each file (within `public`) will be elaborated on in its own section.
- **assets/** contains css stylesheets.
- **components/** contains Vue components as JS files.
- **helpers.js** defines helper classes for working with PDF annotations.
- **pdfHandlers.js** defines functions for reading and rendering PDFs.

## Uploading and Annotation a PDF

## Component Structure
---
Components are composed as follows:
- App
	- AnnotationDrag[]
	- PDFFrame
		- AnnotationDrop[]

### App
The program entry point (like a main.js or index.js), and is the only js file to be included in index.html.

It uses


### PDFFrame
###