import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import { Team } from '../team.interface';
import { SoccerService } from '../soccer.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
  @Input() team: Team;
  @Output() teamVisisted = new EventEmitter<Team>();

  constructor(private soccerService: SoccerService) { }

  ngOnInit() {
  }
  getPlayersTeam(team: Team){
    this.soccerService.getPlayersTeam(team.id)
    .subscribe((response) => {
      this.teamVisisted.emit(this.team);
      console.log(response);
    }
    )
  }

}
