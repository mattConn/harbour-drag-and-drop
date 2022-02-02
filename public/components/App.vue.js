import PDFFrame from "./PDFFrame.vue.js"

const App = new Vue({
    el: '#app',
    template: `<div class="app-outer ">
        <div class="app-inner columns is-vcentered">
            <!-- pdf upload and rendered -->
            <div class="pdf-frame-ctn column is-7">
                <pdf-frame />
            </div>

            <!-- selectable annotations -->
            <div class="annotations-ctn column">
            </div>
        </div>
    </div>`
})

export default App