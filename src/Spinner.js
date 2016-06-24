const React = require('react');

const Spinner = (props) => {
  const {
    visible,
    text,
  } = props;
  const className = visible ? '' : 'hidden';
  return (
    <div className={className}>
      <div className="spinner-container">
        {text ? <span>{this.props.text}</span> : null}
        <div className="spinner">
          <div className="rect1"></div>
          <div className="rect2"></div>
          <div className="rect3"></div>
          <div className="rect4"></div>
          <div className="rect5"></div>
        </div>
      </div>
    </div>
  );
};

Spinner.propTypes = {
  visible: React.PropTypes.bool,
  text: React.PropTypes.string,
};

module.exports = Spinner;
