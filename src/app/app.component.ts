import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormControl} from '@angular/forms';
import { SoccerService } from './soccer.service';
import { Team } from './team.interface';
import { Player } from './player.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FDJ Search';
  listTeam: Team[] = [];
  listPlayer: Player[] = [];
  showroulet: any = false


  constructor(private soccerService: SoccerService, private router:Router) {}

  updateResults(results: Team[]): void {
    this.listTeam = results;
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    if(window.location.pathname === '/'){
      this.showroulet = false;
    }else(
      this.showroulet = true
    )
  }
  
}
