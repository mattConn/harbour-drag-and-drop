import { renderPDF, getPDFPage, getAnnotationRects } from "../pdfHandlers.js";
import AnnotationDrop from "./AnnotationDrop.vue.js";

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
        <div class="canvas-ctn" ref="canvasCtn">
            <annotation-drop v-for="rect in annotationRects"
            :xPos="rect.x"
            :yPos="rect.y"
            :width="rect.w"
            :height="rect.h"
            />
            <canvas id="pdf-canvas"></canvas>
        </div>
    </div>`
})

export default PDFFrame