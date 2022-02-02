import { renderPDF } from "../pdfHandlers.js";

const PDFFrame = Vue.component('pdf-frame', {
    props: ['pdfData'],
    mounted(){
        renderPDF(this.pdfData, 'pdf-canvas', 1.2)
    },
    template: `<div class = "pdf-frame">
        <!-- display rendered pdf -->
        <div id="canvas-ctn">
            <canvas id="pdf-canvas"></canvas>
        </div>
    </div>`
})

export default PDFFrame