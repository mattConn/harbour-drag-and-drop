import { renderPDF, getPDFPage, getAnnotationRects } from "../pdfHandlers.js";

const PDFFrame = Vue.component('pdf-frame', {
    props: ['pdfData', 'pdfScale', 'pdfPageNumber'],
    data() {
        return {
            annotationRects: []
        }
    },
    mounted() {
        // Get and render page on mount,
        // storing annotation rectangles.
        getPDFPage(this.pdfData, this.pdfPageNumber)
            .then((page) => {
                getAnnotationRects(page, this.pdfScale).then(rects => this.annotationRects = rects)
                renderPDF(page, 'pdf-canvas', this.pdfScale)
            })
    },
    template: `<div class = "pdf-frame">
        <!-- display rendered pdf -->
        <div id="canvas-ctn" ref="canvasCtn">
            <canvas id="pdf-canvas"></canvas>
        </div>
    </div>`
})

export default PDFFrame