const routines: Routine[] = [
	{
		id: 'alZ_2MQYOcEKtfcWv24mU',
		name: 'Correr e Caminhar',
		laps: [
			{
				time: 3_000,
				name: 'Correr'
			},
			{
				time: 2_000,
				name: 'Caminhar'
			}
		],
		repeat: Infinity
	}
];

export { routines };

export type Routine = {
	id: string;
	name: string;
	laps: Lap[];
	repeat: number;
};

export type Lap = {
	time: number;
	name: string;
};
