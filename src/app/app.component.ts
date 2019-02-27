import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormControl} from '@angular/forms';
import { SoccerService } from './soccer.service';
import { Team } from './team.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FDJ Search';
  listTeam: Team[] = [];


  constructor(private soccerService: SoccerService) {}

  updateResults(results: Team[]): void {
    this.listTeam = results;
  }
  
}
