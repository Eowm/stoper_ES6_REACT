class Stopwatch extends React.Component {
	constructor(display, lap) {
		super();
		this.state = {
			running: false,
			times: {
				hours: 0,
				minutes: 0,
				seconds: 0,
				miliseconds: 0
			},
			results: []
		};
	}

	reset() {
		this.setState({
			times: {
				hours: 0,
				minutes: 0,
				seconds: 0,
				miliseconds: 0
			},
			results: []
		});
	}

	format(times) {
		return `${pad0(times.hours)}:${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`;
	}

	start() {
		if(!this.state.running) {
			this.setState({
				running: true
			})
			this.watch = setInterval(() => this.step(), 10)
		}
	}

	step() {
		if(!this.state.running) return;
		this.calculate();
	}

	calculate() {
		const times = this.state.times;
		times.miliseconds += 1;
		if (times.miliseconds >= 100) {
        	times.seconds += 1;
        	times.miliseconds = 0;
    	}
    	if (times.seconds >= 60) {
        	times.minutes += 1;
        	times.seconds = 0;
    	}
    	if (times.minutes >= 60) {
        	times.hours += 1;
        	times.minutes = 0;
    	}
    	this.setState({
    		times
    	})
	}

	stop() {
    	this.setState({
    		running: false
    	});
    	clearInterval(this.watch);
	}

	lap() {
		const time = this.format(this.state.times);
		this.setState({
			results: [...this.state.results, time]
		})
	}

render() {
	return (<div>
				<div className='controls'>
					<button onClick={() => this.start()}>start</button>
					<button onClick={() => this.stop()}>stop</button>
					<button onClick={() => this.lap()}>lap</button>
				</div>
				<div className='stopwatch'>{this.format(this.state.times)}</div>
				<ul className='results'>{this.state.results.map((result, index) => <li key={index}>{result}</li>)}</ul>
				<button onClick={() => this.reset()}>reset</button>
			</div>)
		}
}
function pad0(value) {
		let result = value.toString();
		if (result.length < 2) {
			result ='0'+ result;
		}
		return result;
	}

var element = React.createElement(Stopwatch);
ReactDOM.render(element, document.getElementById('app'));