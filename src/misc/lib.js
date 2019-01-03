import moment from 'moment';

export function getCalender(minDate, weeks) {
	let reference = moment(minDate);
	return Array.from(
		{length: 7 * weeks},
		(_, i) => {
			let offset = reference.clone().add(i, 'days');
			return {
				day: offset.day(),
				date: offset.date(),
				reference: offset
			};
		}
	);
}

export function findEarliest(array, key) {
	return moment.min(
		array.map(
			({[key]: date}) => moment(date)
		)
	)
}
