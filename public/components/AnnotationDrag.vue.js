const AnnotationDrag = Vue.component('annotation-drag', {
    props: ['text'],
    template: `<div class="annotation-drag is-link is-outlined is-size-4 button column is-three-fifths mb-5">
            <span class="has-text-weight-medium">{{text}}</span>
    </div>`
})

export default AnnotationDrag