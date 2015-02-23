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
  });
});
