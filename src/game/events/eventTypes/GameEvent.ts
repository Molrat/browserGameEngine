export type GameEvent =
	| { type: 'StartMenuPlayerJoinedEffect'; slot: number }
	| { type: 'StartMenuPlayerReadyEffect'; slot: number };