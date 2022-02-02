import PDFFrame from "./PDFFrame.vue.js"
import { readPDF } from "../pdfHandlers.js"

const App = new Vue({
    el: '#app',
    data(){
        return {
            pdfUploaded: false
        }
    },
    methods: {
        uploadPDF(){
            readPDF(event.target.files[0], (data) => console.log(data))
        }
    },
    template: `<div class="app-outer ">
        <div class="app-inner columns is-vcentered">
            <!-- pdf upload button -->
            <!-- display if pdf is not uploaded -->
            <div class="pdf-frame-ctn column is-7">
                <div v-if="!pdfUploaded" class="upload-button file is-primary is-link is-size-4 is-centered">
                    <label class="file-label">
                        <input class="file-input" type="file" name="pdf" accepts="pdf" @change="uploadPDF">
                        <span class="file-cta">
                            <span class="file-label has-text-weight-medium">
                                Upload PDF
                            </span>
                        </span>
                    </label>
                </div>
            </div>

            <!-- pdf has been uploaded, display pdf frame -->
            <div v-else>
                <pdf-frame />
            </div>

            <!-- selectable annotations -->
            <div class="annotations-ctn column">
            </div>
        </div>
    </div>`
})

export default App