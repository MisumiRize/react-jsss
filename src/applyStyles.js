function applyStyle(props, style) {
  let styleDecl = props.style || {}

  if (style.isCompiled()) {
    props.className = props.className || ''
    props.className += ' ' + style.className

    if (props.style) {
      Object.keys(style.style).forEach((attr) => {
        if (styleDecl[attr]) {
          styleDecl[attr] = null
        }
      })

      props.style = styleDecl
    }

    return props
  }
    
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
