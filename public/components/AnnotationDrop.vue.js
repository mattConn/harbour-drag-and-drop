const AnnotationDrop = Vue.component('annotation-drop', {
    props: ['xPos', 'yPos', 'width', 'height'],
    data(){
        return {
            style: {
                left: this.xPos+'px',
                bottom: this.yPos+'px',
                width: this.width+'px',
                height: this.height+'px',
            }
        }
    },
    template: `<div class = "annotation-drop" v-bind:style="style">
    </div>`
})

export default AnnotationDrop 