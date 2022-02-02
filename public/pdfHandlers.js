pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.12.313/pdf.worker.min.js"

/**
 * 
 * @param {Uint8Array} pdfData PDF data byte array.
 * @param {Number} pageNumber Number of page to get.
 * @returns {Promise<Object>} Resolves to page object.
 */
const getPDFPage = (pdfData, pageNumber) => {
    //
    // Asynchronous download PDF
    //
    const loadingTask = pdfjsLib.getDocument(pdfData);

    return new Promise((resolve) => {
        loadingTask.promise
            .then((pdf) => pdf.getPage(pageNumber))
            .then((page) => resolve(page))
    })
}

/**
 * 
 * @param {Object} page Object representing single PDF page.
 * @param {HTMLElement} canvas Canvas element to render page to.
 * @param {HTMLElement} canvasCtn Container of canvas element. Used for overlay.
 * @param {Number} pdfScale PDF scaling factor.
 */
const renderPDF = (page, canvas, canvasCtn, pdfScale = 1) => {
    // This function is a modification of:
    // https://github.com/mozilla/pdf.js/blob/master/examples/learning/helloworld.html
    // It has been modified to highlight form fields.

    const viewport = page.getViewport({ scale: pdfScale });

    // Support HiDPI-screens.
    const outputScale = window.devicePixelRatio || 1;

    //
    // Prepare canvas using PDF page dimensions
    //
    const context = canvas.getContext("2d");

    canvas.width = Math.floor(viewport.width * outputScale);
    canvas.height = Math.floor(viewport.height * outputScale);
    canvas.style.width = Math.floor(viewport.width) + 'px';
    canvas.style.height = Math.floor(viewport.height) + "px";

    canvasCtn.style.width = canvas.style.width;
    canvasCtn.style.height = canvas.style.height;


    const transform = outputScale !== 1
        ? [outputScale, 0, 0, outputScale, 0, 0]
        : null;

    //
    // Render PDF page into canvas context
    //
    const renderContext = {
        canvasContext: context,
        transform,
        viewport,
    };

    page.render(renderContext);
}

/**
 * 
 * @param {Object} page Object representing single PDF page.
 * @param {Number} pdfScale PDF scaling factor.
 * @returns {Promise<Object[]>} Resolves to array of rectangle objects containing position and dimensions.
 */
const getAnnotationRects = (page, pdfScale) => {
    const rects = []

    return new Promise((resolve) => {
        page.getAnnotations().then(function (items) {
            for (const item of items) {
                // Want fillable text fields only.
                if (!item.fieldType || item.fieldType !== 'Tx') {
                    continue
                }

                // Coordinates are [x1, y1, x2, y2]
                // The first pair denotes upper-left, second denotes bottom right
                // Normalization ensures this ordering.
                // Note that origin of coordinate system is in bottom-left.
                const rect = pdfjsLib.Util.normalizeRect(item.rect)
                const newRect = {
                    x: rect[0] * pdfScale,
                    y: rect[1] * pdfScale,
                    w: (rect[2] - rect[0]) * pdfScale,
                    h: (rect[3] - rect[1]) * pdfScale

                }
                rects.push(newRect)
            }
            resolve(rects)
        })
    })
}

const readPDF = (pdfFile, callback = () => { }) => {
    const fileReader = new FileReader()
    fileReader.onload = () => {
        // store fileReader result as byte array
        const pdfData = new Uint8Array(fileReader.result)
        callback(pdfData)
    }

    fileReader.readAsArrayBuffer(pdfFile)
}

export { renderPDF, readPDF, getPDFPage, getAnnotationRects }