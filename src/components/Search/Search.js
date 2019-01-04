import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Summary from '../Summary/Summary';
import ModeToggle from '../ModeToggle/ModeToggle';
import Sailing from '../Sailing/Sailing';
import { getCalender } from '../../misc/lib';
import CHEVRON_LEFT_ICON from '../../assets/chevron-left.svg';
import CHEVRON_RIGHT_ICON from '../../assets/chevron-right.svg';
import './Search.scss';
import moment from 'moment';

class Search extends Component {
  static propTypes = {
    summary: PropTypes.object,
    sailings: PropTypes.array,
    margin: PropTypes.number
  };
  
  static defaultProps = {
    margin: 1
  };
  
  constructor(props) {
    super(props);
    this.onModeChange = this.onModeChange.bind(this);
    this.onCalenderChange = this.onCalenderChange.bind(this);
    this.changeCalender = this.changeCalender.bind(this);
    
    const { sailings, margin } = props;
    let earliest = moment.min(
      sailings.map(
        ({ routeDetails }) => moment(routeDetails.portCutoffDateTime)
      )
      ),
      latest = moment.max(
        sailings.map(
          ({ routeDetails }) => moment(routeDetails.vesselArrivalDate)
        )
      );
    earliest.subtract(margin, 'days');
    latest.add(margin, 'days');
    latest.subtract(3, 'weeks');
    
    this.state = {
      viewType: 'COST',
      earliest,
      latest,
      calender: getCalender(
        earliest,
        4
      )
    };
  }
  
  render() {
    const { summary } = this.props;
    return (
      <div className='search-page'>
        <h2 className='title'>Search Result</h2>
        <Summary {...summary} />
        <div className='action-container'>
          <div className='filter'>Filter View</div>
          <div className='pricing-history'>Pricing History</div>
          <ModeToggle onSelectionChange={this.onModeChange}/>
        </div>
        {this.renderContent()}
      </div>
    );
  }
  
  renderContent() {
    const { sailings } = this.props,
      { calender, viewType } = this.state;
    return (
      <div className='sailings'>
        {this.renderHeader(calender)}
        {sailings.map((each, key) => (
          <Sailing
            key={key}
            viewType={viewType}
            calender={calender}
            changeCalender={this.changeCalender}
            {...each}
          />
        ))}
      </div>
    );
  }
  
  renderHeader(calender) {
    const { viewType } = this.state;
    let content = null,
      headerClassName = '';
    if (viewType === 'COST') {
      content = this.renderTableHeader();
      headerClassName = 'cost-view-header';
    } else {
      content = this.renderCalender(calender);
      headerClassName = 'schedule-view-header';
    }
    return (
      <div className='sailing-header'>
        <div className='blank'>&nbsp;</div>
        <div className={['headers', headerClassName].join(' ')}>
          {content}
        </div>
      </div>
    );
  }
  
  renderTableHeader() {
    const {
        sailings: [first]
      } = this.props,
      { rate } = first;
    
    let headers = [
      {
        title: 'Date of Sailing',
        className: 'departure'
      },
      {
        title: 'Sailing Days',
        className: 'routing'
      },
      {
        title: `Freight Per ${rate.rateType}`,
        className: 'rate'
      },
      {
        title: 'Delivery Date',
        className: 'delivery'
      }
    ];
    
    return headers.map(({ title, className }, key) => (
      <div
        key={key}
        className={['column', className].join(' ')}
      >
        {title}
      </div>
    ));
  }
  
  renderCalender(calender) {
    const firstVisibleDay = 0,
      lastVisibleDay = 27;
    
    return calender.map(({ date, day, reference }, key) => {
      const classNames = ['day'];
      let content = null;
      if (key === firstVisibleDay) {
        classNames.push('icon', 'left');
        content = [
          <img
            key='left'
            alt='left'
            className='icon'
            src={CHEVRON_LEFT_ICON}
            onClick={this.onCalenderChange({ offset: -1, unit: 'weeks' })}
          />,
          <span key='month' className='month left'>
            {reference.format('MMMM, YY')}
          </span>
        ];
      } else if (key === lastVisibleDay) {
        classNames.push('icon', 'right');
        content = [
          <img
            key='right'
            alt='right'
            className='icon'
            src={CHEVRON_RIGHT_ICON}
            onClick={this.onCalenderChange({ offset: 1, unit: 'weeks' })}
          />,
          <span key='month' className='month right'>
            {reference.format('MMMM, YY')}
          </span>
        ];
      } else {
        if (day === 0) {
          classNames.push('sunday');
        }
        content = date;
      }
      return (
        <div
          key={key}
          className={classNames.join(' ')}
        >
          {content}
        </div>
      );
    });
  }
  
  onModeChange(viewType) {
    this.setState({ viewType });
  }
  
  changeCalender({ offset, unit }) {
    const { earliest, latest, calender: [calenderEarliest] } = this.state;
    
    let scrollDate = calenderEarliest.reference.clone();
    scrollDate.add(offset, unit);
    
    scrollDate = moment.max(
      moment.min(
        scrollDate,
        latest
      ),
      earliest
    );
    if (scrollDate.isSame(calenderEarliest.reference, 'day')) {
      return;
    }
    
    this.setState({
      calender: getCalender(scrollDate, 4)
    });
  }
  
  onCalenderChange(params) {
    return () => this.changeCalender(params);
  }
}

export default Search;
