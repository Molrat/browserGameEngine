export type StartMenuState = {
    playerConnections: PlayerConnectionState[];
}

type PlayerConnectionState = {
    status: 'notJoined' | 'joined' | 'ready';
    controllerId?: string | null;
}