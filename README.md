# Harbour Drag and Drop :dragon:
Drag and drop PDF annotation.

Live demo: https://harbour-drag-and-drop.pages.dev/

To run, run `npm start`. This will start a local Python server and serve the `public` directory. A local server is needed for loading PDFs.

When deploying, serve `public`. There are no build steps, all libraries are loaded from a CDN.

## Libraries Used
- **Bulma** for styling.
- **Vue 2** for reactive components.
- **VueDraggable** (Vue bindings for Sortable) for drag and drop functionality.
- **PDF.js** for PDF reading and rendering

## File Structure
- **assets/** contains css stylesheets.
- **components/** contains Vue components as JS files.
- **helpers.js** defines helper classes for working with PDF annotations.
- **pdfHandlers.js** defines functions for reading and rendering PDFs.

## Component Composition 
Components are composed as follows:
- App
	- AnnotationDrag[]
	- PDFFrame
		- AnnotationDrop[]

## Component Data and Methods

## App
The program entry point (like a main.js or index.js), and is the only non-vendor js file to be included in index.html.

### Data 
- pdfUploaded `bool`
	- True if pdf has been read. 
- pdfData `Uint8Array`
	- Byte array of uploaded pdf.
- numFields `number`
	- Number of fillable fields in pdf.
- prevHover `HTMLElement`
	- When hovering pdf annotations, last hovered annotation. For highlight class toggling.
- annotations `string[]`
	- Text data for draggable annotations. Has a single value hard-coded in for demo.
- draggableGroup `object`
	- Object containing data for VueDraggable components.


### Methods
- uploadPDF
	- Passes pdf from file input to `readPdf` and stores in byte array in pdfData.
- setNumFields(num)
	- numFields setter (number of fillable fields in pdf).
- onDragOver(event)
	- Called on VueDraggable move event. Toggles highlights on fillable fields.
- onDragEnd(event)
	- Called on VueDraggable end event. Helps onDragOver toggle highlights (hacky).



## PDFFrame
Contains canvas for rendered pdf, as well as VueDraggable annotation drop zones.

### Data
- annotations `Annotation[]`
	- Array of Annotation objects (defined in helpers.js) used for annotation drop zones over rendered pdf. Each object contains position and text data.
- draggableGroup `object`
	- Object containing data for VueDraggable components.

### Methods
- onDropIn(value)
	- Called when an AnnotationDrop component emits a droppedIn event (when an annotation has been successfully dragged and dropped). This will update the appropriate annotation drop zone with an `isFilled` boolean and the dropped annotation's text. (The text "Auto-filled Annotation" will be displayed instead for demo).