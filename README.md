# React JSSS

[![Circle CI](https://circleci.com/gh/MisumiRize/react-jsss.svg?style=svg)](https://circleci.com/gh/MisumiRize/react-jsss)

React JSSS is JavaScript based styler for [React](https://facebook.github.io/react/) components inspired by [React Style](https://github.com/js-next/react-style) and [JSSS-Compiler](https://github.com/watilde/jsss-compiler).

## Installation

```bash
$ npm install react-jsss
```

## Usage

Define styles using JavaScript:

```javascript
var ReactJsss = require('react-jsss')

var styles = ReactJsss({
  color: 'red',
  backgroundColor: 'white'
})
```

Style React components:

```javascript
var React = require('react')

var HelloWorld = React.createClass({

  render() {
    var dynamicStyles = ReactJsss({color: this.props.color})
    return React.createElement('div', {styles: [styles, dynamicStyles]}, 'Hello, world!')
  }
})
```

Or register tag style:

```javascript
ReactJsss.registerTagStyle('div', {fontSize: '2em'})
```

Now render application styled:

```javascript
ReactJsss.inject()
React.renderComponent(
  React.createElement(HelloWorld, {color: 'red'}),
  document.body
)
```
