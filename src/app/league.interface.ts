export class League{
    constructor(public id: number, public name: string) {}
}

export interface Leaguesource{
    idLeague: number;
    strLeague: string
}

export interface ILeagueResponse {
    total: number;
    results: League[];
    leagues: Leaguesource[];
  }