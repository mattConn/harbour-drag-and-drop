import PDFFrame from "./PDFFrame.vue.js"
import AnnotationDrag from "./AnnotationDrag.vue.js"
import { readPDF, renderPDF } from "../pdfHandlers.js"

Vue.use(vuedraggable)

const App = new Vue({
    el: '#app',
    data() {
        return {
            pdfUploaded: false,
            pdfData: null,
            numFields: 0,
            prevHover: null,
            annotations: ['Annotation'],
            draggableGroup: {
                name: 'annotations',
                pull: 'clone',
                put: false
            }
        }
    },
    methods: {
        uploadPDF() {
            readPDF(event.target.files[0], (data) => {
                this.pdfData = data
                this.pdfUploaded = true
            })
        },
        setNumFields(num){
            this.numFields = num
        },
        onDragOver(event) {
            const dropElement = event.related

            if(this.prevHover){
                this.prevHover.classList.remove('bg-aqua')
            }
            if (dropElement.classList.contains('annotation-drop')) {
                this.prevHover = dropElement 
                dropElement.classList.add('bg-aqua')
            }
        },
        onDragEnd(event) {
            if(this.prevHover){
                this.prevHover.classList.remove('bg-aqua')
            }
        }
    },
    template: `<div class="app-outer">
        <div class="app-inner columns is-vcentered is-mobile">
            <div class="pdf-frame-ctn column is-7">

                <!-- message bar to display number of fillable fields -->
                <div class="message-bar">
                    <p v-if="numFields > 0" class="is-size-4 has-text-centered has-text-primary-dark has-text-weight-semibold">
                        {{numFields}} fillable fields found! You can now drag and drop.
                    </p>
                </div>

                <!-- pdf upload button -->
                <!-- display if pdf is not uploaded -->
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
                    :pdfScale=1.2
                    @parsedFields="setNumFields"
                    />
                </div>
            </div>

            <!-- draggable annotations -->
            <div class="annotations-ctn column">
                <div class="spacer"></div>
                <draggable
                    :list="annotations"
                    :move="onDragOver"
                    @end="onDragEnd"
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