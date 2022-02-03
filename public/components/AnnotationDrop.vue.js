const AnnotationDrop = Vue.component('annotation-drop', {
    props: ['xPos', 'yPos', 'width', 'height', 'text', 'isFilled'],
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
    template: `<div class = "annotation-drop"
        v-bind:style="style"
        v-bind:class="{'is-filled': isFilled}"
        >
        <span>{{text}}</span>
    </div>`
})

export default AnnotationDrop 