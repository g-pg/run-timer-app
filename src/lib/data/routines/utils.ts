import type { Lap, Routine } from './routines';

function getRoutineTotalTime(laps: Lap[]) {
	if (laps.length === 0) return 0;
	return laps.reduce((a, b) => a + b.time, 0);
}

export { getRoutineTotalTime };
