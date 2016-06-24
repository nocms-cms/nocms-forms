'use strict';

var React = require('react');

var Spinner = function Spinner(props) {
  var visible = props.visible;
  var text = props.text;

  var className = visible ? '' : 'hidden';
  return React.createElement(
    'div',
    { className: className },
    React.createElement(
      'div',
      { className: 'spinner-container' },
      text ? React.createElement(
        'span',
        null,
        undefined.props.text
      ) : null,
      React.createElement(
        'div',
        { className: 'spinner' },
        React.createElement('div', { className: 'rect1' }),
        React.createElement('div', { className: 'rect2' }),
        React.createElement('div', { className: 'rect3' }),
        React.createElement('div', { className: 'rect4' }),
        React.createElement('div', { className: 'rect5' })
      )
    )
  );
};

Spinner.propTypes = {
  visible: React.PropTypes.bool,
  text: React.PropTypes.string
};

module.exports = Spinner;
//# sourceMappingURL=Spinner.js.map