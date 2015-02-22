'use strict'

export default class ClassStyle {

  constructor(className, style) {
    this.className = className
    this.style = style
  }

  isCompiled() {
    let registry = window.__ReactJsss__
    return registry && registry.indexOf(this.className) != -1
  }
}
