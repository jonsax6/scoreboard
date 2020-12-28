import React, { Component } from 'react';

class Stopwatch extends Component {

    state = {
        isRunning: false,
        elapsedTime: 0,
        previousTime: 0
    }

    componentDidMount() {
        this.intervalID = setInterval(() => this.tick(), 100);
    }

    componentWillUnmount() {
        clearInterval(this.intervalID);
    }

    handleStopwatch = () => {
        this.setState( prevState => ({
            isRunning: !prevState.isRunning
        }));
        if(!this.state.isRunning) {
            this.setState( { previousTime: Date.now() });
        }
    }

    tick = () => {
        if(this.state.isRunning) {
            const now = Date.now();
            this.setState( prevState => ({ 
                previousTime: now, 
                elapsedTime: prevState.elapsedTime + (now - 
                this.state.previousTime)
            }));
        }
    }

    handleReset = () => {
        this.setState({ elapsedTime: 0 })
    }

    render() {
        const {
            handleStopwatch,
            handleReset,
            state
        } = this;
        const seconds = Math.floor(this.state.elapsedTime/1000);
        return (
            <div className="stopwatch">
                <h2>Stopwatch</h2>
                <span className="stopwatch-time">{seconds}</span>
                <button onClick={handleStopwatch}>
                { state.isRunning ? 'stop' : 'start' }
                </button>
                <button onClick={handleReset}>Reset</button>
            </div>
        );
    }
}

export default Stopwatch;