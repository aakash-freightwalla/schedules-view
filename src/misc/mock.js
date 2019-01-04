import moment from 'moment';

export const SUMMARY_RESPONSE = {
  sourcePort: {
    portName: 'Nhava Sheva Port',
    portCountry: 'India'
  },
  destinationPort: {
    portName: 'Felixstowe Port',
    portCountry: 'United Kingdom'
  },
  type: 'FCL',
  container: 1,
  incoTerms: 'EXPORT-CNG'
};

export function getRandomDate(lower, upper) {
  let days = upper.diff(lower, 'days'),
    addition = Math.floor(Math.random() * days);
  return lower.add(addition, 'days');
}

export function getRandomInt(lower, upper) {
  return Math.floor(lower + Math.random() * (upper - lower));
}

export function getFakeSailing(sailingDate, transitTime) {
  let departure = sailingDate.toISOString(),
    cutoffOffset = getRandomInt(1,5),
    arrival = sailingDate
      .clone()
      .add(transitTime, 'days')
      .toISOString();
  return {
    travelDate: departure,
    travelDays: transitTime,
    rate: {
      rateCurrency: 'USD',
      rate: 575,
      rateType: '20\''
    },
    deliveryDate: arrival,
    transhipment: 'Direct',
    routeDetails: {
      routing: 'Direct Shipment',
      vesselDepartureDate: departure,
      srcPort: 'Nhava Sheva Port, India',
      containers: [
        {
          type: 'size_20',
          weight: 23
        }
      ],
      carrier: 'ECON SHIPPING',
      dstPort: 'Felixstowe Port, United Kingdom',
      portOpenDate: sailingDate
        .clone()
        .subtract(cutoffOffset + 3, 'days')
        .toISOString(),
      ensCutoffDateTime: sailingDate
        .clone()
        .subtract(cutoffOffset + 2, 'days')
        .toISOString(),
      docCutoffDateTime: sailingDate
        .clone()
        .subtract(cutoffOffset + 1, 'days')
        .toISOString(),
      portCutoffDateTime: sailingDate
        .clone()
        .subtract(cutoffOffset, 'days')
        .toISOString(),
      vesselArrivalDate: arrival
    },
    costDetails: {
      totalCost: 53225,
      totalCostCurrency: 'INR',
      details: [
        {
          title: 'Origin Terminal Charges',
          cost: [
            {
              rateCurrency: 'INR',
              baseCost: 9000,
              baseCurrency: 'INR',
              costType: '20\'',
              description: 'Factory THC',
              rate: 9000
            },
            {
              rateCurrency: 'INR',
              baseCost: 250,
              baseCurrency: 'INR',
              costType: '20\'',
              description: 'Seal Charges',
              rate: 250
            },
            {
              rateCurrency: 'INR',
              baseCost: 2500,
              baseCurrency: 'INR',
              costType: 'BL',
              description: 'BL Fee',
              rate: 2500
            }
          ]
        },
        {
          title: 'Shipping Line (ECON SHIPPING)',
          cost: [
            {
              rateCurrency: 'USD',
              baseCost: 40825,
              baseCurrency: 'INR',
              costType: '20\'',
              description: 'Freight',
              rate: 575
            }
          ]
        },
        {
          title: 'Coordination',
          cost: [
            {
              rateCurrency: 'INR',
              baseCost: 650,
              baseCurrency: 'INR',
              costType: '20\'',
              description: 'Coordination Fees',
              rate: 650
            }
          ]
        }
      ],
      notes: [
        {
          type: 'free_days',
          message:
            'Detention free days subject to approval from shipping line.'
        },
        {
          type: 'terminal',
          message: 'Terminal charges are estimated.'
        },
        {
          type: 'rate_expiry',
          message: 'Rate\'valid until 2018-12-31.'
        },
        {
          type: 'currency',
          message:
            'Currency exchange used is 1 USD = 71 INR. Final rate subject to fluctuations in currency exchange.'
        }
      ]
    }
  };
}

export function getFakeSailingData(nos) {
  return Array.from({ length: nos }, () => {
    let earliest = moment().add(3, 'days'),
      latest = earliest.add(getRandomInt(10, 20), 'days'),
      reference = getRandomDate(earliest, latest);
    return getFakeSailing(reference, getRandomInt(10, 25));
  }).sort(({ travelDate: a }, { travelDate: b }) => {
    let am = moment(a),
      bm = moment(b);
    if (am.isAfter(bm)) {
      return 1;
    }
    if (am.isBefore(bm)) {
      return -1;
    }
    return 0;
  });
}
