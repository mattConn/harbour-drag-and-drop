import { renderPDF, getPDFPage, getAnnotationRects } from "../pdfHandlers.js";
import AnnotationDrop from "./AnnotationDrop.vue.js";

const PDFFrame = Vue.component('pdf-frame', {
    props: ['pdfData', 'pdfScale', 'pdfPageNumber'],
    data(){
        return {
            annotationRects: [],
            draggableGroup: {
                name: 'annotations',
                put: true 
            }
        }
    },
    methods: {
        onDragOver(event){
            console.log('hovered over annot')
        }
    },
    mounted() {
        // Get and render page on mount,
        // storing annotation rectangles.
        getPDFPage(this.pdfData, this.pdfPageNumber)
            .then((page) => {
                getAnnotationRects(page, this.pdfScale).then(rects => this.annotationRects = rects)
                renderPDF(page, this.$refs.canvas, this.$refs.canvasCtn, this.pdfScale)
            })
    },
    template: `<div class = "pdf-frame">
        <!-- display rendered pdf -->
        <div class="canvas-ctn" ref="canvasCtn">
            <draggable 
            :list="annotationRects"
            :move="onDragOver"
            :group="draggableGroup"
            >
                <annotation-drop v-for="(rect, i) in annotationRects"
                :key="i"
                :xPos="rect.x"
                :yPos="rect.y"
                :width="rect.w"
                :height="rect.h"
                />
            </draggable>
            <canvas id="pdf-canvas" ref="canvas"></canvas>
        </div>
    </div>`
})

export default PDFFrame