import { renderPDF } from "../pdfHandlers.js";

const PDFFrame = Vue.component('pdf-frame', {
    data() {
        return {
            pdfLoaded: false,
        }
    },
    template: `<div>
        <!-- display upload button -->
        <div v-if="!pdfLoaded" class="upload-button file is-primary is-link is-size-4 is-centered">
            <label class="file-label">
                <input class="file-input" type="file" name="pdf">
                <span class="file-cta">
                    <span class="file-label has-text-weight-medium">
                        Upload PDF
                    </span>
                </span>
            </label>
        </div>

        <!-- display rendered pdf -->
        <div v-else>
            <p>rendered</p>
        </div>
    </div>`
})

export default PDFFrame