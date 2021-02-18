type Rect = {
  x: Number
  y: Number
  width: Number
  height: Number
}

export default class Element {
  [key: string]: any
  isFocus: boolean
  rect: Rect
  attrs: {
    [key: string]: any
  }
  listeners: {
    [key: string]: Function | undefined
  }
  constructor(options?: { rect?: Rect, tabindex?: string }) {
    options = options || {}
    this.listeners = {}
    this.attrs = {}
    this.isFocus = false
    const rect = options.rect || {x: 0, y: 0, width: 0, height: 0}
    this.rect = rect
    if (options.tabindex) {
      this.setAttribute('tabindex', options.tabindex)
    }
  }
  getBoundingClientRect() {
    return this.rect
  }
  focus() {
    this.isFocus = true
  }
  blur () {
    this.isFocus = false
  }
  // tslint:disable-next-line
  click () {

  }
  getAttribute (name: string) {
    return this.attrs[name]
  }
  setAttribute (name: string, val: any) {
    this.attrs[name] = val
  }
  // tslint:disable-next-line
  addEventListener (type: string, handler: Function) {
    this.listeners[type] = handler
  }
  // tslint:disable-next-line
  removeEventListener(type: string, handler: Function) {
    this.listeners[type] = undefined
  }
}
