import React from 'react';
import PropTypes from 'prop-types';
import './Summary.scss';

Summary.propTypes = {
  sourcePort: PropTypes.shape({
    portName: PropTypes.string,
    portCountry: PropTypes.string
  }),
  destinationPort: PropTypes.shape({
    portName: PropTypes.string,
    portCountry: PropTypes.string
  }),
  type: PropTypes.string,
  container: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  incoTerms: PropTypes.string
};

function Summary(props) {
  const { sourcePort, destinationPort, type, container, incoTerms } = props;
  const template = [
    {
      title: sourcePort.portName,
      subtitle: sourcePort.portCountry,
      className: 'source'
    },
    {
      title: '→',
      subtitle: null,
      className: 'to'
    },
    {
      title: destinationPort.portName,
      subtitle: destinationPort.portCountry,
      className: 'destination'
    },
    {
      title: type,
      subtitle: 'Type',
      className: 'type'
    },
    {
      title: container,
      subtitle: 'Container',
      className: 'container'
    },
    {
      title: incoTerms,
      subtitle: 'INCO Terms',
      className: 'inco'
    }
  ];
  return (
    <div className='summary'>
      {template.map(({ title, subtitle, className }, key) => (
        <div className={['partial', className].join(' ')} key={key}>
          <div className='title'>{title}</div>
          {subtitle && <div className='subtitle'>{subtitle}</div>}
        </div>
      ))}
      <div className='partial action'>
        <button className='themed secondary modify'>Modify</button>
        <button className='themed primary search'>Search</button>
      </div>
    </div>
  );
}

export default Summary;
