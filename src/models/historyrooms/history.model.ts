export enum ETypeMatch {
    PVE = 0,
    PVP = 1
}
export interface IHistoryRoomLogCreationModel {
    create_at: number;
    player1Id: number;
    player2Id: number | null;
    typeMatch: ETypeMatch,
    messageLog: string;
    botId: number | null;
}