import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import { Team } from '../team.interface';
import { SoccerService } from '../soccer.service';
import { Player } from '../player.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
  @Input() team: Team;
  @Output() listPlayer = new EventEmitter<Player[]>();

  constructor(private soccerService: SoccerService, private router: Router) { }

  ngOnInit() {
  }
  getPlayersTeam(team: Team){
    this.router.navigate(['team/',team.id]);
  }

}
