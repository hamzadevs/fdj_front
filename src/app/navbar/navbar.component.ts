import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { League } from '../League.interface';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SoccerService } from '../soccer.service';
import { debounceTime, tap, switchMap, finalize, startWith } from 'rxjs/operators';
import { Team } from '../team.interface';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  title = 'FDJ Search';
  filteredLeagues: League[] = [];
  leaguesForm: FormGroup;
  isLoading = false;
  public showSearchBar : any = false;

  @Output() teams = new EventEmitter<Team[]>();


  constructor(private fb: FormBuilder, private soccerService: SoccerService, private router:Router) {}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    if(window.location.pathname === '/'){
      this.showSearchBar = true;
    }else(
      this.showSearchBar = false
    )
    this.leaguesForm = this.fb.group({
      leagueInput: null
    })
    this.leaguesForm.get('leagueInput')
      .valueChanges
      .pipe(
        startWith(''),
        debounceTime(300),
        tap(() => this.isLoading = true),
        switchMap(value => this.soccerService.search({name: value})
        .pipe(
          finalize(() => this.isLoading = false),
          )
        )
      )
      .subscribe(leagues => this.filteredLeagues = leagues.results);
  }
    

  displayFn(league: League) {
    if (league) { return league.name; }
  }
  getAllTeam(league: League){
    this.soccerService.getAllTeams(league.name)
      .subscribe(
        (teams) => this.teams.emit(teams.results),
        (error: Response) => console.log(error)
      );
  }
  

}
