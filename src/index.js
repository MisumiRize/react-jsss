'use strict'

import classgen from 'jsss-compiler/lib/modules/classgen'
import taggen from 'jsss-compiler/lib/modules/taggen'
import ExecutionEnvironment from 'react/lib/ExecutionEnvironment'
import assign from 'react/lib/Object.assign'

import ClassStyle from './ClassStyle'
import _ from './shimComponent'

let tags = {}
let classes = {}
var captureStyles = true
var counter = 0

export default function createStyle(props, className = genClassName()) {
  let styleDecl = new ClassStyle(className, props)
  if (captureStyles) {
    classes[className] = styleDecl
  }
  return styleDecl
}

function registerTagStyle(tagName, props) {
  if (!captureStyles) {
    throw new Error('createTagStyle should be called before inject()')
  }
  tags[tagName] = props
}

function compile() {
  let jsssClasses = Object.keys(classes).reduce((carry, className) => {
    carry[className] = {all: classes[className].style}
    return carry
  }, {})

  return [taggen(tags), classgen(jsssClasses)].filter((style) => {
    return /[0-9a-zA-Z]/.test(style)
  }).join('\n\n')
}

function inject() {
  if (!ExecutionEnvironment.canUseDOM || window.__ReactJsss__) {
    return
  }

  captureStyles = false
  window.__ReactJsss__ = Object.keys(classes)

  let tag = document.createElement('style')
  tag.innerHTML = compile()
  document.getElementsByTagName('head')[0].appendChild(tag)
}

function genClassName() {
  return 'c' + counter++
}

assign(createStyle, {
  createStyle: createStyle,
  registerTagStyle: registerTagStyle,
  compile: compile,
  inject: inject
});
