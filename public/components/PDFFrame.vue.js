import { renderPDF, getPDFPage, getAnnotationRects } from "../pdfHandlers.js";
import { Annotation, Rect } from "../helpers.js";
import AnnotationDrop from "./AnnotationDrop.vue.js";

const PDFFrame = Vue.component('pdf-frame', {
    props: ['pdfData', 'pdfScale', 'pdfPageNumber'],
    data(){
        return {
            annotations: [],
            draggableGroup: {
                name: 'annotations',
                put: true 
            }
        }
    },
    methods: {
        onDropIn(value){
            const mutated = this.annotations[value.index]
            mutated.isFilled = value.isFilled
            mutated.text = value.text
        }
    },
    mounted() {
        // Get and render page on mount,
        // storing annotation rectangles.
        getPDFPage(this.pdfData, this.pdfPageNumber)
            .then((page) => {
                getAnnotationRects(page, this.pdfScale).then(rects => {
                    this.$emit('parsedFields', rects.length)
                    this.annotations = rects.map(r => new Annotation('',false,r))
                })
                renderPDF(page, this.$refs.canvas, this.$refs.canvasCtn, this.pdfScale)
            })
    },
    template: `<div class = "pdf-frame columns is-centered">
        <!-- display rendered pdf -->
        <div class="canvas-ctn" ref="canvasCtn">
            <annotation-drop v-for="(annotation, i) in annotations"
            :key="i"
            :index="i"
            :xPos="annotation.rect.x"
            :yPos="annotation.rect.y"
            :width="annotation.rect.w"
            :height="annotation.rect.h"
            :text="annotation.text"
            :isFilled="annotation.isFilled"
            @droppedIn="onDropIn"
            />
            <canvas id="pdf-canvas" ref="canvas"></canvas>
        </div>
    </div>`
})

export default PDFFrame