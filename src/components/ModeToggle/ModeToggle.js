import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ModeToggle.scss';

class ModeToggle extends Component {
  static propTypes = {
    options: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.string
      })
    ).isRequired,
    onSelectionChange: PropTypes.func
  };
  
  constructor(props) {
    super(props);
    this.state = {
      selected: 0
    };
  }
  
  render() {
    const { options } = this.props,
      { selected } = this.state;
    return (
      <div className='mode-toggle'>
        {options.map(({ label, value }, key) => {
          const classNames = ['mode-option'];
          if (selected === key) {
            classNames.push('selected');
          }
          return (
            <button
              key={key}
              value={value}
              className={classNames.join(' ')}
              onClick={this.onOptionSelected(key)}
            >
              {label}
            </button>
          );
        })}
      </div>
    );
  }
  
  onOptionSelected(key) {
    return ({ target: { value } }) => {
      this.setState({ selected: key });
      const { onSelectionChange } = this.props;
      onSelectionChange(value);
    };
  }
}

export default ModeToggle;
