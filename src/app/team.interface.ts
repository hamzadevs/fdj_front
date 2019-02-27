export interface Team{
    id: number;
    name: string;
    logo: string
}

export class Team{
    constructor(public id: number, public name: string,public logo: string) {}
}

export interface Teamsource{
    idTeam: number;
    strTeam: string;
    strTeamBadge: string
}

export interface ITeamResponse {
    total: number;
    results: Team[];
    teams: Teamsource[];
}