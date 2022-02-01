import PDFContainer from "./PDFContainer.vue.js"

const App = new Vue({
    el: '#app',
    template: `<div class="app-inner">
        <!-- pdf upload and rendered -->
        <div class="pdf-ctn">
            <pdf-container />
        </div>

        <!-- selectable annotations -->
        <div class="annotations-ctn">
        </div>

    </div>`
})

export default App