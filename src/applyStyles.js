'use strict'

function applyStyle(props, style) {
  if (style.isCompiled()) {
    props.className += ' ' + style.className
    return props
  }
    
  let styleDecl = props.style || {}
  Object.keys(style.style).forEach((attr) => {
    styleDecl[attr] = style.style[attr]
  })
  props.style = styleDecl

  return props
}

export default function applyStyles(props, styles) {
  if (Array.isArray(styles)) {
    return styles.reduce(applyStyles, props)
  }
  return applyStyle(props, styles)
}
