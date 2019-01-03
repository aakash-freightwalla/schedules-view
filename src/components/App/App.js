import React, {Component} from 'react';
import {getFakeSailingData, SUMMARY_RESPONSE} from "../../misc/mock";
import Search from "../Search/Search";
import './App.scss';

class App extends Component {
	render() {
		return (
			<div className='App'>
				<div className='sidebar'>
					<span>L</span>
					<span>A</span>
					<span>B</span>
					<span>C</span>
					<span>D</span>
				</div>
				<Search
					summary={SUMMARY_RESPONSE}
					sailings={getFakeSailingData(5)}
				/>
			</div>
		);
	}
}

export default App;
