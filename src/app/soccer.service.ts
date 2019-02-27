import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import { map, tap } from "rxjs/operators";
import { League, ILeagueResponse } from './league.interface'
import { Team, ITeamResponse } from './team.interface';
import { IPlayerResponse, Player } from './player.interface';




const API_URL: string = 'http://127.0.0.1:8000/api';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class SoccerService {
  myMethod$: Observable<any>;
  private myMethodSubject = new Subject<any>();

  myMethod(data) {
      console.log(data); // I have data! Let's return it so subscribers can use it!
      // we can do stuff with data if we want
      this.myMethodSubject.next(data);
  }
  constructor(private http: HttpClient ) {
    this.myMethod$ = this.myMethodSubject.asObservable();
   }  

  search(filter: {name: string} = {name: ''}): Observable<ILeagueResponse> {
    if (typeof filter.name === "object") return this.http.get(API_URL+'/get_leagues')
    .pipe(
      tap((response: ILeagueResponse) => {}));
    else{
      return this.http.get(API_URL+'/get_leagues')
      .pipe(
        tap((response: ILeagueResponse) => {
          console.log(response);
          response.results = response.leagues
            .map(league => new League(league.idLeague, league.strLeague))
            .filter(league => league.name.toLowerCase().search(filter.name.toLowerCase()) != -1 )

          return response;
        })
      ); 
    }
    
  }
  getAllTeams(league: string){
    var replaced = league.split(' ').join('+');
    return this.http.get(API_URL+'/get_teams/'+replaced)
      .pipe(
        tap((response: ITeamResponse) => {
          console.log(response);
          response.results = response.teams
            .map(team => new Team(team.idTeam, team.strTeam,team.strTeamBadge))
          return response;
        })
      );
  }
  getPlayersTeam(team: any){
    return this.http.get(API_URL+'/get_players/'+team)
    .pipe(
      tap((response: IPlayerResponse) => {
        response.results = response.player
          .map(player => new Player(player.idPlayer, player.strPlayer, player.strPosition, player.dateBorn, player.strSigning, player.strThumb))
          return response;
      })
    );
  }
}
