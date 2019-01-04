import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import './Sailings.scss';

class Sailing extends Component {
  static propTypes = {
    travelDate: PropTypes.string,
    travelDays: PropTypes.number,
    rate: PropTypes.shape({
      rateCurrency: PropTypes.string,
      rate: PropTypes.number,
      rateType: PropTypes.string
    }),
    deliveryDate: PropTypes.string,
    transhipment: PropTypes.string,
    routeDetails: PropTypes.shape({
      routing: PropTypes.string,
      vesselDepartureDate: PropTypes.string,
      srcPort: PropTypes.string,
      containers: PropTypes.arrayOf(
        PropTypes.shape({
          type: PropTypes.string,
          weight: PropTypes.number
        })
      ),
      carrier: PropTypes.string,
      dstPort: PropTypes.string,
      portOpenDate: PropTypes.string,
      ensCutoffDateTime: PropTypes.string,
      docCutoffDateTime: PropTypes.string,
      portCutoffDateTime: PropTypes.string,
      vesselArrivalDate: PropTypes.string
    }),
    costDetails: PropTypes.shape({
      totalCost: PropTypes.number,
      totalCostCurrency: PropTypes.string,
      details: PropTypes.arrayOf(
        PropTypes.shape({
          title: PropTypes.string,
          cost: PropTypes.arrayOf(
            PropTypes.shape({
              rateCurrency: PropTypes.string,
              baseCost: PropTypes.number,
              baseCurrency: PropTypes.string,
              costType: PropTypes.string,
              description: PropTypes.string,
              rate: PropTypes.number
            })
          )
        })
      ),
      notes: PropTypes.arrayOf(
        PropTypes.shape({
          type: PropTypes.string,
          message: PropTypes.string
        })
      )
    }),
    
    viewType: PropTypes.oneOf(['COST', 'SCHEDULE']),
    calendar: PropTypes.arrayOf(
      PropTypes.shape({
        day: PropTypes.number,
        date: PropTypes.number,
        reference: PropTypes.object
      })
    ),
    changeCalendar: PropTypes.func
  };
  
  static defaultProps = {
    viewType: 'COST'
  };
  
  constructor(props) {
    super(props);
    this.onToggleDetails = this.onToggleDetails.bind(this);
    this.state = {
      showDetails: false
    };
  }
  
  render() {
    const { showDetails } = this.state,
      { viewType } = this.props,
      classNames = ['sailing-option'],
      mobileToggleClassNames = ['mobile', 'detail-toggle'];
    if (showDetails) {
      classNames.push('details-visible');
      mobileToggleClassNames.push('hide');
    } else {
      mobileToggleClassNames.push('show');
    }
    return (
      <div className={classNames.join(' ')}>
        {this.renderOfferPrice()}
        {viewType === 'COST'
          ? this.renderCostView()
          : this.renderScheduleView()}
        {showDetails && this.renderDetails()}
        <div
          className={mobileToggleClassNames.join(' ')}
          onClick={this.onToggleDetails(!showDetails)}
        >
          {showDetails ? 'Hide Details' : 'Show Details'}
        </div>
      </div>
    );
  }
  
  renderOfferPrice() {
    const {
      costDetails: { totalCost, totalCostCurrency }
    } = this.props;
    return (
      <div className='sailing-price'>
        <div className='price'>
          {totalCostCurrency.toLocaleString()} {totalCost}
        </div>
        <button className='themed primary'>Select</button>
        <div
          className='detail-toggle show'
          onClick={this.onToggleDetails(true)}
        >
          Show Details
        </div>
      </div>
    );
  }
  
  renderCostView() {
    const {
        travelDate,
        travelDays,
        rate,
        transhipment,
        deliveryDate,
        routeDetails: { srcPort, dstPort, carrier }
      } = this.props,
      template = [
        {
          title: moment(travelDate).format('MMM Do'),
          subtitle: srcPort,
          column: 'Date of Sailing',
          className: 'departure'
        },
        {
          title: `${travelDays} Days`,
          subtitle: transhipment,
          column: 'Sailing Days',
          className: 'routing'
        },
        {
          title: `${rate.rateCurrency} ${rate.rate}`,
          subtitle: carrier,
          column: `Freight Per ${rate.rateType}`,
          className: 'rate'
        },
        {
          title: moment(deliveryDate).format('MMM Do'),
          subtitle: dstPort,
          column: 'Delivery Date',
          className: 'delivery'
        }
      ];
    return (
      <div className='cost-view'>
        {template.map((each, key) => {
          const { title, subtitle, column, className } = each;
          return [
            <div
              key={`label-${key}`}
              className={['label', className].join(' ')}
            >
              {column}
            </div>,
            <div
              key={`value-${key}`}
              className={['column', className].join(' ')}
            >
              <div className='title'>{title}</div>
              <div className='subtitle'>{subtitle}</div>
            </div>
          ];
        })}
      </div>
    );
  }
  
