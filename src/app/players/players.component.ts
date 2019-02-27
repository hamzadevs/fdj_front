import { Component, OnInit } from '@angular/core';
import { SoccerService } from '../soccer.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Player } from '../player.interface';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {

  players: Player[];
  showSearchBar: any=false;
  constructor(private soccerService: SoccerService, private route: ActivatedRoute) { }

  ngOnInit() {
    if(window.location.pathname === '/'){
      this.showSearchBar = true;
    }else(
      this.showSearchBar = false
    )
    let team_id = this.route.snapshot.paramMap.get('id');
    this.soccerService.getPlayersTeam(team_id)
    .subscribe((response) => {
      this.players = response.results
      console.log(response);
      }
    )
  }
  ngOnChanges(): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    let team_id = this.route.snapshot.paramMap.get('id');
    this.soccerService.getPlayersTeam(team_id)
    .subscribe((response) => {
      console.log(response);
      }
    )
    
  }
  
}
