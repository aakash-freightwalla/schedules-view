import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Summary from '../Summary/Summary';
import ModeToggle from '../ModeToggle/ModeToggle';
import Sailing from '../Sailing/Sailing';
import { getCalendar } from '../../misc/lib';
import CHEVRON_LEFT_ICON from '../../assets/chevron-left-dark.svg';
import CHEVRON_RIGHT_ICON from '../../assets/chevron-right-dark.svg';
import moment from 'moment';
import './Search.scss';

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
    this.onCalendarChange = this.onCalendarChange.bind(this);
    this.changeCalendar = this.changeCalendar.bind(this);
    
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
      calendar: getCalendar(
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
      { calendar, viewType } = this.state;
    return (
      <div className='sailings'>
        {this.renderHeader(calendar)}
        {sailings.map((each, key) => (
          <Sailing
            key={key}
            viewType={viewType}
            calendar={calendar}
            changeCalendar={this.changeCalendar}
            {...each}
          />
        ))}
      </div>
    );
  }
  
  renderHeader(calendar) {
    const { viewType } = this.state;
    let content = null,
      headerClassName = '';
    if (viewType === 'COST') {
      content = this.renderTableHeader();
      headerClassName = 'cost-view-header';
    } else {
      content = this.renderCalendar(calendar);
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
  
  renderCalendar(calendar) {
    const firstVisibleDay = 0,
      lastVisibleDay = 27;
    
    return calendar.map(({ date, day, reference }, key) => {
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
            onClick={this.onCalendarChange({ offset: -1, unit: 'weeks' })}
          />,
          <span key='month' className='month left'>
            {reference.format('MMMM YYYY')}
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
            onClick={this.onCalendarChange({ offset: 1, unit: 'weeks' })}
          />,
          <span key='month' className='month right'>
            {reference.format('MMMM YYYY')}
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
  
  changeCalendar({ offset, unit }) {
    const { earliest, latest, calendar: [calendarEarliest] } = this.state;
    
    let scrollDate = calendarEarliest.reference.clone();
    scrollDate.add(offset, unit);
    
    scrollDate = moment.max(
      moment.min(
        scrollDate,
        latest
      ),
      earliest
    );
    if (scrollDate.isSame(calendarEarliest.reference, 'day')) {
      return;
    }
    
    this.setState({
      calendar: getCalendar(scrollDate, 4)
    });
  }
  
  onCalendarChange(params) {
    return () => this.changeCalendar(params);
  }
}

export default Search;