  renderCalendarBackground() {
    const { calendar } = this.props;
    return (
      <div className='background'>
        {calendar.map(({ day }, key) => {
          const classNames = ['day'];
          if (day === 0) {
            classNames.push('sunday');
          }
          return (
            <div key={key} className={classNames.join(' ')}>
              &nbsp;
            </div>
          );
        })}
      </div>
    );
  }
  
  renderTimelineInfo(marks) {
    return (
      <div className='info'>
        {marks.reduce(
          (components, { start, end }, key) => {
            if (start.mark) {
              components.push(
                <div
                  key={`start-${key}`}
                  className='content start'
                  style={{
                    left: `${start.offset * 100}%`
                  }}
                >
                  {start.date.format(start.format)}<br/>
                  {start.text}
                </div>
              );
            }
            
            if (end.mark) {
              components.push(
                <div
                  key={key}
                  className='content end'
                  style={{
                    right: `${end.offset * 100}%`
                  }}
                >
                  {end.date.format(end.format)}<br/>
                  {end.text}
                </div>
              );
            }
            
            return components;
          },
          []
        )}
      </div>
    );
  }
  
  renderTimeline(marks) {
    return (
      <div className='timeline'>
        {marks.map(
          ({ start, end, className, content }, key) => {
            const classNames = ['blocks', className];
            return (
              <div
                key={key}
                className={classNames.join(' ')}
                style={{
                  left: `${start.offset * 100}%`,
                  right: `${end.offset * 100}%`
                }}
              >
                {content}
              </div>
            );
          }
        )}
      </div>
    );
  }
  
  renderScheduleView() {
    const marks = this.getComputedMarks();
    return (
      <div className='schedule-view'>
        {this.renderCalendarBackground()}
        <div className='timeline-container'>
          {this.renderTimelineInfo(marks)}
          {this.renderTimeline(marks)}
        </div>
      </div>
    );
  }
  
  renderDetails() {
    return (
      <div className='details'>
        <div className='content'>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing
            elit. Aliquid, consectetur corporis dolor dolore ea
            incidunt, ipsam iste molestiae neque nisi, quae rem ut
            veniam! Harum id quae temporibus. Optio, ratione.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing
            elit. Aliquid, consectetur corporis dolor dolore ea
            incidunt, ipsam iste molestiae neque nisi, quae rem ut
            veniam! Harum id quae temporibus. Optio, ratione.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing
            elit. Aliquid, consectetur corporis dolor dolore ea
            incidunt, ipsam iste molestiae neque nisi, quae rem ut
            veniam! Harum id quae temporibus. Optio, ratione.
          </p>
        </div>
        <div
          className='detail-toggle hide'
          onClick={this.onToggleDetails(false)}
        >
          Hide Details
        </div>
      </div>
    );
  }
  
  getComputedMarks() {
    const {
        calendar,
        travelDays,
        routeDetails
      } = this.props,
      { length } = calendar,
      calendarEarliest = calendar[0].reference,
      calendarLatest = calendar[calendar.length - 1].reference,
      portCutoffDateTime = moment(routeDetails.portCutoffDateTime),
      vesselDepartureDate = moment(routeDetails.vesselDepartureDate),
      vesselArrivalDate = moment(routeDetails.vesselArrivalDate);
    
    const marks = [
      {
        start: {
          date: portCutoffDateTime,
          offset: -1,
          mark: true,
          text: 'Port Cutoff',
          format: 'Do MMM'
        },
        end: {
          date: vesselArrivalDate,
          offset: -1,
          mark: false
        },
        className: 'complete-block',
        content: ''
      },
      {
        start: {
          date: vesselDepartureDate,
          offset: -1,
          mark: true,
          text: 'Shipment Starts',
          format: 'Do MMM'
        },
        end: {
          date: vesselArrivalDate,
          offset: -1,
          mark: true,
          text: 'Shipment Arrives',
          format: 'Do MMM'
        },
        className: 'sailing-block',
        content: `${travelDays} Days`
      }
    ];
    
    marks.forEach(({ start, end }) => {
      if (start.date.isBefore(calendarEarliest, 'day')) {
        start.mark = false;
        start.offset = 0;
      } else {
        start.offset = start.date.diff(calendarEarliest, 'days');
      }
      start.offset = start.offset / length;
      
      if (end.date.isAfter(calendarLatest, 'day')) {
        end.mark = false;
        end.offset = calendar.length - 1;
      } else {
        end.offset = end.date.diff(calendarEarliest, 'days');
      }
      end.offset = 1 - (end.offset + 1) / length;
    });
    
    return marks;
  }
  
  onToggleDetails(showDetails) {
    return () => this.setState({ showDetails });
  }
}

export default Sailing;
