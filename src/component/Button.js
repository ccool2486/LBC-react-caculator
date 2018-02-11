import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';

class Button extends React.Component {
  handleClick = () => {
    this.props.clickHandler(this.props.name); // TRICK: 利用props的名字，把值傳進去caculator.js
  }

  render() {
    
    const className = [
      "component-button",
      // TRICK: 利用props的「是否有這個名字」來引用css class
      this.props.orange ? "orange" : "",
      this.props.wide ? "wide" : "",
    ];

    return (
      <div
         // TRICK: 利用props的「是否有這個名字」來引用css class
        className={className.join(" ").trim()}
      >
        <button
          onClick={this.handleClick}
        >
          {this.props.name}
        </button>
      </div>
    );
  }
}
Button.propTypes = {
  name: PropTypes.string,
  orange: PropTypes.bool,
  wide: PropTypes.bool,
  clickHandler: PropTypes.func,
};
export default Button;
