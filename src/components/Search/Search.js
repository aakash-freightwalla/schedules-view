import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Summary from "../Summary/Summary";
import ModeToggle from "../ModeToggle/ModeToggle";
import {MODE_OPTIONS} from "../../misc/templates";
import Sailing from "../Sailing/Sailing";
import {findEarliest, getCalender} from "../../misc/lib";
import './Search.scss';

class Search extends Component {
	static propTypes = {
		summary: PropTypes.object,
		sailings: PropTypes.array
	};
	
	constructor(props) {
		super(props);
		this.onModeChange = this.onModeChange.bind(this);
		this.state = {
			viewType: 'COST',
			minDate: new Date()
		};
	}
	
	render() {
		const {summary} = this.props;
		return (
			<div className='search-page'>
				<h2 className='title'>Search Result</h2>
				<Summary {...summary}/>
				<div className='action-container'>
					<div className='filter'>
						Filter View
					</div>
					<ModeToggle
						options={MODE_OPTIONS}
						onSelectionChange={this.onModeChange}
					/>
				</div>
				{this.renderContent()}
			</div>
		);
	}
	
	renderContent() {
		const {sailings} = this.props,
			{viewType} = this.state,
			{calender} = this.getCalender();
		return (
			<div className='sailings'>
				{this.renderHeader(calender)}
				{sailings.map(
					(each, key) => (
						<Sailing
							key={key}
							viewType={viewType}
							calender={calender}
							{...each}
						/>
					)
				)}
			</div>
		)
	}
	
	renderHeader(calender) {
		const {sailings: [first]} = this.props,
			{rate} = first,
			{viewType} = this.state;
		let headers = null,
			headerClassName = 'schedule-view-header';
		if (viewType === 'COST') {
			headerClassName = 'cost-view-header';
			headers = [
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
			]
		}
		return (
			<div className='sailing-header'>
				<div className='blank'>&nbsp;</div>
				<div className={['headers', headerClassName].join(' ')}>
					{
						headers ?
							headers.map(({title, className}, key) => (
								<div
									key={key}
									className={['column', className].join(' ')}
								>
									{title}
								</div>
							)) :
							calender.map(({date, day}, key) => {
								const classNames = ['day'];
								if (day === 0) {
									classNames.push('sunday');
								}
								return (
									<div
										key={key}
										className={classNames.join(' ')}
									>
										{date}
									</div>
								)
							})
					}
				</div>
			</div>
		)
	}
	
	onModeChange(viewType) {
		this.setState({viewType});
	}
	
	getCalender() {
		const {sailings} = this.props,
			earliest = findEarliest(sailings, 'travelDate').subtract(3, 'days'),
			calender = getCalender(earliest, 4);
		return {
			earliest,
			calender
		}
	}
}

Search.propTypes = {};

export default Search;
