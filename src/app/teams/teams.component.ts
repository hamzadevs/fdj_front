import { Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import { SoccerService } from '../soccer.service';
import { Team } from '../team.interface';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {
  @Input() teams: Team[];
  constructor(private soccerService: SoccerService) {
  }

  ngOnInit() {
  }
  ngOnChanges(): void {
    console.log(this.teams)
  }

}
