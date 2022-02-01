const PDFContainer = Vue.component('pdf-container', {
    data() {
        return {
            pdfLoaded: false,
        }
    },
    template: `<div>
        <!-- display upload button -->
        <div v-if="!pdfLoaded" class="upload file is-primary is-size-4">
            <label class="file-label">
                <input class="file-input" type="file" name="pdf">
                <span class="file-cta" style="background-color: var(--color-violet);">
                    <span class="file-label">
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

export default PDFContainer