'use strict'

import ReactElement from 'react/lib/ReactElement'
import assign from 'react/lib/Object.assign'

import applyStyles from './applyStyles'

function buildProps(props) {
  let propsSeed = {
    className: props.className || '',
    style: props.style ? assign({}, props.style) : {}
  }

  return applyStyles(propsSeed, props.styles)
}

let createElement = ReactElement.createElement
ReactElement.createElement = (type, props, ...children) => {
  if (props && typeof type === 'string') {
    props = assign(props, buildProps(props))
  }

  return createElement.apply(this, [type, props].concat(children))
}
