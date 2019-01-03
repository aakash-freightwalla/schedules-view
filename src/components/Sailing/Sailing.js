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
    calender: PropTypes.arrayOf(
      PropTypes.shape({
        day: PropTypes.number,
        date: PropTypes.number,
        reference: PropTypes.object
      })
    )
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
      classNames = ['sailing-option'];
    if (showDetails) {
      classNames.push('details-visible');
    }
    return (
      <div className={classNames.join(' ')}>
        {this.renderOfferPrice()}
        {viewType === 'COST'
          ? this.renderCostView()
          : this.renderScheduleView()}
        {showDetails && this.renderDetails()}
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
  
  renderCalenderBackground() {
    const { calender } = this.props;
    return (
      <div className='background'>
        {calender.map(({ day }, key) => {
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
  
  renderSailingInfo(departure) {
    const {
      routeDetails: { routing, srcPort, dstPort, carrier }
    } = this.props;
    return (
      <div className='info'>
        <div
          className='content'
          style={{
            left: `${departure.offset * 100}%`,
            right: 0
          }}
        >
          <span className='route'>{`${srcPort} to ${dstPort}`}</span>
          <span className='routing'>{routing}</span>
          <span className='departure'>
                        {departure.date.format('Do MMMM')}
                    </span>
          <span className='carrier'>{carrier}</span>
        </div>
      </div>
    );
  }
  
  renderTimeline(computedOffsets) {
    const {
        earliest,
        latest,
        departure,
        arrival,
        offsets,
        unit
      } = computedOffsets,
      { travelDays } = this.props;
    return (
      <div className='timeline'>
        <div
          className='blocks complete-block'
          style={{
            left: `${earliest.offset * 100}%`,
            right: `${latest.offset * 100}%`
          }}
        >
          &nbsp;
        </div>
        <div
          className='blocks sailing-block'
          style={{
            left: `${departure.offset * 100}%`,
            right: `${arrival.offset * 100}%`
          }}
        >
          <span>{travelDays}</span>&nbsp;Days
        </div>
        {offsets.map(({ date, format, offset, mark, text }, key) => {
          let left = offset * 100,
            right = (1 - (offset + unit)) * 100,
            classNames = ['blocks', 'event-block'];
          if (mark) {
            classNames.push('mark');
          }
          return [
            <div
              key={`${key}-event`}
              className={classNames.join(' ')}
              style={{
                left: `${left}%`,
                right: `${right}%`
              }}
            >
              &nbsp;
            </div>,
            <div
              key={`${key}-tooltip`}
              className='tooltip-container'
              style={{
                left: `${left}%`
              }}
            >
              <div className='tooltip'>
                {text}
                <br/>
                {date.format(format)}
              </div>
            </div>
          ];
        })}
      </div>
    );
  }
  
  renderScheduleView() {
    const { calender } = this.props,
      offsets = this.getSailingComputedOffsets(),
      { departure } = offsets,
      unit = 1 / calender.length;
    return (
      <div className='schedule-view'>
        {this.renderCalenderBackground()}
        <div className='timeline-container'>
          {this.renderSailingInfo(departure)}
          {this.renderTimeline({ ...offsets, unit })}
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
  
  getSailingComputedOffsets() {
    const { calender, routeDetails } = this.props,
      unitOffset = 1 / calender.length,
      calenderLatest = calender[calender.length - 1].reference,
      ensCutoffDateTime = moment(routeDetails.ensCutoffDateTime),
      docCutoffDateTime = moment(routeDetails.docCutoffDateTime),
      portCutoffDateTime = moment(routeDetails.portCutoffDateTime),
      vesselDepartureDate = moment(routeDetails.vesselDepartureDate),
      vesselArrivalDate = moment.min(
        moment(routeDetails.vesselArrivalDate),
        calenderLatest
      ),
      deliveryDate = moment.min(
        moment(this.props.deliveryDate),
        calenderLatest
      ),
      earliest = {
        date: ensCutoffDateTime,
        offset: 0
      },
      latest = {
        date: deliveryDate,
        offset: 0
      },
      departure = {
        date: vesselDepartureDate,
        offset: 0
      },
      arrival = {
        date: vesselArrivalDate,
        offset: 0
      },
      offsets = [
        {
          date: ensCutoffDateTime,
          offset: 0,
          mark: false,
          text: 'ENS Cutoff',
          format: 'LLLL'
        },
        {
          date: docCutoffDateTime,
          offset: 0,
          mark: true,
          text: 'Doc. Cutoff',
          format: 'LLLL'
        },
        {
          date: portCutoffDateTime,
          offset: 0,
          mark: true,
          text: 'Port Cutoff',
          format: 'LLLL'
        },
        {
          date: deliveryDate,
          offset: 0,
          mark: true,
          text: 'Delivery Date',
          format: 'LLLL'
        }
      ];
    calender.forEach(({ reference }, i) => {
      const offset = i / calender.length;
      if (earliest.date.isSame(reference, 'days')) {
        earliest.offset = offset;
      }
      if (latest.date.isSame(reference, 'days')) {
        latest.offset = 1 - (offset + unitOffset);
      }
      if (departure.date.isSame(reference, 'days')) {
        departure.offset = offset;
      }
      if (arrival.date.isSame(reference, 'days')) {
        arrival.offset = 1 - (offset + unitOffset);
      }
      offsets.forEach(each => {
        if (each.date.isSame(reference, 'days')) {
          each.offset = offset;
        }
      });
    });
    return {
      earliest,
      latest,
      departure,
      arrival,
      offsets
    };
  }
  
  onToggleDetails(showDetails) {
    return () => this.setState({ showDetails });
  }
}

export default Sailing;
