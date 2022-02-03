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
        onChange({ added }){
            if(added){
                this.annotations.splice(added.newIndex,1)
                this.annotations[added.newIndex] = new Annotation('Auto-placed Annotation', true, this.annotations[added.newIndex+1].rect)
                console.log(this.annotations)
            }
        },
    },
    mounted() {
        // Get and render page on mount,
        // storing annotation rectangles.
        getPDFPage(this.pdfData, this.pdfPageNumber)
            .then((page) => {
                getAnnotationRects(page, this.pdfScale).then(rects => {
                    this.annotations = rects.map(r => new Annotation('',false,r))
                })
                renderPDF(page, this.$refs.canvas, this.$refs.canvasCtn, this.pdfScale)
            })
    },
    template: `<div class = "pdf-frame">
        <!-- display rendered pdf -->
        <div class="canvas-ctn" ref="canvasCtn">
            <draggable 
            :list="annotations"
            :group="draggableGroup"
            @change="onChange"
            >
                <annotation-drop v-for="(annotation, i) in annotations"
                :key="i"
                :xPos="annotation.rect.x"
                :yPos="annotation.rect.y"
                :width="annotation.rect.w"
                :height="annotation.rect.h"
                :text="annotation.text"
                :isFilled="annotation.isFilled"
                />
            </draggable>
            <canvas id="pdf-canvas" ref="canvas"></canvas>
        </div>
    </div>`
})

export default PDFFrame