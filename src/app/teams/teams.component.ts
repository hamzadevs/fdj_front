import { Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import { SoccerService } from '../soccer.service';
import { Team } from '../team.interface';
import { League } from '../league.interface';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {
  teams: Team[];
  league: League;
  constructor(private soccerService: SoccerService) {
  }

  ngOnInit() {
    this.league = this.soccerService.getCurrentLeague();
    this.soccerService.getAllTeams(this.league.name)
      .subscribe(
        (teams) => {this.teams = teams.results;},
        (error: Response) => console.log(error)
    );
  }

}
