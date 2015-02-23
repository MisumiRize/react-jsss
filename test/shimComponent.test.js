import assert from 'power-assert'
import React from 'react'
import ReactJsss from '../'

import {jsdom} from 'jsdom'
global.document = jsdom()
global.window = global.document.defaultView

describe('shimComponent', () => {

  it('should style React elements when styles property is given', () => {
    let style = {backgroundColor: 'green'}
    let styles = [ReactJsss.createStyle(style)]
    let elem = React.createElement('div', {styles: styles})
    assert.deepEqual(elem.props.style, style)
  });
});
