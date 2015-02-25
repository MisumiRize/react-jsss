import assert from 'power-assert'
import applyStyles from '../lib/applyStyles'

function fakeStyle(className, style, isCompiled) {
  return {
    className: className,
    style: style,
    isCompiled() {
      return isCompiled
    }
  }
}

describe('applyStyles', () => {

  it('applies compiled styles', () => {
    let props = applyStyles({}, fakeStyle('c1', {color: 'red'}, true))
    assert.equal(props.className, ' c1')
    assert.equal(props.style, undefined)
  })

  it('applies uncompiled styles', () => {
    let props = applyStyles({}, fakeStyle('c1', {color: 'red'}, false))
    assert.deepEqual(props.style, {color: 'red'})
  })

  it('oveerides one compiled style with another', () => {
    let props = applyStyles({}, [
      fakeStyle('c1', {color: 'red'}, false),
      fakeStyle('c2', {color: 'blue'}, false)
    ])
    assert.equal(props.className, undefined)
    assert.deepEqual(props.style, {color: 'blue'})
  })

  it('overrides compiled style with uncompiled', () => {
    let props = applyStyles({}, [
      fakeStyle('c1', {color: 'red'}, true),
      fakeStyle('c2', {color: 'blue'}, false)
    ])
    assert.equal(props.className, ' c1')
    assert.deepEqual(props.style, {color: 'blue'})
  })

  it('overrides uncompiled style with compiled', () => {
    let props = applyStyles({}, [
      fakeStyle('c1', {color: 'red'}, false),
      fakeStyle('c2', {color: 'blue'}, true)
    ])
    assert.equal(props.className, ' c2')
    assert.deepEqual(props.style.color, null)
  })
})
