import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MODE_OPTIONS } from '../../misc/templates';
import './ModeToggle.scss';

class ModeToggle extends Component {
  static propTypes = {
    onSelectionChange: PropTypes.func
  };
  
  constructor(props) {
    super(props);
    this.onResize = this.onResize.bind(this);
    this.state = {
      selected: 0
    };
  }
  
  componentDidMount() {
    window.addEventListener('resize', this.onResize);
  }
  
  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }
  
  render() {
    const { selected } = this.state;
    return (
      <div className='mode-toggle'>
        {MODE_OPTIONS.map(({ label, value }, key) => {
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
      if (this.state.selected === key) {
        return;
      }
      this.setState({ selected: key });
      const { onSelectionChange } = this.props;
      onSelectionChange(value);
    };
  }
  
  onResize() {
    const { selected } = this.state;
    if (selected === 1) {
      const { innerWidth } = window,
        { onSelectionChange } = this.props;
      if (innerWidth < 768 && onSelectionChange) {
        const validSelection = 0;
        this.setState({ selected: validSelection });
        onSelectionChange(MODE_OPTIONS[validSelection].value);
      }
    }
  }
}

export default ModeToggle;
