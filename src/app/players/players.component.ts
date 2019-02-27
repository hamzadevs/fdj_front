import { Component, OnInit } from '@angular/core';
import { SoccerService } from '../soccer.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Player } from '../player.interface';
import { Team } from '../team.interface';
import { NavbarService } from '../navbar.service';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {

  players: Player[];
  public team: Team;
  constructor(private soccerService: SoccerService, private route: ActivatedRoute,public nav: NavbarService) { 
  }

  ngOnInit() {
    this.nav.hide();
    this.nav.setTeam(this.soccerService.getCurrentTeam());
    this.route.params.subscribe(params => {
      let team_id = +params['id'];
      this.soccerService.getPlayersTeam(team_id)
        .subscribe((response) => {
          this.players = response.results
          });
    });
    /* let team_id = this.route.snapshot.paramMap.get('id');
    this.soccerService.getPlayersTeam(team_id)
    .subscribe((response) => {
      this.players = response.results
      }
    ) */
  }
  
}
