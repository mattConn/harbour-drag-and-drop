class Rect {
    constructor(x=0,y=0,width=0,height = 0){
        this.x = x
        this.y = y
        this.w = width
        this.h = height
    }
}

class Annotation {
    constructor(text = '', isFilled, rect = new Rect()){
        this.text = text,
        this.rect = rect,
        this.isFilled = isFilled
    }
}

export {Annotation, Rect}