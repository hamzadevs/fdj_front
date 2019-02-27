export interface Player{
    id: number;
    name: string;
    position: string;
    birthday: string;
    amountTrans: string;
    picture: string
}

export class Player{
    constructor(public id: number, public name: string, public position: string, public birthday: string, public amountTrans: string, public picture: string) {}
}

export interface Playersource{
    idPlayer: number;
    strPlayer: string;
    strPosition: string;
    dateBorn: string;
    strSigning: string;
    strThumb: string;
}

export interface IPlayerResponse {
    total: number;
    results: Player[];
    player: Playersource[];
}