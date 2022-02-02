import { renderPDF } from "../pdfHandlers.js";

const PDFFrame = Vue.component('pdf-frame', {
    template: `<div class = "pdf-frame">
        <!-- display rendered pdf -->
        <div id="canvas-ctn">
            <canvas id="pdf-canvas">
        </div>
    </div>`
})

export default PDFFrame