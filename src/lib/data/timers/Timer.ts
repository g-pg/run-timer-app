import { parseMs } from '$lib/utils/textUtils';
import type { Routine } from '../routines/routines';

class Timer {
	private _routine: Routine;
	private _currentLapIndex: number = 0;
	private _totalTime: number;
	private _elapsedLapTime: number = 0;
	private _increaseInterval: number = 0;
	private _elapsedTotalTime: number = 0;

	private _currentLoop = 1;
	public isEnded = false;
	public isStarted = false;
	public state: TimerState = 'paused';

	constructor(routine: Routine) {
		if (routine.laps.length === 0) {
			throw new Error('Routine must have at least one lap');
		}

		this._routine = routine;
		this._totalTime = this._calcTotalTime(routine);

		this._handleRepeat();
	}

	get routine() {
		return this._routine;
	}
	get elapsedTotalTime() {
		return parseMs(this._elapsedTotalTime);
	}

	get elapsedLapTime() {
		return this._elapsedLapTime;
	}

	get currentLap() {
		return this._routine.laps[this._currentLapIndex];
	}

	get currentLapIndex() {
		return this._currentLapIndex;
	}

	get currentLoop() {
		return this._currentLoop;
	}

	get totalLoops() {
		return this._routine.repeat;
	}

	private _calcTotalTime(routine: Routine) {
		return (this._totalTime = routine.laps.reduce((a, b) => a + b.time, 0));
	}

	private _run() {
		clearInterval(this._increaseInterval);
		this._increaseInterval = setInterval(() => {
			this._increaseTime();
			if (this._elapsedLapTime >= this.currentLap.time) {
				this._nextLap();
			}
		}, 1000) as unknown as number;

		this.state = 'running';
	}

	private _increaseTime() {
		this._elapsedTotalTime += 1000;
		this._elapsedLapTime += 1000;
	}

	private _nextLap() {
		this._currentLapIndex++;
		this._elapsedLapTime = 0;
		this._handleRepeat();

		if (this._currentLapIndex >= this._routine.laps.length) {
			this.end();
		}
	}

	private _handleRepeat() {
		//If it shouldn't repeat
		if (this._routine.repeat === 0 || !this._routine.repeat) {
			return;
		}

		//If
		if (this._currentLapIndex < this._routine.laps.length) {
			return;
		}

		if (this._routine.repeat === Infinity) {
			this._currentLapIndex = 0;
			this._currentLoop++;
			return;
		}

		//Case where repeat is not infinity
		if (this._currentLoop <= this._routine.repeat) {
			this._currentLapIndex = 0;
			this._currentLoop++;
			return;
		}
	}

	public start() {
		this.isStarted = true;
		this._run();
	}

	public continue() {}

	public pause() {
		this.state = 'paused';
		clearInterval(this._increaseInterval);
	}

	public end() {
		this.state = 'paused';
		this.isEnded = true;
		clearInterval(this._increaseInterval);
	}
	public reset() {
		this._currentLapIndex = 0;
		this._elapsedLapTime = 0;
		this._elapsedTotalTime = 0;
	}
}

export default Timer;

//Types
type TimerState = 'running' | 'paused';
