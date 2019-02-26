import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import { map, tap } from "rxjs/operators";
import { League, ILeagueResponse } from './league.interface'




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

  constructor(private http: HttpClient ) { }

  search(filter: {name: string} = {name: ''}): Observable<ILeagueResponse> {
    return this.http.get(API_URL+'/get_leagues')
    .pipe(
      tap((response: ILeagueResponse) => {
        response.results = response.leagues
          .map(league => new League(league.idLeague, league.strLeague))
          .filter(league => league.name.toLowerCase().search(filter.name.toLowerCase()) != -1 )

        return response;
      })
    ); 
  }
  getData(): Observable<any[]> {
    return this.http.get<any>(API_URL+'/get_leagues')
  }

  getAllLeagues(): Observable<League[]>{
    return this.http.get(API_URL+'/get_leagues').pipe(map(
      (response: Response) => {
        console.log(response);
        return response.json();
      }
    ));
  }
  getAllTeams(league: string){
    var replaced = league.split(' ').join('+');
    return this.http.get(API_URL+'/get_teams?league='+replaced).pipe(map(
      (response: Response) => {
        console.log(response.json());
        return response.json();
      }
    ));
  }
  getPlayersTeam(team: number){
    return this.http.get(API_URL+'/get_players?league='+team).pipe(map(
      (response: Response) => {
        console.log(response.json());
        return response.json();
      }
    ));
  }
}
