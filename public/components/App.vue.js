import PDFFrame from "./PDFFrame.vue.js"
import AnnotationDrag from "./AnnotationDrag.vue.js"
import { readPDF, renderPDF } from "../pdfHandlers.js"

Vue.use(vuedraggable)

const App = new Vue({
    el: '#app',
    data(){
        return {
            pdfUploaded: false,
            pdfData: null,
            annotations: ['Annotation'],
            draggableGroup: {
                name: 'annotations',
                pull: 'clone',
                put: false 
            }
        }
    },
    methods: {
        uploadPDF(){
            readPDF(event.target.files[0], (data) => {
                this.pdfData = data
                this.pdfUploaded = true
            })
        },
        onDragOver(event){
            const element = event.related
            if(element.classList.contains('annotation-drop')){
                element.style.opacity = 1 
            } 
        },
    },
    template: `<div class="app-outer">
        <div class="app-inner columns is-vcentered is-mobile">
            <!-- pdf upload button -->
            <!-- display if pdf is not uploaded -->
            <div class="pdf-frame-ctn column is-7">
                <div v-if="!pdfUploaded" class="upload-button file is-primary is-link is-size-4 is-centered">
                    <label class="file-label">
                        <!-- file input -->
                        <input class="file-input" type="file" name="pdf" accepts="pdf" @change="uploadPDF">
                        <span class="file-cta">
                            <span class="file-label has-text-weight-medium">
                                Upload PDF
                            </span>
                        </span>
                    </label>
                </div>

                <!-- pdf has been uploaded, display pdf frame -->
                <div v-else>
                    <pdf-frame
                    :pdfData="pdfData" 
                    :pdfPageNumber=1
                    :pdfScale=1.15
                    />
                </div>
            </div>

            <!-- selectable annotations -->
            <div class="annotations-ctn column">
                <draggable
                    :list="annotations"
                    :move="onDragOver"
                    :group="draggableGroup"
                >
                    <annotation-drag v-for="(annotation, i) in annotations"
                    :key="i"
                    :text="annotation"

                    />
                </draggable>
            </div>
        </div>
    </div>`
})

export default App