const AnnotationDrop = Vue.component('annotation-drop', {
    props: ['xPos', 'yPos', 'width', 'height', 'text', 'isFilled', 'index'],
    data(){
        return {
            singleton: [],
            style: {
                left: this.xPos+'px',
                bottom: this.yPos+'px',
                width: this.width+'px',
                height: this.height+'px',
            },
            draggableGroup: {
                name: 'annotations',
                put: true 
            }
        }
    },
    methods: {
        onChange({added}){
            if(added){
                // replace existing annotation if present
                if(this.singleton.length !== 0){
                    this.singleton = this.singleton.filter(element => element !== added.element)
                }
                this.$emit('droppedIn', {
                    index: this.index,
                    isFilled: true,
                    // text can be set by drop in via `added.element`
                    text: 'Auto-filled Annotation'
                })
            }
        }
    },
    template: `<draggable
    :list="singleton"
    :group="draggableGroup"
    @change="onChange"
    >
    <div class = "annotation-drop"
        v-bind:style="style"
        v-bind:class="{'is-filled': isFilled}"
        >
        <span>{{text}}</span>
    </div>
</draggable>`
})

export default AnnotationDrop 