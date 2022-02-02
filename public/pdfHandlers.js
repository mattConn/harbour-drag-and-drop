/**
 * 
 * @param {Uint8Array} pdfData Byte array of PDF. (May also be path or URL).
 * @param {String} canvasId ID of canvas element.
 * @param {Number} pdfScale Scaling factor of PDF.
 * @param {Function} callback Function to call after rendering of PDF.
 */
const renderPDF = (pdfData, canvasId, pdfScale = 1, callback = () => { }) => {
    // This function is a modification of:
    // https://github.com/mozilla/pdf.js/blob/master/examples/learning/helloworld.html
    // It has been modified to highlight form fields.

    //
    // The workerSrc property shall be specified.
    //
    pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.12.313/pdf.worker.min.js"

    //
    // Asynchronous download PDF
    //
    const loadingTask = pdfjsLib.getDocument(pdfData);
    (async () => {
        const pdf = await loadingTask.promise;
        //
        // Fetch the first page
        //
        const page = await pdf.getPage(1);
        const viewport = page.getViewport({ scale: pdfScale });
        console.log(viewport)
        // Support HiDPI-screens.
        const outputScale = window.devicePixelRatio || 1;

        //
        // Prepare canvas using PDF page dimensions
        //
        const canvas = document.getElementById(canvasId);
        const context = canvas.getContext("2d");

        canvas.width = Math.floor(viewport.width * outputScale);
        canvas.height = Math.floor(viewport.height * outputScale);
        canvas.style.width = Math.floor(viewport.width) + 'px';
        canvas.style.height = Math.floor(viewport.height) + "px";


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
        callback(pdfData)
    })();
}

const markAnnotations = () => {
    // highlight annotations
    const canvasCtn = document.getElementById('canvas-ctn')
    canvasCtn.style.width = canvas.width + 'px'
    canvasCtn.style.height = canvas.height + 'px'
    page.getAnnotations().then(function (items) {
        for (const item of items) {
            if (!item.fieldType || item.fieldType !== 'Tx') {
                continue
            }

            const rect = pdfjsLib.Util.normalizeRect(item.rect)
            const newDiv = document.createElement('div')
            newDiv.className = 'annotation'

            newDiv.style.left = (rect[0] * pdfScale) + 'px'
            newDiv.style.bottom = (rect[1] * pdfScale) + 'px'
            newDiv.style.width = ((rect[2] - rect[0]) * pdfScale) + 'px'
            newDiv.style.height = ((rect[3] - rect[1]) * pdfScale) + 'px'

            canvasCtn.appendChild(newDiv)
        }
    })
}

/**
 * 
 * @param {*} pdfFile File from file input element
 * @param {*} callback Callback to handle pdf byte array
 */
const readPDF = (pdfFile, callback = () => { }) => {
    const fileReader = new FileReader()
    fileReader.onload = () => {
        // store fileReader result as byte array
        const pdfData = new Uint8Array(fileReader.result)
        callback(pdfData)
    }

    fileReader.readAsArrayBuffer(pdfFile)
}

export { renderPDF, readPDF }