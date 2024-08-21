export const handleInfinity = (value: number | string) => {
	return value === Infinity ? '∞' : value;
};

export function parseMs(time: number) {
	const format = (time: number) => String(time).padStart(2, '0');
	const totalSeconds = Math.floor(time / 1000);
	const totalMinutes = Math.floor(totalSeconds / 60);
	const hours = Math.floor(totalMinutes / 60);
	const minutes = totalMinutes % 60;
	const seconds = totalSeconds % 60;

	const formattedHours = format(hours);
	const formattedMinutes = format(minutes);
	const formattedSeconds = format(seconds);

	if (hours > 0) {
		return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
	} else {
		return `${formattedMinutes}:${formattedSeconds}`;
	}
}
